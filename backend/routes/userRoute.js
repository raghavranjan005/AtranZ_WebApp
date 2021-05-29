import express from 'express';
import User from '../models/userModel';
import Product from '../models/productModel';
import { getToken, isAuth } from '../util';
import bcrypt, { compareSync } from 'bcryptjs';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import Coupon from '../models/couponModel'
import {resetPasswordEmail, verificationMail, newsLetterEmail} from '../Templates/emailTemplates'

const bcryptsalt = process.env.BCRYPT_SALT;
const Client_Url = process.env.CLIENT_URL;

const authorization={
  service: 'gmail',
  secure: 'true',
  auth: {
     user: process.env.mailId,  //your email address
     pass: process.env.password  // your password
  }
};

const router = express.Router();

router.put('/:id', isAuth, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }else{
        user.password = user.password;
      }
      
      const updatedUser = await user.save();
      return res.send({
        _id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: getToken(updatedUser),
      });
    } else {
      return res.status(404).send({ message: 'User Not Found' });
    }
    
  } catch (error) {
    return res.send(error);
  } 
});

router.post('/signin', async (req, res) => {

try {

    const signinUser = await User.findOne({ email: req.body.email });
    if (signinUser) {

      if(!signinUser.isVerified){
        return res.status(401).send({ message: 'Please verify your email then only you can signin' });
      }
      if (bcrypt.compareSync(req.body.password, signinUser.password)) {
      
        return res.send({
        _id: signinUser.id,
        name: signinUser.name,
        email: signinUser.email,
        mobile:signinUser.mobile,
        isAdmin: signinUser.isAdmin,
        token: getToken(signinUser),
        });
      }
    }
      return res.status(401).send({ message: 'Invalid Email or Password.' });
  
} catch (error) {
    return res.send(error);
}
  
});


router.post('/register', async (req, res) => {
  try {

        const registerUser = await User.findOne({
          email: req.body.email,
        });
        if(!registerUser){
          const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            mobile:req.body.mobile,
          });


        const transporter=nodemailer.createTransport(authorization);
        let verificationToken = crypto.randomBytes(32).toString("hex");
        user.verificationToken = verificationToken;
        var link = `${Client_Url}verifyemail/${user.verificationToken}`;
        const output = verificationMail(link);

        const newUser = await user.save();

        const mailOptions={
          from: 'atranzcart@gmail.com',
          to: user.email,
          subject:'VERIFY YOUR EMAIL',
          text: `verification link`,
          html: output,
          }

          transporter.sendMail(mailOptions, (error, info)=>{
          if (error) {
              console.log(error);
          } else {
          console.log('Email sent: ' + info.response);
          }
        });
    if (newUser) {
      return res.send({
        flag:true,
      });
    } else {
      return res.status(401).send({ message: 'Invalid User Data.' });
    }
    }
    else {
    return res.status(401).send({ message: 'User Email-Id Already Exist' });
    }
    
  } catch (error) {
    return res.send(error);
  }
        
});


router.get('/verifyemail/:id',async (req,res)=>{
  try{
    const verifyuser = await User.findOne({
      verificationToken: req.params.id
    });
    verifyuser.isVerified = true;
    await verifyuser.save();
    console.log("hehe2")
    return res.send({
      verifyflag:true
    });
  
  }catch(error){
    return res.status(400).send({ message: 'Invalid Link' });
  }

});

router.post('/reset-password', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const transporter=nodemailer.createTransport(authorization);
      
      let resetToken = crypto.randomBytes(32).toString("hex");
      user.resetToken = resetToken;
      await user.save();
      var link = `${Client_Url}resetpassword/${user.resetToken}`;
      const output = resetPasswordEmail(link);
  
      const mailOptions={
        from: 'atranzcart@gmail.com',
        to: user.email,
        subject:'Reset Password',
        text: `Reset-Link`,
        html: output,
        }
  
        transporter.sendMail(mailOptions, (error, info)=>{
        if (error) {
            console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    });
  
    return res.status(200).send(user);
  
    }
     return res.status(400).send({ message: 'User Not found' });
    
  } catch (error) {
    return res.send(error);
  }
});



router.get('/resetpassword/:id',async (req,res)=>{
  try{
  const resetuser = await User.findOne({
    resetToken: req.params.id
  });
  }catch(error){
    return res.status(400).send({ message: 'Invalid Link' });
  }

  });

  router.post('/resetpassword/:id',async (req,res)=>{
    try{
    const resetuser = await User.findOne({
      resetToken: req.params.id
    });
    console.log(resetuser.email)
      if (resetuser) {
        try{
          resetuser.password = bcrypt.hashSync(req.body.password,8);
          resetuser.resetToken = crypto.randomBytes(32).toString("hex");
          const newUser = await resetuser.save();
          return res.send({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser),
          });
  
        }catch(error){
          return res.status(401).send({ message: 'Error' });
        }
      }else{
        return res.status(401).send({ message: 'User not Found' });
      }
    }catch(error){
      return res.status(401).send({ message: 'Invalid Link' });
    }
  
    });



    
// router.get('/createadmin', async (req, res) => {
//   try {
//     const user = new User({
//       name: 'Raghav',
//       email: 'atranzcart@gmail.com',
//       password: '1234',
//       isAdmin: true,
//     });
//     const newUser = await user.save();
//     res.send(newUser);
//   } catch (error) {
//     res.send({ message: error.message });
//   }
// });

