import "./App.css";
import Header from "./components/Header";
import Home from "./pages/home";
import ProductDetail from "./pages/ProductDetail";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  return (
    <>
      <div>
        <Router>
          <div>
            <ToastContainer />
            <Header cartItems={cartItems} />
            <div className="container p-8">
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
