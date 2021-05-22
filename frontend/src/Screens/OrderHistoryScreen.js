import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { logout, update } from '../actions/userActions';
import { listMyOrders , deleteOrder} from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function OrderHistoryScreen(props) {
  const dispatch = useDispatch();

  const orderDelete = useSelector(state => state.orderDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;

  const deleteHandler = (order) => {
    if (window.confirm('Are you sure to delete?')) {
    dispatch(deleteOrder(order._id));}
  }
  const myOrderList = useSelector(state => state.myOrderList);
  const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;
  useEffect(() => {
    dispatch(listMyOrders());
    return () => {
      //
    };
  },[successDelete])

  function reformatDate(dateStr)
  {
    var dArr = dateStr.split("-");  // ex input "2010-01-18"
    return dArr[2]+ "-" +dArr[1]+ "-" +dArr[0].substring(2); //ex out: "18/01/10"
  }

  function reformatTime(dateStr)
  {
    var dArr = dateStr.split(":");  // ex input "2010-01-18"
    return dArr[2]+ ":" +dArr[1]+ ":" +dArr[0]; //ex out: "18/01/10"
  }



  return (
    <BrowserRouter>
    <div className="row center large">
            <h1 className="large"><i className="fa fa-shopping-bag"></i> My Orders </h1>
        </div>
  <div className="profile">
    <div className="profile-orders content-margined">
      {
        loadingOrders ? <LoadingBox></LoadingBox> :
          errorOrders ? <MessageBox variant="danger">{errorOrders}</MessageBox>:
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order =><tr key={order._id}> 

                  <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>&#8377;{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? (reformatDate(order.paidAt.substring(0, 10))+" " + reformatTime(order.paidAt.substring(11, 19)) + " IST") : 'No'}</td>
                <td>
                  {order.isDelivered
                    ? (reformatDate(order.deliveredAt.substring(0, 10))+" " + reformatTime(order.deliveredAt.substring(11, 19)) + " IST")
                    : 'No'}
                </td>
                <td>
                <button
                    type="button"
                    className="small"
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}
                  >
                    {order.isPaid || order.payment.paymentMethod !=="Online Payments" ? "Details" : "Complete Payment"}
                  </button>
        
                  {!order.isPaid && order.payment.paymentMethod ==="Online Payments" &&
                  <button type="button" className="small delete-button" onClick={() => deleteHandler(order)}>
                    <i className='fa fa-trash  trash'></i>&thinsp;
                        Delete
                    </button>}
                </td>
                </tr>)}
              </tbody>
            </table>
      }
    </div>
  </div>
  </BrowserRouter>
  );
}

export default OrderHistoryScreen;