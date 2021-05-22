import React, { useEffect,useState } from 'react';
// import { addToCart, removeFromCart } from '../actions/cartActions';
import { addToCart, deleteFromCart,cartItemsList}  from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';


function CartScreen(props) {

  const cartList = useSelector(state => state.cartList);
  console.log(cartList);
  const {cartItems,loading , error } = cartList;
  console.log(cartItems);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split("?")[1]) : 1;
  // console.log(qty);
  const dispatch = useDispatch();
  const removeFromCartHandler = (productId) => {
    dispatch(deleteFromCart(productId));
  }
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty,userInfo._id));
    }
    if(cartList)
    dispatch(cartItemsList());

  }, [productId]);

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  }

  return <div className="row top cart">
    <div className="cart-list">
      <ul className="cart-list-container">
        <li>
          <h3>
            Shopping Bag
          </h3>
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          <div>
            Price
          </div>
        </li>
        {
          loading===true?(
            <LoadingBox></LoadingBox>):
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
                    <button type="button" className="button delete-button" onClick={() => removeFromCartHandler(item.productId)} >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="cart-price">
                &#8377;&nbsp;{item.price}
                </div>
              </li>
            )
        }
      </ul>

    </div>
   
     { loading===true?(<LoadingBox></LoadingBox>):<div className="cart-action">
        <h3>
          Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items)
          :
          &#8377;&nbsp; {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
        </h3>
        <button onClick={checkoutHandler} className="button primary full-width" disabled={cartItems.length === 0}>
          Proceed to Checkout
        </button>

      </div>
  } 


  </div>
}

export default CartScreen;