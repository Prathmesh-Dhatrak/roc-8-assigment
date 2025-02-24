import { useState } from 'react';
import { Bell, UserCircle, Menu, X } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-[#1A1D29]">
      {/* Main header content */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4">
        <div className="flex items-center gap-4 sm:gap-8">
          <h1 className="text-cyan-400 text-lg sm:text-xl font-bold">HOURS</h1>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-4 lg:gap-6">
            <a href="#" className="text-white hover:text-cyan-400 text-sm lg:text-base">Dashboard</a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 text-sm lg:text-base">Projects</a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 text-sm lg:text-base">Team</a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 text-sm lg:text-base">Clients</a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 text-sm lg:text-base">Time</a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 text-sm lg:text-base">Reports</a>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button className="text-gray-400 hover:text-white p-2">
            <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <div className="flex items-center gap-2">
            <UserCircle className="w-7 h-7 sm:w-8 sm:h-8 text-gray-400" />
            <span className="text-white text-sm sm:text-base">Mario</span>
          </div>
          {/* Mobile menu button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-400 hover:text-white"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <nav className="px-4 sm:px-6 py-4 space-y-2 border-t border-gray-700">
          <a 
            href="#" 
            className="block py-2 px-4 text-white hover:bg-gray-700 rounded-lg text-sm"
          >
            Dashboard
          </a>
          <a 
            href="#" 
            className="block py-2 px-4 text-gray-400 hover:bg-gray-700 rounded-lg text-sm"
          >
            Projects
          </a>
          <a 
            href="#" 
            className="block py-2 px-4 text-gray-400 hover:bg-gray-700 rounded-lg text-sm"
          >
            Team
          </a>
          <a 
            href="#" 
            className="block py-2 px-4 text-gray-400 hover:bg-gray-700 rounded-lg text-sm"
          >
            Clients
          </a>
          <a 
            href="#" 
            className="block py-2 px-4 text-gray-400 hover:bg-gray-700 rounded-lg text-sm"
          >
            Time
          </a>
          <a 
            href="#" 
            className="block py-2 px-4 text-gray-400 hover:bg-gray-700 rounded-lg text-sm"
          >
            Reports
          </a>
        </nav>
      </div>
    </header>
  );
};