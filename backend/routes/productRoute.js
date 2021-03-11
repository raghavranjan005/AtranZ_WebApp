import express from 'express';
import { deleteProduct } from '../../frontend/src/actions/productActions';
import Product from '../models/productModel';
import { getToken ,isAdmin,isAuth} from '../util';

const router = express.Router();

router.get("/",async(req,res)=>{
const products = await product.find({});
res.send(products); 
});

router.post("/",isAuth,isAdmin,async(req, res)=>{
  const product = new Product({
    name:req.body.name,
    price:req.body.price,
    image1:req.body.image1,
    image2:req.body.image2,
    brand:req.body.brand,
    category:req.body.category,
    countInStock:req.body.countInStock,
    rating:req.body.rating,
    numReviews:req.body.numReviews,
  });
  const newProduct = await product.save();
  if(newProduct){
    return res.status(201).send({message:'New Product Created', data:newProduct});
  }
  return res.status(500).send({message:'Error in creating Product'});
})

router.put("/:id",isAuth,isAdmin,async(req, res)=>{
  const productId = req.params.id;
  const product = await Product.findByID(productId)
  if(product)
  {
      product.name=req.body.name;
      product.price=req.body.price;
      product.image1=req.body.image1;
      product.image2=req.body.image2;
      product.brand=req.body.brand;
      product.category=req.body.category;
      product.countInStock=req.body.countInStock;
      product.rating=req.body.rating;
      product.numReviews=req.body.numReviews;
      const updatedProduct = await product.save();
      if(updatedProduct){
        return res.status(201).send({message:'Product Updated', data:updatedProduct});
      }
  }
  return res.status(500).send({message:'Error in updating Product'});
});

router.delete("/:id",isAuth,isAdmin,async(req,res)=>{
  const deletedProduct =  await Product.findById(req.params.id);
  if(deletedProduct){
    await deletedProduct.remove();
    res.send({message:"Product Deleted"})
  }
  else{
  res.send("Error in deletion")
  }
});

export default router;