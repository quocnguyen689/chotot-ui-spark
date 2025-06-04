
import React, { useState } from 'react';
import { Home, Search, Bell, User } from 'lucide-react';

const BottomNavigation = () => {
  const [activeTab, setActiveTab] = useState('Trang chủ');

  const navItems = [
    { name: 'Trang chủ', icon: Home, active: true },
    { name: 'Quan tâm', icon: BookmarkIcon, active: false },
    { name: 'Đăng tin', icon: PlusIcon, active: false, isSpecial: true },
    { name: 'Chat', icon: ChatIcon, active: false, hasNotification: true },
    { name: 'Tài khoản', icon: User, active: false }
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200 px-4 py-2 shadow-lg">
      <div className="flex justify-around items-center">
        {navItems.map((item, index) => (
          <button
            key={item.name}
            onClick={() => setActiveTab(item.name)}
            className={`flex flex-col items-center py-2 px-2 transition-colors ${
              item.isSpecial 
                ? 'bg-yellow-brand rounded-full px-4 py-2 shadow-md' 
                : activeTab === item.name 
                  ? 'text-yellow-brand' 
                  : 'text-gray-500'
            }`}
          >
            <div className="relative">
              <item.icon className={`w-5 h-5 ${item.isSpecial ? 'text-black' : ''}`} />
              {item.hasNotification && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              )}
            </div>
            <span className={`text-xs mt-1 font-medium ${
              item.isSpecial ? 'text-black' : ''
            }`}>
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Custom icons for specific navigation items
const BookmarkIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
  </svg>
);

const PlusIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const ChatIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

export default BottomNavigation;
