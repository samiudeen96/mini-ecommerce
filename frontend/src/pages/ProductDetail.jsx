// Import necessary hooks from React and other components
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To get dynamic route params
import Rating from "../components/Rating"; // Rating component to display product ratings
import { toast } from "react-toastify"; // To display toast notifications for actions

const ProductDetail = ({ cartItems, setCartItems }) => {
  // Retrieve the product id from the URL using useParams
  const { id } = useParams();
  
  // State variables for storing product details and quantity
  const [product, setProduct] = useState(null); // Product details
  const [qty, setQty] = useState(1); // Quantity of the product selected by the user

  // Fetch product details based on the product ID from the URL
  useEffect(() => {
    fetch(`/api/product/${id}`) // Make API call to fetch product details
      .then((res) => res.json()) // Parse the JSON response
      .then((res) => setProduct(res.product)); // Set the fetched product details into state
  }, []); // Empty dependency array to run the effect only once when component mounts

  // Function to handle adding the product to the cart
  const addCartHandler = () => {
    // Check if the product already exists in the cart
    const existCartItem = cartItems.find(
      (item) => item.product._id == product._id // Compare product ID
    );
    
    if (existCartItem) {
      // If the product is already in the cart, show a toast notification
      toast.info("This product already added into the cart");
    } else {
      // If the product is not in the cart, add it to the cart with quantity
      const newCartItems = { product, qty }; // Create a new cart item object
      setCartItems((state) => [...state, newCartItems]); // Update the cart state
      toast.success("Cart item added successfully"); // Show success toast
    }
  };

  // Function to increase the quantity of the product
  const increaseQty = () => {
    // Prevent increasing quantity if it exceeds the available stock or if stock is zero
    if (product.stock == qty || product.stock == 0) {
      return;
    }
    setQty((state) => state + 1); // Increment quantity by 1
  };

  // Function to decrease the quantity of the product
  const decreaseQty = () => {
    // Prevent decreasing quantity if it’s already 1
    if (qty > 1) {
      setQty((state) => state - 1); // Decrease quantity by 1
    }
  };

  return (
    <>
      {/* Render product details if the product state is not null */}
      {product && (
        <div className="flex my-10">
          
          {/* Background image for the product */}
          <div
            className=" w-5/12 -inset-80 py-3 bg-prop"
            style={{
              backgroundImage: `url(${product.images[0].image})`, // Set product image as background
            }}
          >
            {/* The product image is displayed as background */}
          </div>

          {/* Product details section */}
          <div className="product_content w-8/12">
            <h2 className="font-semibold text-3xl">{product.name}</h2> {/* Display product name */}
            <p>{product.description}</p> {/* Display product description */}
            <p className="text-xs text-gray-600 mt-2">
              Product ID #{product._id} {/* Display product ID */}
            </p>
            <div className="p-1 ratings flex gap-2 items-center">
              <div>
                <Rating rating={product.ratings} /> {/* Display product ratings */}
              </div>
              <div className="text-xs">{product.ratings} Ratings</div> {/* Display rating count */}
            </div>
            <p className="font-semibold text-3xl mt-2">${product.price}</p> {/* Display product price */}

            <div className="flex gap-3 items-center">
              {/* Quantity selection section */}
              <div className="flex my-4">
                <button
                  onClick={decreaseQty} // Decrease quantity when button is clicked
                  className="w-6 text-lg rounded-md bg-red-400 flex justify-center items-center font-bold"
                >
                  -
                </button>
                <input
                  className="w-8 h-8 border-none outline-none bg-slate-200 rounded-md text-center text-xs leading-none"
                  type="number"
                  value={qty} // Display current quantity
                  readOnly // Make the input read-only
                  aria-label="Quantity" // Label for accessibility
                />
                <button
                  onClick={increaseQty} // Increase quantity when button is clicked
                  className="w-6 text-lg rounded-md bg-blue-400 flex justify-center items-center font-bold"
                >
                  +
                </button>
              </div>
              <div>
                <p className="text-sm">
                  Status:{" "}
                  <span
                    className={
                      product.stock > 0
                        ? "text-green-700 font-bold" // In stock
                        : "text-red-700 font-bold" // Out of stock
                    }
                  >
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </p>
              </div>

              {/* Add to cart button */}
              <button
                type="button"
                onClick={addCartHandler} // Add product to cart
                disabled={product.stock == 0} // Disable button if out of stock
                className={`py-1 px-3 shadow-md rounded-sm flex items-center justify-center ${
                  product.stock == 0
                    ? "bg-gray-400 cursor-not-allowed" // Disable styling if out of stock
                    : "bg-yellow-500 hover:bg-yellow-400"
                }`}
              >
                Add to Cart
              </button>
            </div>

            {/* Description section */}
            <div className="desc">
              <h3 className="text-2xl font-semibold">Description:</h3>
              <p>{product.description}</p> {/* Display full product description */}
            </div>

            {/* Seller information */}
            <p className="text-sm mt-2">
              Sold by: <span className="font-bold">{product.seller}</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
