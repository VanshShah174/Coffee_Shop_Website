import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCart } from '../store/CartContext';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure client-only rendering
  }, []);

  // Calculate total quantity of items in the cart
  const cartCount = cartItems.reduce((count, item) => count + (item.quantity ?? 0), 0);

  // Helper to get initials from the user's name
  const getInitials = (name: string | null): string => {
    if (!name) return 'U'; // Default initial if name is missing
    const nameParts = name.split(' ');
    return nameParts.map((part) => part[0].toUpperCase()).join('');
  };

  const handleLogout = () => {
    logout(); // Call the logout function from context
    router.push('/'); // Redirect to the home page
  };

  if (!isClient) {
    return null; // Prevent server-rendered mismatch
  }

  return (
    <header className="z-50 fixed w-full bg-[#6f4e37] text-white p-4 shadow-lg top-0">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-semibold">Brew Heaven</h1>
        <nav>
          <ul className="flex space-x-4 p-4 text-2xl font-semibold">
            <li>
              <Link href="/#hero" className="hover:text-[#d4a373]">
                Home
              </Link>
            </li>
            <li>
              <Link href="/#menu" className="hover:text-[#d4a373]">
                Menu
              </Link>
            </li>
            <li>
              <Link href="/#gallery" className="hover:text-[#d4a373]">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/#blog" className="hover:text-[#d4a373]">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="hover:text-[#d4a373]">
                Contact
              </Link>
            </li>
            {cartCount > 0 && (
              <li>
                <Link href="/cart" className="relative hover:text-[#d4a373]">
                  Cart
                  <span className="ml-1 text-sm bg-red-500 text-white font-bold rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-4">
                    {cartCount}
                  </span>
                </Link>
              </li>
            )}
            {user ? (
              <li className="flex items-center space-x-2">
                <span>
                  {user.name ? `${user.name} (${getInitials(user.name)})` : 'User'}
                </span>
                <button onClick={handleLogout} className="hover:text-[#d4a373]">
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link href="/auth/login" className="hover:text-[#d4a373]">
                  Login
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
