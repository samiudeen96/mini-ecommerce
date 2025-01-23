import { useEffect } from "react";

const Order = ({ orders, setOrders }) => {

  return (
    <>
      {/* <pre>{JSON.stringify(orders, null, 2)}</pre> */}
      <div className="my-10">
        {orders.map((order) => (
          <div
            className="flex mb-3 items-center justify-between shadow p-4 rounded-md border-t"
            key={order._id}
          >
            <div className="">
              {order.cartItems.map((item, index) => (
                <div className="flex gap-5">
                  <div
                    className="w-20 h-20 bg-prop"
                    key={index}
                    style={{
                      backgroundImage: `url(${item.product.images[0].image})`, // URL of the background image
                    }}
                  ></div>

                  <div>
                    <p className="font-semibold">{item.product.name}</p>
                    <p className="text-slate-500">#{order._id}</p>
                    <p className="text-xs">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* <div> <img src="/images/delete.svg" alt="" /></div> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default Order;