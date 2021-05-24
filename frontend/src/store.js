import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import {
  productListReducer,
  productDetailsReducer,
  productSaveReducer,
  productDeleteReducer,
  productReviewSaveReducer,
  productCategoryListReducer,
  normalProductListReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {
  userSigninReducer,
  userRegisterReducer,
  userUpdateReducer,
  userResetPasswordReducer,
  userResetPasswordLinkReducer,
  userCartItemsListReducer,
  userUpdateCartReducer,
  userAddToCartReducer,
  userDeleteFromCartReducer,
  userEmailVerifyReducer,
  userEmptyCartReducer,
  userNormalEmptyCartReducer,
} from './reducers/userReducers';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  myOrderListReducer,
  orderListReducer,
  orderDeleteReducer,
  deliveryStatusReducer,
} from './reducers/orderReducers';

const userInfo = Cookie.getJSON('userInfo') || null;
const cartItems = [];
const initialState = {
  cart: { cartItems, shipping: {}, payment: {} },
  userSignin: { userInfo },
};
const reducer = combineReducers({
  normalProductList :normalProductListReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  productSave: productSaveReducer,
  productDelete: productDeleteReducer,
  productReviewSave: productReviewSaveReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  userUpdate: userUpdateReducer,
  myOrderList: myOrderListReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  resetPassword: userResetPasswordReducer,
  resetPasswordLink: userResetPasswordLinkReducer,
  cartList : userCartItemsListReducer,
  addToCart: userAddToCartReducer,
  deleteFromCart: userDeleteFromCartReducer,
  updateCart: userUpdateCartReducer,
  productCategoryList: productCategoryListReducer,
  userEmailVerify: userEmailVerifyReducer,
  userEmptyCart:userEmptyCartReducer,
  userNormalEmptyCart:userNormalEmptyCartReducer,
  deliveryStatus:deliveryStatusReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
