import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';


function CustomerCareScreen() {
  
  return (
        <BrowserRouter>
        <div className="row center large">
            <h1 className="large"><i className="fa fa-user"/> Customer Care Team </h1>
        </div>
        <div className="row">
        <div className="col-2 leftpad">
        <div class="card-image">
                <img className="avtar-img" src="/images/Abhishek.jpeg" align="left"/>
                <div className="dev-details-container">
                <h1 className="dev-details large-font">Abhishek Kumar</h1>
                <h2 className="dev-details">Sophomore Year UnderGraduate,<br></br>HIT Kolkata</h2>
                </div>
                <br clear="left" /><br clear="top"/>
            <div class="avtar-container">
                <a href="https://www.instagram.com/abhishek01022001/"><i className="fa fa-instagram"></i></a>&nbsp;&nbsp;&nbsp;
                <a href = "mailto: abhishekkumar01022001@gmail.com"><i className="fa fa-envelope"></i></a>&nbsp;&nbsp;&nbsp;
                <a href="https://twitter.com/Abhishek__0102/"><i className="fa fa-twitter"></i></a>
            </div>
            </div>
        </div>
        <div className="col-2 leftpad">
            <div class="card-image">
            <h2 className="medium-font">For any query or help</h2>
            <h2 className="small-font">
            <i className="fa fa-envelope"/>&nbsp;Email at: atranzcart@gmail.com
            </h2>

            <h2 className="small-font">
            <i className="fa fa-phone"/>&nbsp;Contact No. : +91-9529976421
            </h2>
            <h2 className="small-font">
            <i className="fa fa-address-card"/>&nbsp;Address : 
            <div>
            <br></br>Near samta bhawan<br></br>ward no - 05<br></br> Landmark- S.B.I Main branch, Forbesganj,<br></br> Araria-854318
            </div>
            </h2>
            
            </div>  
                
        </div>

        


        </div>
        </BrowserRouter>
  );
}
export default CustomerCareScreen;
