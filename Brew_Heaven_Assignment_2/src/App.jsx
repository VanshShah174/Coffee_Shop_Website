import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../src/components/Home";
import { CartProvider } from "../store/CartContext";


import "./App.css";
import Cart from "./components/Cart";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
