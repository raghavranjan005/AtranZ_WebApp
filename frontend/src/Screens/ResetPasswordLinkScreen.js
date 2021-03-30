import React, { useEffect, useState } from 'react';
import '../index.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {resetpasswordlink} from '../actions/userActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';


function ResetPasswordLinkScreen(props){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const resetPasswordLink = useSelector(state => state.resetPasswordLink);
    const { loading, userInfo, error } = resetPasswordLink;
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (userInfo) {
            // props.history.push("/");
          }
    
        return () => {
          //
        };
      }, [userInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(resetpasswordlink(email, password, props.match.params.id));
    
      }

    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className = "form-container">
                <li>
                    <h2> Reset Password</h2>
                    <li>
                    {loading && <LoadingBox></LoadingBox>}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                    {userInfo && <MessageBox variant="success">Password Reset Successful</MessageBox> }
                    </li>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
                </li>
                
                <li>
                <label htmlFor="password">New Password</label>
                    <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}></input>
                </li>

                <li>
                    <button type="submit" className="button primary">Reset Password</button>
                </li>
            </ul>

        </form>
    </div>
}


export default ResetPasswordLinkScreen;