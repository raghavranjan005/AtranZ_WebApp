import express from 'express';
import Order from '../models/orderModel.js';
import { isAuth, isAdmin } from '../util.js';
import Coupon from '../models/couponModel.js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import {resetPasswordEmail, verificationMail} from '../Templates/emailTemplates.js'
import orderSummaryMail from '../Templates/orderSummaryMail.js'

const bcryptsalt = 8;
const Client_Url = 'www.atranz.in';

const authorization={
  service: 'gmail',
  secure: 'true',
  auth: {
     user: 'atranzcart@gmail.com',  //your email address
     pass: 'atrang@2021'               // your password
  }
};

const router = express.Router();

router.get("/", isAuth,isAdmin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user');
    if(orders)
      return res.send(orders); 
    else
      return res.status(404).send({message:"No Orders Found"});
  } catch (error) {
    return res.send(error)
  }
});

router.get("/mine", isAuth, async (req, res) => {
  try {
      const orders = await Order.find({ user: req.user._id });
      if(orders)
        return res.send(orders);
      else
        return res.status(404).send({message:"Order Not found"})
  } catch (error) {
    return res.send(error);
  }
});


router.get("/:id", isAuth, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id });
    if (order) {
      return res.send(order);
    } else {
      return res.status(404).send({message:"Order Not Found."})
    }   
  } catch (error) {
    return res.send(error);
  }
  
});



router.delete("/:id", isAuth, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id });
    if (order) {
      const deletedOrder = await order.remove();
      return res.send(deletedOrder);
    } else {
      return res.status(404).send("Order Not Found.")
    } 
  } catch (error) {
    return res.send(error)
  }

});

router.post("/", isAuth, async (req, res) => {
  try {

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
    
  } catch (error) {
    return res.send(error);
  }

});

router.put("/:id/pay", isAuth, async (req, res) => {
  try {
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
    
  } catch (error) {
    return res.send(error)
  }
  
});



router.put("/", isAuth,isAdmin, async (req, res) => {

  try {
    const order = await Order.findOne({ _id: req.body.orderId })
    if (order) {
        order.isDelivered = req.body.isDelivered;
        order.isCancelled = req.body.isCancelled;
        order.isReturned = req.body.isReturned;
        order.isPaid = req.body.isPaid;
        if(req.body.isDelivered)
        {order.deliveredAt = Date.now();}
        else{
          order.deliveredAt='';
        }
        if(req.body.isPaid)
        {
          order.paidAt = Date.now();
        }
        else{
          order.paidAt = '';
        }
        order.deliveryStatus=req.body.DeliveryStatus
        const updatedOrder = await order.save();
        return res.send({ message: 'Order Updated.', order: updatedOrder });
    } else {
      return res.status(404).send({ message: 'Order not found.' })
    }
  } catch (error) {
      return res.send(error);
  }

});


router.post("/addcoupon", isAuth, isAdmin, async (req, res) => {

  try {
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
    return res.send(error);
  }
});

router.post("/ordercancel", isAuth, async (req, res) => {

  try {
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
    return res.send(error);
  }
});


export default router;