router.get('/cart',isAuth,async(req,res)=>{
  try{
  const user = await User.findById(req.user._id);
  if(user)
    return res.send(user.cartItems);
  else
    return res.status(404).send({message:"No Item Found"});
  }
  catch
  {
    res.send(error);
  }
})

router.post('/cart',isAuth, async (req,res)=>{
  try {
    const user = await User.findById(req.body.id);
    const product = await Product.findById(req.body.productId); 
    if(user&&product)
    {
        const cartItem = user.cartItems;
        if(cartItem.length===0)
        {
                cartItem.push (
                  {
                    name:product.name,
                    qty:req.body.qty,
                    image1: product.image1,
                    price: product.price,
                    productId: req.body.productId,
                  }
                )
              await user.save();
        }
        else
        {
            var f = 0;
            for (var i=0; i < cartItem.length; i++) {
              if (cartItem[i].productId === req.body.productId) {
                  f = 1;
                  cartItem[i] = {
                    name:product.name,
                    qty:req.body.qty,
                    image1: product.image1,
                    price: product.price,
                    productId: req.body.productId,
                    }
                  await user.save();
                  break;
              }
            }
            if(f == 0)
            {
                cartItem.push (
                  {
                    name:product.name,
                    qty:req.body.qty,
                    image1: product.image1,
                    price: product.price,
                    productId: req.body.productId,
                  }
                )
              await user.save();
            }
        }
        return res.send(user.cartItems);
    }
    else
    {
        return res.status(401).send({message:"Something Went Wrong"});
    }
    } catch (error) {
      return res.send(error);
    }
  
})

router.put('/updateCart',isAuth, async (req,res)=>{

  try {
        const user = await User.findById(req.body.id);
        const product = await Product.findById(req.body.productId); 
        const lengthOfCartItems = user.cartItems.length;
        if(lengthOfCartItems === 0)
        {
            const cartItem = new cartItems (
              {
                name:product.name,
                qty:req.body.qty,
                image1: product.image1,
                price: product.price,
                productId: req.body.productId,
              }
            )
            const newCartItem = await user.cartItems.save(); 
        }
        else
        {
            try {
              const cartItem  = user.cartItems.findOne({product:req.body.productId});
              if(cartItem)
              {
                cartItem.qty = req.body.qty; 
              }
              else
              {   
                const cartItem = new cartItems (
                  {
                    name:product.name,
                    qty:req.body.qty,
                    image1: product.image1,
                    price: product.price,
                    product: req.body.productId,
                  }
                  )
              }
              await user.cartItems.save(); 
            } catch (error) {
              return res.status(401).send({ message: 'Something went wrong' });
            }
        }
        
  } catch (error) {
    return res.send(error);
  }
  
  
});


router.delete('/deleteCart',isAuth,async (req,res)=>{

  try {
    const user = await User.findById(req.user._id);
    const cartItem = user.cartItems;
    var f ;
    for (var i=0; i < cartItem.length; i++) {
      if (cartItem[i].productId === req.body.productId) {
            f = i;
           break;
      }
    }
    user.cartItems.splice(f,1);
    await user.save();
    return res.send(user.cartItems);
  } catch (error) {
    return res.status(401).send({ message: 'Something went wrong' });
  }
  
});

router.delete('/emptyCart',isAuth,async (req,res)=>{
  try {
    const user = await User.findById(req.user._id);
    for (var i=0; i < user.cartItems.length; i++) {
      const product = await Product.findById(user.cartItems[i].productId); 
      product.countInStock = product.countInStock - user.cartItems[i].qty;
      await product.save();
    }
    user.cartItems.splice(0,user.cartItems.length);
    await user.save();
    return res.send(user.cartItems);
  } catch (error) {
    return res.status(401).send({ message: 'Something went wrong' });
  }
  
});

router.delete('/normalEmptyCart',isAuth,async (req,res)=>{
  try {
    const user = await User.findById(req.user._id);
    user.cartItems.splice(0,user.cartItems.length);
    await user.save();
    res.send(user.cartItems);
  } catch (error) {
    return res.status(401).send({ message: 'Something went wrong' });
  }
  
});

router.post('/applycoupon',isAuth,async (req,res)=>{
  
  try {
    const coupon  = await Coupon.findOne({couponCode:req.body.couponCode});
    if(coupon)
    {
      try {
        
        function findElement(element) {
          return coupon.couponUsers.indexOf(element);
        }
        var index = await findElement(req.user.email)
        if(req.body.couponCode[0] == 1){
          if(index != -1)
          {
            return res.status(401).send({ message: 'Coupon Already used once by user' });
          }else{
            coupon.couponUsers.push(req.user.email);
            await coupon.save();
            return res.send({discount:coupon.discount});
          }
        }else{
          // special coupons email shud be in coupon users
          if(index != -1)
          {
            coupon.couponUsers.splice(index, 1);
            await coupon.save();
            return res.send({discount:coupon.discount});

          }else{
            return res.status(401).send({ message: 'Invalid Coupon Code' });
          }

        }

      } catch (error) {
        return res.status(401).send({ message: error.message });
      }
    }else{
      return res.status(401).send({ message: 'Invalid Coupon Code' });
    }
  } catch (error) {
    return res.status(401).send({ message: error.message });
  }
  
});

export default router;
