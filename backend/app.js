// Import the required modules
const express = require('express'); // Express is a web framework for Node.js
const app = express(); // Create an Express application instance
const dotenv = require('dotenv'); // dotenv is used to load environment variables from a .env file
const path = require('path'); // path provides utilities for working with file and directory paths
const connectDatabase = require('./config/connectDb'); // Import the database connection logic
const cors = require('cors'); // cors is used to enable Cross-Origin Resource Sharing for your app

// Load environment variables from the config.env file in the config directory
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

// Import route files
const products = require('./routes/product'); // Routes related to product operations
const orders = require('./routes/order'); // Routes related to order operations

// Connect to the database
connectDatabase();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Enable CORS to allow requests from different origins
app.use(cors());

// Use the product routes for API endpoints starting with '/api/v1/'
app.use('/api/v1/', products);

// Use the order routes for API endpoints starting with '/api/v1/'
app.use('/api/v1/', orders);

// Start the server on the port specified in the environment variables
const port = process.env.PORT; // Get the port number from environment variables
app.listen(port, () => {
    // Log a message to the console when the server starts successfully
    console.log(`Server running on ${port} in ${process.env.NODE_ENV}`); // Outputs the server's port and environment (e.g., development or production)
});
