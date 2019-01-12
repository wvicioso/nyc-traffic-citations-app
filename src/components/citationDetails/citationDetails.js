import React from 'react';
import './citationDetails.css';

const CitationDetails = (props) => (
  <div className="totalDetails">
    <div className="totalCitations">
      <h3>Total Number of Citations:</h3>
      <p>{ props.totalCitations }</p>
    </div>
    <div className="totalDollars">
      <h3>Total Dollar Amount Generated:</h3>
      <p>{ props.totalDollars }</p>
    </div>
  </div>
)

export default CitationDetails;
