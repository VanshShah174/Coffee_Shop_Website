import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../src/components/Home";
import { CartProvider } from "../store/CartContext";


import "./App.css";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
