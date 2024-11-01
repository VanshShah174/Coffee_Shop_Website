import React, { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";
import { useCart } from "../../store/CartContext";

const Menu = () => {
  const { addToCart, removeFromCart, cartItems } = useCart(); // Access cart actions and items
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === selectedCategory)
      );
    }
  }, [selectedCategory, products]);

  // Get quantity of the product in the cart
  const getQuantity = (productId) => {
    const item = cartItems.find((item) => item._id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <section id="menu" className="max-w-screen-xl mx-auto py-16 px-4 text-center">
      <h2 className="text-4xl font-playfair text-[#6f4e37] border-b-2 border-[#d4a373] pb-4 mb-8">
        Menu
      </h2>
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-4 py-2 rounded font-semibold transition-colors ${
            selectedCategory === "All"
              ? "bg-[#6f4e37] text-white"
              : "bg-[#d4a373] text-white hover:bg-[#6f4e37]"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setSelectedCategory("Cold Drinks")}
          className={`px-4 py-2 rounded font-semibold transition-colors ${
            selectedCategory === "Cold Drinks"
              ? "bg-[#6f4e37] text-white"
              : "bg-[#d4a373] text-white hover:bg-[#6f4e37]"
          }`}
        >
          Cold Drinks
        </button>
        <button
          onClick={() => setSelectedCategory("Hot Drinks")}
          className={`px-4 py-2 rounded font-semibold transition-colors ${
            selectedCategory === "Hot Drinks"
              ? "bg-[#6f4e37] text-white"
              : "bg-[#d4a373] text-white hover:bg-[#6f4e37]"
          }`}
        >
          Hot Drinks
        </button>
        <button
          onClick={() => setSelectedCategory("Pastries")}
          className={`px-4 py-2 rounded font-semibold transition-colors ${
            selectedCategory === "Pastries"
              ? "bg-[#6f4e37] text-white"
              : "bg-[#d4a373] text-white hover:bg-[#6f4e37]"
          }`}
        >
          Pastries
        </button>
        <button
          onClick={() => setSelectedCategory("Sandwiches")}
          className={`px-4 py-2 rounded font-semibold transition-colors ${
            selectedCategory === "Sandwiches"
              ? "bg-[#6f4e37] text-white"
              : "bg-[#d4a373] text-white hover:bg-[#6f4e37]"
          }`}
        >
          Sandwiches
        </button>
      </div>
      <div id="menuItems" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="p-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-out"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {product.name}
            </h3>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-lg font-semibold text-[#6f4e37]">
              ${product.price}
            </p>
            <div className="flex justify-center items-center mt-4 space-x-4">
              <button
                onClick={() => removeFromCart(product._id)}
                disabled={getQuantity(product._id) === 0} // Disable when quantity is 0
                className={`${
                  getQuantity(product._id) === 0 ? "bg-gray-400" : "bg-red-500"
                } text-white px-2 py-1 rounded transition-opacity duration-300 ease-in-out`}
              >
                -
              </button>
              <span className="text-lg">{getQuantity(product._id)}</span>
              <button
                onClick={() => addToCart(product)}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;
