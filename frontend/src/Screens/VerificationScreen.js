import React, { useEffect} from 'react';
import '../index.css';
import { useDispatch, useSelector } from 'react-redux';
import {verifyflagchange, verifyMail} from '../actions/userActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';


function VerifyMailScreen(props){

    const userEmailVerify = useSelector(state => state.userEmailVerify);
    const { loading, error, verifyflag } = userEmailVerify;
    const dispatch = useDispatch();

    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(verifyMail(props.match.params.id));

      }

      useEffect(() => {
        if (verifyflag) {
        alert("Your Email Verified Successfully :)")
        dispatch(verifyflagchange());
        props.history.push("/signin");
        }
      }, [verifyflag]);


    return <div className="form">
            <ul>
                    <li>
                        Just one step away :)
                    </li>


                    <li>
                    {loading && <LoadingBox></LoadingBox>}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                    {verifyflag && <MessageBox variant="success">Your Email Verified Successfully</MessageBox>}
                    </li>

                    <li>
                    <form onSubmit={submitHandler}>
                        <button className="cart-button" type="submit">Click here to Verify Your Account</button>
                    </form>
 
                    </li>
            </ul>
                    
    </div>
}


export default VerifyMailScreen;