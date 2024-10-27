import React from 'react';
import { HashLink as Link } from 'react-router-hash-link'; // Importing HashLink for smooth scrolling

const Hero = () => {
  return (
    <section
      id="hero"
      className="hero bg-cover bg-center h-screen relative flex items-center justify-center text-center text-white"
      style={{ backgroundImage: `url('/src/img/coffee-hero.jpg')` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Dark overlay */}
      <div className="relative z-10 p-8 rounded-lg">
        <h1 className="text-[55px] font-playfair mb-4">Welcome to Brew Heaven</h1>
        <p className="italic text-xl mb-6">"Life begins after coffee."</p>
        <Link
          smooth to="#menu"
          className="inline-block bg-[#d4a373] hover:bg-[#6f4e37] text-white py-2 px-4 rounded"
        >
          Explore Our Menu
        </Link>
      </div>
    </section>
  );
};

export default Hero;
