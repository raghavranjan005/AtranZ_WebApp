import { USER_CART_SAVE_PAYMENT,USER_CART_SAVE_SHIPPING,USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_RESET_REQUEST, USER_RESET_SUCCESS, USER_RESET_FAIL, USER_RESET_LINK_REQUEST, USER_RESET_LINK_SUCCESS, USER_RESET_LINK_FAIL,USER_ADD_TO_CART_FAIL,USER_ADD_TO_CART_SUCCESS,USER_ADD_TO_CART_REQUEST,USER_UPDATE_CART_REQUEST,USER_UPDATE_CART_SUCCESS,USER_UPDATE_CART_FAIL,USER_DELETE_FROM_CART_SUCCESS,USER_DELETE_FROM_CART_REQUEST,USER_DELETE_FROM_CART_FAIL,USER_CARTITEMS_REQUEST,USER_CARTITEMS_SUCCESS,USER_CARTITEMS_FAIL } from "../constants/userConstants";

function userSigninReducer(state = {}, action) {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default: return state;
  }
}

function userResetPasswordReducer(state = {}, action) {
  switch (action.type) {
    case USER_RESET_REQUEST:
      return { loading: true };
    case USER_RESET_SUCCESS :
      return { loading: false, userInfo: action.payload };
    case USER_RESET_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function userResetPasswordLinkReducer(state = {}, action) {
  switch (action.type) {
    case USER_RESET_LINK_REQUEST:
      return { loading: true };
    case USER_RESET_LINK_SUCCESS :
      return { loading: false, userInfo: action.payload };
    case USER_RESET_LINK_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function userUpdateReducer(state = {}, action) {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function userRegisterReducer(state = {}, action) {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function userAddToCartReducer (state = { },action)
{
  switch (action.type){
    case USER_ADD_TO_CART_REQUEST:
      return {loading:true};
    case USER_ADD_TO_CART_SUCCESS:
      return {loading:false,cartItems: action.payload};
    case USER_ADD_TO_CART_FAIL:
      return {loading:false, error: action.payload};
    default: return state;
  }
}

function userUpdateCartReducer (state = { },action)
{
  switch (action.type){
    case USER_UPDATE_CART_REQUEST:
      return {loading:true};
    case USER_UPDATE_CART_SUCCESS:
      return {loading:false,cartItems: action.payload};
    case USER_UPDATE_CART_FAIL:
      return {loading:false, error: action.payload};
    default: return state;
  }
}

function userDeleteFromCartReducer (state = { },action)
{
  switch (action.type){
    case USER_DELETE_FROM_CART_REQUEST:
      return {loading:true};
    case USER_DELETE_FROM_CART_SUCCESS:
      return {loading:false,cartItems: action.payload};
    case USER_DELETE_FROM_CART_FAIL:
      return {loading:false, error: action.payload};
    default: return state;
  }
}

function userCartItemsListReducer (state={ cartItems:[], shipping: {}, payment: {} } ,action)
{
  switch (action.type){
    case USER_CARTITEMS_REQUEST:
      return {loading:true};
    case USER_CARTITEMS_SUCCESS:
      console.log(action.payload);
      return {loading:false, cartItems:action.payload};
    case USER_CARTITEMS_FAIL:
      return {loading:false,error:action.payload};
    case USER_CART_SAVE_SHIPPING:
      return { ...state, shipping: action.payload };
    case USER_CART_SAVE_PAYMENT:
      return { ...state, payment: action.payload };
    default: return state;
  }
}
export {
  userSigninReducer, userRegisterReducer, userUpdateReducer, userResetPasswordReducer, userResetPasswordLinkReducer,userDeleteFromCartReducer,userAddToCartReducer,userUpdateCartReducer,userCartItemsListReducer,
}