import { Outlet, Link } from 'react-router-dom';
import { Sun, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function PublicLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Sun className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">Kinara Energy</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-primary-600">Home</Link>
              <Link to="/about" className="text-gray-700 hover:text-primary-600">About</Link>
              <Link to="/solutions" className="text-gray-700 hover:text-primary-600">Solutions</Link>
              <Link to="/shop" className="btn btn-primary">Shop Now</Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 space-y-4 pb-4">
              <Link
                to="/"
                className="block text-gray-700 hover:text-primary-600 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block text-gray-700 hover:text-primary-600 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/solutions"
                className="block text-gray-700 hover:text-primary-600 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Solutions
              </Link>
              <Link
                to="/shop"
                className="block text-gray-700 hover:text-primary-600 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
            </div>
          )}
        </nav>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Kinara Energy</h3>
              <p className="text-gray-400">
                Empowering lives with clean, affordable solar energy solutions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/solutions" className="text-gray-400 hover:text-white">
                    Solutions
                  </Link>
                </li>
                <li>
                  <Link to="/shop" className="text-gray-400 hover:text-white">
                    Shop
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@kinaraenergy.com</li>
                <li>Phone: +254 700 000 000</li>
                <li>Address: Nairobi, Kenya</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-[2deg] bg-gray-800 text-white"
                />
                <button type="submit" className="btn btn-primary w-full">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} Kinara Energy. All rights reserved.</p>
            <Link 
              to="/admin" 
              className="text-gray-600 hover:text-gray-500 text-sm mt-2 inline-block"
              style={{ opacity: 0.5 }}
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}