import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X, MapPin, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ExchangeItemDetail = () => {
  const navigate = useNavigate();
  const { groupId, itemId } = useParams();

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
        timeAgo: '2 giờ trước'
      },
      {
        id: 2,
        item: 'Máy ảnh Retro',
        owner: 'VintageHunter',
        timeAgo: '5 giờ trước'
      },
      {
        id: 3,
        item: 'Bộ sách thiết kế',
        owner: 'BookWorm',
        timeAgo: '1 ngày trước'
      }
    ]
  };

  const handleMakeOffer = () => {
    console.log('Make offer for item:', itemDetail.id);
    // Navigate to make offer screen or open modal
  };

  const handleViewOffer = (offerId: number) => {
    console.log('View offer:', offerId);
    // Navigate to offer details
  };

  return (
    <div className="min-h-screen bg-white max-w-sm mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h1 className="text-lg font-bold text-gray-900">{itemDetail.title}</h1>
        <button onClick={() => navigate(-1)} className="p-2">
          <X className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Image */}
        <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
          <img src={itemDetail.image} alt={itemDetail.title} className="w-full h-full object-cover" />
        </div>

        {/* Category and Offers */}
        <div className="flex items-center justify-between">
          <div className="bg-yellow-light px-3 py-1 rounded-full">
            <span className="text-sm font-medium text-amber-500">{itemDetail.category}</span>
          </div>
          <div className="bg-green-100 px-3 py-1 rounded-full">
            <span className="text-green-600 text-sm font-medium">{itemDetail.offersCount} lời đề nghị</span>
          </div>
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
          <Button 
            onClick={handleMakeOffer} 
            className="w-full bg-yellow-brand hover:bg-yellow-600 text-black py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"
          >
            <ArrowRight className="w-5 h-5" />
            <span>Đưa ra lời đề nghị</span>
          </Button>
        </div>

        {/* Recent Offers Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Lời đề nghị gần đây</h2>
          
          <div className="space-y-3">
            {itemDetail.recentOffers.map((offer) => (
              <div key={offer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="space-y-1">
                  <h3 className="font-medium text-gray-900">{offer.item}</h3>
                  <p className="text-sm text-gray-600">bởi {offer.owner} • {offer.timeAgo}</p>
                </div>
                <button 
                  onClick={() => handleViewOffer(offer.id)} 
                  className="font-medium text-sm transition-colors text-amber-500"
                >
                  Xem
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom spacing for fixed button */}
      <div className="pb-20"></div>
    </div>
  );
};

export default ExchangeItemDetail;
