// Import the required models
const orderModel = require("../models/orderModel"); // Order model to interact with the orders collection in the database
const productModel = require("../models/productModel"); // Product model to interact with the products collection in the database

// Controller function to create a new order
exports.createOrder = async (req, res, next) => {
  // console.log(req.body, "DATA"); // Debug: Logs the incoming request body for verification

  // Extract cart items from the request body
  const cartItems = req.body;

  // Calculate the total amount for the order
  const amount = Number(
    cartItems.reduce(
      (acc, item) => (acc, item.product.price * item.qty), // Calculate the total for each item (price * quantity)
      0 // Initial value of the accumulator
    )
  ).toFixed(2); // Convert the total to a fixed decimal value (e.g., 2 decimal points)
  console.log(amount, "Amount"); // Debug: Logs the calculated amount

  // Define the initial order status
  const status = "Pending";

  // Create a new order in the database
  const order = await orderModel.create({ cartItems, amount, status });

  // Update the stock for each product in the cart
  cartItems.forEach(async (item) => {
    const product = await productModel.findById(item.product._id); // Fetch the product by its ID
    product.stock = product.stock - item.qty; // Deduct the ordered quantity from the product's stock
    await product.save(); // Save the updated stock to the database
  });

  // Send a JSON response with the order details
  res.json({
    success: true, // Indicates the operation was successful
    // message: "Create order works" // Optional message (commented out)
    order, // Return the created order data
  });
};

// Controller function to get all orders
exports.getOrders = async (req, res, next) => {
  const order = await orderModel.find(); // Fetch all orders from the database

  try {
    // Send a JSON response with the orders
    res.json({
      success: true, // Indicates the operation was successful
      order, // List of all orders
    });
  } catch (error) {
    // Handle errors by sending a 404 response with an error message
    res.status(404).json({ message: error.message }); // Return the error message if something goes wrong
  }
};
