
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, X } from 'lucide-react';

const categories = [
  {
    name: 'Bất động sản',
    icon: '🏢'
  },
  {
    name: 'Xe cộ',
    icon: '🛵'
  },
  {
    name: 'Đồ điện tử',
    icon: '📱'
  },
  {
    name: 'Việc làm',
    icon: '💼'
  },
  {
    name: 'Dịch vụ chăm sóc nhà cửa',
    icon: '🏠'
  },
  {
    name: 'Thú cưng',
    icon: '🐕'
  },
  {
    name: 'Đồ ăn, thực phẩm và các loại khác',
    icon: '🍴'
  },
  {
    name: 'Tủ lạnh, máy lạnh, máy giặt',
    icon: '❄️'
  },
  {
    name: 'Đồ gia dụng, nội thất, cây cảnh',
    icon: '🛋️'
  },
  {
    name: 'Mẹ và bé',
    icon: '🍼'
  }
];

const PostCategory = () => {
  const navigate = useNavigate();

  const handleCategorySelect = (categoryName: string) => {
    navigate('/post/form', { state: { category: categoryName } });
  };

  const handleAIQuickPost = () => {
    // Navigate to AI quick post functionality
    console.log('Navigate to AI quick post');
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-sm mx-auto">
      {/* Header */}
      <div className="bg-yellow-brand p-4 flex items-center justify-center relative">
        <button onClick={() => navigate('/')} className="absolute left-4 p-2">
          <X className="w-6 h-6 text-black" />
        </button>
        <h1 className="text-lg font-bold text-black">Danh mục</h1>
      </div>

      {/* Content */}
      <div className="bg-white">
        {/* Quick Post Section */}
        <div className="p-4 bg-gray-50">
          <h2 className="text-lg font-bold text-gray-900 mb-3">ĐĂNG TIN NHANH</h2>
          
          <button 
            onClick={handleAIQuickPost}
            className="w-full bg-gradient-to-r from-orange-100 to-yellow-100 border border-orange-200 rounded-2xl p-4 flex items-center justify-between hover:from-orange-200 hover:to-yellow-200 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-brand rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-black">AI</span>
              </div>
              <div className="text-left">
                <h3 className="text-base font-bold text-gray-900">Đăng nhanh bằng AI</h3>
                <p className="text-sm text-gray-600">Bạn quay sản phẩm, AI tạo tin đăng</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          
          <p className="text-center text-xs text-gray-500 mt-3 italic">
            Chưa hỗ trợ Bất động sản, Việc làm và Dịch vụ
          </p>
        </div>

        {/* Category Selection */}
        <div className="p-4 bg-gray-50">
          <h2 className="text-lg font-bold text-gray-900 mb-4">CHỌN DANH MỤC</h2>
        </div>

        <div className="bg-white">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategorySelect(category.name)}
              className="w-full flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <span className="text-2xl">{category.icon}</span>
                <span className="text-gray-900 text-left font-medium">{category.name}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostCategory;
