import mongoose from 'mongoose';
const shippingSchema = {
  name:{type:String},
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
};

const paymentSchema = {
  paymentMethod: { type: String, required: true },
  paymentResult: {
    paymentId: String,
  },
};

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  image1: { type: String, required: true },
  price: { type: String, required: true },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [orderItemSchema],
  shipping: shippingSchema,
  payment: paymentSchema,
  itemsPrice: { type: Number },
  taxPrice: { type: Number },
  discount:{type:Number, default:0},
  shippingPrice: { type: Number },
  totalPrice: { type: Number },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
  isCancelled:{type: Boolean,default:false},
  isReturned:{type:Boolean,default:false},
  cancellationRequest:{type:Boolean,default:false},
  cancellationReason:{type:String},
  isDelivered: { type: Boolean, default: false },
  deliveredAt: { type: Date },
  deliveryStatus: {type:String},
}, {
  timestamps: true
});

const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;