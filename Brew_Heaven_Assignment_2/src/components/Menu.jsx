import React from "react";

const Menu = () => {

  return (
    <section id="menu" className="max-w-screen-xl mx-auto py-16 px-4 text-center">
      <h2 className="text-4xl font-playfair text-[#6f4e37] border-b-2 border-[#d4a373] pb-4 mb-8">
        Menu
      </h2>
      <div className="flex justify-center space-x-4 mb-8">
        <button
          className={`px-4 py-2 rounded font-semibold transition-colors`}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold transition-colors`}
        >
          Cold Drinks
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold transition-colors`}
        >
          Hot Drinks
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold transition-colors`}
        >
          Pastries
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold transition-colors`}
        >
          Sandwiches
        </button>
      </div>
          </section>
  );
};

export default Menu;
