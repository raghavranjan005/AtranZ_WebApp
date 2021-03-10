import React, { useEffect, useState } from 'react';
import '../index.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {signin} from '../actions/userActions';


function SigninScreen(props){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;

    const dispatch = useDispatch();

    useEffect(() => {
        if (userInfo) {
            props.history.push("/");
          }
    
        return () => {
          //
        };
      }, [userInfo])

    // console.log(User);
    // console.log("hello");
    
   
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email,password));
    
      }
    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className = "form-container">
                <li>
                    <h2> Sign-In</h2>
                    <li>
                        {loading && <div>Loading...</div>}
                        {error && <div>{error}</div>}
                    </li>
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
                    <button type="submit" className="button primary">Sign In</button>
                </li>
                
                <li>
                    Don't have a account?
                </li>

                <li>
                    <Link to= "/register" className="button secondary text-center" >Create your AtranZ account</Link>
                </li>
            </ul>

        </form>
    </div>
}


export default SigninScreen;