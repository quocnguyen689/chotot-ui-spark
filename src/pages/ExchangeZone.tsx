
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
      description: 'Trao đổi phong cách với xu hướng thời trang mới nhất',
      memberCount: 156,
      timeAgo: 'Cập nhật hôm nay',
      color: 'bg-gradient-to-br from-purple-50 to-pink-50',
      iconBg: 'bg-gradient-to-br from-purple-500 to-pink-500',
      letter: 'T'
    },
    {
      id: 2,
      name: 'Thiết bị công nghệ',
      description: 'Trao đổi công nghệ của bạn để có thứ gì đó mới',
      memberCount: 89,
      timeAgo: 'Cập nhật hôm nay',
      color: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      letter: 'C'
    },
    {
      id: 3,
      name: 'Câu lạc bộ sách',
      description: 'Trao đổi sách và khám phá những câu chuyện mới',
      memberCount: 234,
      timeAgo: 'Cập nhật hôm nay',
      color: 'bg-gradient-to-br from-emerald-50 to-teal-50',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-500',
      letter: 'S'
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

        {/* Exchange Collections Section */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Bộ sưu tập trao đổi</h3>
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 px-3 py-1.5 rounded-full">
              <span className="text-purple-700 text-xs font-semibold">AI tuyển chọn</span>
            </div>
          </div>

          {/* Exchange Group Cards */}
          <div className="space-y-4">
            {exchangeGroups.map((group) => (
              <div 
                key={group.id} 
                className="bg-white rounded-2xl border border-gray-100 p-5 cursor-pointer hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1"
                onClick={() => handleCollectionClick(group.id)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-14 h-14 ${group.iconBg} rounded-xl flex items-center justify-center shadow-lg`}>
                    <span className="text-white font-bold text-lg">{group.letter}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 mb-2 text-base">{group.name}</h4>
                    <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                      {group.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="font-medium text-gray-700">{group.memberCount} món đồ</span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500">{group.timeAgo}</span>
                    </div>
                  </div>
                  <div className="text-gray-400 mt-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
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
