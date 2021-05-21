import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Product(props) {
  const { product } = props;
  return (
    <div key={product._id} className="card">
      <Link to={`/product/${product._id}`}>
        <img className="card-product-image" src={product.image1} alt={product.name} />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <Rating
        value={product.rating}
        text={product.numReviews + ' reviews'}
        />
        <div className="row">
          <div className="price">${product.price}</div>
        </div>
      </div>
    </div>
  );
}