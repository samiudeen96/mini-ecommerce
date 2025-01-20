const Header = () => {
  return (
    <>
      <div className="bg-blue-950">
        <div className="flex justify-between container py-3 items-center">
          <div className="logo flex gap-3 items-center">
            <div>
              <img src="/images/logo.svg" alt="" />
            </div>
            <div className="text-white">Shopping</div>
          </div>
          <div className="searchbar ">
            <div className="flex items-center px-3 border rounded-full shadow-sm  bg-white overflow-hidden">
              <input
                type="text"
                placeholder="Search..."
                className="w-64 focus:outline-none py-1 "
              />
              <div className="">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="#172554"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m0 0a8.5 8.5 0 111.45-1.45l4.35 4.35z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="cartItems flex items-center gap-1">
            <div>
              <img src="/images/cart.svg" alt="" />
            </div>
            <div className="bg-white rounded-full px-2 ">
                <p className="text-sm text-blue-950">0</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
