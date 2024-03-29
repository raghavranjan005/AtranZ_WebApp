import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder,changeSucess } from '../actions/orderActions';
import { emptyCart,normalEmptyCart,applyCoupon } from '../actions/userActions';
import { normalListProducts } from '../actions/productActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import Cookie from 'js-cookie';

function PlaceOrderScreen(props) {

  // const cartList = useSelector(state => state.cartList);
  // const { cartItems, shipping, payment } = cartList;
  const cartItems = Cookie.getJSON('cartItems');
  const shipping = Cookie.getJSON('shipping');
  const payment = Cookie.getJSON('payment');
  const normalProductList = useSelector(state => state.normalProductList);
  const { products } = normalProductList;
  const orderCreate = useSelector(state => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const ApplyCoupon = useSelector(state => state.applyCoupon);
  const { loading: loadingCoupon, discount:discount, error:errorCoupon } = ApplyCoupon;
  const [couponCode, setCouponCode] = useState('');


 if(!cartItems)
 {
  props.history.push("/cart");
 }else if (!shipping) {
    props.history.push("/shipping");
  } else if (!payment) {
    props.history.push("/payment");
  }

  
 if(cartItems && shipping && payment)
 {
  var itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  var shippingPrice = 10;
  var taxPrice = 0;
  var totalPrice = itemsPrice + shippingPrice;
  if(discount)
  {
    totalPrice = totalPrice - discount.discount;
    if(totalPrice<=0)
      totalPrice=0;
  }
 }

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    // create an order
    if(cartItems && shipping && payment){
    //console.log("place order");
    //console.log(products);
    //console.log(cartItems);
    var f = 1;
    for (var i=0; i < cartItems.length; i++) {
        for(var j=0;j<products.length;j++)
        {
           if(cartItems[i].productId === products[j]._id)
           {
              if(cartItems[i].qty>products[j].countInStock)
              {
                f=0;
                break;
              }
           }
        }
        if(f===0)
        break;
    }
    if(f===1)
    {
      //console.log(f);
      if(discount){
      dispatch(createOrder({
      orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice,
      taxPrice, discount, totalPrice})
      );
    }else{
      dispatch(createOrder({
        orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice,
        taxPrice, totalPrice}));
    }
  }
    else
    {
      //console.log(f);
      alert("sorry some items just got out of stock please rechoose the items");
      dispatch(normalEmptyCart());
      props.history.push("/");
    }
  }
}

  const CouponSubmit = (e) => {
    e.preventDefault();
    //console.log("haha")
    dispatch(applyCoupon(couponCode));
  };


  useEffect(() => {
    if (success) {
      dispatch(emptyCart());
      dispatch(changeSucess());
      if(payment.paymentMethod === "Online Payments"){
        Cookie.remove("cartItems");
        Cookie.remove("shipping");
        Cookie.remove("payment");
        props.history.push("/order/" + order._id);
      }else{
        alert("order placed succesfully");
        props.history.push("/orderhistory");
      }

    }
    // if(discount)
    // {
    //   alert(toString(discount))
    // }

  }, [success, discount]);

  useEffect(() => {
    dispatch(normalListProducts());
  },[])
  

  return (cartItems && shipping && payment)? <div>
    <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
    <div className="placeorder">
      <div className="placeorder-info">
        <div>
          <h4>
            Shipping
          </h4>
          <div>
            <b>Name: </b>{shipping.name}<br></br>
            <b>Deivery Address: </b>{shipping.address}, {shipping.city},
          {shipping.postalCode}, {shipping.country}<br></br><b>Contact No. :</b>{shipping.mobile}
          </div>
        </div>
        <div>
          <h4>Payment</h4>
          <div>
            Payment Method: {payment.paymentMethod}
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
                  <div>Delivery Charge</div>
                  <div>+ &#8377;{shippingPrice}</div>
                </div>
              </li>
                <li>
                {discount&& <div className="row">
                  <div>discount</div>
                  <div>- &#8377;{discount.discount}</div>
                </div>}
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

          <div className="card card-body">
            <ul>
              <li>
              {loadingCoupon && <LoadingBox></LoadingBox>}
              {errorCoupon && <MessageBox variant="danger">{errorCoupon}</MessageBox>}
              {discount && <MessageBox variant="success">Coupon Applied Successfully. Please don't refresh OR Re-Enter same coupon Code. You will loose this discount</MessageBox>}
              </li>
              <li>
                <h2>Apply Coupons</h2>
              </li>
              <li>
                <div className="row">  
                  <form onSubmit={CouponSubmit}>
                  <label>Coupon Code</label>&nbsp;
                  <input type="text" id="couponCode" onChange={(e) => setCouponCode(e.target.value)}></input><br></br>
                <button type="submit" id="apply" className="button primary">Apply</button>
                </form>
                </div>
              </li>
            </ul>
          </div>

        </div>

    </div>
  </div>:<div>hello</div>

}

export default PlaceOrderScreen;