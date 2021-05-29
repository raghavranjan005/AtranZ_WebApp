import Axios from "axios";
import {
  ORDER_CANCELLATION_REQUEST, ORDER_CANCELLATION_SUCCESS, ORDER_CANCELLATION_FAIL,
  ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL,ORDER_CHANGE_SUCCESS,
  ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL, DELIVERY_STATUS_CHANGE_REQUEST, DELIVERY_STATUS_CHANGE_SUCCESS, DELIVERY_STATUS_CHANGE_FAIL, ADD_COUPON_REQUEST, ADD_COUPON_SUCCESS, ADD_COUPON_FAIL
} from "../constants/orderConstants";

const createOrder = (order) => async (dispatch, getState) => {
  try {
    console.log("create order");
    console.log(order);
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    const { userSignin: { userInfo } } = getState();
    const { data: { data: newOrder } } = await Axios.post("/api/orders", order, {
      headers: {
        Authorization: ' Bearer ' + userInfo.token
      }
    });
    console.log("order created");
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
  }
}

const changeSucess = () =>(dispatch)=>{
  dispatch({type:ORDER_CHANGE_SUCCESS,payload:false});
}

const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_ORDER_LIST_REQUEST });
    const { userSignin: { userInfo } } = getState();
    const { data } = await Axios.get("/api/orders/mine", {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: MY_ORDER_LIST_FAIL, payload: error.message });
  }
}

const listOrders = () => async (dispatch, getState) => {

  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    const { userSignin: { userInfo } } = getState();
    const { data } = await Axios.get("/api/orders", {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_LIST_FAIL, payload: error.message });
  }
}

const detailsOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    const { userSignin: { userInfo } } = getState();
    const { data } = await Axios.get("/api/orders/" + orderId, {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_DETAILS_FAIL, payload: error.message });
  }
}

const payOrder = (order, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST, payload: paymentResult });
    const { userSignin: { userInfo } } = getState();
    const { data } = await Axios.put("/api/orders/" + order._id + "/pay", paymentResult, {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_PAY_FAIL, payload: error.message });
  }
}

const deleteOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
    const { userSignin: { userInfo } } = getState();
    const { data } = await Axios.delete("/api/orders/" + orderId, {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    dispatch({ type: ORDER_DELETE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_DELETE_FAIL, payload: error.message });
  }
}

const deliveryStatus = (isDelivered,isCancelled,isReturned,isPaid,DeliveryStatus,orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELIVERY_STATUS_CHANGE_REQUEST });
    const { userSignin: { userInfo } } = getState();
    console.log("status action")
    console.log(userInfo)
    const { data } = await Axios.put("/api/orders", {isDelivered,isCancelled,isReturned,isPaid,DeliveryStatus,orderId},{
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    console.log("status success")
    dispatch({ type: DELIVERY_STATUS_CHANGE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: DELIVERY_STATUS_CHANGE_FAIL, payload: error.message });
  }
}

const orderCancellation = (cancellationRequest,cancellationReason,orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CANCELLATION_REQUEST });
    const { userSignin: { userInfo } } = getState();
    console.log("order cancellation action")
    console.log(userInfo)
    const { data } = await Axios.post("/api/orders/ordercancel", {cancellationRequest,cancellationReason,orderId},{
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    console.log("order cancellation success")
    dispatch({ type: ORDER_CANCELLATION_SUCCESS, payload: true })
  } catch (error) {
    dispatch({ type: ORDER_CANCELLATION_FAIL, payload: error.message });
  }
}



const addCoupon = (couponCode,discount,couponUsers) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_COUPON_REQUEST });
    const { userSignin: { userInfo } } = getState();
    console.log("status action")
    // console.log(userInfo)
    const { data } = await Axios.post("/api/orders/addcoupon", {couponCode,discount,couponUsers},{
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    console.log("status success")
    dispatch({ type: ADD_COUPON_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ADD_COUPON_FAIL, payload: error.message });
  }
}


export { createOrder, detailsOrder, payOrder, listMyOrders, listOrders, deleteOrder, deliveryStatus,changeSucess, addCoupon,orderCancellation};
