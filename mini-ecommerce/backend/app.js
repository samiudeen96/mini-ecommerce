const express = require('express');
const app = express()
const dotenv = require('dotenv')
const path = require('path')
const connectDatabase = require('./config/connectDb');

dotenv.config({path: path.join(__dirname, 'config', 'config.env')})

const products = require('./routes/product');
const orders = require('./routes/order')

connectDatabase();

app.use('/api/v1/', products);
app.use('/api/v1/', orders)


const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server running on ${port} in ${process.env.NODE_ENV}`);
})