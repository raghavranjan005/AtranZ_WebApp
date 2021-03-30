import Axios from "axios";
import axios from 'axios';
import Cookie from 'js-cookie';
import {
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL, USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_RESET_REQUEST, USER_RESET_SUCCESS, USER_RESET_FAIL, USER_RESET_LINK_REQUEST, USER_RESET_LINK_SUCCESS, USER_RESET_LINK_FAIL
} from "../constants/userConstants";

const update = ({ userId, name, email, password }) => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, name, email, password } });
  try {
    const { data } = await Axios.put("/api/users/" + userId,
      { name, email, password }, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
  }
}

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post("/api/users/signin", { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message, });
  }
}



  const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post('/api/users/register', {
      name,
      email,
      password,
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


const resetpassword = (email) => async (dispatch) => {
  dispatch({ type: USER_RESET_REQUEST, payload: { email} });
  try {
    const { data } = await Axios.post("/api/users/reset-password", { email});
    dispatch({ type: USER_RESET_SUCCESS, payload: data });
    Cookie.set('user', JSON.stringify(data));
    
  } catch (error) {
    dispatch({ type: USER_RESET_FAIL, payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message, });
  }
};

const resetpasswordlink = (email, password, id) => async (dispatch, getState) => {
  dispatch({ type: USER_RESET_LINK_REQUEST, payload: { email, password, id} });
  try {
    const { data } = await axios.post("/api/users/resetpassword/"+id, { email, password, id});
    dispatch({ type: USER_RESET_LINK_SUCCESS, payload: data });
    console.log(data)
    Cookie.set('user', JSON.stringify(data));
    
  } catch (error) {
    dispatch({ type: USER_RESET_LINK_FAIL, payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message, });
  }
}


// const update = ({ userId, name, email, password }) => async (dispatch, getState) => {
//   const { userSignin: { userInfo } } = getState();
//   dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, name, email, password } });
//   try {
//     const { data } = await Axios.put("/api/users/" + userId,
//       { name, email, password }, {
//       headers: {
//         Authorization: 'Bearer ' + userInfo.token
//       }
//     });
//     dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
//     Cookie.set('userInfo', JSON.stringify(data));
//   } catch (error) {
//     dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
//   }
// }



const logout = () => (dispatch) => {
  Cookie.remove("userInfo");
  dispatch({ type: USER_LOGOUT })
}
export { signin, register, logout, update, resetpassword, resetpasswordlink};