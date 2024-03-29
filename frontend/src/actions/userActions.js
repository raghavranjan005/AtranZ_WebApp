import Axios from "axios";
import axios from 'axios';
import Cookie from 'js-cookie';
import { REMOVE_DISCOUNT_SUCCESS } from "../constants/orderConstants";
import {USER_EMPTY_CART_FAIL,USER_EMPTY_CART_SUCCESS,USER_EMPTY_CART_REQUEST,USER_NORMAL_EMPTY_CART_FAIL,
  USER_NORMAL_EMPTY_CART_SUCCESS,USER_NORMAL_EMPTY_CART_REQUEST,
  USER_CART_SAVE_SHIPPING,USER_CART_SAVE_PAYMENT,
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL, USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_RESET_REQUEST, USER_RESET_SUCCESS, USER_RESET_FAIL, USER_RESET_LINK_REQUEST, USER_RESET_LINK_SUCCESS, USER_RESET_LINK_FAIL, USER_ADD_TO_CART_REQUEST,
  USER_ADD_TO_CART_SUCCESS,USER_ADD_TO_CART_FAIL,USER_DELETE_FROM_CART_REQUEST,USER_DELETE_FROM_CART_SUCCESS,
  USER_DELETE_FROM_CART_FAIL,USER_UPDATE_CART_REQUEST,USER_UPDATE_CART_SUCCESS,USER_UPDATE_CART_FAIL,
   USER_CARTITEMS_REQUEST, USER_CARTITEMS_SUCCESS, USER_CARTITEMS_FAIL, USER_FLAG_CHANGE, USER_VERIFICATION_REQUEST,
    USER_VERIFICATION_SUCCESS, USER_VERIFICATION_FAIL, USER_VERIFY_FLAG_CHANGE, APPLY_COUPON_REQUEST, APPLY_COUPON_SUCCESS,
     APPLY_COUPON_FAIL
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
    const { data } = await Axios.post("/api/users/signin", { email, password});
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message, });
  }
}



  const register = (name, email, password, mobile) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post('/api/users/register', {
      name,
      email,
      password,
      mobile,
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    // dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    // // Cookie.set('userInfo', JSON.stringify(data));
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


const flagchange = () => async(dispatch) => {
  dispatch({ type: USER_FLAG_CHANGE, payload:false});
}

const verifyflagchange = () => async(dispatch) => {
  dispatch({ type: USER_VERIFY_FLAG_CHANGE, payload:false});
}

const verifyMail = (id) => async (dispatch, getState) => {
  dispatch({ type: USER_VERIFICATION_REQUEST});
  try {
      const {data} = await axios.get("/api/users/verifyemail/"+id);
    dispatch({ type: USER_VERIFICATION_SUCCESS , payload:data });
  } catch (error) {
    dispatch({ type: USER_VERIFICATION_FAIL, payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message, });
  }
}
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
    Cookie.set('user', JSON.stringify(data));
    
  } catch (error) {
    dispatch({ type: USER_RESET_LINK_FAIL, payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message, });
  }
}

