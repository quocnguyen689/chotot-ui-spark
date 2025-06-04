
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ExchangeZone = () => {
  const navigate = useNavigate();

  const exchangeGroups = [
    {
      id: 1,
      name: 'Trao đổi thời trang',
      description: 'Trao đổi phong cách với xu hướng thời trang mới nhất',
      memberCount: 156,
      timeAgo: 'Cập nhật hôm nay',
      color: 'bg-yellow-brand',
      letter: 'T',
      thumbnail: 'https://images.unsplash.com/photo-1521577352947-9bb58764b69a?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Thiết bị công nghệ',
      description: 'Trao đổi công nghệ của bạn để có thứ gì đó mới',
      memberCount: 89,
      timeAgo: 'Cập nhật hôm nay',
      color: 'bg-yellow-brand',
      letter: 'C',
      thumbnail: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Câu lạc bộ sách',
      description: 'Trao đổi sách và khám phá những câu chuyện mới',
      memberCount: 234,
      timeAgo: 'Cập nhật hôm nay',
      color: 'bg-yellow-brand',
      letter: 'S',
      thumbnail: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop'
    }
  ];

  const handleCollectionClick = (groupId: number) => {
    navigate(`/exchange/${groupId}/discover`);
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-sm mx-auto">
      {/* Header */}
      <div className="bg-white p-4 flex items-center justify-between border-b border-gray-200">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Khu vực trao đổi</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-4 space-y-6">
        {/* Hero Section */}
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-yellow-brand rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="text-black text-2xl">⇄</div>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Khu vực trao đổi</h2>
          <p className="text-gray-600 text-sm px-4">
            Khám phá và trao đổi những món đồ tuyệt vời với cộng đồng xung quanh bạn!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            className="flex-1 py-3 text-yellow-brand border-yellow-brand hover:bg-yellow-light"
          >
            <Settings className="w-4 h-4 mr-2" />
            Tin của tôi
          </Button>
          <Button className="flex-1 py-3 bg-yellow-brand text-black hover:bg-yellow-brand/90">
            <MapPin className="w-4 h-4 mr-2" />
            Gần tôi
          </Button>
        </div>

        {/* Exchange Collections Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Bộ sưu tập trao đổi</h3>
            <div className="bg-yellow-light px-3 py-1 rounded-full">
              <span className="text-yellow-brand text-sm font-medium">AI tuyển chọn</span>
            </div>
          </div>

          {/* Exchange Group Cards - Grid Layout */}
          <div className="grid grid-cols-2 gap-3">
            {exchangeGroups.map((group) => (
              <div 
                key={group.id} 
                className="bg-white rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleCollectionClick(group.id)}
              >
                {/* Thumbnail */}
                <div className="relative h-24 w-full">
                  <img 
                    src={group.thumbnail} 
                    alt={group.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <div className={`w-6 h-6 ${group.color} rounded-md flex items-center justify-center`}>
                      <span className="text-black font-bold text-xs">{group.letter}</span>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-3">
                  <h4 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">{group.name}</h4>
                  <p className="text-gray-600 text-xs mb-2 line-clamp-2">{group.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="font-medium">{group.memberCount} món đồ</span>
                  </div>
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
