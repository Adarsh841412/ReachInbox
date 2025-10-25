import React from 'react';
import { SearchIcon } from './icons/SearchIcon.jsx';
import { MenuIcon } from './icons/MenuIcon.jsx';

const Header = ({ searchTerm, setSearchTerm, onMenuClick }) => {
  return (
    <header className="flex-shrink-0 bg-reach-bg border-b border-reach-border p-4 flex items-center justify-between z-10">
       <button onClick={onMenuClick} className="md:hidden p-2 -ml-2 text-reach-text-dim hover:text-reach-text">
        <MenuIcon className="w-6 h-6" />
      </button>
      <div className="flex-1 max-w-md mx-auto">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-reach-text-dim" />
          </div>
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search emails..."
            className="block w-full bg-reach-dark border border-reach-border rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-reach-primary focus:border-reach-primary transition-colors"
            aria-label="Search emails"
          />
        </div>
      </div>
       <div className="w-8 md:hidden" />
    </header>
  );
};

export default Header;
