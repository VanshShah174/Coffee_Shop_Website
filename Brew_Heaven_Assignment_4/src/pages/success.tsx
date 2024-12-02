import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCart } from "../store/CartContext";

const Success: React.FC = () => {
  const router = useRouter();
  const { clearCart } = useCart();
  const [seconds, setSeconds] = useState<number>(5);

  useEffect(() => {
    // Clear cart on mount
    clearCart();
  }, [clearCart]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval); // Stop timer
          router.push("/"); // Redirect to home
          return prev;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center">
      <div className="spinner mb-6"></div>
      <h2 className="text-3xl font-bold text-green-600">Payment Successful!</h2>
      <p className="mt-4 text-lg text-gray-700">
        Thank you for your order. Redirecting you to the home page in {seconds} seconds...
      </p>
    </div>
  );
};

export default Success;
