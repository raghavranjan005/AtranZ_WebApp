import React from 'react';
import {useEffect} from 'react';
import '../index.css';
import { addTocart, removeFromCart } from '../actions/cartAction';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function CartScreen(props){

    const cart = useSelector(state => state.cart);

    const {cartItems} = cart;

    const productId = props.match.params.id;
    const qty = props.location.search? Number(props.location.search.split("=")[1]):1;
    const dispatch = useDispatch();
    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    }
    const checkoutHandler = () =>{
        props.history.push("/signin?redirect=shipping");
    }
    useEffect(() => {
        if (productId) {
          dispatch(addTocart(productId, qty));
        }
      }, []);


    // console.log(cartItems);
     return <div className = "cart">
             <div className = "cart-list">
             <ul className = "cart-list-container">
                 <li>
                     <h3>
                         Shopping Bag
                     </h3>
                     <div>
                         Price
                     </div>
                 </li>
                    {
                        cartItems.length === 0?
                        <div>
                            Bag is empty
                        </div>
                        :
                        cartItems.map( item => 
                            <li>
                                <div className="cart-image">
                                <img src ={item.image1} alt="product"/>
                                </div>
                                
                                <div className="cart-name">
                                        <Link to={'/products/' + item.product}>
                                        {item.name}
                                        </Link>

                                    <div>
                                    Qty:
                                    <select value={item.qty} onChange={(e) => dispatch(addTocart(item.product, e.target.value))}>
                                        {[...Array(item.countInStock).keys()].map(x=>
                                            <option key={x+1} value={x+1} > {x+1} </option>    
                                        )}
                                    </select>
                                        <button type="button" className="button" onClick={() =>removeFromCartHandler(item.product)}>
                                            Remove
                                        </button>
                                    </div>

                                </div>
                                <div className="cart-price">
                                &#8377;{item.price}
                                </div>
                            </li>

                        )
                    }
                </ul>
            </div>
         <div className = "cart-action">
            
                    <h3>
                        SubTotal ( {cartItems.reduce((a, c) => a+c.qty,0)} items)
                        :
                        &#8377; {cartItems.reduce((a,c) => a+c.price*c.qty,0)}
                    </h3>
                    <button onClick={checkoutHandler} className="cart-button" disabled={cartItems.length === 0 }>
                        proceed to Checkout
                    </button>

         </div>
        </div>
}

export default CartScreen;