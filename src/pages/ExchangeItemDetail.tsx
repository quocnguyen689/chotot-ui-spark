import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MapPin, User, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import SwapOfferModal from '@/components/SwapOfferModal';

const ExchangeItemDetail = () => {
  const navigate = useNavigate();
  const {
    groupId,
    itemId
  } = useParams();
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [offerCounts, setOfferCounts] = useState({
    pending: 5,
    accepted: 3,
    rejected: 2
  });

  // Auto-increment offer counts every 3-5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setOfferCounts(prev => ({
        pending: prev.pending + Math.floor(Math.random() * 2) + 1,
        accepted: prev.accepted + Math.floor(Math.random() * 2),
        rejected: prev.rejected + Math.floor(Math.random() * 2)
      }));
    }, Math.random() * 2000 + 3000); // Random interval between 3-5 seconds

    return () => clearInterval(interval);
  }, []);

  // Sample data with multiple images for the jacket
  const itemDetail = {
    id: 1,
    title: 'Áo khoác Denim Vintage',
    category: 'Thời trang',
    description: 'Áo khoác denim kinh điển thập niên 90 trong tình trạng tuyệt vời. Hoàn hảo để phối đồ!',
    location: 'Trung tâm, cách 2km',
    owner: 'StyleSeeker',
    images: ['/lovable-uploads/54e9d8b5-fb47-4c2e-885c-046ff5d579da.png', 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1576995853123-425c7b97ccd1?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop'],
    offersCount: 3,
    recentOffers: [{
      id: 1,
      item: 'Loa Bluetooth',
      owner: 'TechLover',
      timeAgo: '2 giờ trước',
      thumbnail: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
      status: 'pending'
    }, {
      id: 2,
      item: 'Máy ảnh Retro',
      owner: 'VintageHunter',
      timeAgo: '5 giờ trước',
      thumbnail: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop',
      status: 'accepted'
    }, {
      id: 3,
      item: 'Bộ sách thiết kế',
      owner: 'BookWorm',
      timeAgo: '1 ngày trước',
      thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
      status: 'rejected'
    }]
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-50 text-orange-800 border border-orange-200 shadow-sm';
      case 'accepted':
        return 'bg-orange-50 text-orange-800 border border-orange-200 shadow-sm';
      case 'rejected':
        return 'bg-gray-50 text-gray-600 border border-gray-200 shadow-sm';
      default:
        return 'bg-gray-50 text-gray-600 border border-gray-200 shadow-sm';
    }
  };
  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Đang chờ';
      case 'accepted':
        return 'Đang chờ';
      case 'rejected':
        return 'Đã từ chối';
      default:
        return 'Không xác định';
    }
  };
  const getOfferCount = (status: string) => {
    return offerCounts[status as keyof typeof offerCounts] || 0;
  };
  const handleMakeOffer = () => {
    console.log('Make offer for item:', itemDetail.id);
    setIsSwapModalOpen(true);
  };
  const handleViewOffer = (offerId: number) => {
    console.log('View offer:', offerId);
  };
  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % itemDetail.images.length);
  };
  const prevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + itemDetail.images.length) % itemDetail.images.length);
  };
  const handleClose = () => {
    navigate(-1);
  };
  return <>
      <Sheet open={true} onOpenChange={handleClose}>
        <SheetContent side="bottom" className="h-[90vh] max-w-sm mx-auto p-0 overflow-y-auto">
          <SheetHeader className="p-4 border-b border-gray-100 rounded-2xl">
            <SheetTitle className="text-center">Chi tiết món đồ</SheetTitle>
          </SheetHeader>

          {/* Content */}
          <div className="p-4 space-y-5">
            {/* Image Carousel */}
            <div className="relative w-full h-64 bg-white rounded-2xl overflow-hidden shadow-sm">
              <img src={itemDetail.images[currentImageIndex]} alt={itemDetail.title} className="w-full h-full object-cover" />
              
              {/* Navigation buttons */}
              {itemDetail.images.length > 1 && <>
                  <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors">
                    <ChevronLeft className="w-4 h-4 text-gray-700" />
                  </button>
                  <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors">
                    <ChevronRight className="w-4 h-4 text-gray-700" />
                  </button>
                </>}

              {/* Image indicators */}
              {itemDetail.images.length > 1 && <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1">
                  {itemDetail.images.map((_, index) => <button key={index} onClick={() => setCurrentImageIndex(index)} className={`w-2 h-2 rounded-full transition-colors ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`} />)}
                </div>}
            </div>

            {/* Title */}
            <div>
              <h1 className="text-xl font-bold text-gray-900">{itemDetail.title}</h1>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-gray-700 leading-relaxed text-sm">
                {itemDetail.description}
              </p>
            </div>

            {/* Location and Owner */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{itemDetail.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{itemDetail.owner}</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Button onClick={handleMakeOffer} className="w-full bg-yellow-brand hover:bg-yellow-600 text-black py-4 rounded-2xl font-medium transition-colors">
              Đưa ra lời đề nghị
            </Button>

            {/* Recent Offers Section */}
            <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Lời đề nghị gần đây</h2>
                <div className="px-3 py-1.5 bg-gray-100 rounded-full">
                  <span className="text-gray-700 text-sm font-medium">{itemDetail.offersCount}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                {itemDetail.recentOffers.map(offer => (
                  <div key={offer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-20 h-20 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={offer.thumbnail} alt={offer.item} className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-medium text-gray-900 text-sm">{offer.item}</h3>
                        <p className="text-xs text-gray-500">bởi {offer.owner} • {offer.timeAgo}</p>
                        <div className="space-y-1">
                          <Badge className={`text-xs ${getStatusColor(offer.status)}`}>
                            {getStatusText(offer.status)}
                          </Badge>
                          <span className="text-xs text-gray-600">
                            {getOfferCount(offer.status)} đề nghị
                          </span>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => handleViewOffer(offer.id)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                      <ChevronRight className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom spacing */}
            <div className="pb-6"></div>
          </div>
        </SheetContent>
      </Sheet>

      <SwapOfferModal 
        isOpen={isSwapModalOpen} 
        onClose={() => setIsSwapModalOpen(false)} 
        targetItem={{
          title: itemDetail.title,
          owner: itemDetail.owner
        }} 
      />
    </>;
};

export default ExchangeItemDetail;
