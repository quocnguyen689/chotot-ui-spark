import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Heart, MapPin, X, HelpCircle, Edit2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const ExchangeDiscover = () => {
  const navigate = useNavigate();
  const {
    groupId
  } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTooltip, setShowTooltip] = useState(true);
  const [tooltipText, setTooltipText] = useState('Vuốt trái để bỏ qua • Vuốt phải để thích • Nhấn để xem chi tiết');
  const [isEditingTooltip, setIsEditingTooltip] = useState(false);
  const [tempTooltipText, setTempTooltipText] = useState(tooltipText);

  // Sample data - in real app this would come from API based on groupId
  const items = [{
    id: 1,
    title: 'Áo khoác Denim Vintage',
    description: 'Áo khoác denim kinh điển thập niên 90 trong tình trạng tuyệt vời. Hoàn hảo để phối đồ!',
    location: 'Trung tâm, cách 2km',
    owner: 'StyleSeeker',
    ownerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
    video: 'https://images.unsplash.com/photo-1521577352947-9bb58764b69a?w=400&h=600&fit=crop',
    offers: 3
  }, {
    id: 2,
    title: 'Túi xách da thật',
    description: 'Túi xách da thật cao cấp, được bảo quản cẩn thận. Thiết kế thanh lịch và sang trọng.',
    location: 'Quận 1, cách 1.5km',
    owner: 'FashionLover',
    ownerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
    video: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=600&fit=crop',
    offers: 5
  }, {
    id: 3,
    title: 'Giày sneaker limited',
    description: 'Giày sneaker phiên bản giới hạn, chỉ đi vài lần. Còn nguyên hộp và phụ kiện.',
    location: 'Quận 3, cách 3km',
    owner: 'SneakerHead',
    ownerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
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
  const handleEditTooltip = () => {
    setTempTooltipText(tooltipText);
    setIsEditingTooltip(true);
  };

  const handleSaveTooltip = () => {
    setTooltipText(tempTooltipText);
    setIsEditingTooltip(false);
  };

  const handleCancelEdit = () => {
    setTempTooltipText(tooltipText);
    setIsEditingTooltip(false);
  };

  if (!currentItem) {
    return <div className="min-h-screen bg-black max-w-sm mx-auto flex items-center justify-center">
        <div className="text-center px-8">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-2xl">✨</span>
          </div>
          <h2 className="text-xl font-bold text-white mb-3 tracking-tight">
            Hết món đồ rồi!
          </h2>
          <p className="text-white/70 mb-8 text-sm leading-relaxed">
            Quay lại sau để xem thêm món đồ mới nhé
          </p>
          <Button onClick={() => navigate('/exchange')} className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-3 font-medium transition-all duration-200">
            Quay lại
          </Button>
        </div>
      </div>;
  }
  return <TooltipProvider>
      <div className="min-h-screen bg-black max-w-sm mx-auto relative overflow-hidden">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 p-6">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate('/exchange')} className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:bg-black/60">
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <span className="text-white text-sm font-medium">
                {currentItem.offers} lời đề nghị
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative h-screen" onClick={handleItemClick}>
          {/* Image Background */}
          <div className="absolute inset-0">
            <img src={currentItem.video} alt={currentItem.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40"></div>
          </div>

          {/* Item Info */}
          <div className="absolute bottom-36 left-0 right-0 px-6 text-white z-10">
            <h1 className="text-2xl font-bold mb-3 tracking-tight leading-tight">
              {currentItem.title}
            </h1>
            
            {/* Owner info under title */}
            <div className="flex items-center space-x-2 mb-4">
              <Avatar className="w-6 h-6">
                <AvatarImage src={currentItem.ownerAvatar} alt={currentItem.owner} />
                <AvatarFallback className="w-6 h-6 text-xs bg-white/20">
                  {currentItem.owner.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="text-white/90 text-sm font-medium">{currentItem.owner}</span>
            </div>
            
            <p className="text-white/80 text-base mb-6 leading-relaxed font-light">
              {currentItem.description}
            </p>
            
            {/* Location in separate row */}
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10 w-fit">
              <MapPin className="w-4 h-4 text-white/90" />
              <span className="text-white/90 text-sm font-medium">{currentItem.location}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="absolute bottom-8 left-0 right-0 px-6 z-10" onClick={e => e.stopPropagation()}>
            {/* Help Tooltip */}
            {showTooltip && (
              <Tooltip open={showTooltip}>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-center mb-6">
                    <div className="backdrop-blur-sm px-4 border border-white/20 flex items-center space-x-2 rounded-2xl py-[16px] bg-zinc-950">
                      <HelpCircle className="w-4 h-4 text-white/70" />
                      {isEditingTooltip ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={tempTooltipText}
                            onChange={(e) => setTempTooltipText(e.target.value)}
                            className="bg-transparent text-white/70 text-sm font-light border-none outline-none min-w-0 flex-1"
                            autoFocus
                          />
                          <button
                            onClick={handleSaveTooltip}
                            className="p-1 hover:bg-white/10 rounded-full transition-colors"
                          >
                            <Check className="w-3 h-3 text-green-400" />
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="p-1 hover:bg-white/10 rounded-full transition-colors"
                          >
                            <X className="w-3 h-3 text-red-400" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <span className="text-white/70 text-sm font-light">
                            {tooltipText}
                          </span>
                          <button
                            onClick={handleEditTooltip}
                            className="p-1 hover:bg-white/10 rounded-full transition-colors"
                          >
                            <Edit2 className="w-3 h-3 text-white/70" />
                          </button>
                          <button
                            onClick={() => setShowTooltip(false)}
                            className="p-1 hover:bg-white/10 rounded-full transition-colors"
                          >
                            <X className="w-3 h-3 text-white/70" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </TooltipTrigger>
              </Tooltip>
            )}
            
            <div className="flex items-center justify-center space-x-4">
              {/* Like Button */}
              <button onClick={handleLike} className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 hover:bg-white/25 hover:scale-105">
                <Heart className="w-6 h-6 text-white" />
              </button>

              {/* Swap Button */}
              <button onClick={handleSwap} className="bg-white text-black px-8 py-4 rounded-full font-semibold text-base transition-all duration-200 hover:bg-white/90 hover:scale-105 shadow-lg">
                Trao đổi
              </button>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>;
};
export default ExchangeDiscover;
