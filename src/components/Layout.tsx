import { ReactNode, useContext } from 'react';
import Navbar from './Navbar';
import { ThemeContext } from '../context/ThemeContext';
import Logo from './Logo';
import {  Instagram, Linkedin, Twitter } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''} bg-white dark:bg-secondary-900 font-['Inter',sans-serif]`}>
      <Navbar />
      <main className="pt-20">
        {children}
      </main>
      {/* Footer Section */}
      <footer className={`py-12 px-8 ${theme === 'dark' ? 'bg-neutral-900 text-neutral-100' : 'bg-white text-neutral-900'}`}>
      <div className="max-w-6xl mx-auto">
        {/* Logo Section */}
        <div className="flex justify-center md:justify-start mb-8">
          <Logo size="medium" /> {/* Add the Logo component here */}
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About SquareOne</h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'}`}>
              SquareOne equips the next generation with modern money skills to build wealth, navigate global finances, and create a life of financial freedom.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/features" className={`hover:text-secondary-600 transition-colors ${theme === 'dark' ? 'text-neutral-100' : 'text-neutral-900'}`}>Features</a></li>
              <li><a href="/pricing" className={`hover:text-secondary-600 transition-colors ${theme === 'dark' ? 'text-neutral-100' : 'text-neutral-900'}`}>Pricing</a></li>
              <li><a href="/about" className={`hover:text-secondary-600 transition-colors ${theme === 'dark' ? 'text-neutral-100' : 'text-neutral-900'}`}>About Us</a></li>
              <li><a href="/contact" className={`hover:text-secondary-600 transition-colors ${theme === 'dark' ? 'text-neutral-100' : 'text-neutral-900'}`}>Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3: Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://x.com/SquareOne_Finan" target="_blank" rel="noopener noreferrer" className={`hover:text-secondary-600 transition-colors ${theme === 'dark' ? 'text-neutral-100' : 'text-neutral-900'}`}>
                <Twitter size={20} />
              </a>
              <a href="https://www.linkedin.com/company/squareonefinance/" target="_blank" rel="noopener noreferrer" className={`hover:text-secondary-600 transition-colors ${theme === 'dark' ? 'text-neutral-100' : 'text-neutral-900'}`}>
                <Linkedin size={20} />
              </a>
              <a href="https://www.instagram.com/msquare.one/" target="_blank" rel="noopener noreferrer" className={`hover:text-secondary-600 transition-colors ${theme === 'dark' ? 'text-neutral-100' : 'text-neutral-900'}`}>
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={`mt-8 pt-8 border-t ${theme === 'dark' ? 'border-neutral-700' : 'border-neutral-200'} text-center`}>
          <p className={`text-sm ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'}`}>
            &copy; {new Date().getFullYear()} SquareOne. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Layout;
