import React, { useState } from 'react';
import ProductCard from './ProductCard';

const mockProducts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop',
    timeAgo: '2 giờ trước',
    title: 'Mercedes Benz C Class 2017 C300 AMG - 14000...',
    specs: '140000 km • Xăng • Tự động',
    price: '3.600.000 đ',
    location: 'Quận Bình Tân'
  }, {
    id: 2,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    timeAgo: '2 giờ trước',
    title: 'Samsung Galaxy S22 Ultra 5G USA 2 Sim New 100%',
    specs: 'Intel core i5 • 256GB SSD',
    price: '3.600.000 đ',
    location: 'Quận Bình Tân'
  }, {
    id: 3,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop',
    timeAgo: '2 giờ trước',
    title: 'Mercedes Benz C Class 2017 C300 AMG - 14000...',
    specs: '140000 km • Xăng • Tự động',
    price: '960 triệu',
    location: 'Quận Bình Tân'
  }, {
    id: 4,
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
    timeAgo: '2 giờ trước',
    title: 'Biệt thự Nguyễn Thị Thập Q7 Thông Phú Mỹ Hưng...',
    specs: '2PN • Đầy đủ nội thất • 960 triệu • 68 tr/m² • 47 m²',
    price: '960 triệu',
    location: 'Quận Bình Tân'
  }, {
    id: 5,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
    timeAgo: '2 giờ trước',
    title: 'áo khoác thể thao Nike Us Classic đen trắng form M',
    specs: 'Đã sử dụng',
    price: '6.3 tỷ',
    location: 'Quận 7'
  }, {
    id: 6,
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
    timeAgo: '2 giờ trước',
    title: 'Căn hộ Belleza Quận 7 Giá tốt. Có Thương Lượng. Hỗ...',
    specs: 'Intel core i5 • 256GB SSD • 6.3 tỷ • 68 tr/m² • 47 m²',
    price: '6.3 tỷ',
    location: 'Quận 7'
  }
];

const ProductFeed = () => {
  const [activeTab, setActiveTab] = useState('Dành cho bạn');
  const tabs = ['Dành cho bạn', 'Video', 'Mới nhất', 'Gần bạn'];

  return (
    <div className="flex-1 bg-white">
      {/* Tab navigation with horizontal scroll */}
      <div className="flex pt-4 pb-2 border-b border-gray-100 overflow-x-auto scrollbar-hide">
        <div className="flex space-x-2 px-4 min-w-max">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                activeTab === tab 
                  ? 'bg-yellow-brand text-black' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 gap-2 p-4 pb-24">
        {mockProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductFeed;
