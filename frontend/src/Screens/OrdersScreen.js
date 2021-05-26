import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder} from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {deliveryStatus} from '../actions/orderActions'

function OrdersScreen(props) {
  const orderList = useSelector(state => state.orderList);
  const { loading, orders, error } = orderList;

  const orderDelete = useSelector(state => state.orderDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;

  const Deliverystatus = useSelector(state => state.deliveryStatus);
  const { loading: loadingdeliveryStatus, success: successdeliveryStatus, error: errordeliveryStatus } = Deliverystatus;



  const [isDelivered, setIsDelivered] = useState(false);
  const [DeliveryStatus, setDeliveryStatus] = useState('');
  const [orderId, setorderId] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders());
    return () => {
      //
    };
  }, [successDelete,successdeliveryStatus]);

  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
  }

  const openForm = () => {
    document.getElementById("myForm").style.display = "block";
  }

  const closeForm = () => {
    document.getElementById("myForm").style.display = "none";
  }


  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submitted")
    dispatch(deliveryStatus(isDelivered,DeliveryStatus,orderId));
  };


  return (loading || loadingDelete)? <LoadingBox></LoadingBox> :
    <div className="content content-margined">

      <div className="order-header">
        <h3>Orders</h3>
      </div>
                      
      <button class="open-button" onClick={() => openForm()}>Set Delivery Status</button>
              
              <div class="form-popup" id="myForm">
                <ul>
              <li>
                    {loading && <LoadingBox ></LoadingBox>}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
              </li>
              </ul>
              <form  class="form-container-pop" onSubmit={submitHandler} >
              <h1>Delivery Status</h1>

              <label for="deliveryStatus"><b>isDelivered</b></label> &nbsp;
              <input type="checkbox" id="isDelivered" value="true" onChange={(e) =>{setIsDelivered(e.target.value)} }/>

              <br></br><br></br>
              <label for="orderid"><b>orderId</b></label> &nbsp;
              <input type="text" id="isDelivered" onChange={(e) => setorderId(e.target.value)}/>
              
              <label for="psw"><b>Current Status</b></label>
              <textarea placeholder="Current Delivery status with address" rows="4" cols="27" id="DeliveryStatus" required onChange={(e) => {setDeliveryStatus(e.target.value)}} />
             
              <button type="submit" class="btn">Submit</button>
              <button type="button" class="btn cancel" onClick={() => closeForm()}>Close Form</button>
              
              </form>
      </div>
      <div className="order-list">

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>USER</th>
              <th>PAID</th>
              <th>PAID AT</th>
              <th>DELIVERED</th>
              <th>DELIVERED AT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => ( order.user?(<tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.createdAt}</td>
              <td>{order.totalPrice}</td>
              <td>{order.user.name}</td>
              <td>{order.isPaid.toString()}</td>
              <td>{order.paidAt}</td>
              <td>{order.isDelivered.toString()}</td>
              <td>{order.deliveredAt}</td>
              <td>
                &nbsp;
              <button
                    type="button"
                    className="small"
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}
                  > 
                  Details
                  </button>
                  &nbsp;
                <button type="button" className="small delete-button" onClick={() => deleteHandler(order)}>
                    <i className='fa fa-trash  trash'></i>&thinsp;
                        Delete
                    </button>

              
              </td>
            
            </tr>):
            <LoadingBox></LoadingBox>))
            }

          </tbody>
        </table>

      </div>
    </div>
}
export default OrdersScreen;