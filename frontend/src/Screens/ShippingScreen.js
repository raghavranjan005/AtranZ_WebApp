import React, {useState } from 'react';
import {useDispatch } from 'react-redux';
import { userSaveShipping } from '../actions/userActions';
import CheckoutSteps from '../components/CheckoutSteps';

function ShippingScreen(props) {

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [mobile, setMobile] = useState('');


  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userSaveShipping({ name,mobile, address, city, postalCode, country }));
    props.history.push('payment');
  }
  return <div>
    <CheckoutSteps step1 step2 ></CheckoutSteps>
    <div className="form">
      <form onSubmit={submitHandler} >
        <ul className="form-container">
          <li>
            <h2>Shipping</h2>
          </li>

          <li>
            <label htmlFor="name">
              Name
          </label>
            <input type="text" name="name" id="name" required onChange={(e) => setName(e.target.value)}>
            </input>
          </li>

          <li>
            <label htmlFor="name">
              Mobile No.
          </label>
            <input type="text" name="mobile" id="mobile" required onChange={(e) => setMobile(e.target.value)}>
            </input>
          </li>

          <li>
            <label htmlFor="address">
              Address
          </label>
            <input type="text" name="address" id="address" required onChange={(e) => setAddress(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="city">
              City
          </label>
            <input type="text" name="city" id="city" required onChange={(e) => setCity(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="postalCode">
              Postal Code
          </label>
            <input type="text" name="postalCode" id="postalCode" required onChange={(e) => setPostalCode(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="country">
              Country
          </label>
            <input type="text" name="country" id="country" onChange={(e) => setCountry(e.target.value)}>
            </input>
          </li>


          <li>
            <button type="submit" className="button primary">Continue</button>
          </li>

        </ul>
      </form>
    </div>
  </div>

}
export default ShippingScreen;