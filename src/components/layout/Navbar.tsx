"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: "/process", label: "Our Process" },
    { href: "/case-study", label: "Case Study" },
    { href: "/services", label: "Our Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="w-full bg-gray-50" aria-label="Main navigation">
      <div className="w-full max-w-[2560px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 [@media(min-width:1920px)]:px-24">
        <div className="flex items-center justify-between h-16 md:h-20 lg:h-24 xl:h-28">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-black"
              aria-label="Zyntrex Home"
            >
              Zyntrex
            </Link>
          </div>

          {/* Navigation Links - Center (Desktop) */}
          <div className="hidden md:flex items-center gap-3 md:gap-4 lg:gap-6 xl:gap-8 2xl:gap-10 flex-1 justify-center px-4 lg:px-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm md:text-base lg:text-lg xl:text-xl text-black hover:text-gray-600 transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Action Items - Right (Desktop) */}
          <div className="hidden md:flex items-center gap-3 md:gap-4 lg:gap-6 xl:gap-8 flex-shrink-0">
            <Link
              href="/retainer"
              className="text-sm md:text-base lg:text-lg xl:text-xl text-black hover:text-gray-600 transition-colors whitespace-nowrap"
            >
              Retainer Plan
            </Link>
            <Link
              href="/quote"
              className="bg-black text-white px-4 md:px-6 lg:px-8 xl:px-10 py-2 md:py-3 lg:py-4 xl:py-5 rounded-full text-sm md:text-base lg:text-lg xl:text-xl hover:bg-gray-800 transition-colors whitespace-nowrap"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-black hover:text-gray-600 transition-colors"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-4 border-t border-gray-200">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className="block text-base text-black hover:text-gray-600 transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/retainer"
              onClick={closeMobileMenu}
              className="block text-base text-black hover:text-gray-600 transition-colors py-2"
            >
              Retainer Plan
            </Link>
            <Link
              href="/quote"
              onClick={closeMobileMenu}
              className="block bg-black text-white px-6 py-3 rounded-full text-base hover:bg-gray-800 transition-colors text-center"
            >
              Get Quote
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
