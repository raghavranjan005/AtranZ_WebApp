import React from 'react';
import { Link } from 'react-router-dom';

export default function Product() {
  return (
    <div key={product._id} className="products">
      <Link to={`/product/${product._id}`}>
        <img className="product-image" src={product.image1} alt={product.name} />
      </Link>
      <div className="product">
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <div className="row">
          <div className="price">${product.price}</div>
        </div>
      </div>
    </div>
  );
}