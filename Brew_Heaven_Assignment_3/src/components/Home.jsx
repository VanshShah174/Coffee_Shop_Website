import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Menu from "./Menu";
import Gallery from "./Gallery";
import Blog from "./Blog";
import Contact from "./Contact";
import Hero from "./Hero";

const Home = () => {
  return (
    <div className="font-poppins bg-[#faf3e0] text-text-color leading-relaxed min-h-screen">
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Menu Section */}
      <Menu />

      {/* Gallery Section */}
      <Gallery />

      {/* Blog Section */}
      <Blog />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
