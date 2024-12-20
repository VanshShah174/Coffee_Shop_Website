import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CartProvider } from '../store/CartContext';
import { AuthProvider } from '../context/AuthContext';
import React from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </AuthProvider>
  );
}

export default MyApp;
