import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, MapPin, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
const ExchangeZone = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const exchangeGroups = [{
    id: 1,
    name: 'Thời trang & Phụ kiện',
    description: 'Quần áo, giày dép, túi xách',
    memberCount: '1,2k thành viên',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    category: 'fashion'
  }, {
    id: 2,
    name: 'Công nghệ & Điện tử',
    description: 'Điện thoại, laptop, phụ kiện',
    memberCount: '856 thành viên',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
    category: 'tech'
  }, {
    id: 3,
    name: 'Sách & Văn phòng phẩm',
    description: 'Sách giáo khoa, tiểu thuyết, dụng cụ học tập',
    memberCount: '642 thành viên',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    category: 'books'
  }, {
    id: 4,
    name: 'Đồ gia dụng',
    description: 'Nội thất, đồ trang trí, dụng cụ nhà bếp',
    memberCount: '439 thành viên',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    category: 'home'
  }, {
    id: 5,
    name: 'Thể thao & Giải trí',
    description: 'Dụng cụ thể thao, board game, đồ chơi',
    memberCount: '327 thành viên',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    category: 'sports'
  }, {
    id: 6,
    name: 'Làm đẹp & Sức khỏe',
    description: 'Mỹ phẩm, skincare, vitamin',
    memberCount: '523 thành viên',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
    category: 'beauty'
  }];
  const handleCollectionClick = (groupId: number) => {
    navigate(`/exchange/${groupId}/discover`);
  };
  const filteredGroups = exchangeGroups.filter(group => group.name.toLowerCase().includes(searchQuery.toLowerCase()) || group.description.toLowerCase().includes(searchQuery.toLowerCase()));
  return <div className="min-h-screen bg-gray-50 max-w-sm mx-auto">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md p-4 flex items-center justify-between border-b border-gray-100/50 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Khu vực trao đổi</h1>
        <div className="w-9"></div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Search Box */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input type="text" placeholder="Tìm kiếm danh mục..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 pr-4 py-3 rounded-xl border-gray-200 focus:border-yellow-400 focus:ring-yellow-400/20" />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="nearby" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-xl p-1">
            <TabsTrigger value="nearby" className="rounded-lg font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <MapPin className="w-4 h-4 mr-2" />
              Gần tôi
            </TabsTrigger>
            <TabsTrigger value="mypost" className="rounded-lg font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Settings className="w-4 h-4 mr-2" />
              Tin của tôi
            </TabsTrigger>
          </TabsList>

          <TabsContent value="nearby" className="mt-6 space-y-5">
            {/* Hero Section */}
            <div className="text-center py-4">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-yellow-400/25">
                  <div className="text-white text-2xl font-bold">⇄</div>
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Khám phá xung quanh</h2>
              <p className="text-gray-600 text-sm leading-relaxed px-2">
                Tìm kiếm những món đồ tuyệt vời từ người dùng gần bạn
              </p>
            </div>

            {/* Collections Grid */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Danh mục phổ biến</h3>
              
              <div className="grid grid-cols-2 gap-3">
                {filteredGroups.map(group => <div key={group.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all duration-300 hover:-translate-y-1" onClick={() => handleCollectionClick(group.id)}>
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img src={group.image} alt={group.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <h4 className="font-bold text-white text-sm leading-tight mb-1">{group.name}</h4>
                        <p className="text-white/80 text-xs">{group.memberCount}</p>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mypost" className="mt-6 space-y-5">
            {/* My Posts Hero */}
            

            {/* My Posts Content */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Chưa có tin đăng nào</h3>
                <p className="text-gray-600 text-sm mb-4">Hãy bắt đầu đăng món đồ đầu tiên của bạn!</p>
                <Button className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white rounded-xl font-medium">
                  Đăng tin mới
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Bottom Spacing */}
        <div className="pb-20"></div>
      </div>
    </div>;
};
export default ExchangeZone;