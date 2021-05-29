import React, { useEffect, useState } from 'react';
import '../index.css';
import "react-alice-carousel/lib/alice-carousel.css";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {flagchange, register} from '../actions/userActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';


function RegisterScreen(props){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [mobile, setMobile] = useState('');
    const userRegister = useSelector(state => state.userRegister);
    const { loading, flag, error } = userRegister;

    // const redirect = props.location.search
    // ? props.location.search.split('=')[1]
    // : '/';

    const dispatch = useDispatch();
    
    useEffect(() => {
        if (flag) {
            alert("Verification Email Sent. Please verify your email")

        dispatch(flagchange());
        props.history.push("/signin");


        }
      }, [flag]);

    // //console.log(User);
    // //console.log("hello");
    
    const showPassword = (x) => {

        var x = document.getElementById("password");
        if (x.type === "password") {
        x.type = "text";
        } else {
        x.type = "password";
    }
        
    }

    const submitHandler = (e) => {
        e.preventDefault();
        
        if (password !== rePassword) {
          alert('Password and confirm password are not match');
        } else{
          dispatch(register(name, email, password,mobile));
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
                    <input type="name" name="name" id="name" required onChange={(e) => setName(e.target.value)}></input>
                    </li>

                    <li>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name="email" id="email" required onChange={(e) => setEmail(e.target.value)}></input>
                    </li>

                    <li>
                    <label htmlFor="mobile">
                       Contact Number
                    </label>
                    <input type="tel" minLength='10' maxLength='10' name="mobile" id="mobile" required onChange={(e) => setMobile(e.target.value)}></input>
                    </li>

                <li>
                <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)}></input>
                    <p>Show Password <input type="checkbox" className="checkbox" onClick={() => showPassword()}/></p>
                </li>



                <li>
                <label htmlFor="rePassword">Confirm Password</label>
                    <input type="Password" id="rePassword" name="rePassword" required onChange={(e) => setRePassword(e.target.value)}></input>
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