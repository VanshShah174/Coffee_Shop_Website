import React, { useState, useEffect } from 'react';
import { useCart } from '../store/CartContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

interface MenuProps {
  products: Product[];
}

const Menu: React.FC<MenuProps> = ({ products }) => {
  const { addToCart, removeFromCart, cartItems } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === selectedCategory)
      );
    }
  }, [selectedCategory, products]);

  const getQuantity = (productId: string): number => {
    const item = cartItems.find((item) => item._id === productId);
    return item?.quantity ?? 0; // Default to 0 if undefined
  };

  const handleAddToCart = (product: Product) => {
    if (isAuthenticated) {
      addToCart(product);
    } else {
      setShowLoginPrompt(true);
    }
  };

  const closeModal = () => setShowLoginPrompt(false);

  return (
    <section id="menu" className="max-w-screen-xl mx-auto py-16 px-4 text-center">
      <h2 className="text-4xl font-playfair text-[#6f4e37] border-b-2 border-[#d4a373] pb-4 mb-8">Menu</h2>
      <div className="flex justify-center space-x-4 mb-8">
        {['All', 'Cold Drinks', 'Hot Drinks', 'Pastries', 'Sandwiches'].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded font-semibold transition-colors ${
              selectedCategory === category
                ? 'bg-[#6f4e37] text-white'
                : 'bg-[#d4a373] text-white hover:bg-[#6f4e37]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div id="menuItems" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="p-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-out"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-lg font-semibold text-[#6f4e37]">${product.price}</p>
              <div className="flex justify-center items-center mt-4 space-x-4">
                <button
                  onClick={() => removeFromCart(product._id)}
                  disabled={getQuantity(product._id) === 0}
                  className={`${
                    getQuantity(product._id) === 0 ? 'bg-gray-400' : 'bg-red-500'
                  } text-white px-2 py-1 rounded transition-opacity duration-300 ease-in-out`}
                >
                  -
                </button>
                <span className="text-lg">{getQuantity(product._id)}</span>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  +
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 text-lg">No products available in this category.</p>
        )}
      </div>

      {showLoginPrompt && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <h3 className="text-xl font-bold mb-4">Please Log In or Sign Up</h3>
            <p className="text-gray-700 mb-6">You need to be logged in to add items to the cart.</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => router.push('/auth/login')}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
              >
                Log In
              </button>
              <button
                onClick={() => router.push('/auth/signup')}
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200"
              >
                Sign Up
              </button>
            </div>
            <button
              onClick={closeModal}
              className="mt-4 text-gray-500 hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Menu;
