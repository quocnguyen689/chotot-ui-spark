
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';

const categories = [
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
  },
  {
    name: 'Thời trang, Đồ dùng cá nhân',
    icon: '👕'
  },
  {
    name: 'Giải trí, Thể thao, Sở thích',
    icon: '🎮'
  },
  {
    name: 'Đồ dùng văn phòng, công nghiệp',
    icon: '🖨️'
  },
  {
    name: 'Dịch vụ, Du lịch',
    icon: '🔧'
  }
];

const PostCategory = () => {
  const navigate = useNavigate();

  const handleCategorySelect = (categoryName: string) => {
    navigate('/post/form', { state: { category: categoryName } });
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-sm mx-auto">
      {/* Header */}
      <div className="bg-yellow-brand p-4 flex items-center justify-between">
        <button onClick={() => navigate('/')} className="p-2">
          <ArrowLeft className="w-6 h-6 text-black" />
        </button>
        <h1 className="text-lg font-bold text-black">chợ TỐT</h1>
        <button className="bg-white/20 px-4 py-2 rounded-lg">
          <span className="text-black text-sm font-medium">Lưu nhập</span>
        </button>
      </div>

      {/* Category Selection */}
      <div className="p-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Danh Mục Tin Đăng</span>
            <span className="text-red-500">*</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Bottom Sheet Content */}
        <div className="bg-white rounded-t-3xl fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm shadow-lg">
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <button onClick={() => navigate('/')}>
                <span className="text-2xl">✕</span>
              </button>
              <h2 className="text-lg font-bold">Đăng tin</h2>
              <div></div>
            </div>

            <div className="space-y-0">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleCategorySelect(category.name)}
                  className="w-full flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{category.icon}</span>
                    <span className="text-gray-900 text-left">{category.name}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCategory;
