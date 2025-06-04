
import React, { useState } from 'react';

interface Product {
  id: number;
  image: string;
  timeAgo: string;
  title: string;
  specs: string;
  price: string;
  location: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
      {/* Image container */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-32 object-cover"
        />
        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {product.timeAgo}
        </div>
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm"
        >
          <HeartIcon filled={isLiked} className="w-4 h-4" />
        </button>
        <div className="absolute bottom-2 right-2 flex gap-1">
          <CameraIcon className="w-4 h-4 text-white" />
          <span className="text-white text-xs">6</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
          {product.title}
        </h3>
        <p className="text-xs text-gray-500 mb-2 line-clamp-1">
          {product.specs}
        </p>
        <p className="text-red-price font-bold text-sm mb-1">
          {product.price}
        </p>
        <p className="text-xs text-gray-400">
          {product.location}
        </p>
      </div>
    </div>
  );
};

// Custom Heart Icon component
const HeartIcon = ({ filled, className }: { filled: boolean; className: string }) => (
  <svg 
    className={className} 
    fill={filled ? '#ef4444' : 'none'} 
    viewBox="0 0 24 24" 
    stroke={filled ? '#ef4444' : 'currentColor'}
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

// Custom Camera Icon component
const CameraIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 15.2c1.8 0 3.2-1.4 3.2-3.2s-1.4-3.2-3.2-3.2-3.2 1.4-3.2 3.2 1.4 3.2 3.2 3.2zm0-5.2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/>
    <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm11 15H4V6h4.05l1.83-2h4.24l1.83 2H20v11z"/>
  </svg>
);

export default ProductCard;
