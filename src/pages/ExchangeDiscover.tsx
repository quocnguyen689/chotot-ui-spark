import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, X, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
const ExchangeDiscover = () => {
  const navigate = useNavigate();
  const {
    groupId
  } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample data - in real app this would come from API based on groupId
  const items = [{
    id: 1,
    title: 'Áo khoác Denim Vintage',
    description: 'Áo khoác denim kinh điển thập niên 90 trong tình trạng tuyệt vời. Hoàn hảo để phối đồ!',
    location: 'Trung tâm, cách 2km',
    owner: 'StyleSeeker',
    video: 'https://images.unsplash.com/photo-1521577352947-9bb58764b69a?w=400&h=600&fit=crop',
    offers: 3
  }, {
    id: 2,
    title: 'Túi xách da thật',
    description: 'Túi xách da thật cao cấp, được bảo quản cẩn thận. Thiết kế thanh lịch và sang trọng.',
    location: 'Quận 1, cách 1.5km',
    owner: 'FashionLover',
    video: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=600&fit=crop',
    offers: 5
  }, {
    id: 3,
    title: 'Giày sneaker limited',
    description: 'Giày sneaker phiên bản giới hạn, chỉ đi vài lần. Còn nguyên hộp và phụ kiện.',
    location: 'Quận 3, cách 3km',
    owner: 'SneakerHead',
    video: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=600&fit=crop',
    offers: 2
  }];
  const currentItem = items[currentIndex];
  const handlePass = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };
  const handleLike = () => {
    console.log('Liked item:', currentItem.id);
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };
  const handleSwap = () => {
    console.log('Swap initiated for item:', currentItem.id);
    navigate(`/exchange/${groupId}/item/${currentItem.id}`);
  };
  const handleItemClick = () => {
    navigate(`/exchange/${groupId}/item/${currentItem.id}`);
  };
  if (!currentItem) {
    return <div className="min-h-screen bg-gray-50 max-w-sm mx-auto flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Hết món đồ rồi!</h2>
          <p className="text-gray-600 mb-4">Quay lại sau để xem thêm món đồ mới</p>
          <Button onClick={() => navigate('/exchange')} className="bg-yellow-brand text-black">
            Quay lại
          </Button>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-gray-900 max-w-sm mx-auto relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/exchange')} className="p-2">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div className="bg-black/30 px-3 py-1 rounded-full">
            <span className="text-white text-sm font-medium">{currentItem.offers} lời đề nghị</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative h-screen" onClick={handleItemClick}>
        {/* Video/Image Background */}
        <div className="absolute inset-0">
          <img src={currentItem.video} alt={currentItem.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"></div>
        </div>

        {/* Item Info */}
        <div className="absolute bottom-32 left-0 right-0 p-6 text-white z-10">
          <h1 className="text-2xl font-bold mb-2">{currentItem.title}</h1>
          <p className="text-gray-200 text-sm mb-3 leading-relaxed">
            {currentItem.description}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-300">
            <div className="flex items-center space-x-1">
              <span>📍</span>
              <span>{currentItem.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>👤</span>
              <span>{currentItem.owner}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-6 left-0 right-0 px-6 z-10" onClick={e => e.stopPropagation()}>
          <p className="text-center text-gray-300 text-sm mb-4">Vuốt trái để bỏ qua • Vuốt phải để thích
• Nhấn để xem chi tiết</p>
          <div className="flex items-center justify-center space-x-6">
            {/* Pass Button */}
            

            {/* Like Button */}
            <button onClick={handleLike} className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors bg-black/[0.31]">
              <Heart className="w-6 h-6 text-white" />
            </button>

            {/* Swap Button */}
            <button onClick={handleSwap} className="bg-yellow-brand px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-yellow-brand/90 transition-colors text-gray-950">
              Trao đổi
            </button>
          </div>
        </div>
      </div>
    </div>;
};
export default ExchangeDiscover;