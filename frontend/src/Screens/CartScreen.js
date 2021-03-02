import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import axios from 'axios';

function CartScreen(props){

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

     return (
         <div>
             <h1>this is cart screen</h1>
         </div>
     )
}

export default CartScreen;