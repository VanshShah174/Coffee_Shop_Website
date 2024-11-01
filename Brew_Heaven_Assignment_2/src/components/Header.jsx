import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { useCart } from "../../store/CartContext";
// import shoppingCartIcon from "../img/shopping-cart.png"; // Adjust the path as needed


const Header = () => {
  const { cartItems } = useCart();

  // Calculate total quantity of items in the cart
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <header className="z-50 fixed w-full bg-[#6f4e37] text-white p-4 shadow-lg top-0">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-semibold">Brew Heaven</h1>
        <nav>
          <ul className="flex space-x-4 p-4 text-2xl font-semibold">
            <li><Link smooth to="#hero" className="hover:text-[#d4a373]">Home</Link></li>
            <li><Link smooth to="#menu" className="hover:text-[#d4a373]">Menu</Link></li>
            <li><Link smooth to="#gallery" className="hover:text-[#d4a373]">Gallery</Link></li>
            <li><Link smooth to="#blog" className="hover:text-[#d4a373]">Blog</Link></li>
            <li><Link smooth to="#contact" className="hover:text-[#d4a373]">Contact</Link></li>
            {/* Conditionally render the Cart link only if there are items in the cart */}
            {cartCount > 0 && (
              <li>
                <Link to="/cart" className="relative hover:text-[#d4a373]">
                {/* <img src={shoppingCartIcon} alt="Cart Icon" className="w-5 h-5 mr-2" /> */}

                  Cart
                  <span className="ml-1 text-sm bg-red-500 text-white font-bold rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-4">
                    {cartCount}
                  </span>
                </Link> 
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
