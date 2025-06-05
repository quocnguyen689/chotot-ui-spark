
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, MapPin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ExchangeZone = () => {
  const navigate = useNavigate();

  const exchangeGroups = [
    {
      id: 1,
      name: 'Trao đổi thời trang',
      description: 'Đã xem gần đây',
      memberCount: '1 tuần trước',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
      isLarge: true
    },
    {
      id: 2,
      name: 'Thiết bị công nghệ',
      description: 'Mobile Starred Listings',
      memberCount: 'Đã lưu 7 mục',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
      isLarge: true
    },
    {
      id: 3,
      name: 'Nha Trang',
      description: 'Đã lưu 2 mục',
      memberCount: '',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop',
      isLarge: false
    }
  ];

  const handleCollectionClick = (groupId: number) => {
    navigate(`/exchange/${groupId}/discover`);
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-sm mx-auto">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md p-4 flex items-center justify-between border-b border-gray-100/50 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Khu vực trao đổi</h1>
        <div className="w-9"></div>
      </div>

      <div className="px-4 py-6 space-y-8">
        {/* Hero Section */}
        <div className="text-center py-4">
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-yellow-400/25">
              <div className="text-white text-3xl font-bold">⇄</div>
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Khu vực trao đổi</h2>
          <p className="text-gray-600 text-sm leading-relaxed px-2">
            Khám phá và trao đổi những món đồ tuyệt vời với cộng đồng xung quanh bạn!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1 py-3 h-12 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl font-medium"
          >
            <Settings className="w-4 h-4 mr-2" />
            Tin của tôi
          </Button>
          <Button className="flex-1 py-3 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white rounded-xl font-medium shadow-lg shadow-yellow-400/25">
            <MapPin className="w-4 h-4 mr-2" />
            Gần tôi
          </Button>
        </div>

        {/* Collections Section */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Danh sách Yêu thích</h3>
          </div>

          {/* Collection Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* First two collections - large cards */}
            {exchangeGroups.slice(0, 2).map((group) => (
              <div 
                key={group.id}
                className="col-span-1 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                onClick={() => handleCollectionClick(group.id)}
              >
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={group.image} 
                    alt={group.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-gray-900 mb-1 text-sm">{group.description}</h4>
                  <p className="text-xs text-gray-500">{group.memberCount}</p>
                </div>
              </div>
            ))}
            
            {/* Third collection - spans full width */}
            {exchangeGroups.slice(2, 3).map((group) => (
              <div 
                key={group.id}
                className="col-span-2 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                onClick={() => handleCollectionClick(group.id)}
              >
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img 
                    src={group.image} 
                    alt={group.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-gray-900 mb-1">{group.name}</h4>
                  <p className="text-sm text-gray-500">{group.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Spacing */}
        <div className="pb-20"></div>
      </div>
    </div>
  );
};

export default ExchangeZone;
