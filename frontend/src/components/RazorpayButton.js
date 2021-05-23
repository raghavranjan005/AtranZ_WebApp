import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


function RazorpayButton(props) {

const amount = (props.amount)*100;
console.log(amount);
// console.log(props.clientID);
  var options = {
    "key": String(props.clientID), // Enter the Key ID generated from the Dashboard
    "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "AtranZ Shopping",
    "description": "Online Payment",
    // "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": function (response){
        alert("Payment Succesful");
        props.onSuccess(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature)
    },
    "prefill": {
        "name": String(props.user.name),
        "email": String(props.user.email),
        "contact":String(props.user.mobile),
    },
    "theme": {
        "color": "#3399cc"
    }
};
var rzp1 = new window.Razorpay(options);
rzp1.on('payment.failed', function (response){
        alert("Payement Failed")
        // alert(response.error.code);
        alert(response.error.description);
        // alert(response.error.source);
        // alert(response.error.step);
        // alert(response.error.reason);
        // alert(response.error.metadata.order_id);
        // alert(response.error.metadata.payment_id);
});

const payOrderHandler = (e) => {
  rzp1.open();
  e.preventDefault();
}


  return <button id="rzp-button1" className="button primary full-width" onClick={payOrderHandler} >Proceed to Payment</button>
}

export default RazorpayButton;