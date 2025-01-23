import Search from "./Search";
import { Link } from "react-router-dom";

const Header = ({ cartItems, orders }) => {
  return (
    <>
      <div className="bg-blue-950">
        <div className="flex justify-between container py-3 items-center">
          <Link to="/" className="logo flex gap-3 items-center">
            <div>
              <img src="/images/logo.svg" alt="" />
            </div>
            <div className="text-white">Shopping</div>
          </Link>
          <div className="searchbar ">
            <Search />
          </div>
          <div className="flex gap-10">

            {/* order */}
            <Link to={"/order"} className="cartItems flex items-center gap-1">
              <div>
                <img src="/images/order.svg" alt="" />
              </div>
              <div className="bg-white rounded-full px-2 min-w-5" >
                <p className="text-sm text-blue-950 font-bold">
                  {orders.length}
                </p>
              </div>
            </Link>

            {/* cart */}
            <Link to={"/cart"} className="cartItems flex items-center">
              <div>
                <img src="/images/cart.svg" alt="" />
              </div>
              <div className="bg-white rounded-full px-2 min-w-5" >
                <p className="text-sm text-blue-950 font-bold">
                  {cartItems.length}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
