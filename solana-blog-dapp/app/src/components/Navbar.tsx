import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              Solana Blog
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/create"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Create Post
            </Link>
          </div>

          {/* Wallet Connect Button */}
          <div className="hidden md:block">
            <WalletMultiButton />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className="text-gray-700 hover:bg-gray-100 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/create"
                className="text-gray-700 hover:bg-gray-100 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleMenu}
              >
                Create Post
              </Link>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <WalletMultiButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
