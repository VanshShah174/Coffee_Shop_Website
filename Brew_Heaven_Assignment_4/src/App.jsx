import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import { CartProvider } from "../src/store/CartContext";
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import Login from './auth/Login';
import Signup from './auth/Signup';
import AdminPage from './pages/AdminPage';
import { AuthProvider } from './auth/AuthContext';
import PrivateRoute from './auth/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            
            {/* Authentication Routes */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />

            {/* Protected Admin Route */}
            <Route
              path="/admin"
              element={
                <PrivateRoute allowedRole="admin">
                  <AdminPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
