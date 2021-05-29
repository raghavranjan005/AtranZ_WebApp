import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder, addCoupon} from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {deliveryStatus} from '../actions/orderActions'
import getIST from '../components/getIST';

function OrdersScreen(props) {
  const orderList = useSelector(state => state.orderList);
  const { loading, orders, error } = orderList;

  const orderDelete = useSelector(state => state.orderDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;

  const Deliverystatus = useSelector(state => state.deliveryStatus);
  const { loading: loadingdeliveryStatus, success: successdeliveryStatus, error: errordeliveryStatus } = Deliverystatus;

  const AddCoupon = useSelector(state => state.addCoupon);
  const { loading: loadingAddCoupon, success: successAddCoupon, error: errorAddCoupon } = AddCoupon;


  const [isDelivered, setIsDelivered] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isReturned, setIsReturned] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [DeliveryStatus, setDeliveryStatus] = useState('');
  const [orderId, setOrderId] = useState('');

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [couponUsers, setCouponUsers] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders());
    return () => {
      //
    };
  }, [successDelete,successdeliveryStatus,successAddCoupon]);

  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
  }

  function addToArray(){
    couponUsers.push(document.getElementById("couponUsers").value);
    document.getElementById("couponUsers").value = "";
  }

  const openForm = () => {
    document.getElementById("myForm").style.display = "block";

  }

  const closeForm = () => {
    document.getElementById("myForm").style.display = "none";
  }

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("hehe");
    console.log(couponUsers);
    dispatch(addCoupon(couponCode,discount,couponUsers));
  };

  //form 2

  const openForm2 = (id) => {
    document.getElementById("myForm2").style.display = "block";
    setOrderId(id);
  }

  const closeForm2 = () => {
    document.getElementById("myForm2").style.display = "none";
  }


  const submitHandler2 = (e) => {
    e.preventDefault();
    console.log("submitted")
    console.log(isDelivered,isCancelled,isReturned,isPaid,DeliveryStatus,orderId);
    dispatch(deliveryStatus(isDelivered,isCancelled,isReturned,isPaid,DeliveryStatus,orderId));
  };



  return (loading || loadingDelete)? <LoadingBox></LoadingBox> :
    <div className="content content-margined">
     <h1 className="heading">ADMIN PANEL</h1>

      <div className="order-header">
        <h3>Orders</h3>
      </div>

        <div className="Button-grp">
      <button class="open-button" onClick={() => openForm()}>Set Coupons</button>
      </div>
              
              <div class="form-popup" id="myForm">
                <ul>
              <li>
                    {loading && <LoadingBox ></LoadingBox>}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
              </li>
              </ul>
              <form  class="form-container-pop" onSubmit={submitHandler} >
              <h1>Add Coupons</h1>

              <label for="couponCode"><b>Coupon Code</b></label> &nbsp;
              <input type="text" id="couponCode" onChange={(e) =>setCouponCode(e.target.value) }/>

              <br></br><br></br>
              <label for="discount"><b>Discount amount</b></label> &nbsp;
              <input type="number" id="discount" onChange={(e) => setDiscount(e.target.value)}/>
              <br></br><br></br>
              <label for="couponUsers"><b>Add Email Id of users</b></label>
              <input  id="couponUsers"/> &nbsp;
              <button type="button" onClick={() => addToArray()}>Add</button>
              <br></br><br></br>

              <button type="submit" class="btn">Submit</button>
              <button type="button" class="btn cancel" onClick={() => closeForm()}>Close Form</button>

              </form>
      </div>





              <div class="form-popup-2" id="myForm2">
                <ul>
              <li>
                    {loading && <LoadingBox ></LoadingBox>}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
              </li>
              </ul>
              <form  class="form-container-pop" onSubmit={submitHandler2} >
              <h1>Order Actions</h1>

              <label for="deliveryStatus"><b>isDelivered</b></label> &nbsp;
              <input type="checkbox" id="isDelivered" value={isDelivered} onChange={() =>{setIsDelivered(!isDelivered)} }/>

              <br></br><br></br>

              <label for="deliveryStatus"><b>isCancelled</b></label> &nbsp;
              <input type="checkbox" id="isDelivered" value={isCancelled} onChange={() =>{setIsCancelled(!isCancelled)} }/>

              <br></br><br></br>

              <label for="deliveryStatus"><b>isReturned</b></label> &nbsp;
              <input type="checkbox" id="isDelivered" value={isReturned} onChange={() =>{setIsReturned(!isReturned)} }/>
              
              <br></br><br></br>

              <label for="deliveryStatus"><b>isPaid</b></label> &nbsp;
              <input type="checkbox" id="isDelivered" value={isPaid} onChange={() =>{setIsPaid(!isPaid)} }/>
              <br></br><br></br>
              {/* <label for="orderid"><b>orderId</b></label> &nbsp;
              <input type="text" id="isDelivered" onChange={(e) => setorderId(e.target.value)}/> */}
              
              <label for="psw"><b>Current Status</b></label>
              <textarea placeholder="Current Delivery status with address" rows="4" cols="27" id="DeliveryStatus" required onChange={(e) => {setDeliveryStatus(e.target.value)}} />

              <button type="submit" class="btn">Submit</button>
              <button type="button" class="btn cancel" onClick={() => closeForm2()}>Close Form</button>

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
              <th>PAYMENT</th>
              <th>DELIVERY</th>
              <th>CANCELLATION</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => ( order.user?(<tr key={order._id}>
              <td>{order._id}</td>
              <td>{getIST(order.createdAt)}</td>
              <td>{order.totalPrice}</td>
              <td>{order.user.name}</td>
              {order.isPaid?<td><i className="fa fa-check"></i>{getIST(order.paidAt)}</td>:<td><i className="fa fa-times wrong"></i></td>} 
              {order.isDelivered?<td><i className="fa fa-check"></i>{getIST(order.deliveredAt)}</td>
              :
              <td><i className="fa fa-times wrong"></i></td>} 
             {order.isReturned?<td><button className="returned"> Returned </button></td>:
              order.isCancelled?<td><button className="cancelled">Cancelled</button></td>:
              order.cancellationRequest?<td><button className="request">Requested</button></td>:<td></td>}
              <td>
              <button class="open-button-2" onClick={() => openForm2(order._id)}>Set Order Status</button>
                &nbsp;
              <button
                    type="button"
                    className="small"
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}
                  > 
                 <i className='fa fa-eye eye'></i>
                  </button>
                  &nbsp;
                <button type="button" className="small delete-button" onClick={() => deleteHandler(order)}>
                    <i className='fa fa-trash  trash'></i>
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