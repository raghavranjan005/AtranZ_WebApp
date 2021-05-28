import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {removeDiscount} from '../actions/userActions';
import {saveProductReview} from '../actions/productActions'
import { emptyCart } from '../actions/userActions';
import { detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import RazorpayButton from '../components/RazorpayButton';
import MessageBox from '../components/MessageBox';


function OrderScreen(props) {

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { loading:loadingReviewSave,success: productSaveSuccess,errorReviewSave } = productReviewSave;
  const [sdkReady, setSdkReady] = useState(false);
  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const [clientID, setClientID] = useState("hh");

  const ApplyCoupon = useSelector(state => state.applyCoupon);
  const { loading: loadingCoupon, discount:discount, error:errorCoupon } = ApplyCoupon;

  const dispatch = useDispatch();
  const [productid, setproductid] = useState('');

  useEffect(() => {
    

    
    const addRazorpaySdk = async () => {
      const result = await axios.get("/api/config/razorpay");
      const key = result.data;
      setSdkReady(true);
      setClientID(key);
    }
    addRazorpaySdk();
    if (successPay) {
      props.history.push("/orderhistory");
    } else {
      dispatch(detailsOrder(props.match.params.id));
    }
    return () => {
    };
  }, [successPay, sdkReady, clientID]);

  useEffect(() => {
      dispatch(removeDiscount());
  }, [])

  const openForm2 = (pID) => {
    setproductid(pID);
    document.getElementById("myForm2").style.display = "block";
  }

  const closeForm2 = () => {
  
    document.getElementById("myForm2").style.display = "none";
  }
  const handleSuccessPayment = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  }

  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error } = orderDetails;

  function getIST(dateStr) {
    var theDate = new Date(Date.parse(
      dateStr));

      var IST = theDate.toLocaleString();
      return IST;
    
  }

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch actions
    console.log("hello");
    console.log(productid,userInfo.name,rating,comment,userInfo._id);
    console.log("comment");
    dispatch(
      saveProductReview(productid, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
        userId:userInfo._id,
      })
    );
  };


  return loading ? <LoadingBox></LoadingBox> : error ? <MessageBox variant="danger">{error}</MessageBox> :

    <div>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>
              Shipping and Delivery
          </h3>
            <div>
              ADDRESS: <br></br>
              {order.shipping.address}, {order.shipping.city},
          {order.shipping.postalCode}, {order.shipping.country},
          </div>
          <br></br>
            <div>
              Status : &nbsp;
              {order.isDelivered ? "Delivered at " + getIST(order.deliveredAt) : order.deliveryStatus}
            </div>
          </div>
          <div>
            <h3>Payment</h3>
            <div>
              Payment Method: {order.payment.paymentMethod}
            </div>
            <div>
              Payment Status: {order.isPaid ? <MessageBox variant="success">"Paid at " + {getIST(order.paidAt)}</MessageBox> : <MessageBox  variant="danger">Not Paid</MessageBox>}
            </div>
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3>
                  Shopping Cart
                </h3>
                <div>
                  Price
                 </div>
               </li>
              {
                order.orderItems.length === 0 ?
                  <div>
                    Cart is empty
                  </div>
                  :
                  order.orderItems.map(item =>
                    <li key={item._id}>
                     
                   
                      <div className="cart-image">
                        <img src={item.image1} alt="product" />
                      </div>
                      <div className="cart-name">
                        <div>
                          <Link to={"/product/" + item.productId}>
                            {item.name}
                          </Link>

                        </div>
                        <div>
                          Qty: {item.qty}
                        </div>
                      </div>
                      <div className="cart-price-small">
                      {item.qty} x &#8377;{item.price} = <b>&#8377;{item.qty * item.price}</b>
                    </div>
                    <button class="open-button-2" onClick={() => openForm2(item.productId)}>Set Delivery Status</button>
                    <div class="form-popup-3" id="myForm2">
                <ul>
              <li>
                    {loadingReviewSave && <LoadingBox ></LoadingBox>}
                    {errorReviewSave && <MessageBox variant="danger">{errorReviewSave}</MessageBox>}
              </li>
              </ul>
              <form  class="form-container-pop" onSubmit={submitHandler} >
              <h1>Product Review</h1>

              <label for="psw"><b>Rating</b></label>&nbsp;
          
              <select
                          name="rating"
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="1">1- Poor</option>
                          <option value="2">2- Fair</option>
                          <option value="3">3- Good</option>
                          <option value="4">4- Very Good</option>
                          <option value="5">5- Excelent</option>
              </select>
              
              <br></br><br></br>
              <label for="psw"><b>Other</b></label>
             
              <textarea placeholder="comments" rows="4" cols="27" id="DeliveryStatus"  onChange={(e) => {setComment(e.target.value)}} />
             
              <button type="submit" class="btn">Submit</button>
              <button type="button" class="btn cancel" onClick={() => closeForm2()}>Close Form</button>
              
              </form>
      </div>
                </li>
                    
                  )
              }
            </ul>
          </div>


        </div>
        <div className="placeorder-action">
          <ul>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>&#8377;{order.itemsPrice}</div>
            </li>
            <li>
              <div>Delivery Charge</div>
              <div>+ &#8377;{order.shippingPrice}</div>
            </li>
            <li>
              <div>Discount</div>
              <div>- &#8377;{order.discount}</div>
            </li>

            <hr></hr>
            <li>
              <div><strong>Order Total</strong></div>
              <div><strong>&#8377;{order.totalPrice}</strong></div>
            </li>
            <hr></hr>

            <li className="placeorder-actions-payment">
              {loadingPay && <div>Finishing Payment...</div>}
              {!sdkReady && <LoadingBox></LoadingBox>}
              {order.payment.paymentMethod ==="Online Payments" && !order.isPaid && sdkReady &&
                <RazorpayButton
                  amount={order.totalPrice}
                  user = {userInfo}
                  clientID = {clientID}
                  onSuccess={handleSuccessPayment} />
              }
              
            </li>

          </ul>



        </div>

      </div>
    </div>

}

export default OrderScreen;