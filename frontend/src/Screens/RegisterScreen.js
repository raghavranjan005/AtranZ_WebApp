import React, { useEffect, useState } from 'react';
import '../index.css';
import "react-alice-carousel/lib/alice-carousel.css";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {register} from '../actions/userActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';


function RegisterScreen(props){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const userRegister = useSelector(state => state.userRegister);
    const { loading, userInfo, error } = userRegister;

    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

    const dispatch = useDispatch();

    useEffect(() => {
        if (userInfo) {
          props.history.push(redirect);
        }
      }, [props.history, redirect, userInfo]);

    // console.log(User);
    // console.log("hello");
    
   
    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== rePassword) {
          alert('Password and confirm password are not match');
        } else {
          dispatch(register(name, email, password));
        }
      };

    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className = "form-container">
                <li>
                    <h2> Create an AtranZ Account</h2>
                    </li>
                    <li>
                    {loading && <LoadingBox ></LoadingBox>}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                    </li>

                    <li>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}></input>
                    </li>

                    <li>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
                    </li>

                <li>
                <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}></input>
                </li>

                <li>
                <label htmlFor="rePassword">Confirm Password</label>
                    <input type="Password" id="rePassword" name="rePassword" onChange={(e) => setRePassword(e.target.value)}></input>
                </li>


                <li>
                    <button type="submit" className="button primary">Register</button>
                </li>
                
                <li>
                    Already have an account? <Link to= "/signin"  >Sign-In</Link>
                </li>


            </ul>

        </form>
    </div>
}


export default RegisterScreen;