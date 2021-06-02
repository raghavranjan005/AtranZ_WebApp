import express from 'express';
import Product from '../models/productModel.js';
import { isAuth, isAdmin } from '../util.js';

const router = express.Router();

router.get('/normal',async(req,res)=>{
  try {
    const products = await Product.find();
    if(products)
      return res.send(products);
    else
      return res.status(404).send({message:"No Product Found"});
  } catch (error) {
   return  res.send(error)
  }
})


router.get('/', async (req, res) => {

  try {
    const name = req.query.name || '';
    const category = req.query.category || '';
    const order = req.query.order || '';
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;

    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const categoryFilter = category ? { category } : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const sortOrder =
      order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'toprated'
        ? { rating: -1 }
        : { _id: -1 };
    const count = await Product.countDocuments({
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    const products = await Product.find({
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
    .sort(sortOrder)
    return res.send(products);
  } catch (error) {
    return res.send(error);
  }
  
});

router.get('/categories',async (req, res) => {
  try {
    const categories = await Product.find().distinct('category');
  if(categories)
    return res.send(categories);
  else
    return res.status(404).send({message:"No Category Found"});
  } catch (error) {
    return res.send(error);
  }
});


router.get('/:id', async (req, res) => {
  try {
        const product = await Product.findOne({ _id: req.params.id });
        if (product) {
          return res.send(product);
        } else {
          return res.status(404).send({ message: 'Product Not Found.' });
        } 
  } catch (error) {
    return res.send(error)
  }

});


router.post('/:id/reviews', isAuth, async (req, res) => {
  
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      const review = {
        name: req.body.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      const updatedProduct = await product.save();
      return res.status(201).send({
        data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
        message: 'Review saved successfully.',
      });
      } else {
        return res.status(404).send({ message: 'Product Not Found' });
      }
    
  } catch (error) {
    return res.send(error);
  }
  
});

router.put('/:id', isAuth, isAdmin, async (req, res) => {

  try {

    const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.image1 = req.body.image1;
    product.image2 = req.body.image2;
    product.image3 = req.body.image3;
    product.image4 = req.body.image4;
    product.brand = req.body.brand;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res
        .status(200)
        .send({ message: 'Product Updated', data: updatedProduct });
    }
  }
  return res.status(500).send({ message: ' Error in Updating Product.' });
    
  } catch (error) {
    return res.send(error);
  }
  
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  try {
      const deletedProduct = await Product.findById(req.params.id);
    if (deletedProduct) {
      await deletedProduct.remove();
    return  res.send({ message: 'Product Deleted' });
    } else {
      return res.send('Error in Deletion.');
    }
  } catch (error) {
    return res.send(error)
  } 
});

router.post('/', isAuth, isAdmin, async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      image1: req.body.image1,
      image2: req.body.image2,
      image3: req.body.image3,
      image4: req.body.image4,
      brand: req.body.brand,
      category: req.body.category,
      countInStock: req.body.countInStock,
      description: req.body.description,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
    });
    const newProduct = await product.save();
    if (newProduct) {
      return res
        .status(200)
        .send({ message: 'New Product Created', data: newProduct });
    }
    return res.status(404).send({ message: ' Error in Creating Product.' });
    
  } catch (error) {
    return res.send(error);
  }
  
});

export default router;
