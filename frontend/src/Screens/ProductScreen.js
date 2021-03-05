import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import axios from 'axios';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import data from '../data';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from '../actions/productActions';


function ProductScreen(props){

    
    const productDetails = useSelector(state => state.productDetails);
    const {product,loading,error} = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
    
        dispatch(detailsProduct(props.match.params.id));
        return () => {
          //
        };
      }, [])

    console.log(product);
    console.log("hello");
    
    return(
        <div>
            {loading?<div>Loading...</div>:
            error?<div>{error}</div>:(
                <div className = "details">
                <div className = "details-image">
                    <div className = "slider">
                    <AliceCarousel autoPlay autoPlayInterval="3000">
                        <img src={product.image1} className="sliderimg" alt = "product"/>          
                        <img src={product.image2} className="sliderimg" alt = "product"/>
                    </AliceCarousel>   
                    </div>  
                </div>
                <div className = "details-info">
                     <ul>
                         <li>
                             <h4>{product.name}</h4>
                         </li>
                         <li>
                             {product.brand}
                         </li>
                         <li>
                            &#8377; &nbsp;{product.price}
                         </li>
                         <li>
                            {product.rating} Stars ({product.numReviews} Reviews)
                         </li>
                     </ul>
                </div>
                <div className = "details-action">
                    <ul>
                        <li>
                            Price: {product.price}
                        </li>
                        <li>
                            Status: {product.price}
                        </li>
                        <li>
                            Qty:<select>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                        </li>
                        <li>
                            <button className="cart-button">Add to Cart</button>
                        </li>
                    </ul>
                </div>
            </div>
            )
            }
            
        </div>
        

    )
}


export default ProductScreen;