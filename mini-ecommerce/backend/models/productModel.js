// Import the Mongoose library to define and work with schemas and models for MongoDB
const mongoose = require('mongoose');

// Define the schema for a product using Mongoose
const productSchema = new mongoose.Schema({
    // Define the field for the product name
    name: String, // The name of the product, stored as a string

    // Define the field for the product price
    price: String, // The price of the product, stored as a string (consider using Number for calculations)

    // Define the field for the product description
    description: String, // A detailed description of the product, stored as a string

    // Define the field for product ratings
    ratings: String, // The average rating of the product, stored as a string (consider using Number for numeric operations)

    // Define the field for product images as an array of objects
    images: [
        {
            image: String // The image URL or path for each product image
        }
    ],

    // Define the field for the product category
    category: String, // The category to which the product belongs, stored as a string

    // Define the field for the product seller
    seller: String, // The seller of the product, stored as a string

    // Define the field for product stock
    stock: String, // The quantity of the product in stock, stored as a string (consider using Number)

    // Define the field for the number of reviews the product has
    numOfReviews: String, // The total number of reviews for the product, stored as a string

    // Define the field for the creation timestamp of the product
    createdAt: Date // The date and time when the product was created
});

// Create a Mongoose model for the `Product` collection using the defined schema
const productModel = mongoose.model('Product', productSchema);
// The `Product` model provides methods to interact with the `Product` collection in the MongoDB database

// Export the `productModel` so it can be used in other parts of the application
module.exports = productModel;
