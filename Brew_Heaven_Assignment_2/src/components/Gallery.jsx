import React from "react";

const Gallery = () => {
  return (
    <section id="gallery" className="max-w-screen-xl mx-auto py-16 bg-gray-100 text-center">
      <h2 className="text-4xl font-playfair text-[#6f4e37] mb-8">Photo Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <img
          src="src/img/coffee_shop_interior.jpg"
          alt="Coffee Shop Interior"
          className="w-full h-56 object-cover rounded-lg hover:scale-105 transition-transform"
        />
        <img
          src="src/img/Latte_art.jpg"
          alt="Latte Art"
          className="w-full h-56 object-cover rounded-lg hover:scale-105 transition-transform"
        />
        <img
          src="src/img/Coffee_Beans.jpg"
          alt="Coffee Beans"
          className="w-full h-56 object-cover rounded-lg hover:scale-105 transition-transform"
        />
      </div>
    </section>
  );
};

export default Gallery;
