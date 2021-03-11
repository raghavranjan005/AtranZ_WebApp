import React, { useEffect, useState } from 'react';
import '../index.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {signin} from '../actions/userActions';
import { listProducts, saveProduct ,deleteProduct} from '../actions/productActions';


function ProductsScreen(props){
    const [modalVisible,setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const productList = useSelector(state=>state.productList);
    const {loading,products,error} = productList;
    const productSave = useSelector(state => state.productSave);
    const { loading:loadingSave,success:successSave, error:errorSave } = productSave;
    const productDelete = useSelector(state => state.productDelete);
    const { loading:loadingDelete,success:successDelete, error:errorDelete } = productDelete;
   

    const dispatch = useDispatch();

    useEffect(() => {
        if(successSave)
        {
            setModalVisible(false);
        }
        dispatch(listProducts());
        return () => {
          //
        };
      }, [successSave,successDelete]);

    // console.log(User);
    // console.log("hello");
    const openModal = (product) =>{
        setModalVisible(true);
        setId(product._id);
        setPrice(product.price);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setImage1(product.image1);
        setImage2(product.image2);
    }
   
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({_id:id,name,price,image1,image2,brand,category,countInStock}));
    
      }
    const deleteHandler = (product) => {
        dispatch(deleteProduct(product._id));
    }
    return <div className = "content content-margined">
        <div className = "product-header">
            <h3>Products</h3>
            <button className = "button primary" onClick = {()=>openModal({})}>Create Product</button>
        </div>
        {modalVisible&&
        <div className="form">
        <form onSubmit={submitHandler}>
            <ul className = "form-container">
                <li>
                    <h2> Create Product</h2>
                </li>
                <li>
                        {loadingSave && <div>Loading...</div>}
                        {errorSave && <div>{Error}</div>}
                </li>
                <li>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input type="text" name="name" value={name} id="name" onChange={(e) => setName(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="price">
                        Price
                    </label>
                    <input type="text" name="price" value={price} id="price" onChange={(e) => setPrice(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="image1">
                        Image1
                    </label>
                    <input type="text" name="image1" value ={image1} id="image1" onChange={(e) => setImage1(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="image2">
                        Image2
                    </label>
                    <input type="text" name="image2" value = {image2} id="image2" onChange={(e) => setImage2(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="brand">
                        Brand
                    </label>
                    <input type="text" name="brand" value ={brand} id="brand" onChange={(e) => setBrand(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="category">
                        Category
                    </label>
                    <input type="text" name="category" value ={category} id="category" onChange={(e) => setCategory(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="countInStock">
                        Count In Stock
                    </label>
                    <input type="text" name="countInStock" value = {countInStock} id="countInStock" onChange={(e) => setCountInStock(e.target.value)}></input>
                </li>
                <li>
                    <button type="submit" className="button primary">{id?"update":"Create"}</button>
                </li>
                <li>
                    <button type="button" onClick={()=>setModalVisible(false)} className="button secondary">Back</button>
                </li>
               
            </ul>

        </form>
    </div> 
}
        <div className = "product-list">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product =>( <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>
                           <button className = "button" onClick={()=>openModal(product)}>Edit</button>
                           {'   '}
                           <button className = "button" onClick={()=>deleteHandler(product)}>Delete</button>
                        </td>
                    </tr>))}
                </tbody>
            </table>

        </div>
    </div>

    
   
}


export default ProductsScreen;