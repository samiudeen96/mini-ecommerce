import "./App.css"; // Importing the CSS file for global styling.
import Header from "./components/Header"; // Importing the Header component for displaying the navigation bar or header section.
import Home from "./pages/home"; // Importing the Home component for the main/home page of the application.
import ProductDetail from "./pages/ProductDetail"; // Importing the ProductDetail component for showing detailed information about a product.
import Footer from "./components/Footer"; // Importing the Footer component for displaying the footer section.
import Cart from "./pages/Cart"; // Importing the Cart component for managing and displaying cart items.
import Order from "./pages/Order";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importing routing components from React Router for handling navigation between pages.
import { useEffect, useState } from "react"; // Importing the useState hook for managing state within the component.
import { ToastContainer } from "react-toastify"; // Importing ToastContainer to display notifications or toast messages.
import "react-toastify/dist/ReactToastify.css"; // Importing the default CSS for react-toastify notifications.

function App() {
  // The main App component that manages the application layout and state.

  const [cartItems, setCartItems] = useState(() => {
    // Load cart items from localStorage on initialization
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const [orders, setOrders] = useState(()=>{
    const storedCartItems = localStorage.getItem("orders");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  useEffect(() => {
    // Save cart items to localStorage whenever cartItems changes
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [cartItems, orders]);

  return (
    <>
      {/* React fragment used as a wrapper element. */}
      <div>
        <Router>
          {/* Router component wraps the app to enable routing. */}
          <div>
            <ToastContainer
              // ToastContainer component displays toast messages with configurations.
              position="top-right" // Position of the toast notifications.
              autoClose={5000} // Time in milliseconds before the toast auto-closes.
              hideProgressBar={false} // Whether to show the progress bar on the toast.
              newestOnTop={false} // Whether the latest toast appears on top.
              closeOnClick={false} // Whether the toast closes on click.
              rtl={false} // Disables right-to-left text direction.
              pauseOnFocusLoss // Pauses the toast timer when the window loses focus.
              draggable // Allows dragging the toast to dismiss.
              pauseOnHover // Pauses the toast timer when hovered over.
              theme="light" // Sets the theme of the toast to light.
            />
            <Header cartItems={cartItems} orders={orders} />
            {/* Header component to display navigation and passes cart items as a prop. */}

            <div className="container">
              {/* Wrapper div with a "container" class for layout styling. */}
              <Routes>
                {/* Routes component defines the available routes for the app. */}
                <Route path="/" element={<Home />} />
                {/* Route for the home page, which renders the Home component. */}
                <Route path="/search" element={<Home />} />
                {/* Route for the search page, reuses the Home component. */}
                <Route
                  path="/product/:id"
                  element={
                    <ProductDetail
                      // Product detail route with dynamic `id` parameter.
                      cartItems={cartItems} // Passes cartItems state as a prop to ProductDetail.
                      setCartItems={setCartItems} // Passes setCartItems state updater as a prop to ProductDetail.
                    />
                  }
                />
                <Route
                  path="cart"
                  element={
                    <Cart
                      // Cart route to display the cart page.
                      cartItems={cartItems} // Passes cartItems state as a prop to Cart.
                      setCartItems={setCartItems}
                      setOrders={setOrders}
                      // Passes setCartItems state updater as a prop to Cart.
                    />
                  }
                />
                <Route
                  path="order"
                  element={<Order orders={orders} setOrders={setOrders} />}
                />
              </Routes>
            </div>
          </div>
        </Router>
        <Footer />
        {/* Footer component displayed at the bottom of all pages. */}
      </div>
    </>
  );
}

export default App;
// Exports the App component as the default export to be used in other parts of the application.
