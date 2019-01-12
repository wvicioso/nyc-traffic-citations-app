import React from 'react';
import './dateInput.css';

const DateInput = (props) => (
  <input className="dateInput" onChange={props.onChange}
    value={props.value}
    placeholder={props.placeholder}
    type="number"
    maxLength={props.maxLength}
  />
)

export default DateInput;

// <datalist id="locations" data-bind="foreach: locationList">
//   <option data-bind="text: title">
// </datalist>
