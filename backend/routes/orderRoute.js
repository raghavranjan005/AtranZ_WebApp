import express from 'express';
import Order from '../models/orderModel';
import { isAuth, isAdmin } from '../util';
import Coupon from '../models/couponModel';

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
  const newOrder = new Order({
    orderItems: req.body.orderItems,
    user: req.user._id,
    shipping: req.body.shipping,
    payment: req.body.payment,
    itemsPrice: req.body.itemsPrice,
    taxPrice: req.body.taxPrice,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice,
  });
  const newOrderCreated = await newOrder.save();
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


export default router;