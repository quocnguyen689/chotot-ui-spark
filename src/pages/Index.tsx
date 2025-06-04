
import React from 'react';
import Header from '../components/Header';
import CategoryMenu from '../components/CategoryMenu';
import ProductFeed from '../components/ProductFeed';
import BottomNavigation from '../components/BottomNavigation';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-sm mx-auto relative">
      {/* Header with greeting and search */}
      <Header />
      
      {/* Category Menu */}
      <CategoryMenu />
      
      {/* Product Feed */}
      <ProductFeed />
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Index;
