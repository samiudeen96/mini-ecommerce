import Rating from "./Rating"; // Import Rating component to display the product's rating
import { Link } from "react-router-dom"; // Import Link component for routing

const Card = ({ product }) => { // Define Card component accepting a 'product' prop
  return (
    <>
      <div className="w-64 flex flex-col items-center min-h-80"> // Card container with width, flex column layout, and minimum height
        <div
          className="w-32 h-32 py-3 bg-prop" // Container for product image with background
          style={{
            backgroundImage: `url(${product.images[0].image})`, // Set background image for the product
          }}
        >
          {/* <img className="object-cover" src={product.images[0].image} alt="" /> */}
          {/* Optional: Image fallback, currently commented out */}
        </div>
        <div className="px-3 p-2 text-center"> // Container for product name with padding and centered text
          <p>{product.name}</p> // Display product name
          {/* <p>{product.description}</p> */}
          {/* Optional: Display product description, currently commented out */}
        </div>
        <div className="p-1 ratings flex gap-2 items-center"> // Ratings container with padding, flex layout, and gap between items
          <div>
            <Rating rating={product.ratings} /> // Display Rating component with product's rating
          </div>
          <div className="text-xs">{product.ratings}</div> // Display product's rating as a number
        </div>
        <div className="p-1"> // Price container with padding
          <p>${product.price}</p> // Display product's price
        </div>
        <div className="p-3 w-full"> // Button container with padding and full width
          <Link
            to={`/product/${product._id}`} // Link to product details page using the product's ID
            className="text-sm bg-blue-950 block text-center text-white py-2 w-full rounded-sm hover:bg-blue-800 transition duration-200"
          >
            View details // Button text to indicate the action
          </Link>
        </div>
      </div>
    </>
  );
};

export default Card;
