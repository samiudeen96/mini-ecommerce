const orderModel = require('../models/orderModel') 

exports.createOrder = async (req, res, next)=>{

    // console.log(req.body, "DATA");
    const cartItems = req.body;
    const totalAmount = Number(cartItems.reduce((acc, item)=> (acc, item.product.price * item.qty), 0)).toFixed(2);
    console.log(totalAmount, "Amount");
    
    const status = "Pending";

    const order = await orderModel.create({cartItems, totalAmount, status});
    

    res.json({
        success: true,
        // message: "Create order works"
        order
    })
}