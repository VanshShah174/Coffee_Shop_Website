import React from "react";
import Image from "next/image"; // Import the Next.js Image component
import CoffeeShopInterior from "../img/coffee_shop_interior.jpg";
import LatteArt from "../img/Latte_art.jpg";
import CoffeeBeans from "../img/Coffee_Beans.jpg";

const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="max-w-screen-xl mx-auto py-16 bg-gray-100 text-center">
      <h2 className="text-4xl font-playfair text-[#6f4e37] mb-8">Photo Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="w-full h-56 relative">
          <Image
            src={CoffeeShopInterior} // Use the imported image
            alt="Coffee Shop Interior"
            layout="fill" // Ensures the image fills the container
            style={{ objectFit: 'cover' }}
            className="rounded-lg hover:scale-105 transition-transform"
          />
        </div>
        <div className="w-full h-56 relative">
          <Image
            src={LatteArt} // Use the imported image
            alt="Latte Art"
            layout="fill"
            objectFit="cover"
            className="rounded-lg hover:scale-105 transition-transform"
          />
        </div>
        <div className="w-full h-56 relative">
          <Image
            src={CoffeeBeans} // Use the imported image
            alt="Coffee Beans"
            layout="fill"
            objectFit="cover"
            className="rounded-lg hover:scale-105 transition-transform"
          />
        </div>
      </div>
    </section>
  );
};

export default Gallery;
