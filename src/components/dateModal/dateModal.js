import React from 'react';
import { DateInput }  from '../index.js';
import '../dateInput/dateInput.css';
import './dateModal.css';


const DateModal = (props) => (
  <div className="dateInputWrapper">
    <DateInput onChange={props.onChangeDay} value={props.day} placeholder="DD" type="number" maxLength="2" />
    <DateInput onChange={props.onChangeMonth} value={props.month} placeholder="MM" type="number" maxLength="2" />
    <DateInput onChange={props.onChangeYear} value={props.year} placeholder="YYYY" type="number" maxLength="4" />
    <div className="submitBtn" onClick={props.onClick} type="submit">
      <p>submit</p>
    </div>
  </div>
)

export default DateModal;
