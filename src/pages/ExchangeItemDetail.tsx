
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
    title: 'Vintage Denim Jacket',
    category: 'Fashion',
    description: 'Classic 90s denim jacket in excellent condition. Perfect for layering!',
    location: 'Downtown, 2km away',
    owner: 'StyleSeeker',
    image: '/lovable-uploads/c4c262d2-2e73-4923-bae2-efbd2ed88747.png',
    offersCount: 3,
    recentOffers: [
      {
        id: 1,
        item: 'Bluetooth Speaker',
        owner: 'TechLover',
        timeAgo: '2 hours ago'
      },
      {
        id: 2,
        item: 'Retro Camera',
        owner: 'VintageHunter',
        timeAgo: '5 hours ago'
      },
      {
        id: 3,
        item: 'Design Books Set',
        owner: 'BookWorm',
        timeAgo: '1 day ago'
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
          <img 
            src={itemDetail.image} 
            alt={itemDetail.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Category and Offers */}
        <div className="flex items-center justify-between">
          <div className="bg-purple-100 px-3 py-1 rounded-full">
            <span className="text-purple-600 text-sm font-medium">{itemDetail.category}</span>
          </div>
          <div className="bg-green-100 px-3 py-1 rounded-full">
            <span className="text-green-600 text-sm font-medium">{itemDetail.offersCount} offers received</span>
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

        {/* Recent Offers Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Recent Offers</h2>
          
          <div className="space-y-3">
            {itemDetail.recentOffers.map((offer) => (
              <div key={offer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="space-y-1">
                  <h3 className="font-medium text-gray-900">{offer.item}</h3>
                  <p className="text-sm text-gray-600">by {offer.owner} • {offer.timeAgo}</p>
                </div>
                <button 
                  onClick={() => handleViewOffer(offer.id)}
                  className="text-purple-600 font-medium text-sm hover:text-purple-700 transition-colors"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm p-4 bg-white border-t border-gray-200">
        <Button 
          onClick={handleMakeOffer}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"
        >
          <ArrowRight className="w-5 h-5" />
          <span>Make an Offer</span>
        </Button>
      </div>

      {/* Bottom spacing for fixed button */}
      <div className="pb-20"></div>
    </div>
  );
};

export default ExchangeItemDetail;
