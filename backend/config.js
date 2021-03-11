import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.MONGODB_URL);

export default{
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/AtranZ',
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret'
};

