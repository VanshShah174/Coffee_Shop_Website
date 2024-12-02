import React from "react";
import Link from "next/link";
import Image from "next/image"; // Import the Next.js Image component
import CoffeeHero from "../img/coffee-hero.jpg"; // Import the hero image

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="hero bg-cover bg-center h-screen relative flex items-center justify-center text-center text-white"
    >
      {/* Image Component for Background */}
      <Image
        src={CoffeeHero} // Use the imported image
        alt="Coffee Hero"
        layout="fill" // Makes the image span the entire section
        objectFit="cover" // Ensures the image covers the section
        priority // Ensures the image is loaded early
        className="absolute inset-0 z-0"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Dark overlay */}
      <div className="relative z-10 p-8 rounded-lg">
        <h1 className="text-[55px] font-playfair mb-4">Welcome to Brew Heaven</h1>
        <p className="italic text-xl mb-6">"Life begins after coffee."</p>
        {/* Updated Link */}
        <Link href="/#menu" passHref className="inline-block bg-[#d4a373] hover:bg-[#6f4e37] text-white py-2 px-4 rounded">
            Explore Our Menu
        </Link>
      </div>
    </section>
  );
};

export default Hero;
