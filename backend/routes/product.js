// Import the required modules
const express = require('express'); // Import Express to use its Router for defining API routes
const router = express.Router(); // Create a new router object for product-related routes

// Import controller functions for handling product requests
const { getProducts } = require('../controllers/productController'); // Function to fetch all products
const { getSingleProduct } = require('../controllers/productController'); // Function to fetch a single product by its ID

// Define the route to fetch all products
router.route('/products').get(getProducts); 
// GET request to "/products" will invoke the `getProducts` function from the controller
// Example usage: Fetching a list of all products

// Define the route to fetch a single product by its ID
router.route('/product/:id').get(getSingleProduct); 
// GET request to "/product/:id" will invoke the `getSingleProduct` function from the controller
// The ":id" part represents a dynamic parameter for the product ID
// Example usage: Fetching details of a product with a specific ID, e.g., "/product/123"

// Export the router to make it available for use in other parts of the application
module.exports = router;
