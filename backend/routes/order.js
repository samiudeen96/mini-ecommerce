// Import the required modules
const express = require("express"); // Express is used to create a router for defining API routes
const router = express.Router(); // Create a new router object

// Import controller functions for handling requests
const { createOrder } = require("../controllers/orderController"); // Function to handle creating an order
const { getOrders } = require("../controllers/orderController"); // Function to handle fetching orders

// Define the route to create an order
router.route("/order").post(createOrder); 
// POST request to "/order" will invoke the `createOrder` function from the controller
// Example usage: Creating a new order by sending data in the request body

// Define the route to get all orders
router.route("/orders").get(getOrders); 
// GET request to "/orders" will invoke the `getOrders` function from the controller
// Example usage: Fetching all existing orders

// Export the router to make it available for use in other parts of the application
module.exports = router; 
