import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X, MapPin, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SwapOfferModal from '@/components/SwapOfferModal';
const ExchangeItemDetail = () => {
  const navigate = useNavigate();
  const {
    groupId,
    itemId
  } = useParams();
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
        return 'bg-yellow-100 text-yellow-700';
      case 'accepted':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
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
  return <>
      <div className="min-h-screen bg-white max-w-sm mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h1 className="text-lg font-bold text-gray-900">{itemDetail.title}</h1>
          <button onClick={() => navigate(-1)} className="p-2">
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6 py-[16px]">
          {/* Image */}
          <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
            <img src={itemDetail.image} alt={itemDetail.title} className="w-full h-full object-cover" />
          </div>

          {/* Category and Offers */}
          <div className="flex items-center justify-between">
            
            
          </div>

          {/* Description */}
          <div>
            <p className="text-gray-700 leading-relaxed">
              {itemDetail.description}
            </p>
          </div>

          {/* Location and Owner */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{itemDetail.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>{itemDetail.owner}</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="py-4">
            <Button onClick={handleMakeOffer} className="w-full bg-yellow-brand hover:bg-yellow-600 text-black py-3 rounded-lg font-semibold flex items-center justify-center space-x-2">
              <ArrowRight className="w-5 h-5" />
              <span>Đưa ra lời đề nghị</span>
            </Button>
          </div>

          {/* Recent Offers Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Lời đề nghị gần đây</h2>
              <div className="px-3 py-1 bg-yellow-brand text-gray-950 text-base rounded-xl">
                <span className="text-amber-700 text-sm font-medium">Tổng: {itemDetail.offersCount}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              {itemDetail.recentOffers.map(offer => <div key={offer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={offer.thumbnail} alt={offer.item} className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium text-gray-900">{offer.item}</h3>
                      <p className="text-sm text-gray-600">bởi {offer.owner} • {offer.timeAgo}</p>
                      <Badge className={`text-xs ${getStatusColor(offer.status)}`}>
                        {getStatusText(offer.status)}
                      </Badge>
                    </div>
                  </div>
                  <button onClick={() => handleViewOffer(offer.id)} className="font-medium text-sm transition-colors text-amber-500">
                    Xem
                  </button>
                </div>)}
            </div>
          </div>
        </div>

        {/* Bottom spacing for fixed button */}
        <div className="pb-20"></div>
      </div>

      <SwapOfferModal isOpen={isSwapModalOpen} onClose={() => setIsSwapModalOpen(false)} targetItem={{
      title: itemDetail.title,
      owner: itemDetail.owner
    }} />
    </>;
};
export default ExchangeItemDetail;