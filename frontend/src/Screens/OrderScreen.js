import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { emptyCart } from '../actions/userActions';
import { detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import RazorpayButton from '../components/RazorpayButton';
import MessageBox from '../components/MessageBox';


function OrderScreen(props) {


  const [sdkReady, setSdkReady] = useState(false);
  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const [clientID, setClientID] = useState("hh");
  const dispatch = useDispatch();

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
  }, [successPay, sdkReady, clientID,dispatch
  ,props.history,props]);

  // useEffect(() => {
  //    dispatch(emptyCart());
  // }, [])

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
                          <Link to={"/product/" + item.product}>
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