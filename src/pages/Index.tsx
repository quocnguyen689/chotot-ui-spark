import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import CategoryMenu from '@/components/CategoryMenu';
import ProductFeed from '@/components/ProductFeed';
import BottomNavigation from '@/components/BottomNavigation';
const Index = () => {
  const [showPopup, setShowPopup] = useState(true);
  const navigate = useNavigate();
  const closePopup = () => {
    setShowPopup(false);
  };
  const handleCTAClick = () => {
    setShowPopup(false);
    navigate('/exchange');
  };
  return <div className="min-h-screen bg-gray-50 max-w-sm mx-auto relative">
      {/* Pop-up Overlay */}
      {showPopup && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="rounded-2xl p-6 m-4 max-w-sm w-full relative shadow-2xl drop-shadow-2xl bg-transparent">
            {/* Close Button */}
            <button onClick={closePopup} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-10">
              <X className="w-5 h-5 text-gray-600" />
            </button>
            
            {/* Pop-up Content */}
            <div className="text-center">
              {/* Image */}
              <div className="mb-4">
                <img src="/lovable-uploads/a7bde626-127a-4da8-82b1-b7adfc676f52.png" alt="Chợ Tốt Swap Dzui Party" className="w-full h-auto rounded-lg" />
              </div>
              
              {/* CTA Button */}
              <Button onClick={handleCTAClick} className="w-full bg-yellow-brand text-black hover:bg-yellow-brand/90 font-medium py-3 mb-3">
                Tham gia Swap Party ngay!
              </Button>
              
              {/* Skip Button */}
              
            </div>
          </div>
        </div>}

      {/* Main Content */}
      <Header />
      <CategoryMenu />
      <ProductFeed />
      <BottomNavigation />
    </div>;
};
export default Index;