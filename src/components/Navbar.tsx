import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import Logo from './Logo';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentPath = location.pathname;
  const { theme, toggleTheme } = useContext(ThemeContext);

  const menuItems = [
    { id: '/', label: 'Home' },
    { id: '/about', label: 'About' },
    { id: '/contact', label: 'Contact' },
  ];

  return (
    <header className="bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div onClick={() => navigate('/')} role="button">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10 items-center">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`
                  text-sm font-medium px-1 py-2 transition-colors uppercase tracking-wide
                  ${currentPath === item.id 
                    ? 'border-b-2 border-primary-600 dark:border-primary-500 text-primary-600 dark:text-primary-500' 
                    : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}
                `}
              >
                {item.label}
              </button>
            ))}
            {/* Theme toggle button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun size={20} className="text-white" />
              ) : (
                <Moon size={20} className="text-neutral-700" />
              )}
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button 
              onClick={toggleTheme}
              className="p-2 mr-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun size={20} className="text-white" />
              ) : (
                <Moon size={20} className="text-neutral-700" />
              )}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-4 space-y-1 px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  navigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`
                  block w-full text-left px-3 py-3 uppercase text-sm tracking-wide
                  ${currentPath === item.id
                    ? 'bg-neutral-50 dark:bg-neutral-800 text-primary-600 dark:text-primary-500'
                    : 'text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white'}
                `}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;