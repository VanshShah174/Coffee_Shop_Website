import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./store/CartContext";
import  Success  from "./pages/Success"
import Home from './components/Home';
import Cancel from './pages/Cancel'

import "./App.css";
import Cart from "./components/Cart";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route path='/cancel' element={<Cancel />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