const addToCart = (productId,qty,id,flag) =>async (dispatch,getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch ({type : USER_ADD_TO_CART_REQUEST });
  try 
  {
    const {cartItems} = await axios.post("/api/users/cart",{productId,qty,id},{
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    console.log("add to cart action");
    dispatch({type:USER_ADD_TO_CART_SUCCESS, payload:cartItems});
    dispatch({type:USER_CARTITEMS_SUCCESS,payload:cartItems.data});
  }
  catch(error)
  {
    dispatch({type:USER_ADD_TO_CART_FAIL,payload:error.response && error.response.data.message
      ? error.response.data.message
      : error.message,})
  }
}

const updateCart = (productId,qty,id) => async (dispatch,getState)=>{
  const { userSignin: { userInfo } } = getState();
  dispatch ({type:USER_UPDATE_CART_REQUEST});
  try {
    const cartItems = await axios.put("/api/users/updateCart",{productId,qty,id},{
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    dispatch({type:USER_UPDATE_CART_SUCCESS,payload:cartItems});
  } catch (error) {
    dispatch({type:USER_UPDATE_CART_FAIL,payload:error.response && error.response.data.message
      ? error.response.data.message
      : error.message,})
  }
} 


const deleteFromCart = (productId) => async (dispatch,getState)=>{
  dispatch ({type:USER_DELETE_FROM_CART_REQUEST});
  try {
    const { userSignin: { userInfo } } = getState();
    const cartItems = await axios.delete("/api/users/deleteCart",{
      headers:
        { Authorization: 'Bearer ' + userInfo.token },
        data: {
          productId: productId
        }
    });
    dispatch({type:USER_DELETE_FROM_CART_SUCCESS,payload:cartItems});
    dispatch({type:USER_CARTITEMS_SUCCESS,payload:cartItems.data});
  } catch (error) {
    dispatch({type:USER_DELETE_FROM_CART_FAIL,payload:error.response && error.response.data.message
      ? error.response.data.message
      : error.message,})
  }
}

const emptyCart = () => async (dispatch,getState)=>{
  dispatch ({type:USER_EMPTY_CART_REQUEST});
  try {
    const { userSignin: { userInfo } } = getState();
    const cartItems = await axios.delete("/api/users/emptyCart",{
      headers:
        { Authorization: 'Bearer ' + userInfo.token },
    });
    dispatch({type:USER_EMPTY_CART_SUCCESS,payload:cartItems});
  } catch (error) {
    dispatch({type:USER_EMPTY_CART_FAIL,payload:error.response && error.response.data.message
      ? error.response.data.message
      : error.message,})
  }
}

const normalEmptyCart = () => async (dispatch,getState)=>{
  dispatch ({type:USER_NORMAL_EMPTY_CART_REQUEST});
  try {
    const { userSignin: { userInfo } } = getState();
    const cartItems = await axios.delete("/api/users/normalEmptyCart",{
      headers:
        { Authorization: 'Bearer ' + userInfo.token },
    });
    dispatch({type:USER_NORMAL_EMPTY_CART_SUCCESS,payload:cartItems});
  } catch (error) {
    dispatch({type:USER_NORMAL_EMPTY_CART_FAIL,payload:error.response && error.response.data.message
      ? error.response.data.message
      : error.message,})
  }
}

const cartItemsList = () => async (dispatch,getState) =>{
  dispatch({type:USER_CARTITEMS_REQUEST});
  try {
    const { userSignin: { userInfo } } = getState();
    const {data}  = await Axios.get("/api/users/cart",
    { 
      headers:
      { Authorization: 'Bearer ' + userInfo.token }
});
    dispatch({type:USER_CARTITEMS_SUCCESS,payload:data});
    
  } catch (error) {
    dispatch({type:USER_CARTITEMS_FAIL,payload:error.response && error.response.data.message
      ? error.response.data.message
      : error.message,})
  }
}

const userSaveShipping = (data) => (dispatch) => {
  dispatch({ type: USER_CART_SAVE_SHIPPING, payload: data });
  

}
const userSavePayment = (data) => (dispatch) => {
  dispatch({ type: USER_CART_SAVE_PAYMENT, payload: data });
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



const applyCoupon = (couponCode) => async (dispatch, getState) => {
  try {
    dispatch({ type: APPLY_COUPON_REQUEST });
    const { userSignin: { userInfo } } = getState();
    const { data } = await Axios.post("/api/users/applycoupon", {couponCode},{
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    dispatch({ type: APPLY_COUPON_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: APPLY_COUPON_FAIL, payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message, });
  }
}

const removeDiscount = () => (dispatch) => {
  dispatch({type:REMOVE_DISCOUNT_SUCCESS});
}

const logout = () => (dispatch) => {
  Cookie.remove("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({type:REMOVE_DISCOUNT_SUCCESS});
}
export { emptyCart,signin,normalEmptyCart, register, logout,verifyflagchange, update,verifyMail,
   resetpassword, resetpasswordlink,addToCart,deleteFromCart,updateCart,cartItemsList,userSaveShipping,
   userSavePayment, flagchange, applyCoupon, removeDiscount};