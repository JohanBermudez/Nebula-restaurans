import React from 'react';
import { Bell, Search, User, ChevronDown } from 'lucide-react';
import { User as UserType } from '../../types';

interface HeaderProps {
  user: UserType;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="bg-white border-b border-gray-200 h-16 px-6 flex items-center justify-between">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light sm:text-sm"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-1.5 rounded-full hover:bg-gray-100 relative">
          <Bell size={20} className="text-text-light" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>
        
        <div className="flex items-center">
          <div className="flex items-center space-x-3 border-r pr-4 mr-4">
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-text-dark">{user.name}</span>
              <span className="text-xs text-text-light capitalize">{user.role.replace('_', ' ')}</span>
            </div>
          </div>
          
          <div className="flex items-center">
            <button className="flex items-center space-x-2 group">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-primary-light flex items-center justify-center text-white">
                  <User size={16} />
                </div>
              )}
              <ChevronDown size={16} className="text-text-light group-hover:text-text-dark" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
