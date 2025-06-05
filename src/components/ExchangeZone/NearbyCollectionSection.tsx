
import React from 'react';
import CollectionGrid from './CollectionGrid';

const NearbyCollectionSection = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-gray-900 text-base">Bộ sưu tập ở gần bạn</h3>
      <CollectionGrid />
    </div>
  );
};

export default NearbyCollectionSection;
