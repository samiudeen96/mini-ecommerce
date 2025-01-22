import "./App.css";
import Header from "./components/Header";
import Home from "./pages/home";
import ProductDetail from "./pages/ProductDetail";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [cartItems, setCartItems] = useState([]);
  return (
    <>
      <div>
        <Router>
          <div>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <Header cartItems={cartItems} />
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Home />} />
                <Route
                  path="/product/:id"
                  element={
                    <ProductDetail
                      cartItems={cartItems}
                      setCartItems={setCartItems}
                    />
                  }
                />
                <Route
                  path="cart"
                  element={
                    <Cart cartItems={cartItems} setCartItems={setCartItems} />
                  }
                />
              </Routes>
            </div>
          </div>
        </Router>

        <Footer />
      </div>
    </>
  );
}

export default App;
