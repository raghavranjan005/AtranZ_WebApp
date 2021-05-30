import React from 'react';
import { BrowserRouter} from 'react-router-dom';
function FeedbackScreen() {
  
  return (
        <BrowserRouter>
        <div class="container">
          <img src="https://atranz.s3.ap-south-1.amazonaws.com/violet-smile.png"></img>
          <a href="https://forms.gle/5iMzG6Shstb8pm7S9" target="_blank">Click here to give valuable feedback      <i className="fa fa-angle-double-right"></i></a>
        </div>
        </BrowserRouter>
  );
}
export default FeedbackScreen;
