import React, { useEffect, useState } from 'react';
import '../index.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {signin} from '../actions/userActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';


function SigninScreen(props){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
    const dispatch = useDispatch();

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
          }
    
        return () => {
          //
        };
      }, [userInfo])

    // //console.log(User);
    // //console.log("hello");
    
   
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email,password));
    
      }

      const showPassword = () => {

        var x = document.getElementById("password");
        if (x.type === "password") {
        x.type = "text";
        } else {
        x.type = "password";
    }
        
      }



    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className = "form-container">
                <li>
                    <h2> Sign-In</h2>
                    <li>
                    {loading && <LoadingBox></LoadingBox>}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                    </li>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name="email" id="email" required onChange={(e) => setEmail(e.target.value)}></input>
                </li>

                <li>
                <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)}></input>
                    <p>Show Password <input type="checkbox" className="checkbox" onClick={() => showPassword()}/></p>
                    
                </li>

                <li>
                    <button type="submit" className="button primary">Sign In</button>
                </li>
                

                <li>
                    <Link to="/reset-password" className=" primary forgot">Forgot Paasword <i class="fa fa-key"></i></Link>
                </li>

                <li>
                    Don't have a account?
                </li>

                <li>
                <button><Link to={redirect === "/" ? "register" : "register?redirect=" + redirect} className="primary">Create your AtranZ account</Link></button>
                </li>


            </ul>

        </form>
    </div>
}


export default SigninScreen;