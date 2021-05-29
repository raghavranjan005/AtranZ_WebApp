import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import smile from '../violet-smile.png'
function FeedbackScreen() {
  
  return (
        <BrowserRouter>
        <div class="container">
          <img src={smile}></img>
          <a href="https://forms.gle/5iMzG6Shstb8pm7S9" target="_blank">Click here to give valuable feedback      <i className="fa fa-angle-double-right"></i></a>
        </div>
        </BrowserRouter>
  );
}
export default FeedbackScreen;
