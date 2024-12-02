import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define a type for the product
interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  quantity?: number;
}

// Define the shape of the cart context
interface CartContextType {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  deleteItem: (productId: string) => void;
  clearCart: () => void;
  cartItemCount: number;
  total: number;
}

// Create the cart context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Hook to access the cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  // Initialize cartItems state from localStorage
  const [cartItems, setCartItems] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
      } catch (error) {
        console.error('Error parsing cartItems from localStorage:', error);
        return [];
      }
    }
    return [];
  });

  // Store cartItems in localStorage when cartItems state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const currentCart = JSON.stringify(cartItems);
        localStorage.setItem('cartItems', currentCart);
      } catch (error) {
        console.error('Error saving cartItems to localStorage:', error);
      }
    }
  }, [cartItems]);

  // Add item to cart
  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);
      if (existingItem) {
        return prevItems.map((item) =>
          item._id === product._id ? { ...item, quantity: (item.quantity || 0) + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Remove one item from cart
  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === productId);
      if (existingItem && existingItem.quantity === 1) {
        return prevItems.filter((item) => item._id !== productId);
      }
      return prevItems.map((item) =>
        item._id === productId ? { ...item, quantity: (item.quantity || 1) - 1 } : item
      );
    });
  };

  // Delete an item from the cart completely
  const deleteItem = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== productId));
  };

  // Clear the cart
  const clearCart = () => {
    setCartItems([]); // Clear cart items
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cartItems'); // Clear localStorage
    }
  };
  

  const cartItemCount = cartItems.reduce((count, item) => count + (item.quantity || 0), 0);
  const total = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        deleteItem,
        clearCart,
        cartItemCount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
