import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import axios from 'axios';

function ProductScreen(props){

    const [products, setProduct] = useState([]);

    useEffect(() => {
      
      const fetchData = async () =>{
        const {data} = await axios.get("/api/products");
        setProduct(data);
  
      }
      fetchData();
  
      return () => {
        //
      };
    }, [])

    console.log(products);
    const pID = props.location.state.pId;
    console.log(pID);
    console.log("Hello");
    // console.log(products);
    return(
        <div>
            {products.length!==0&&
            <div class="product-row">
            <div class="product-column1">
            <div id="myCarousel" class="carousel slide" data-ride="carousel">
                {/* <!-- Indicators --> */}
                <ol class="carousel-indicators">
                    <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                    <li data-target="#myCarousel" data-slide-to="1"></li>
                    <li data-target="#myCarousel" data-slide-to="2"></li>
                </ol>

                {/* <!-- Wrapper for slides --> */}
                <div class="carousel-inner">
                    <div class="item active">
                    <img src={products[0].image1} alt="Los Angeles"/>
                    </div>

                    <div class="item">
                    <img src={products[0].image2} alt="Chicago"/>  
                    </div>

                    <div class="item">
                    <img src={products[1].image1} alt="New York"/>
                    </div>
                </div>

                {/* <!-- Left and right controls --> */}
                <a class="left carousel-control" href="#myCarousel" data-slide="prev">
                    <span class="glyphicon glyphicon-chevron-left"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="right carousel-control" href="#myCarousel" data-slide="next">
                    <span class="glyphicon glyphicon-chevron-right"></span>
                    <span class="sr-only">Next</span>
                </a>
                </div>
                <img className="product-image" src={products[pID-1].image1} alt="product" />
                <img className="product-image" src={products[pID-1].image2} alt="product" />
            </div>
            <div class="product-column2">
                <div className="product-brand">{products[pID-1].brand}</div>
                <div className="product-price">&#8377; &nbsp;{products[pID-1].price}</div>
                <div className="product-rating">{products[pID-1].rating} Stars ({products[pID-1].numReviews} Reviews)</div> 
                <Link to = '/cart/'>
                    <button className = "product-cartButton">Add to Cart</button>
                </Link>
                <br></br>
                <Link to = '/wishlist/'>
                    <button className = "product-wishlistButton">Add to Wishlist</button>
                </Link>

            </div>
            </div>
            
            }
    
        </div>
        

    )
}


export default ProductScreen;