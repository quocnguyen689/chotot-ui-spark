import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, MapPin, Heart, Sparkles, TrendingUp, Eye, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ExchangeZone = () => {
  const navigate = useNavigate();
  
  const trendingItems = [
    {
      id: 1,
      title: 'iPhone 14 Pro Max',
      category: 'Công nghệ',
      views: '2.4k',
      exchanges: '156',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
      trend: '+23%'
    },
    {
      id: 2,
      title: 'Túi Chanel Vintage',
      category: 'Thời trang',
      views: '1.8k',
      exchanges: '89',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop',
      trend: '+18%'
    },
    {
      id: 3,
      title: 'MacBook Air M2',
      category: 'Công nghệ',
      views: '3.1k',
      exchanges: '203',
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop',
      trend: '+31%'
    },
    {
      id: 4,
      title: 'Áo Nike Vintage',
      category: 'Thời trang',
      views: '1.2k',
      exchanges: '67',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
      trend: '+15%'
    }
  ];

  const exchangeGroups = [
    {
      id: 1,
      name: 'Thời trang & Phụ kiện',
      description: 'Quần áo, giày dép, túi xách',
      memberCount: '1,2k món đồ',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
      category: 'fashion'
    },
    {
      id: 2,
      name: 'Công nghệ & Điện tử',
      description: 'Điện thoại, laptop, phụ kiện',
      memberCount: '856 món đồ',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
      category: 'tech'
    },
    {
      id: 3,
      name: 'Sách & Văn phòng phẩm',
      description: 'Sách giáo khoa, tiểu thuyết, dụng cụ học tập',
      memberCount: '642 món đồ',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
      category: 'books'
    },
    {
      id: 4,
      name: 'Đồ gia dụng',
      description: 'Nội thất, đồ trang trí, dụng cụ nhà bếp',
      memberCount: '439 món đồ',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      category: 'home'
    },
    {
      id: 5,
      name: 'Thể thao & Giải trí',
      description: 'Dụng cụ thể thao, board game, đồ chơi',
      memberCount: '327 món đồ',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      category: 'sports'
    },
    {
      id: 6,
      name: 'Làm đẹp & Sức khỏe',
      description: 'Mỹ phẩm, skincare, vitamin',
      memberCount: '523 món đồ',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
      category: 'beauty'
    }
  ];

  const handleCollectionClick = (groupId: number) => {
    navigate(`/exchange/${groupId}/discover`);
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-sm mx-auto">
      {/* Header */}
      <div className="bg-yellow-brand/90 backdrop-blur-md p-4 flex items-center justify-between border-b border-yellow-300/30 sticky top-0 z-10">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 hover:bg-black/10 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-black" />
        </button>
        <h1 className="text-lg font-semibold text-black">Khu vực trao đổi</h1>
        <button className="p-2 hover:bg-black/10 rounded-full transition-colors">
          <Search className="w-5 h-5 text-black" />
        </button>
      </div>

      <div className="px-4 space-y-6 py-0">
        {/* Trending Section - Yellow Theme */}
        <div className="bg-gradient-to-br from-yellow-brand via-yellow-400 to-orange-400 rounded-2xl p-4 mt-4 relative overflow-hidden">
          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-3">
              <TrendingUp className="w-5 h-5 text-black" />
              <h2 className="text-lg font-bold text-black">Xu hướng trao đổi</h2>
              <div className="px-2 py-0.5 bg-black/20 backdrop-blur-sm rounded-full">
                <span className="text-black text-xs font-medium">HOT</span>
              </div>
            </div>
            
            {/* Trending Items Grid */}
            <div className="grid grid-cols-2 gap-3">
              {trendingItems.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-yellow-200 cursor-pointer hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <h4 className="font-bold text-white text-sm leading-tight mb-1">
                        {item.title}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-white/80">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{item.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-300 font-medium">{item.trend}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="foryou" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-yellow-100 rounded-xl p-1">
            <TabsTrigger value="foryou" className="rounded-lg font-medium data-[state=active]:bg-yellow-brand data-[state=active]:text-black data-[state=active]:shadow-sm">
              <Heart className="w-4 h-4 mr-2" />
              Cho bạn
            </TabsTrigger>
            <TabsTrigger value="nearby" className="rounded-lg font-medium data-[state=active]:bg-yellow-brand data-[state=active]:text-black data-[state=active]:shadow-sm">
              <MapPin className="w-4 h-4 mr-2" />
              Gần bạn
            </TabsTrigger>
          </TabsList>

          <TabsContent value="foryou" className="mt-6 space-y-5">
            {/* Collections Grid */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Sparkles className="w-5 h-5 text-yellow-600 animate-pulse" />
                  <div className="absolute inset-0 w-5 h-5 bg-yellow-500/20 rounded-full animate-ping"></div>
                </div>
                <h3 className="font-bold text-gray-900 text-base">
                  Bộ sưu tập AI gợi ý cho bạn
                </h3>
                <div className="px-2 py-1 bg-gradient-to-r from-yellow-brand to-orange-400 text-black text-xs font-medium rounded-full animate-pulse">
                  AI
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {exchangeGroups.map((group) => (
                  <div 
                    key={group.id} 
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-yellow-200 cursor-pointer hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative group"
                    onClick={() => handleCollectionClick(group.id)}
                  >
                    {/* AI Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                    
                    <div className="aspect-square relative overflow-hidden">
                      <img 
                        src={group.image} 
                        alt={group.name} 
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <h4 className="font-bold text-white text-sm leading-tight mb-1">
                          {group.name}
                        </h4>
                        <p className="text-white/80 text-xs">{group.memberCount}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="nearby" className="mt-6 space-y-5">
            {/* Collections Grid */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 text-base">Bộ sưu tập ở gần bạn</h3>
              
              <div className="grid grid-cols-2 gap-3">
                {exchangeGroups.map((group) => (
                  <div 
                    key={group.id} 
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-yellow-200 cursor-pointer hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                    onClick={() => handleCollectionClick(group.id)}
                  >
                    <div className="aspect-square relative overflow-hidden">
                      <img 
                        src={group.image} 
                        alt={group.name} 
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <h4 className="font-bold text-white text-sm leading-tight mb-1">
                          {group.name}
                        </h4>
                        <p className="text-white/80 text-xs">{group.memberCount}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Bottom Spacing */}
        <div className="pb-20"></div>
      </div>
    </div>
  );
};

export default ExchangeZone;
