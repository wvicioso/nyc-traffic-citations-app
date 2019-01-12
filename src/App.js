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
  }

  componentDidMount() {

  }

  getCitations() {
    let date = this.formatDate()
    fetch(`https://data.cityofnewyork.us/resource/uvbq-3m68.json?$where=issue_date%20=%20%27${date}%27%20AND%20payment_amount%20%3E%200`)
    .then(response => response.json())
    .then(responseJson => {
      this.setState({
        citations: responseJson
      })
    })
    .catch(error => console.log(error))
  }

  formatDate() {
    let { day, month, year } = this.state
    return `${day}/${month}/${year}`
  }

  formatDollars(number) {
    return '$' + `${number}`.split(/(?=(?:...)*$)/).join(',')
  }

  getSum(total, num) {
    return total + num;
  }

  sumOfCitations() {
    if (this.state.citations.length === 0) return
    return this.state.citations.map((itm) => (
      parseInt(itm.payment_amount)
    )).reduce(this.getSum);
  }

  handleChangeText(item, event) {
    this.setState({
      [item]: event.target.value
    })
  }

  render() {
    let date = this.formatDate() || '',
        { citations } = this.state,
        sum = this.sumOfCitations() || 0,
        totalDollars = this.formatDollars(`${sum}`) || 0

    return (
      <div className="App">
        <h1>NYC Traffic Citations per Date</h1>
        <h2>
          {
            citations.length ?
            `Displaying Violations for ${date}` :
            'Submit a date to view all citations issued and payed that day in NYC'
          }
        </h2>
        <DateModal
          onChangeDay={this.handleChangeText.bind(this, 'day')}
          onChangeMonth={this.handleChangeText.bind(this, 'month')}
          onChangeYear={this.handleChangeText.bind(this, 'year')}
          onClick={this.getCitations.bind(this)}
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
