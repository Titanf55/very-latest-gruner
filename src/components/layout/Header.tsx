import React from 'react';
import { Bell, Search, User, LogOut } from 'lucide-react';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className="bg-white border-b border-gray-200 h-[64px] flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        {/* <h1 className="text-lg font-semibold text-gray-900">Admin Panel</h1> */}
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User size={18} className="text-gray-600" />
          </div>
          <span className="text-sm font-medium text-gray-700">Admin</span>
          <button
            onClick={onLogout}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;