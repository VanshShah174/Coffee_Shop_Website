import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="z-50 font-semibold text-xl relative bg-[#6f4e37] text-white text-center py-5 mt-8">
      <p>&copy; {new Date().getFullYear()} Coffee Shop (By Vansh & Kathan)</p>
    </footer>
  );
};

export default Footer;
