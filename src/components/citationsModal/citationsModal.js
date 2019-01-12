import React from 'react';
import {Citation, CitationsHeader}  from '../index.js';

import './citationsModal.css';

const CitationsModal = (props) => (
  <div className="citationsWrapper">
    <CitationsHeader/>

    <div id="citations">
    {
      props.citations.map((obj) => (
        <Citation key={props.citations.indexOf(obj)} ticketDetails={obj}/>
      ))
    }
    </div>
  </div>
)

export default CitationsModal;
