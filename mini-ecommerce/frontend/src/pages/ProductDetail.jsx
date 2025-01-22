import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { toast } from "react-toastify";

const ProductDetail = ({ cartItems, setCartItems }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetch(`/api/product/${id}`)
      .then((res) => res.json())
      .then((res) => setProduct(res.product));
  }, []);

  const addCartHandler = () => {
    const existCartItem = cartItems.find(
      (item) => item.product._id == product._id
    );
    if (existCartItem) {
      toast.info("This product already added into the cart");
    } else {
      const newCartItems = { product, qty };
      setCartItems((state) => [...state, newCartItems]);
      toast.success("Cart item added successfully");
    }
  };

  const increaseQty = () => {
    if (product.stock == qty || product.stock == 0) {
      return;
    }
    setQty((state) => state + 1);
  };

  const decreaseQty = () => {
    if (qty > 1) {
      setQty((state) => state - 1);
    }
  };

  return (
    <>
      {product && (
        <div className="flex my-10">
          {/* <div className="product_images w-5/12">
            <img src={product.images[0].image} alt="" />
          </div> */}

          <div
            className=" w-5/12 -inset-80 py-3 bg-prop"
            style={{
              backgroundImage: `url(${product.images[0].image})`, // URL of the background image
            }}
          >
            {/* <img className="object-cover" src={product.images[0].image} alt="" /> */}
          </div>

          <div className="product_content w-8/12">
            <h2 className="font-semibold text-3xl">{product.name}</h2>
            <p>{product.description}</p>
            <p className="text-xs text-gray-600 mt-2">
              Product ID #{product._id}
            </p>
            <div className="p-1 ratings flex gap-2 items-center">
              <div>
                <Rating rating={product.ratings} />
              </div>
              <div className="text-xs">{product.ratings} Ratings</div>
            </div>
            <p className="font-semibold text-3xl mt-2">${product.price}</p>

            <div className="flex gap-3 items-center">
              <div className="flex my-4">
                <button
                  onClick={decreaseQty}
                  className="w-6 text-lg rounded-md bg-red-400 flex justify-center items-center font-bold"
                >
                  -
                </button>
                <input
                  className="w-8 h-8 border-none outline-none bg-slate-200 rounded-md text-center text-xs leading-none"
                  type="number"
                  value={qty}
                  readOnly
                  aria-label="Quantity"
                />

                <button
                  onClick={increaseQty}
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
                        ? "text-green-700 font-bold"
                        : "text-red-700 font-bold"
                    }
                  >
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </p>
              </div>

              <button
                type="button"
                onClick={addCartHandler}
                disabled={product.stock == 0}
                className={`py-1 px-3 shadow-md rounded-sm flex items-center justify-center ${
                  product.stock == 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-yellow-500 hover:bg-yellow-400"
                }`}
              >
                Add to Cart
              </button>
            </div>

            <div className="desc">
              <h3 className="text-2xl font-semibold">Description:</h3>
              <p>{product.description}</p>
            </div>

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
