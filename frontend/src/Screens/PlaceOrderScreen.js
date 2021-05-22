import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';

function PlaceOrderScreen(props) {

  const cartList = useSelector(state => state.cartList);
  const orderCreate = useSelector(state => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const { cartItems, shipping, payment } = cartList;

  if (!shipping.address) {
    props.history.push("/shipping");
  } else if (!payment.paymentMethod) {
    props.history.push("/payment");
  }

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    // create an order
    dispatch(createOrder({
      orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice,
      taxPrice, totalPrice
    }));
  }
  useEffect(() => {
    if (success) {
      props.history.push("/order/" + order._id);
    }

  }, [success]);

  return <div>
    <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
    <div className="placeorder">
      <div className="placeorder-info">
        <div>
          <h4>
            Shipping
          </h4>
          <div>
            <b>Name: </b>{cartList.shipping.name},<br></br>
            <b>Deivery Address: </b>{cartList.shipping.address}, {cartList.shipping.city},
          {cartList.shipping.postalCode}, {cartList.shipping.country}
          </div>
        </div>
        <div>
          <h4>Payment</h4>
          <div>
            Payment Method: {cartList.payment.paymentMethod}
          </div>
        </div>
        <div>
          <ul className="cart-list-container">
            <li>
              <h4>
                Order Items
          </h4>
              <div>
          </div>
            </li>
            {
              cartItems.length === 0 ?
                <div>
                  Cart is empty
          </div>
                :
                cartItems.map(item =>
                  <li>
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
                  </li>
                )
            }
          </ul>
        </div>

      
      </div>
      <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>&#8377;{itemsPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>+ &#8377;{shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>+ &#8377;{taxPrice}</div>
                </div>
              </li>
              <li>
              <hr></hr>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>&#8377;{totalPrice}</strong>
                  </div>
                </div>
              </li>
              <hr></hr>
              <li>
                <button
                  onClick={placeOrderHandler}
                  className="button primary full-width"
                  disabled={cartItems.length === 0}
                >
                  Place Order
                </button>
              </li>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>

    </div>
  </div>

}

export default PlaceOrderScreen;