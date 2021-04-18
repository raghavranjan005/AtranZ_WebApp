import express from 'express';
import User from '../models/userModel';
import { getToken, isAuth } from '../util';
import bcrypt, { compareSync } from 'bcryptjs';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
// import handlebars from 'handlebars';
// import fs from 'fs';
// import path from 'path';
import {resetPasswordEmail} from '../Templates/emailTemplates'

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

router.put('/:id', isAuth, async (req, res) => {
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
    res.send({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser),
    });
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
});

router.post('/signin', async (req, res) => {
  const signinUser = await User.findOne({ email: req.body.email });
  if (signinUser) {
    if (bcrypt.compareSync(req.body.password, signinUser.password)) {
    
      res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser),
      });
      return;
    }
  }
    res.status(401).send({ message: 'Invalid Email or Password.' });
});


router.post('/register', async (req, res) => {
  const registerUser = await User.findOne({
    email: req.body.email,
  });
  if(!registerUser){
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const newUser = await user.save();
    if (newUser) {
      res.send({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: getToken(newUser),
      });
    } else {
      res.status(401).send({ message: 'Invalid User Data.' });
    }
  } else {
    res.status(401).send({ message: 'User Email-Id Already Exist' });
  }
});


router.post('/reset-password', async (req, res) => {
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

  res.status(200).send(user);

  }
    res.status(400).send({ message: 'User Not found' });
});



router.get('/resetpassword/:id',async (req,res)=>{
  try{
  const resetuser = await User.findOne({
    resetToken: req.params.id
  });
  }catch(error){
    res.status(400).send({ message: 'Invalid Link' });
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
          res.send({
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
  
  
  
  



router.get('/createadmin', async (req, res) => {
  try {
    const user = new User({
      name: 'Raghav',
      email: 'atranzcart@gmail.com',
      password: '1234',
      isAdmin: true,
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ message: error.message });
  }
});

export default router;
