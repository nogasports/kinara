import { useState } from 'react';
import { Bell, Search, Settings, User } from 'lucide-react';

export default function TopNav() {
  const [notifications] = useState(3); // Example notification count

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center px-4 sticky top-0 z-50">
      <div className="flex-1 flex items-center">
        {/* Search Bar */}
        <div className="max-w-lg w-full lg:max-w-xs relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="search"
            placeholder="Search..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-[2deg] leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Right side icons */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500">
          <Bell className="h-6 w-6" />
          {notifications > 0 && (
            <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs font-medium flex items-center justify-center transform -translate-y-1/2 translate-x-1/2">
              {notifications}
            </span>
          )}
        </button>

        {/* Settings */}
        <button className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500">
          <Settings className="h-6 w-6" />
        </button>

        {/* Profile */}
        <button className="flex items-center text-sm focus:outline-none">
          <span className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
            <User className="h-5 w-5 text-primary-600" />
          </span>
        </button>
      </div>
    </div>
  );
}