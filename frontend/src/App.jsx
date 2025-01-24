import "./App.css"; // Import global CSS styles for the application.
import Header from "./components/Header"; // Import the Header component for displaying navigation and header elements.
import Home from "./pages/Home"; // Import the Home component for the main landing page.
import ProductDetail from "./pages/ProductDetail"; // Import the ProductDetail component for viewing product details.
import Footer from "./components/Footer"; // Import the Footer component for the application's footer section.
import Cart from "./pages/Cart"; // Import the Cart component for viewing and managing cart items.
import Order from "./pages/Order"; // Import the Order component for managing user orders.
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import React Router components for handling navigation.
import { useEffect, useState } from "react"; // Import React hooks for state and lifecycle management.
import { ToastContainer } from "react-toastify"; // Import the ToastContainer component for displaying toast notifications.
import "react-toastify/dist/ReactToastify.css"; // Import default styles for react-toastify notifications.

function App() {
  // State for managing cart items, initialized from localStorage.
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  // State for managing user orders, initialized from localStorage.
  const [orders, setOrders] = useState(() => {
    const storedOrders = localStorage.getItem("orders");
    return storedOrders ? JSON.parse(storedOrders) : [];
  });

  // Sync cartItems and orders state with localStorage whenever they change.
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [cartItems, orders]);

  return (
    <>
      {/* Fragment used as a wrapper for multiple elements */}
      <div>
        <Router>
          {/* Router wraps the app to enable navigation between routes */}
          <div>
            <ToastContainer
              position="top-right" // Display toast notifications in the top-right corner.
              autoClose={5000} // Auto-close toast notifications after 5 seconds.
              hideProgressBar={false} // Show the progress bar in toast notifications.
              newestOnTop={false} // Display older toasts on top of newer ones.
              closeOnClick={false} // Prevent toasts from closing when clicked.
              rtl={false} // Disable right-to-left layout for text.
              pauseOnFocusLoss // Pause the timer for toasts when the window loses focus.
              draggable // Allow dragging toasts to dismiss them.
              pauseOnHover // Pause the timer for toasts when hovered over.
              theme="light" // Set the theme of toasts to light mode.
            />
            <Header cartItems={cartItems} orders={orders} />
            {/* Header component with props for cart items and orders */}

            <div className="container">
              {/* Container for the main content of the application */}
              <Routes>
                {/* Define all application routes */}
                <Route path="/" element={<Home />} />
                {/* Default home page route */}
                <Route path="/search" element={<Home />} />
                {/* Search page route, reusing the Home component */}
                <Route
                  path="/product/:id"
                  element={
                    <ProductDetail
                      // Product detail route with dynamic product ID
                      cartItems={cartItems} // Pass cartItems state as a prop.
                      setCartItems={setCartItems} // Pass setCartItems function to update state.
                    />
                  }
                />
                <Route
                  path="cart"
                  element={
                    <Cart
                      // Cart page route
                      cartItems={cartItems} // Pass cartItems state as a prop.
                      setCartItems={setCartItems} // Pass setCartItems function to update state.
                      setOrders={setOrders} // Pass setOrders function to update orders.
                    />
                  }
                />
                <Route
                  path="order"
                  element={<Order orders={orders} setOrders={setOrders} />}
                />
                {/* Order page route */}
              </Routes>
            </div>
          </div>
        </Router>
        <Footer />
        {/* Footer component displayed at the bottom of the application */}
      </div>
    </>
  );
}

export default App; 
// Export the App component as the default export to use it in other parts of the application.
