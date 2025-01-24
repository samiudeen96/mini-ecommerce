import Rating from "./Rating"; // Import the Rating component to display product ratings.
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation between pages.

const Card = ({ product }) => { 
  return (
    <>
      {/* Outer container for the product card */}
      <div className="w-64 flex flex-col items-center min-h-80">
        
        {/* Container for the product image */}
        <div
          className="w-32 h-32 py-3 bg-prop" 
          style={{
            // Dynamically set the product image as the background.
            backgroundImage: `url(${product.images[0].image})`,
          }}
        >
          {/* Optional: Uncomment the img tag below for a fallback method to display the product image */}
          {/* <img className="object-cover" src={product.images[0].image} alt="" /> */}
        </div>

        {/* Product name section */}
        <div className="px-3 p-2 text-center">
          <p>{product.name}</p> {/* Display the product name dynamically */}
          {/* Optional: Uncomment the line below to display the product description */}
          {/* <p>{product.description}</p> */}
        </div>

        {/* Ratings section */}
        <div className="p-1 ratings flex gap-2 items-center">
          <div>
            <Rating rating={product.ratings} /> {/* Render the Rating component */}
          </div>
          <div className="text-xs">{product.ratings}</div> {/* Display the numerical rating */}
        </div>

        {/* Price section */}
        <div className="p-1">
          <p>${product.price}</p> {/* Display the product price dynamically */}
        </div>

        {/* Link to view product details */}
        <div className="p-3 w-full">
          <Link
            to={`/product/${product._id}`} // Generate the URL dynamically using the product ID.
            className="text-sm bg-blue-950 block text-center text-white py-2 w-full rounded-sm hover:bg-blue-800 transition duration-200"
          >
            View details {/* Display the button text */}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Card; // Export the Card component for use in other parts of the app.
