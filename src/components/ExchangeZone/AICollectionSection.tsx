
import React from 'react';
import { Sparkles } from 'lucide-react';
import CollectionGrid from './CollectionGrid';

const AICollectionSection = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative">
          <Sparkles className="w-5 h-5 text-yellow-brand animate-pulse" />
          <div className="absolute inset-0 w-5 h-5 bg-yellow-brand/20 rounded-full animate-ping"></div>
        </div>
        <h3 className="font-bold text-gray-900 text-base">
          Bộ sưu tập AI gợi ý cho bạn
        </h3>
        <div className="px-2 py-1 bg-gradient-to-r from-yellow-brand to-orange-400 text-white text-xs font-medium rounded-full animate-pulse">
          AI
        </div>
      </div>
      
      <CollectionGrid showAIEffects={true} />
    </div>
  );
};

export default AICollectionSection;
