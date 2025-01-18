const express = require('express');
const router = express.Router();
const {createOrder} = require('../controllers/orderController') 

// order
router.route('/order').post(createOrder);

module.exports = router;