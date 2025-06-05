
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X, MapPin, User, ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SwapOfferModal from '@/components/SwapOfferModal';

const ExchangeItemDetail = () => {
  const navigate = useNavigate();
  const { groupId, itemId } = useParams();
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);

  // Sample data - in real app this would come from API
  const itemDetail = {
    id: 1,
    title: 'Áo khoác Denim Vintage',
    category: 'Thời trang',
    description: 'Áo khoác denim kinh điển thập niên 90 trong tình trạng tuyệt vời. Hoàn hảo để phối đồ!',
    location: 'Trung tâm, cách 2km',
    owner: 'StyleSeeker',
    image: '/lovable-uploads/54e9d8b5-fb47-4c2e-885c-046ff5d579da.png',
    offersCount: 3,
    recentOffers: [
      {
        id: 1,
        item: 'Loa Bluetooth',
        owner: 'TechLover',
        timeAgo: '2 giờ trước',
        thumbnail: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
        status: 'pending'
      },
      {
        id: 2,
        item: 'Máy ảnh Retro',
        owner: 'VintageHunter',
        timeAgo: '5 giờ trước',
        thumbnail: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop',
        status: 'accepted'
      },
      {
        id: 3,
        item: 'Bộ sách thiết kế',
        owner: 'BookWorm',
        timeAgo: '1 ngày trước',
        thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
        status: 'rejected'
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-50 text-amber-600 border border-amber-200';
      case 'accepted':
        return 'bg-emerald-50 text-emerald-600 border border-emerald-200';
      case 'rejected':
        return 'bg-rose-50 text-rose-600 border border-rose-200';
      default:
        return 'bg-gray-50 text-gray-600 border border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Đang chờ';
      case 'accepted':
        return 'Đã chấp nhận';
      case 'rejected':
        return 'Đã từ chối';
      default:
        return 'Không xác định';
    }
  };

  const handleMakeOffer = () => {
    console.log('Make offer for item:', itemDetail.id);
    setIsSwapModalOpen(true);
  };

  const handleViewOffer = (offerId: number) => {
    console.log('View offer:', offerId);
    // Navigate to offer details
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 max-w-sm mx-auto">
        {/* Minimal Header */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-semibold text-gray-900 truncate">{itemDetail.title}</h1>
            <button 
              onClick={() => navigate(-1)} 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Hero Image */}
          <div className="relative">
            <div className="w-full h-72 bg-gray-200 rounded-2xl overflow-hidden">
              <img src={itemDetail.image} alt={itemDetail.title} className="w-full h-full object-cover" />
            </div>
            {/* Floating category badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 shadow-sm">
                {itemDetail.category}
              </span>
            </div>
            {/* Floating offers count */}
            <div className="absolute top-4 right-4">
              <span className="bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium text-white">
                {itemDetail.offersCount} lời đề nghị
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <p className="text-gray-700 leading-relaxed text-base">
              {itemDetail.description}
            </p>
          </div>

          {/* Meta Info - Minimal Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-3 border border-gray-100">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{itemDetail.location}</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-3 border border-gray-100">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{itemDetail.owner}</span>
              </div>
            </div>
          </div>

          {/* CTA Button - Modern Design */}
          <div className="pt-2">
            <Button 
              onClick={handleMakeOffer} 
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-2xl font-medium text-base transition-all duration-200 transform hover:scale-[0.98] active:scale-95"
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              Đưa ra lời đề nghị
            </Button>
          </div>

          {/* Recent Offers - Clean Section */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Lời đề nghị gần đây</h2>
              <div className="bg-gray-100 px-3 py-1.5 rounded-full">
                <span className="text-gray-700 text-sm font-medium">Tổng: {itemDetail.offersCount}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              {itemDetail.recentOffers.map((offer) => (
                <div key={offer.id} className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-sm transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-14 h-14 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                        <img 
                          src={offer.thumbnail} 
                          alt={offer.item}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <h3 className="font-medium text-gray-900 text-sm">{offer.item}</h3>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span>{offer.owner}</span>
                          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{offer.timeAgo}</span>
                          </div>
                        </div>
                        <Badge className={`text-xs px-2 py-1 rounded-full ${getStatusColor(offer.status)}`}>
                          {getStatusText(offer.status)}
                        </Badge>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleViewOffer(offer.id)} 
                      className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-50"
                    >
                      Xem
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="pb-8"></div>
      </div>

      <SwapOfferModal
        isOpen={isSwapModalOpen}
        onClose={() => setIsSwapModalOpen(false)}
        targetItem={{
          title: itemDetail.title,
          owner: itemDetail.owner
        }}
      />
    </>
  );
};

export default ExchangeItemDetail;
