import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';


function DevloperInfoScreen() {
  
  return (
        <BrowserRouter>
        <div className="row center large">
            <h1 className="large"> Made with <i className="fa fa-heart"></i> by </h1>
        </div>
        <div className="row">
        <div className="col-2 leftpad">
        <div class="card-image">
                <img className="avtar-img" src="/images/Raghav.png" align="left"/>
                <div className="dev-details-container">
                <h1 className="dev-details large-font">Raghav Ranjan</h1>
                <h2 className="dev-details">Pre-Final Year UnderGraduate,<br></br> IIT Jodhpur</h2>
                </div>
                <br clear="left" /><br clear="top"/>
            <div class="avtar-container">
                <a href="https://www.instagram.com/raghav__005/"><i className="fa fa-instagram"></i></a>&nbsp;&nbsp;&nbsp;
                <a href="https://www.facebook.com/raghav.ranjan.311056"><i className="fa fa-facebook"></i></a>&nbsp;&nbsp;&nbsp;
                <a href="https://www.linkedin.com/in/raghav-ranjan-827837190/"><i className="fa fa-linkedin"></i></a>&nbsp;&nbsp;&nbsp;
                <a href="https://raghavranjan005.github.io/"><i className="fa fa-chrome"></i></a>&nbsp;&nbsp;&nbsp;
                <a href="https://github.com/raghavranjan005"><i className="fa fa-github" ></i></a>&nbsp;&nbsp;&nbsp;
                <a href = "mailto: ranjan.1@iitj.ac.in"><i className="fa fa-envelope"></i></a>&nbsp;&nbsp;&nbsp;
                <a href="https://twitter.com/raghav__005"><i className="fa fa-twitter"></i></a>
            </div>
            </div>
        </div>
        <div className="col-2 leftpad">
            <div class="card-image">
                <img className="avtar-img" src="/images/Aditya.jpeg" align="left"/>

                <div className="dev-details-container">
                <h1 className="dev-details large-font">Aditya Kumar</h1>
                <h2 className="dev-details">Pre-Final Year UnderGraduate,<br></br> IIT Jodhpur</h2>
                </div>
                <br clear="left" /><br clear="top"/>

            <div class="avtar-container">

            <i className="fa fa-instagram"></i>&nbsp;&nbsp;&nbsp;
                <i className="fa fa-facebook"></i>&nbsp;&nbsp;&nbsp;
                <i className="fa fa-linkedin"></i>&nbsp;&nbsp;&nbsp;
                <i className="fa fa-chrome"></i>&nbsp;&nbsp;&nbsp;
                <i className="fa fa-github"></i>&nbsp;&nbsp;&nbsp;
                <i className="fa fa-envelope"></i>&nbsp;&nbsp;&nbsp;
                <i className="fa fa-twitter"></i>

            </div>
            
            </div>  
                
        </div>

        


        </div>
        </BrowserRouter>
  );
}
export default DevloperInfoScreen;
