import React from 'react';
import './citation.css';

const Citation = (props) => (
  <div className="citation">
    <p>{props.ticketDetails.violation_time }</p>
    <p>{props.ticketDetails.county }</p>
    <p>{props.ticketDetails.violation}</p>
    <p>${props.ticketDetails.payment_amount }</p>
  </div>
)

export default Citation;
