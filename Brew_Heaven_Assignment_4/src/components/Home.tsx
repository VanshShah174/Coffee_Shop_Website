import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';
import Blog from './Blog';
import Contact from './Contact';
import Hero from './Hero';
import Gallery from './Gallery';

// Define the Product interface
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

// Define the props for the Home component
interface HomeProps {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const Home: React.FC<HomeProps> = ({ products, loading, error }) => {
  return (
    <div className="font-poppins bg-[#faf3e0] text-text-color leading-relaxed min-h-screen">
      <Header />
      <Hero />
      {error ? (
        <div className="text-center text-red-500 text-xl py-10">{error}</div>
      ) : loading ? (
        <div className="text-center text-gray-600 text-xl py-10">Loading...</div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-600 text-xl py-10">No products available.</div>
      ) : (
        <Menu products={products} />
      )}
      <Gallery />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
