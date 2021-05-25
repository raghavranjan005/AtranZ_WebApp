import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
    couponCode: { type: String, required: true },
    discount:{type:Number, required:true},
    couponUsers: [String],
  });
  

const couponModel = mongoose.model("Coupon", couponSchema);
export default couponModel;