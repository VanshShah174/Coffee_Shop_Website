import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import Menu from "./Menu";
import Gallery from "./Gallery";
import Blog from "./Blog";
import Contact from "./Contact";

const Home = () => {
  return (
    <div className="font-poppins bg-[#faf3e0] text-text-color leading-relaxed min-h-screen">
      <Header />
      <Hero />
      <Menu />
      <Gallery />
      <Blog />
      <Contact/>
    </div>
  );
};

export default Home;
