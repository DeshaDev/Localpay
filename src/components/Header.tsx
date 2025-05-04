import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, ChevronLeft } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import WalletConnect from './WalletConnect';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showThemeToggle?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBack = false,
  showThemeToggle = true
}) => {
  const location = useLocation();
  const [darkMode, setDarkMode] = React.useState(false);
  const { isConnected } = useUserStore();
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {showBack && location.pathname !== '/' && (
            <Link to="/" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <ChevronLeft size={24} className="text-gray-700 dark:text-gray-300" />
            </Link>
          )}
          
          {title ? (
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h1>
          ) : (
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                LP
              </div>
              <span className="text-xl font-bold text-gray-800 dark:text-white">LocalPay</span>
            </Link>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          {showThemeToggle && (
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              {darkMode ? (
                <Sun size={20} className="text-yellow-500" />
              ) : (
                <Moon size={20} className="text-gray-700" />
              )}
            </button>
          )}
          
          {isConnected ? <WalletConnect /> : null}
        </div>
      </div>
    </header>
  );
};

export default Header;