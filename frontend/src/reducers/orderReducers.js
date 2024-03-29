import {
  ORDER_CHANGE_SUCCESS,
  ORDER_CANCELLATION_REQUEST, ORDER_CANCELLATION_SUCCESS, ORDER_CANCELLATION_FAIL,
  ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL,
  MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL, DELIVERY_STATUS_CHANGE_SUCCESS, DELIVERY_STATUS_CHANGE_REQUEST, DELIVERY_STATUS_CHANGE_FAIL, ADD_COUPON_REQUEST, ADD_COUPON_SUCCESS, ADD_COUPON_FAIL
} from "../constants/orderConstants";


function orderCreateReducer(state = {}, action) {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, order: action.payload, success: true };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_CHANGE_SUCCESS:
      return {success:action.payload};
    default: return state;
  }
}


function orderDetailsReducer(state = {
  order: {
    orderItems: [],
    shipping: {},
    payment: {}
  }
}, action) {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}


function myOrderListReducer(state = {
  orders: []
}, action) {
  switch (action.type) {
    case MY_ORDER_LIST_REQUEST:
      return { loading: true };
    case MY_ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case MY_ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function orderListReducer(state = {
  orders: []
}, action) {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true };
    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function orderPayReducer(state = {
  order: {
    orderItems: [],
    shipping: {},
    payment: {},
  }
}, action) {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };
    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true };
    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function orderDeleteReducer(state = {
  order: {
    orderItems: [],
    shipping: {},
    payment: {}
  }
}, action) {
  switch (action.type) {
    case ORDER_DELETE_REQUEST:
      return { loading: true };
    case ORDER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ORDER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function deliveryStatusReducer(state = {
  isDelivered:false, deliveryStatus:''
}, action) {
  switch (action.type) {
    case DELIVERY_STATUS_CHANGE_REQUEST:
      return { loading: true };
    case DELIVERY_STATUS_CHANGE_SUCCESS:
      return { loading: false, success: true };
    case DELIVERY_STATUS_CHANGE_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}


function addCouponReducer(state = {}, action) {
  switch (action.type) {
    case ADD_COUPON_REQUEST:
      return { loading: true };
    case ADD_COUPON_SUCCESS:
      return { loading: false, success: true };
    case ADD_COUPON_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function orderCancellationReducer(state = {}, action) {
  switch (action.type) {
    case ORDER_CANCELLATION_REQUEST:
      return { loading: true };
    case ORDER_CANCELLATION_SUCCESS:
      return { loading: false, success: action.payload };
    case ORDER_CANCELLATION_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}





export {
  orderCreateReducer, orderDetailsReducer,orderCancellationReducer,
  orderPayReducer, myOrderListReducer, orderListReducer, orderDeleteReducer,deliveryStatusReducer,addCouponReducer
}