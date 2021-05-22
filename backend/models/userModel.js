import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    image1: { type: String, required: true },
    price: { type: String, required: true },
    productId: {type: String,required: true},
  });

const userSchema = new mongoose.Schema({
    name:{type: String,trim:true, required:true},
    email:{type:String, required:true, trim:true, unique:true, dropDups: true},
    password:{type:String, required:true},
    isAdmin: {type:Boolean, required:true, default:false},
    resetToken:{type:String},
    cartItems: [cartItemSchema],
    itemsPrice: { type: Number },
    totalPrice: { type: Number },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;