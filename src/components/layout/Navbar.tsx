import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-50">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl md:text-2xl font-bold text-black">
              Zyntrex
            </Link>
          </div>

          {/* Navigation Links - Center */}
          <div className="hidden md:flex items-center gap-3 md:gap-4 lg:gap-6 xl:gap-8 flex-1 justify-center px-4">
            <Link
              href="/process"
              className="text-sm md:text-base text-black hover:text-gray-600 transition-colors whitespace-nowrap"
            >
              Our Process
            </Link>
            <Link
              href="/case-study"
              className="text-sm md:text-base text-black hover:text-gray-600 transition-colors whitespace-nowrap"
            >
              Case Study
            </Link>
            <Link
              href="/services"
              className="text-sm md:text-base text-black hover:text-gray-600 transition-colors whitespace-nowrap"
            >
              Our Services
            </Link>
            <Link
              href="/about"
              className="text-sm md:text-base text-black hover:text-gray-600 transition-colors whitespace-nowrap"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm md:text-base text-black hover:text-gray-600 transition-colors whitespace-nowrap"
            >
              Contact
            </Link>
          </div>

          {/* Action Items - Right */}
          <div className="flex items-center gap-3 md:gap-4 lg:gap-6 flex-shrink-0">
            <Link
              href="/retainer"
              className="hidden md:block text-sm md:text-base text-black hover:text-gray-600 transition-colors whitespace-nowrap"
            >
              Retainer Plan
            </Link>
            <Link
              href="/quote"
              className="bg-black text-white px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base hover:bg-gray-800 transition-colors whitespace-nowrap"
            >
              Get Quote
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
