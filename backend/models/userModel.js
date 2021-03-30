import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{type: String,trim:true, required:true},
    email:{type:String, required:true, trim:true, unique:true, dropDups: true},
    password:{type:String, required:true},
    isAdmin: {type:Boolean, required:true, default:false},
    resetToken:{type:String},
});

const userModel = mongoose.model("User", userSchema);

export default userModel;