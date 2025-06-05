
import React, { useState } from 'react';
import { X, Upload, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import CategoryMenu from '@/components/CategoryMenu';
import ProductFeed from '@/components/ProductFeed';
import BottomNavigation from '@/components/BottomNavigation';

const Index = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('image-upload')?.click();
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
            
            {/* Image Upload Content */}
            <div className="text-center">
              {uploadedImage ? (
                <div className="mb-6">
                  <img 
                    src={uploadedImage} 
                    alt="Uploaded" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              ) : (
                <div className="w-full h-48 mb-6 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">No image selected</p>
                  </div>
                </div>
              )}
              
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              
              <div className="space-y-3">
                <Button 
                  onClick={triggerFileInput}
                  className="w-full bg-yellow-brand text-black hover:bg-yellow-brand/90 font-medium py-3"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
                
                <Button 
                  onClick={closePopup}
                  variant="outline"
                  className="w-full"
                >
                  Done
                </Button>
              </div>
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
