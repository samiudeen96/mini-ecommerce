import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = ({ cartItems, setCartItems, setOrders }) => {
  const [complete, setComplete] = useState(false); // State to track if the order is completed

  // Load cart items from localStorage when the component mounts
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("Items"));
    if (storedCartItems) {
      setCartItems(storedCartItems); // Set the state to the stored cart items
    }
  }, [setCartItems]);

  // Save cart items to localStorage whenever cartItems state changes
  useEffect(() => {
    localStorage.setItem("Items", JSON.stringify(cartItems)); // Save cart items to localStorage
  }, [cartItems]);

  // Function to increase the quantity of a specific cart item
  const increaseQty = (item) => {
    if (item.product.stock == item.qty) {
      return; // Prevent increasing quantity if stock is at maximum
    }
    const updatedCartItems = cartItems.map((i) => {
      if (i.product._id == item.product._id) {
        i.qty++; // Increase quantity
      }
      return i;
    });
    setCartItems(updatedCartItems); // Update the cart items state
  };

  // Function to decrease the quantity of a specific cart item
  const decreaseQty = (item) => {
    if (item.qty > 1) {
      const updatedCartItems = cartItems.map((i) => {
        if (i.product._id == item.product._id) {
          i.qty--; // Decrease quantity
        }
        return i;
      });
      setCartItems(updatedCartItems); // Update the cart items state
    }
  };

  // Function to remove a specific item from the cart
  const removeCart = (item) => {
    const updatedCartItems = cartItems.filter((i) => {
      return i.product._id !== item.product._id; // Filter out the removed item
    });
    setCartItems(updatedCartItems); // Update the cart items state
  };

  // Function to create an order by sending cart items to the backend
  const creatOrder = () => {
    fetch(`/api/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems), // Send the cart items as the body of the request
    })
      .then(() => {
        setCartItems([]); // Clear cart after placing the order
        setComplete(true); // Mark the order as complete
        toast.success("Order Success"); // Show a success toast
      });
      
      // Fetch the list of all orders after placing the new order
      fetch(`/api/orders`)
        .then((res) => res.json())
        .then((res) => setOrders(res.order)); // Set the orders state to the fetched orders
  };

  return (
    <>
      {/* Debugging: Display JSON representation of cartItems */}
      {/* <pre>{JSON.stringify(cartItems, null, 2)}</pre> */}

      {cartItems && cartItems.length > 0 ? ( // If cart items exist, display the cart
        <div className="my-10">
          <div className="text-center border-b border-slate-200">
            <h2 className="text-2xl font-semibold pb-1">
              Your Cart items: {cartItems.length} {/* Display the number of cart items */}
            </h2>
          </div>
          <div className="flex gap-10 justify-between">
            <div className="flex flex-wrap">
              {cartItems.map((item) => ( // Map over each cart item
                <div
                  className="cartItems w-full flex gap-8 py-8 items-center"
                  key={item.product._id} // Use the product ID as the key
                >
                  {/* Display product image */}
                  <div
                    className="w-24 h-24 bg-prop"
                    style={{
                      backgroundImage: `url(${item.product.images[0].image})`, // Set the background image
                    }}
                  ></div>
                  <div className="productDescription w-5/12">
                    {/* Link to the product detail page */}
                    <Link
                      to={`/product/${item.product._id}`}
                      className="font-medium link hover:underline"
                    >
                      {item.product.name}
                    </Link>
                  </div>
                  <div className="productPrice font-semibold w-3/12">
                    <p className="text-blue-950">${item.product.price}</p> {/* Display the product price */}
                  </div>

                  <div className="flex">
                    {/* Button to decrease the quantity */}
                    <button
                      onClick={() => decreaseQty(item)}
                      className="w-6 text-lg rounded-md bg-red-400 flex justify-center items-center font-bold"
                    >
                      -
                    </button>
                    {/* Display the quantity as a read-only input */}
                    <input
                      className="w-8 h-8 border-none outline-none bg-slate-200 rounded-md text-center text-xs leading-none"
                      type="number"
                      value={item.qty}
                      readOnly
                      aria-label="Quantity"
                    />

                    {/* Button to increase the quantity */}
                    <button
                      onClick={() => increaseQty(item)}
                      className="w-6 text-lg rounded-md bg-blue-400 flex justify-center items-center font-bold"
                    >
                      +
                    </button>
                  </div>

                  <div>
                    {/* Button to remove the item from the cart */}
                    <button
                      className="text-xs text-red-500"
                      onClick={() => removeCart(item)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="orderSummary mt-6 w-2/12">
              <h2 className="text-2xl font-medium">Order Summary</h2>
              <div className="mt-8">
                {/* Display subtotal (total number of units) */}
                <div className="flex mt-3 w-full justify-between">
                  <p>Subtotal:</p>
                  <p className="font-semibold">
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)} (Units)
                  </p>
                </div>
                {/* Display estimated total */}
                <div className="flex mt-3 w-full justify-between">
                  <p>Est. total:</p>
                  <p className="font-semibold">
                    {Number(
                      cartItems.reduce(
                        (acc, item) => acc + item.product.price * item.qty,
                        0
                      )
                    ).toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-center mt-7">
                  {/* Button to place the order */}
                  <button
                    onClick={creatOrder}
                    className="bg-blue-950 text-white text-sm px-8 py-2 rounded-sm"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : !complete ? ( // If the cart is empty and the order is not completed
        <>
          <div className="text-center my-10">
            <h2 className="text-xl font-semibold">
              Your cart is empty: {cartItems.length} {/* Display message for empty cart */}
            </h2>
          </div>
        </>
      ) : ( // If the order is completed
        <>
          <div className="text-center my-10">
            <h2 className="text-xl font-semibold">Order Completed!</h2>
            <p>Your order has been placed successfully.</p> {/* Display success message */}
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
