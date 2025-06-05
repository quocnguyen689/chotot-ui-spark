
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { exchangeGroups } from '@/data/exchangeGroups';

interface CollectionGridProps {
  showAIEffects?: boolean;
}

const CollectionGrid = ({ showAIEffects = false }: CollectionGridProps) => {
  const navigate = useNavigate();

  const handleCollectionClick = (groupId: number) => {
    navigate(`/exchange/${groupId}/discover`);
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {exchangeGroups.map((group) => (
        <div 
          key={group.id} 
          className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative group"
          onClick={() => handleCollectionClick(group.id)}
        >
          {/* AI Shimmer Effect */}
          {showAIEffects && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-brand/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
          )}
          
          <div className="aspect-square relative overflow-hidden">
            <img 
              src={group.image} 
              alt={group.name} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute bottom-2 left-2 right-2">
              <h4 className="font-bold text-white text-sm leading-tight mb-1">
                {group.name}
              </h4>
              <p className="text-white/80 text-xs">{group.memberCount}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollectionGrid;
