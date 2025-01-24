// Import the product model to interact with the products collection in the database
const productModel = require("../models/productModel");

// Function to handle the GET request for fetching all products, optionally filtered by a search keyword
exports.getProducts = async (req, res, next) => {
  // Check if a keyword is provided in the query parameters
  const query = req.query.keyword
    ? {
        // If a keyword exists, create a query object to search for products where the name matches the keyword (case-insensitive)
        name: {
          $regex: req.query.keyword, // Matches names that contain the keyword as a substring
          $options: "i", // Case-insensitive search
        },
      }
    : {}; // If no keyword is provided, use an empty query to fetch all products

  // Fetch products from the database based on the query
  const products = await productModel.find(query);

  // Send a JSON response with a success flag and the retrieved products
  res.json({
    success: true,
    products, // List of products matching the query
  });
};

// Function to handle the GET request for fetching a single product by its ID
exports.getSingleProduct = async (req, res, next) => {
  try {
    // Extract the product ID from the request parameters
    const id = req.params.id;

    // Fetch the product from the database using its ID
    const product = await productModel.findById(id);

    // Send a JSON response with a success flag and the retrieved product details
    res.json({
      success: true,
      product, // Details of the specific product
    });
  } catch (error) {
    // If an error occurs (e.g., invalid ID or product not found), send a 404 response
    res.status(404).json({
      success: false,
      message: "Unable to get a product with given Id", // Error message
    });
  }
};
