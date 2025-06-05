
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import CategoryMenu from '@/components/CategoryMenu';
import ProductFeed from '@/components/ProductFeed';
import BottomNavigation from '@/components/BottomNavigation';

const Index = () => {
  const [showPopup, setShowPopup] = useState(true);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-sm mx-auto relative">
      {/* Pop-up Overlay */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 m-4 max-w-sm w-full relative shadow-2xl">
            {/* Close Button */}
            <button 
              onClick={closePopup}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            
            {/* Pop-up Content */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-yellow-brand flex items-center justify-center">
                <span className="text-2xl">🎉</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Chào mừng đến với Chợ Tốt!
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Khám phá hàng ngàn sản phẩm chất lượng và kết nối với cộng đồng mua bán trao đổi lớn nhất Việt Nam.
              </p>
              <Button 
                onClick={closePopup}
                className="w-full bg-yellow-brand text-black hover:bg-yellow-brand/90 font-medium py-3"
              >
                Bắt đầu khám phá
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <Header />
      <CategoryMenu />
      <ProductFeed />
      <BottomNavigation />
    </div>
  );
};

export default Index;
