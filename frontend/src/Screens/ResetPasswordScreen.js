import React, { useEffect, useState } from 'react';
import '../index.css';
import { useDispatch, useSelector } from 'react-redux';
import {resetpassword} from '../actions/userActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';


function ResetPasswordScreen(props){

    const [email, setEmail] = useState('');
    const resetPassword = useSelector(state => state.resetPassword);
    const { loading, userInfo, error } = resetPassword;
    if(userInfo)
    {
        //console.log("hehe");
    }
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
        dispatch(resetpassword(email));
    
      }

    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className = "form-container">
                <li>
                    <h2> Reset Password</h2>
                    <li>
                    {loading && <LoadingBox></LoadingBox>}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                    {userInfo && <MessageBox variant="success">Reset-Link sent</MessageBox> }
                    </li>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
                </li>

                <li>
                    <button type="submit" className="button primary">Reset Password</button>
                </li>
            </ul>

        </form>
    </div>
}


export default ResetPasswordScreen;