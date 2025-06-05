
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Camera, Plus, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const PostForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.state?.category || 'Chưa chọn danh mục';

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    condition: 'Đã sử dụng',
    postType: 'exchange' // 'exchange', 'giveaway', 'sale'
  });

  const [isUploadPopupOpen, setIsUploadPopupOpen] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Posting item:', {
      category,
      ...formData
    });
    navigate('/exchange');
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log('Images uploaded:', files);
      setIsUploadPopupOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-sm mx-auto">
      {/* Header */}
      <div className="p-4 flex items-center justify-center relative bg-white">
        <button onClick={() => navigate('/post/category')} className="absolute left-4 p-2">
          <ArrowLeft className="w-6 h-6 text-black" />
        </button>
        <h1 className="text-lg font-bold text-black text-center">Đăng tin với AI</h1>
      </div>

      <div className="p-4 space-y-6 py-[16px] pb-32">
        {/* Category Display */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Danh Mục Tin Đăng</span>
            <span className="text-red-500">*</span>
          </div>
          <div className="mt-2 text-sm text-gray-900">Giải trí, Thể thao, Sở thích - Sách</div>
        </div>

        {/* Photo Upload Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-bold text-gray-700 mb-4">THÔNG TIN CHI TIẾT</h3>
          <p className="text-sm text-gray-600 mb-4">
            Xem thêm về <span className="underline text-gray-950">Quy định đăng tin của Chợ Tốt</span>
          </p>

          {/* Photo Upload Areas */}
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-2">
              {/* Add Photo Button */}
              <button 
                onClick={() => setIsUploadPopupOpen(true)}
                className="aspect-square border-2 border-dashed border-yellow-400 rounded-lg flex items-center justify-center bg-primary-DEFAULT hover:bg-yellow-50 transition-colors"
              >
                <Plus className="w-6 h-6 text-yellow-600" />
              </button>
              
              {/* Uploaded Images */}
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <img alt="Uploaded product" src="/lovable-uploads/8bb782bc-9971-4492-a1bd-566fb74c9978.png" className="w-full h-full object-fill" />
                <button className="absolute top-1 right-1 w-5 h-5 bg-black/70 rounded-full flex items-center justify-center">
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
              
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <img alt="Uploaded product" src="/lovable-uploads/472fd08c-ec7e-4d0d-be6e-295b8963125a.png" className="w-full h-full object-scale-down" />
                <button className="absolute top-1 right-1 w-5 h-5 bg-black/70 rounded-full flex items-center justify-center">
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Post Type Selection */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <Label className="text-gray-600 mb-3 block">
            Loại tin đăng <span className="text-red-500">*</span>
          </Label>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => handleInputChange('postType', 'exchange')} 
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                formData.postType === 'exchange' ? 'bg-yellow-brand text-black' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Trao đổi
            </button>
            <button 
              onClick={() => handleInputChange('postType', 'giveaway')} 
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                formData.postType === 'giveaway' ? 'bg-yellow-brand text-black' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Cho Tặng
            </button>
            <button 
              onClick={() => handleInputChange('postType', 'sale')} 
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                formData.postType === 'sale' ? 'bg-yellow-brand text-black' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Bán
            </button>
          </div>
        </div>

        {/* Price Input - only show if not giveaway */}
        {formData.postType !== 'giveaway' && (
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <Label className="text-gray-600 mb-3 block">
              Giá {formData.postType === 'sale' ? 'bán' : 'tham khảo'} <span className="text-red-500">*</span>
            </Label>
            <Input 
              type="text" 
              value={formData.price} 
              onChange={e => handleInputChange('price', e.target.value)} 
              className="w-full" 
              placeholder={`Nhập giá ${formData.postType === 'sale' ? 'bán' : 'tham khảo'}`} 
            />
          </div>
        )}

        {/* Condition Selection */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <Label className="text-gray-600 mb-3 block">
            Tình trạng <span className="text-red-500">*</span>
          </Label>
          <div className="flex space-x-2">
            <button 
              onClick={() => handleInputChange('condition', 'Đã sử dụng')} 
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                formData.condition === 'Đã sử dụng' ? 'bg-yellow-brand text-black' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Đã sử dụng
            </button>
            <button 
              onClick={() => handleInputChange('condition', 'Mới')} 
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                formData.condition === 'Mới' ? 'bg-yellow-brand text-black' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Mới
            </button>
          </div>
        </div>

        {/* Title and Description Section */}
        <div className="rounded-lg px-[16px] my-[16px] bg-white border border-gray-200 p-4">
          <h3 className="font-bold text-gray-700 mb-4">TIÊU ĐỀ TIN ĐĂNG VÀ MÔ TẢ CHI TIẾT</h3>
          
          <div className="space-y-4">
            <div>
              <Label className="text-gray-600 mb-2 block">
                Tiêu đề tin đăng <span className="text-red-500">*</span>
              </Label>
              <Input 
                type="text" 
                value={formData.title} 
                onChange={e => handleInputChange('title', e.target.value)} 
                className="w-full" 
                placeholder="Tiêu đề tin đăng" 
              />
              <div className="text-xs text-gray-500 mt-1">0/50 kí tự</div>
            </div>

            <div>
              <Label className="text-gray-600 mb-2 block">
                Mô tả chi tiết <span className="text-red-500">*</span>
              </Label>
              <Textarea 
                value={formData.description} 
                onChange={e => handleInputChange('description', e.target.value)} 
                className="w-full min-h-[120px]" 
                placeholder="Sách New Moon của Stephenie Meyer, bản tiếng Anh.&#10;- Câu chuyện tiếp nối Twilight, xoay quanh Bella và Edward.&#10;- Lần này, cuộc sống của Bella sẽ có nhiều thử thách mới.&#10;- Sách được giữ gìn cẩn thận.&#10;Nội dung: Bella đối mặt với cuộc sống khó khăn sau khi chia tay Edward. Cô tìm cách vượt qua nỗi đau và khám phá những bí ẩn mới." 
              />
              <div className="text-xs text-gray-500 mt-1">0/1500 kí tự</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')} 
            className="flex-1 py-3 text-gray-900 border-gray-300"
          >
            Xem trước
          </Button>
          <Button 
            onClick={handleSubmit} 
            className="flex-1 py-3 bg-yellow-brand text-black hover:bg-yellow-brand/90"
          >
            Đăng tin
          </Button>
        </div>
      </div>

      {/* Image Upload Popup Overlay */}
      {isUploadPopupOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 relative animate-scale-in">
            {/* Close Button */}
            <button 
              onClick={() => setIsUploadPopupOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-yellow-brand rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-black" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Tải ảnh lên</h2>
              <p className="text-sm text-gray-600">Chọn ảnh từ thiết bị của bạn</p>
            </div>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6 hover:border-yellow-400 transition-colors">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label 
                htmlFor="image-upload" 
                className="cursor-pointer block"
              >
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600 mb-2">Nhấn để chọn ảnh</p>
                <p className="text-xs text-gray-500">Hỗ trợ JPG, PNG (tối đa 5 ảnh)</p>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setIsUploadPopupOpen(false)}
                className="flex-1"
              >
                Hủy
              </Button>
              <Button 
                onClick={() => document.getElementById('image-upload')?.click()}
                className="flex-1 bg-yellow-brand text-black hover:bg-yellow-brand/90"
              >
                Chọn ảnh
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostForm;
