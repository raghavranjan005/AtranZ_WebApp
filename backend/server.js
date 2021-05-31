import express from 'express';
import path from 'path';
import data from './data';
import config from './config';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import orderRoute from './routes/orderRoute';
import uploadRoute from './routes/uploadRoute';
import bodyParser from 'body-parser';

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
const port = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());
mongoose.connect(mongodbUrl, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true,

}).catch((error)=> console.log(error.reason));


app.use('/api/uploads', uploadRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.get('/api/config/razorpay', (req, res) => {
  res.send(config.RAZORPAY_KEY_ID);
});


const __dirname = path.resolve();
// const __dirname = "F:\AtranZ_WebApp";
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(express.static(path.join(__dirname, '/../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});
app.listen(port, () => {console.log(`server started at http://localhost:${port}`)})
