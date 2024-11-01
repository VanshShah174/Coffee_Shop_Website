import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../store/CartContext";

const Success = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart(); // Access clearCart to empty the cart
  const [seconds, setSeconds] = useState(5); // Countdown timer set to 5 seconds

  // Clear the cart once when the component mounts
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  // Countdown logic and redirection after 5 seconds
  useEffect(() => {
    // Countdown logic
    const countdown = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 1) {
          clearInterval(countdown); // Clear countdown when it reaches 1
          navigate("/"); // Redirect to the home page
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(countdown);
  }, [navigate]); // Only depend on navigate to prevent infinite re-renders

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center">
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div
        className="w-10 h-10 border-4 border-gray-300 border-t-4 border-t-green-500 rounded-full mb-6"
        style={{
          animation: "spin 1s linear infinite",
        }}
      ></div>
      <h2 className="text-3xl font-bold text-green-600">Payment Successful!</h2>
      <p className="mt-4 text-lg text-gray-700">
        Thank you for your order. Redirecting you to the home page in {seconds} seconds...
      </p>
    </div>
  );
};

export default Success;
