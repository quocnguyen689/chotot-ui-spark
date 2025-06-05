
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';

const ExchangeZoneHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white backdrop-blur-md p-4 flex items-center justify-between border-b border-gray-100/50 sticky top-0 z-50">
      <button 
        onClick={() => navigate(-1)} 
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <ArrowLeft className="w-5 h-5 text-gray-700" />
      </button>
      <h1 className="text-lg font-semibold text-gray-900">Khu vực trao đổi</h1>
      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
        <Search className="w-5 h-5 text-gray-700" />
      </button>
    </div>
  );
};

export default ExchangeZoneHeader;
