
import React from 'react';
import { Search, Bell } from 'lucide-react';

const Header = () => {
  return (
    <div className="bg-yellow-brand p-4 rounded-b-3xl shadow-lg">
      {/* Status bar simulation */}
      <div className="flex justify-between items-center text-black text-sm font-medium mb-4">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-black rounded-full"></div>
            <div className="w-1 h-3 bg-black rounded-full"></div>
            <div className="w-1 h-3 bg-black rounded-full"></div>
            <div className="w-1 h-3 bg-black/50 rounded-full"></div>
          </div>
          <div className="w-6 h-3 bg-black rounded-sm"></div>
        </div>
      </div>

      {/* Main header content */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="text-black text-sm mb-1">Chào buổi sáng,</div>
          <div className="text-black text-lg font-bold">Bạn muốn mua gì</div>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Heart className="w-6 h-6 text-black" />
          </div>
          <div className="relative">
            <Bell className="w-6 h-6 text-black" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">2</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Tìm lành aqua..."
          className="w-full bg-white rounded-full py-3 pl-4 pr-12 text-gray-700 placeholder-gray-400 shadow-sm"
        />
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-yellow-brand rounded-full flex items-center justify-center">
          <Search className="w-4 h-4 text-black" />
        </button>
      </div>

      {/* Phone illustration */}
      <div className="absolute top-16 right-4">
        <div className="w-16 h-20 bg-gradient-to-br from-gray-800 to-black rounded-lg transform rotate-12">
          <div className="w-2 h-2 bg-gray-600 rounded-full absolute top-1 left-1"></div>
          <div className="w-2 h-2 bg-gray-600 rounded-full absolute top-1 right-1"></div>
        </div>
      </div>
    </div>
  );
};

// Simple Heart icon component since it's not in the allowed lucide icons
const Heart = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

export default Header;
