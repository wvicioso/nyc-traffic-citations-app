import React, { Component } from 'react';
import {DateModal,  CitationsModal, CitationDetails}  from './components/index.js';
import './App.css';


class App extends Component {

  constructor() {
    super();
    this.state = {
      citations: [],
      day: '',
      month: '',
      year: '',
    }
    this.handleChangeTextDay = this.handleChangeText.bind(this, 'day')
    this.handleChangeTextMonth = this.handleChangeText.bind(this, 'month')
    this.handleChangeTextYear = this.handleChangeText.bind(this, 'year')
    this.getCitations = this.getCitations.bind(this)
  }



  getCitations() {
    let date = this.formatDate()
    if (this.validateDate(date)) {
      fetch(`https://data.cityofnewyork.us/resource/uvbq-3m68.json?$where=issue_date%20=%20%27${date}%27%20AND%20payment_amount%20%3E%200`)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          citations: responseJson
        })
      })
      .catch(error => console.log(error))
    } else {
      this.setState({
        error: true
      })
    }
  }

  handleChangeText(dateType, event) {
    let value = event.target.value
    this.setState({
      [dateType]: value,
      error: false
    })
  }

  validateDate(date) {
    let requestDate = new Date(date)
    let maxDate =new Date()
    let minDate = new Date('12/31/2008')
    if (date.length === 10 && maxDate > requestDate && minDate < requestDate) {
      return true;
    }
    return false;
  }

  formatDate() {
    let { day, month, year } = this.state
    if (day.length < 2) day = `0${day}`
    if (month.length < 2) day = `0${month}`
    return `${day}/${month}/${year}`
  }

  formatDollars(number) {
    return '$' + `${number}`.split(/(?=(?:...)*$)/).join(',')
  }

  sumOfCitations() {
    if (this.state.citations.length === 0) return;
    return this.state.citations.map((itm) => (
      parseInt(itm.payment_amount)
    )).reduce(this.getSum);
  }

  getSum(total, num) {
    return total + num;
  }

  render() {
    let date = this.formatDate() || '',
        { citations, error } = this.state,
        sum = this.sumOfCitations() || 0,
        totalDollars = this.formatDollars(`${sum}`) || 0

    return (
      <div className="App">
        <h1>NYC Traffic Citations per Date</h1>
        <h2>
          {
            citations.length ?
            `Displaying Violations for ${date}` :
            'Submit a date between 2008 - 2019 to view all citations issued and payed that day in NYC'
          }
        </h2>
        { error ? <h2 className="error">Invalid Date</h2> : <div/>}
        <DateModal
          onChangeDay={this.handleChangeTextDay}
          onChangeMonth={this.handleChangeTextMonth}
          onChangeYear={this.handleChangeTextYear}
          onClick={this.getCitations}
          day={this.state.day}
          month={this.state.month}
          year={this.state.year}
        />
        <div className="flex-row">
          <CitationDetails totalCitations={citations.length} totalDollars={totalDollars} />
          <CitationsModal citations={citations} />
        </div>
      </div>
    );
  }
}


export default App;
