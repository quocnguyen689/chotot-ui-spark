import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, User, Heart, Share2, MessageCircle } from 'lucide-react';
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
  const [isLiked, setIsLiked] = useState(false);

  // Sample data - in real app this would come from API
  const itemDetail = {
    id: 1,
    title: 'Áo khoác Denim Vintage',
    category: 'Thời trang',
    description: 'Áo khoác denim kinh điển thập niên 90 trong tình trạng tuyệt vời. Hoàn hảo để phối đồ casual hoặc streetwear. Size M, phù hợp cho người 1m6-1m7.',
    location: 'Quận 1, TP.HCM',
    distance: '2km',
    owner: 'StyleSeeker',
    ownerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
    image: '/lovable-uploads/54e9d8b5-fb47-4c2e-885c-046ff5d579da.png',
    offersCount: 3,
    views: 124,
    postedTime: '2 ngày trước',
    recentOffers: [{
      id: 1,
      item: 'Loa Bluetooth JBL',
      owner: 'TechLover',
      timeAgo: '2h',
      thumbnail: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
      status: 'pending'
    }, {
      id: 2,
      item: 'Máy ảnh Polaroid',
      owner: 'VintageHunter',
      timeAgo: '5h',
      thumbnail: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop',
      status: 'accepted'
    }, {
      id: 3,
      item: 'Bộ sách Design',
      owner: 'BookWorm',
      timeAgo: '1d',
      thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
      status: 'rejected'
    }]
  };
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-50 text-orange-600 border-orange-200';
      case 'accepted':
        return 'bg-green-50 text-green-600 border-green-200';
      case 'rejected':
        return 'bg-gray-50 text-gray-500 border-gray-200';
      default:
        return 'bg-gray-50 text-gray-500 border-gray-200';
    }
  };
  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Chờ duyệt';
      case 'accepted':
        return 'Đã chấp nhận';
      case 'rejected':
        return 'Đã từ chối';
      default:
        return 'Không rõ';
    }
  };
  const handleMakeOffer = () => {
    console.log('Make offer for item:', itemDetail.id);
    setIsSwapModalOpen(true);
  };
  const handleViewOffer = (offerId: number) => {
    console.log('View offer:', offerId);
  };
  return <>
      <div className="min-h-screen bg-gray-50 max-w-sm mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="flex items-center justify-between p-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div className="flex items-center space-x-2">
              <button onClick={() => setIsLiked(!isLiked)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Heart className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pb-24">
          {/* Image */}
          <div className="w-full h-80 bg-white">
            <img src={itemDetail.image} alt={itemDetail.title} className="w-full h-full object-cover" />
          </div>

          {/* Main Info */}
          <div className="bg-white p-4 space-y-4">
            {/* Title and Category */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                  {itemDetail.category}
                </Badge>
                <span className="text-sm text-gray-500">{itemDetail.views} lượt xem</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">{itemDetail.title}</h1>
            </div>

            {/* Owner Info */}
            <div className="flex items-center justify-between py-3 border-t border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                  <img src={itemDetail.ownerAvatar} alt={itemDetail.owner} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{itemDetail.owner}</p>
                  <p className="text-sm text-gray-500">{itemDetail.postedTime}</p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <MessageCircle className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Description */}
            <div className="py-3 border-t border-gray-100">
              <p className="text-gray-700 leading-relaxed text-sm">
                {itemDetail.description}
              </p>
            </div>

            {/* Location */}
            <div className="flex items-center space-x-2 py-3 border-t border-gray-100">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{itemDetail.location}</span>
              <span className="text-sm text-gray-400">• {itemDetail.distance}</span>
            </div>
          </div>

          {/* Recent Offers Section */}
          <div className="bg-white mt-2 p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Lời đề nghị</h2>
              <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                {itemDetail.offersCount} đề nghị
              </Badge>
            </div>
            
            <div className="space-y-3">
              {itemDetail.recentOffers.map(offer => <div key={offer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white rounded-lg overflow-hidden shadow-sm">
                      <img src={offer.thumbnail} alt={offer.item} className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium text-gray-900 text-sm">{offer.item}</h3>
                      <p className="text-xs text-gray-500">{offer.owner} • {offer.timeAgo}</p>
                      <Badge className={`text-xs border ${getStatusStyle(offer.status)}`}>
                        {getStatusText(offer.status)}
                      </Badge>
                    </div>
                  </div>
                  <button onClick={() => handleViewOffer(offer.id)} className="text-sm font-medium transition-colors bg-white text-gray-950">
                    Xem
                  </button>
                </div>)}
            </div>
          </div>
        </div>

        {/* Fixed Bottom CTA */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200 p-4">
          <Button onClick={handleMakeOffer} className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-xl font-medium transition-colors">
            Đưa ra lời đề nghị
          </Button>
        </div>
      </div>

      <SwapOfferModal isOpen={isSwapModalOpen} onClose={() => setIsSwapModalOpen(false)} targetItem={{
      title: itemDetail.title,
      owner: itemDetail.owner
    }} />
    </>;
};
export default ExchangeItemDetail;