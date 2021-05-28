import express from 'express';
import Order from '../models/orderModel';
import { isAuth, isAdmin } from '../util';
import Coupon from '../models/couponModel';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import {resetPasswordEmail, verificationMail} from '../Templates/emailTemplates'
import orderSummaryMail from '../Templates/orderSummaryMail'

const bcryptsalt = process.env.BCRYPT_SALT;
const Client_Url = process.env.CLIENT_URL;

const authorization={
  service: 'gmail',
  secure: 'true',
  auth: {
     user: process.env.mailId,  //your email address
     pass: process.env.password               // your password
  }
};

const router = express.Router();

router.get("/", isAuth, async (req, res) => {
  const orders = await Order.find({}).populate('user');
  return res.send(orders);
});

router.get("/mine", isAuth, async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  return res.send(orders);
});



router.get("/:id", isAuth, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    return res.send(order);
  } else {
    return res.status(404).send({message:"Order Not Found."})
  }
});



router.delete("/:id", isAuth, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    const deletedOrder = await order.remove();
    return res.send(deletedOrder);
  } else {
    return res.status(404).send("Order Not Found.")
  }
});

router.post("/", isAuth, async (req, res) => {
  console.log("order route");
  if(req.body.discount){
  var newOrder = new Order({
    orderItems: req.body.orderItems,
    user: req.user._id,
    shipping: req.body.shipping,
    payment: req.body.payment,
    itemsPrice: req.body.itemsPrice,
    taxPrice: req.body.taxPrice,
    discount:req.body.discount.discount,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice,
  })}else{
    var newOrder = new Order({
      orderItems: req.body.orderItems,
      user: req.user._id,
      shipping: req.body.shipping,
      payment: req.body.payment,
      itemsPrice: req.body.itemsPrice,
      taxPrice: req.body.taxPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
  })}

  const newOrderCreated = await newOrder.save();
  console.log(newOrder.payment.paymentMethod)
  if(newOrder.payment.paymentMethod == "takeaway" || newOrder.payment.paymentMethod =="Cash on Delivery"){
  const output = orderSummaryMail(newOrderCreated);
  const transporter=nodemailer.createTransport(authorization);
    const mailOptions={
      from: 'atranzcart@gmail.com',
      to: req.user.email,
      subject:'Order Summary',
      text: `Order Summary`,
      html: output,
      }

      transporter.sendMail(mailOptions, (error, info)=>{
      if (error) {
          console.log(error);
      } else {
      console.log('Email sent: ' + info.response);
      }
  });}

  return res.status(201).send({ message: "New Order Created", data: newOrderCreated });
});

router.put("/:id/pay", isAuth, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment = {
      paymentMethod: 'Online Payment',
      paymentResult: {
        paymentID: req.body.paymentResult
      }
    }
    const updatedOrder = await order.save();

    const output = orderSummaryMail(updatedOrder);
    const transporter=nodemailer.createTransport(authorization);
      const mailOptions={
        from: 'atranzcart@gmail.com',
        to: req.user.email,
        subject:'Order Summary',
        text: `Order Summary`,
        html: output,
        }
  
        transporter.sendMail(mailOptions, (error, info)=>{
        if (error) {
            console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    })
    return res.send({ message: 'Order Paid.', order: updatedOrder });
  } else {
    return res.status(404).send({ message: 'Order not found.' })
  }
});



router.put("/", isAuth, async (req, res) => {
  const order = await Order.findOne({ _id: req.body.orderId })
  if (order) {
      order.isDelivered = req.body.isDelivered;
      if(req.body.isDelivered)
      {order.deliveredAt = Date.now();}
      else{
        order.deliveredAt='';
      }
      order.deliveryStatus=req.body.DeliveryStatus
      const updatedOrder = await order.save();
      return res.send({ message: 'Staus Changed.', order: updatedOrder });
  } else {
    return res.status(404).send({ message: 'Order not found.' })
  }
});


router.post("/addcoupon", isAuth, async (req, res) => {

  try {
      console.log("entered bacjend")
      const coupon = await Coupon.findOne({ couponCode: req.body.couponCode }) 
      if(coupon)
      {
        return res.status(404).send({ message: 'Coupon Already Exist' })
      }else{

          const newCoupon = new Coupon({
            couponCode: req.body.couponCode,
            discount: req.body.discount,
            couponUsers: req.body.couponUsers,
          });

        await newCoupon.save();
        return res.status(201).send({ message: 'Coupon Added'});
      }
    
  } catch (error) {
    return res.status(401).send({ message: 'Something went wrong'});
  }
});

router.post("/ordercancel", isAuth, async (req, res) => {

  try {
      console.log("entered bacjend")
      const order = await Order.findById(req.body.orderId); 
      if(order.cancellationRequest)
      {
        return res.status(201).send({ message: 'Order Already Cancelled' })
      }else{
        order.cancellationRequest = req.body.cancellationRequest;
        order.cancellationReason = req.body.cancellationReason
        await order.save();
        return res.status(201).send({ message: 'order cancelled'});
      }
    
  } catch (error) {
    return res.status(401).send({ message: 'Something went wrong'});
  }
});


export default router;