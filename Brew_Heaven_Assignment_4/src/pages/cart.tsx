import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "../store/CartContext";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

const Cart: React.FC = () => {
  const { cartItems, total, addToCart, removeFromCart,clearCart, deleteItem } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure rendering happens only on the client
  }, []);

  if (!isClient) return null; // Prevent SSR mismatches

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe.js failed to load.");

      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems }),
      });

      const { url } = await response.json();
      if (url) {
        clearCart()
        window.location.href = url; // Redirect to Stripe Checkout
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf3e0] py-8">
      <header className="z-50 fixed w-full bg-[#6f4e37] text-white py-4 shadow-lg top-0">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Your Cart</h1>
          <Link
            href="/#menu"
            className="text-white hover:underline text-2xl font-semibold"
          >
            &larr; Back to Menu
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto pt-24 px-4">
        <section id="cart" className="bg-white rounded-lg shadow-lg p-6 mt-8">
          {cartItems.length > 0 ? (
            <div id="cartItems" className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center border-b border-gray-200 pb-4"
                >
                  <div className="text-left w-1/3">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <span className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center transition hover:bg-red-600"
                    >
                      -
                    </button>
                    <span className="text-lg font-medium">{item.quantity}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center transition hover:bg-green-600"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-lg font-semibold text-gray-800">
                    ${(item.price * (item.quantity ?? 0)).toFixed(2)}
                  </span>
                  <button
                    onClick={() => deleteItem(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded transition hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">Your cart is empty.</p>
          )}

          {cartItems.length > 0 && (
            <div
              id="cartTotal"
              className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200"
            >
              <p className="text-xl font-semibold text-gray-800">Total:</p>
              <p className="text-xl font-semibold text-[#6f4e37]">
                ${total.toFixed(2)}
              </p>
            </div>
          )}

          <button
            onClick={handleCheckout}
            className="mt-6 w-full bg-[#d4a373] hover:bg-[#b68b57] text-white py-3 rounded-lg font-bold transition-colors text-lg shadow-md"
          >
            Proceed to Checkout
          </button>
        </section>
      </main>
    </div>
  );
};

export default Cart;
