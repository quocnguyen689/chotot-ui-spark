
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Heart, MapPin, X, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const ExchangeDiscover = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTooltip, setShowTooltip] = useState(true);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);

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
    
    // Trigger heart animation
    setShowHeartAnimation(true);
    setTimeout(() => {
      setShowHeartAnimation(false);
    }, 1000);
    
    // Move to next item after a slight delay
    setTimeout(() => {
      if (currentIndex < items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
    }, 300);
  };

  const handleSwap = () => {
    console.log('Swap initiated for item:', currentItem.id);
    navigate(`/exchange/${groupId}/item/${currentItem.id}`);
  };

  const handleItemClick = () => {
    navigate(`/exchange/${groupId}/item/${currentItem.id}`);
  };

  if (!currentItem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black max-w-sm mx-auto flex items-center justify-center">
        <div className="text-center px-8">
          <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 flex items-center justify-center backdrop-blur-sm">
            <span className="text-3xl">✨</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">
            Hết món đồ rồi!
          </h2>
          <p className="text-white/60 mb-10 text-base leading-relaxed max-w-xs mx-auto">
            Quay lại sau để xem thêm món đồ mới nhé
          </p>
          <Button 
            onClick={() => navigate('/exchange')} 
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 rounded-2xl px-8 py-4 font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Quay lại
          </Button>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black max-w-sm mx-auto relative overflow-hidden">
        {/* Heart Animation Overlay */}
        {showHeartAnimation && (
          <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="animate-ping">
              <Heart className="w-24 h-24 text-pink-500 fill-pink-500 drop-shadow-2xl" />
            </div>
            <div className="absolute animate-bounce">
              <Heart className="w-20 h-20 text-pink-400 fill-pink-400" />
            </div>
          </div>
        )}

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 p-6">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/exchange')} 
              className="w-12 h-12 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-black/70 hover:scale-110 active:scale-95"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/10">
              <span className="text-white text-sm font-semibold">
                {currentItem.offers} offers
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative h-screen" onClick={handleItemClick}>
          {/* Image Background */}
          <div className="absolute inset-0">
            <img src={currentItem.video} alt={currentItem.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30"></div>
          </div>

          {/* Item Info */}
          <div className="absolute bottom-44 left-0 right-0 px-6 text-white z-10">
            <h1 className="text-3xl font-bold mb-4 tracking-tight leading-tight text-white drop-shadow-lg">
              {currentItem.title}
            </h1>
            
            {/* Owner info */}
            <div className="flex items-center space-x-3 mb-6">
              <Avatar className="w-8 h-8 ring-2 ring-white/20">
                <AvatarImage src={currentItem.ownerAvatar} alt={currentItem.owner} />
                <AvatarFallback className="w-8 h-8 text-sm bg-gradient-to-br from-purple-500 to-pink-500 text-white font-semibold">
                  {currentItem.owner.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="text-white/90 text-base font-medium">{currentItem.owner}</span>
            </div>
            
            <p className="text-white/80 text-lg mb-6 leading-relaxed font-light max-w-sm">
              {currentItem.description}
            </p>
            
            {/* Location */}
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-xl rounded-2xl px-5 py-3 border border-white/10 w-fit">
              <MapPin className="w-5 h-5 text-white/90" />
              <span className="text-white/90 text-base font-medium">{currentItem.location}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="absolute bottom-8 left-0 right-0 px-6 z-10" onClick={e => e.stopPropagation()}>
            {/* Help Tooltip */}
            {showTooltip && (
              <Tooltip open={showTooltip}>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-center mb-8">
                    <div className="backdrop-blur-xl px-5 border border-white/20 flex items-center space-x-3 rounded-2xl py-4 bg-black/40">
                      <HelpCircle className="w-5 h-5 text-white/70" />
                      <span className="text-white/70 text-sm font-medium">
                        Swipe to discover • Tap for details
                      </span>
                      <button 
                        onClick={() => setShowTooltip(false)} 
                        className="ml-2 p-1 hover:bg-white/10 rounded-full transition-colors"
                      >
                        <X className="w-4 h-4 text-white/70" />
                      </button>
                    </div>
                  </div>
                </TooltipTrigger>
              </Tooltip>
            )}
            
            <div className="flex items-center justify-center space-x-6">
              {/* Like Button */}
              <button 
                onClick={handleLike} 
                className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-pink-500/30 hover:border-pink-400/50 hover:scale-110 active:scale-95 group"
              >
                <Heart className="w-7 h-7 text-white group-hover:text-pink-300 transition-colors duration-300" />
              </button>

              {/* Swap Button */}
              <button 
                onClick={handleSwap} 
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:from-purple-600 hover:to-pink-600 hover:scale-105 shadow-2xl hover:shadow-purple-500/25 active:scale-95"
              >
                Swap now
              </button>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ExchangeDiscover;
