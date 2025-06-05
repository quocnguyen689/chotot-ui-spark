
import React from 'react';
import { TrendingUp, Eye } from 'lucide-react';
import { trendingItems } from '@/data/trendingItems';

const TrendingSection = () => {
  return (
    <div className="bg-gradient-to-br from-yellow-brand via-orange-400 to-pink-500 rounded-2xl p-4 mt-4 relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-center space-x-2 mb-3">
          <TrendingUp className="w-5 h-5 text-white" />
          <h2 className="text-lg font-bold text-white">Xu hướng trao đổi</h2>
          <div className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full">
            <span className="text-white text-xs font-medium">HOT</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {trendingItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-2 left-2 right-2">
                  <h4 className="font-bold text-white text-sm leading-tight mb-1">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-white/80">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{item.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-green-300 font-medium">{item.trend}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingSection;
