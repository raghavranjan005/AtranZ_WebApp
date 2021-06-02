import express from 'express';
import path from 'path';
import config from './config.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import orderRoute from './routes/orderRoute.js';
import uploadRoute from './routes/uploadRoute.js';
import bodyParser from 'body-parser';
import cors from 'cors';
dotenv.config();

const mongodbUrl ='mongodb+srv://AtranZ:yaadnahi@cluster0.21sw2.mongodb.net/AtranZ?retryWrites=true&w=majority';
const port =  5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
mongoose.connect(mongodbUrl, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true,

}).catch((error)=> console.log("connected"));


app.use('/api/uploads', uploadRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.get('/api/config/razorpay', (req, res) => {
  res.send('rzp_live_yl3bpNXBi8RqDw');
});


const __dirname = path.resolve();
// const __dirname = "F:\AtranZ_WebApp";
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(express.static(path.join(__dirname, '/../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});
app.listen(port, () => {console.log(`server started at http://localhost:${port}`)})
