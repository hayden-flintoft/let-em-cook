import React, { useState } from 'react';
import { Menu } from 'lucide-react';

const HamburgerNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="relative">
      <button
        onClick={toggleMenu}
        className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <Menu size={24} />
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 w-48 bg-white shadow-lg rounded-lg mt-2">
          <ul className="py-2">
            <li>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                About
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default HamburgerNav;