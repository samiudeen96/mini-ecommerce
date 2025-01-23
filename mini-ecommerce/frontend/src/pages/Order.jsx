import { useEffect } from "react";

const Order = ({ orders, setOrders }) => {

  return (
    <>
      {/* Display the order information */}
      <div className="my-10">
        {/* Iterate over each order in the orders array */}
        {orders.map((order) => (
          <div
            className="flex mb-3 items-center justify-between shadow p-4 rounded-md border-t"
            key={order._id} // Use the order's unique ID as the key for rendering
          >
            <div className="">
              {/* Iterate over each cart item in the current order */}
              {order.cartItems.map((item, index) => (
                <div className="flex gap-5">
                  {/* Display product image as background image */}
                  <div
                    className="w-20 h-20 bg-prop"
                    key={index} // Use index as the key for cart items
                    style={{
                      backgroundImage: `url(${item.product.images[0].image})`, // Set the product image as a background URL
                    }}
                  ></div>

                  <div>
                    {/* Display the product name */}
                    <p className="font-semibold">{item.product.name}</p>
                    {/* Display the order ID */}
                    <p className="text-slate-500">#{order._id}</p>
                    {/* Display the order status */}
                    <p className="text-xs">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Optional: Commented-out section for a delete icon, potentially for removing an order */}
            {/* <div> <img src="/images/delete.svg" alt="" /></div> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default Order;
