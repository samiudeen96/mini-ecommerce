import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"

const Cart = ({ cartItems, setCartItems }) => {
  const [complete, setComplete] = useState(false);

  const increaseQty = (item) => {
    // if (product.stock == qty || product.stock == 0) {
    //   return;
    // }
    // setQty((state) => state + 1);
    if (item.product.stock == item.qty) {
      return;
    }
    const updatedCartItems = cartItems.map((i) => {
      if (i.product._id == item.product._id) {
        i.qty++;
      }
      return i;
    });
    setCartItems(updatedCartItems);
  };

  const decreaseQty = (item) => {
    if (item.qty > 1) {
      const updatedCartItems = cartItems.map((i) => {
        if (i.product._id == item.product._id) {
          i.qty--;
        }
        return i;
      });
      setCartItems(updatedCartItems);
    }
  };

  const removeCart = (item) => {
    const updatedCartItems = cartItems.filter((i) => {
      if (i.product._id !== item.product._id) {
        return true;
      }
    });
    setCartItems(updatedCartItems);
  };

  const createrder = () => {
    fetch(`/api/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    }).then(() => {
      setCartItems([]);
      setComplete(true)
      toast.success("Order Success")
    });
  };

  return (
    <>
      {/* Debugging: Display JSON representation of cartItems */}
      <pre>{JSON.stringify(cartItems, null, 2)}</pre>

      {cartItems && cartItems.length > 0 ? (
        <div className="my-10">
          <div className="text-center border-b border-slate-200">
            <h2 className="text-2xl font-semibold pb-1">
              Your Cart items: {cartItems.length}
            </h2>
          </div>
          <div className="flex gap-10 justify-between">
            <div className="flex flex-wrap ">
              {cartItems.map((item) => (
                <div
                  className="cartItems w-full flex gap-8 py-8 items-center"
                  key={item.product._id}
                >
                  <div
                    className="w-24 h-24 bg-prop"
                    style={{
                      backgroundImage: `url(${item.product.images[0].image})`, // URL of the background image
                    }}
                  ></div>
                  <div className="productDescription w-5/12">
                    <Link
                      to={`/product/${item.product._id}`}
                      className="font-medium link hover:underline"
                    >
                      {item.product.name}
                    </Link>
                  </div>
                  <div className="productPrice font-semibold w-3/12">
                    <p className="text-blue-950">${item.product.price}</p>
                  </div>

                  <div className="flex">
                    <button
                      onClick={() => decreaseQty(item)}
                      className="w-6 text-lg rounded-md bg-red-400 flex justify-center items-center font-bold"
                    >
                      -
                    </button>
                    <input
                      className="w-8 h-8 border-none outline-none bg-slate-200 rounded-md text-center text-xs leading-none"
                      type="number"
                      value={item.qty}
                      readOnly
                      aria-label="Quantity"
                    />

                    <button
                      onClick={() => increaseQty(item)}
                      className="w-6 text-lg rounded-md bg-blue-400 flex justify-center items-center font-bold"
                    >
                      +
                    </button>
                  </div>

                  <div>
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
              {/* Add order summary content here */}
              <h2 className="text-2xl font-medium ">Order Summary</h2>
              <div className="mt-8">
                <div className="flex mt-3 w-full justify-between">
                  <p>Subtotal:</p>
                  <p className="font-semibold">
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)} (Units)
                  </p>
                </div>
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
                  <button
                    onClick={createrder}
                    className="bg-blue-950 text-white text-sm px-8 py-2 rounded-sm"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : !complete ? (
        <>
          <div className="text-center my-10">
            <h2 className="text-xl font-semibold">
              Your cart is empty: {cartItems.length}
            </h2>
          </div>
        </>
      ) : (
        <>
          <div className="text-center my-10">
            <h2 className="text-xl font-semibold">Order Completed!</h2>
            <p>Your order has been placed successfully.</p>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
