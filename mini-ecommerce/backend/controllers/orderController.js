const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");

exports.createOrder = async (req, res, next) => {
  // console.log(req.body, "DATA");
  const cartItems = req.body;
  const amount = Number(
    cartItems.reduce((acc, item) => (acc, item.product.price * item.qty), 0)
  ).toFixed(2);
  console.log(amount, "Amount");
  const status = "Pending";
  const order = await orderModel.create({ cartItems, amount, status });

  cartItems.forEach(async (item) => {
    const product = await productModel.findById(item.product._id);
    product.stock = product.stock - item.qty;
    await product.save();
  });

  res.json({
    success: true,
    // message: "Create order works"
    order,
  });
};

exports.getOrders = async (req, res, next) => {
  const order = await orderModel.find();

  try {
    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
