// Import the Mongoose library to define and interact with MongoDB schemas
const mongoose = require("mongoose");

// Define the schema for an order using Mongoose
const orderSchema = new mongoose.Schema({
  // Define a field for cart items
  cartItems: Array, // An array to store the items in the cart, typically containing product details and quantity

  // Define a field for the total amount of the order
  amount: String, // The total cost of the order, stored as a string (could be stored as a number for calculations)

  // Define a field for the status of the order
  status: String, // The status of the order, e.g., "Pending", "Shipped", or "Completed"

  // Define a field for the creation date of the order
  createdAt: Date, // The timestamp when the order was created
});

// Create a model for the `Order` collection using the schema
const orderModel = mongoose.model('Order', orderSchema);
// The `Order` model is linked to the `Order` collection in the MongoDB database

// Export the `orderModel` so it can be used in other parts of the application
module.exports = orderModel;
