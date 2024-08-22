import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react'; // Import icons from Lucide or use your own

// Navbar component
const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-background text-foreground border-b border-border">
      <div className="container mx-auto flex items-center justify-between p-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          <img src="/logo.png" alt="Logo" className="h-8" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-primary">Home</Link>
          <Link href="/about" className="hover:text-primary">About</Link>
          <Link href="/services" className="hover:text-primary">Services</Link>
          <Link href="/contact" className="hover:text-primary">Contact</Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMobileMenu} className="md:hidden text-gray-700 hover:text-primary">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-white dark:bg-gray-800 z-40 transition-transform transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
          <div className="flex flex-col items-center py-8">
            <button onClick={toggleMobileMenu} className="absolute top-4 right-4 text-gray-700 dark:text-gray-300">
              <X className="w-6 h-6" />
            </button>
            <Link href="/" className="text-lg mb-4" onClick={toggleMobileMenu}>Home</Link>
            <Link href="/about" className="text-lg mb-4" onClick={toggleMobileMenu}>About</Link>
            <Link href="/services" className="text-lg mb-4" onClick={toggleMobileMenu}>Services</Link>
            <Link href="/contact" className="text-lg" onClick={toggleMobileMenu}>Contact</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
