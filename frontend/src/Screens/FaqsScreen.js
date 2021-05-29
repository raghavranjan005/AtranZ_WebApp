import React, { useEffect, useState } from 'react';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';


function FaqsScreen(props) {


  return <div>
      <h1>ORDERS and PAYMENTS</h1>
      <br></br>
      <p><strong><i>For Now we are only delivering to Bihar only.</i></strong><br></br> </p>
      <p><i>We will be soon delivering in other places</i></p>
      <strong>Note : We will send order via courier for other places than FORBESGANJ, ARARIA</strong>
      <h3 >MODE OF PAYMENTS</h3>
      <p><strong>Online Payments</strong>  : UPI, Cards, Net Banking (Via Razorpay API) - You may get rewards if you choose this method</p>
      <p><strong>*Cash on Delivery</strong>  : Pay through cash or any online payment methods on delivery</p>
      <p><strong>*Takeaway</strong>  : One can recieve your order by reaching pickup points<br></br></p>
      <p  className="margin-left">&nbsp;&nbsp;&nbsp;&nbsp;PICKUP PONT:<br></br>
      &nbsp;&nbsp;&nbsp;&nbsp;Near samta bhawan<br></br>&nbsp;&nbsp;&nbsp;&nbsp;ward no - 05<br></br> &nbsp;&nbsp;&nbsp;&nbsp;Landmark- S.B.I Main branch, Forbesganj,<br></br>
      &nbsp;&nbsp;&nbsp;&nbsp;Araria-854318<br></br>
      &nbsp;&nbsp;&nbsp;&nbsp;Contact No. : +91-9529976421 </p>
      <h3 >DELIVERY</h3>
      <li>Once confirmed order will be dispatched and will be delivered within two days of order request.</li>
      <li>Once confirmed order will be dispatched and will be delivered within two days of order request.</li>
      


  </div>

}

export default FaqsScreen;