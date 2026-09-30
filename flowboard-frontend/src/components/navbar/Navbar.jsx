import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  Search,
  Plus,
  Bell,
  HelpCircle,
  Kanban,
  User,
  LogOut,
  Settings,
  ChevronDown
} from 'lucide-react';

const Navbar = ({ onToggleSidebar, isSidebarOpen }) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/issues?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shadow-xs">
      {/* Left branding & mobile menu toggle */}
      <div className="flex items-center gap-4">
        <button
          className="md:hidden p-1.5 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <Link to="/dashboard" className="flex items-center gap-2.5 no-underline">
          <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-md flex items-center justify-center shadow-xs">
            <Kanban size={18} />
          </div>
          <span className="font-bold text-lg text-gray-900 tracking-tight">
            Flow<span className="text-blue-600">Board</span>
          </span>
        </Link>
      </div>

      {/* Center Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <form className="relative w-full flex items-center" onSubmit={handleSearchSubmit}>
          <Search size={16} className="absolute left-3 text-gray-400 pointer-events-none" />
          <input
            type="text"
            className="w-full pl-9 pr-12 py-1.5 bg-gray-100 border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
            placeholder="Search issues, projects, or users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="absolute right-2.5 text-xs text-gray-400 bg-white border border-gray-200 rounded px-1.5 py-0.5 pointer-events-none">
            ⌘K
          </span>
        </form>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        <button
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-md font-semibold text-sm transition-colors cursor-pointer shadow-xs"
          onClick={() => navigate('/issues?create=true')}
          title="Create New Issue"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">Create</span>
        </button>

        <button className="relative p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer" title="Notifications">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>

        <button className="hidden sm:flex p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer" title="Help & Documentation">
          <HelpCircle size={18} />
        </button>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            aria-expanded={showUserDropdown}
          >
            <div className="w-8 h-8 bg-blue-800 text-white rounded-full flex items-center justify-center font-semibold text-xs">
              JD
            </div>
            <ChevronDown size={14} className="text-gray-500" />
          </button>

          {showUserDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <div className="font-semibold text-sm text-gray-900">John Doe</div>
                <div className="text-xs text-gray-500">john.doe@flowboard.dev</div>
              </div>

              <Link
                to="/users"
                className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setShowUserDropdown(false)}
              >
                <User size={16} />
                Profile & Settings
              </Link>

              <Link
                to="/reports"
                className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setShowUserDropdown(false)}
              >
                <Settings size={16} />
                System Settings
              </Link>

              <div className="my-1 border-t border-gray-100" />

              <button
                className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                onClick={() => {
                  setShowUserDropdown(false);
                  navigate('/login');
                }}
              >
                <LogOut size={16} />
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
