import Search from "./Search";
import { Link } from "react-router-dom";

const Header = ({ cartItems }) => {
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
          <div className="cartItems flex items-center">
            <div>
              <img src="/images/cart.svg" alt="" />
            </div>
            <Link className="bg-white rounded-full px-2 min-w-5" to={'/cart'}>
              <p className="text-sm text-blue-950 font-bold">
                {cartItems.length}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
