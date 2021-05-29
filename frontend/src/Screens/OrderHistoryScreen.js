import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { logout, update } from '../actions/userActions';
import { listMyOrders , deleteOrder,orderCancellation} from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function OrderHistoryScreen(props) {

  const [cancellationRequest, setCancellationRequest] = useState(false);
  const [cancellationReason, setCancellationReason] = useState('choose any one reason');
  const [orderId, setOrderId] = useState(''); 

  const dispatch = useDispatch();

  const orderDelete = useSelector(state => state.orderDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;

  const orderCancel = useSelector(state => state.orderCancel);
  const { loading: loadingOrderCancel, success: successOrderCancel, error: errorOrderCancel } = orderCancel;

  const deleteHandler = (order) => {
    if (window.confirm('Are you sure to delete?')) {
    dispatch(deleteOrder(order._id));}
  }
  const myOrderList = useSelector(state => state.myOrderList);
  const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;
  
  useEffect(() => {
    if(successOrderCancel)
    closeForm2(); 
    dispatch(listMyOrders());
    return () => {
      //
    };
  },[successDelete,successOrderCancel])

  function getIST(dateStr) {
    var theDate = new Date(Date.parse(
      dateStr));

      var IST = theDate.toLocaleString();
      return IST;
    
  }

  // const openForm = () => {
  //   document.getElementById("myForm").style.display = "block";
  // }

  // const closeForm = () => {
  //   document.getElementById("myForm").style.display = "none";
  // }




  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   ////console.log("hehe");
  //   ////console.log(couponUsers);
  //   dispatch(addCoupon(couponCode,discount,couponUsers));
  // };

  //form 2

  const openForm2 = (id) => {
    document.getElementById("myForm2").style.display = "block";
    setOrderId(id);
    ////console.log(id);
  }

  const closeForm2 = () => {
    document.getElementById("myForm2").style.display = "none";
  }


  const submitHandler2 = (e) => {
    e.preventDefault();
    ////console.log("submitted")
    ////console.log(cancellationRequest);
    if(cancellationRequest)
    {
      dispatch(orderCancellation(cancellationRequest,cancellationReason,orderId));
    }

  };


  return (
    <BrowserRouter>
    <div className="row center large">
            <h1 className="large"><i className="fa fa-shopping-bag"></i> My Orders </h1>
        </div>
    <div className="Button-grp">
      {/* <button class="open-button-2" onClick={() => openForm2()}>Request Cancellation</button> */}
    </div>
    <div class="form-popup-2" id="myForm2">
                <ul>
              <li>
                    {loadingOrders && <LoadingBox ></LoadingBox>}
                    {errorOrders && <MessageBox variant="danger">{errorOrders}</MessageBox>}
              </li>
              </ul>
              <form  class="form-container-pop" onSubmit={submitHandler2} >
              <h1>Cancellation</h1>

              <label for="cancellationRequest"><b>cancellation Request</b></label> &nbsp;
              <input type="checkbox" id="isDelivered" value="true" placeholder = "false" onChange={(e) =>{setCancellationRequest(e.target.value)} }/>

              <br></br><br></br>
              {/* <label for="orderid"><b>orderId</b></label> &nbsp; */}
              {/* <input type="text" id="isDelivered" required onChange={(e) => setorderId(e.target.value)}/> */}
              <label for="psw"><b>Cancellation Reason</b></label>
              <br></br><br></br>
              <select
                          name="rating"
                          id="rating"
                          value={cancellationReason}
                          onChange={(e) => setCancellationReason(e.target.value)}
                        >
                          <option value="Damaged">Damaged</option>
                          <option value="Not Interested">Not Interested</option>
                          <option value="Unfit">Unfit</option>
                          <option value="Bad Quallity">Bad Quality</option>
                          <option value="Other">Other</option>

              </select>
              <br></br><br></br>
              <label for="psw"><b>Other</b></label>
              <br></br><br></br>
              <textarea placeholder="" rows="4" cols="27" id="DeliveryStatus"  onChange={(e) => {setCancellationReason(e.target.value)}} />
             
              <button type="submit" class="btn">Submit</button>
              <button type="button" class="btn cancel" onClick={() => closeForm2()}>Close Form</button>
              
              </form>
      </div>
    <br></br>
    <br></br>
    <br></br>
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
                  <th>DELIVERY</th>
                  <th>CANCELLATION</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order =><tr key={order._id}> 

                  <td>{order._id}</td>
                {/* <td>{order.createdAt.substring(0, 10)}</td> */}
                <td>{getIST(order.createdAt)}</td>
                <td>&#8377;{order.totalPrice.toFixed(2)}</td>
                
                {order.isPaid?<td><i className="fa fa-check"></i>{getIST(order.paidAt)}</td>:<td><i className="fa fa-times wrong"></i></td>} 
                {order.isDelivered?<td><i className="fa fa-check"></i>{getIST(order.deliveredAt)}</td>
              :
              <td><i className="fa fa-times wrong"></i></td>}

              {order.isReturned?<td><button className="returned"> Returned </button></td>:
              order.isCancelled?<td><button className="cancelled">Cancelled</button></td>:
              order.cancellationRequest?<td><button className="request">Requested</button></td>:<td></td>}
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
                    <i className='fa fa-trash  trash'></i>
                    </button>}
                    <button class="open-button-4" onClick={() => openForm2(order._id)}>Request<br></br> Cancellation</button>
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