import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';


function HomeScreen(props){

  const productList = useSelector(state=>state.productList);
  const {products, loading, error} = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(listProducts());
    return () => {
      //
    };
  }, [])
  console.log(products);

    return  loading?<div>Loading...</div>:
    error?<div>{error}</div>:
    <ul className="products">
          {
            products.map(product =>
          <li key={product._id}>
            <div className="product">
              <Link to={{pathname:'/products/' + product._id}} >
                <img className="product-images" src={product.image1} alt="product" />
                </Link>
              <div className="product-name" id="link">
                <Link to={{pathname:'/products/' + product._id}} >{product.name}</Link>
              </div>
              <div className="product-brands">{product.brand}</div>
              <div className="product-prices">&#8377; &nbsp;{product.price}</div>
              <div className="product-ratings">{product.rating} Stars ({product.numReviews} Reviews)</div>
            </div>
          </li>)
            }
            </ul>


}

export default HomeScreen;
