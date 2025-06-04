import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Camera, Plus, X } from 'lucide-react';
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
    freeGiveaway: false,
    giveAway: false,
    forSale: false
  });
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
  return <div className="min-h-screen bg-gray-50 max-w-sm mx-auto">
      {/* Header */}
      <div className="p-4 flex items-center justify-center relative bg-white">
        <button onClick={() => navigate('/post/category')} className="absolute left-4 p-2">
          <ArrowLeft className="w-6 h-6 text-black" />
        </button>
        <h1 className="text-lg font-bold text-black text-center">Đăng tin với AI</h1>
      </div>

      <div className="p-4 space-y-6 py-[16px]">
        {/* Category Display */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Danh Mục Tin Đăng</span>
            <span className="text-red-500">*</span>
          </div>
          <div className="mt-2 text-sm text-gray-900">{category}</div>
        </div>

        {/* Photo Upload Section - Moved to top */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-bold text-gray-700 mb-4">THÔNG TIN CHI TIẾT</h3>
          <p className="text-sm text-gray-600 mb-4">
            Xem thêm về <span className="underline text-gray-950">Quy định đăng tin của Chợ Tốt</span>
          </p>

          {/* Photo Upload Areas */}
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-2">
              {/* Add Photo Button */}
              <div className="aspect-square border-2 border-dashed border-yellow-400 rounded-lg flex items-center justify-center bg-primary-DEFAULT">
                <Plus className="w-6 h-6 text-yellow-600 bg-primary-DEFAULT" />
              </div>
              
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

        {/* Condition Selection */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <Label className="text-gray-600 mb-3 block">
            Tình trạng <span className="text-red-500">*</span>
          </Label>
          <div className="flex space-x-2">
            <button onClick={() => handleInputChange('condition', 'Đã sử dụng')} className={`px-4 py-2 rounded-full text-sm font-medium ${formData.condition === 'Đã sử dụng' ? 'bg-yellow-brand text-black' : 'bg-gray-100 text-gray-600'}`}>
              Đã sử dụng
            </button>
            <button onClick={() => handleInputChange('condition', 'Mới')} className={`px-4 py-2 rounded-full text-sm font-medium ${formData.condition === 'Mới' ? 'bg-yellow-brand text-black' : 'bg-gray-100 text-gray-600'}`}>
              Mới
            </button>
          </div>
        </div>

        {/* Exchange Option */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 py-[16px] my-[16px]">
          <label className="flex items-center space-x-3">
            <input type="checkbox" checked={formData.freeGiveaway} onChange={e => handleInputChange('freeGiveaway', e.target.checked)} className="w-4 h-4" />
            <span className="text-gray-900">Tôi muốn trao đổi</span>
          </label>
        </div>

        {/* Give Away Option */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <label className="flex items-center space-x-3">
            <input type="checkbox" checked={formData.giveAway} onChange={e => handleInputChange('giveAway', e.target.checked)} className="w-4 h-4" />
            <span className="text-gray-900">Tôi muốn cho tặng</span>
          </label>
        </div>

        {/* For Sale Option */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <label className="flex items-center space-x-3">
            <input type="checkbox" checked={formData.forSale} onChange={e => handleInputChange('forSale', e.target.checked)} className="w-4 h-4" />
            <span className="text-gray-900">Tôi muốn bán</span>
          </label>
        </div>

        {/* Price Input */}
        {!formData.freeGiveaway && <div className="bg-white rounded-lg border border-gray-200 p-4">
            <Label className="text-gray-600 mb-3 block">
              Giá bán <span className="text-red-500">*</span>
            </Label>
            <Input type="text" value={formData.price} onChange={e => handleInputChange('price', e.target.value)} className="w-full" placeholder="Nhập giá bán" />
          </div>}

        {/* Title and Description Section */}
        <div className="rounded-lg px-[16px] my-[16px] bg-white border border-gray-200 p-4">
          <h3 className="font-bold text-gray-700 mb-4">TIÊU ĐỀ TIN ĐĂNG VÀ MÔ TẢ CHI TIẾT</h3>
          
          <div className="space-y-4">
            <div>
              <Label className="text-gray-600 mb-2 block">
                Tiêu đề tin đăng <span className="text-red-500">*</span>
              </Label>
              <Input type="text" value={formData.title} onChange={e => handleInputChange('title', e.target.value)} className="w-full" placeholder="Tiêu đề tin đăng" />
              <div className="text-xs text-gray-500 mt-1">0/50 kí tự</div>
            </div>

            <div>
              <Label className="text-gray-600 mb-2 block">
                Mô tả chi tiết <span className="text-red-500">*</span>
              </Label>
              <Textarea value={formData.description} onChange={e => handleInputChange('description', e.target.value)} className="w-full min-h-[120px]" placeholder="- Tựa sách, tên tác giả&#10;- Thể loại&#10;- Nhà xuất bản, năm xuất bản&#10;- Tình trạng: ví dụ: còn mới, Không trầy xước, còn bao hành 3 tháng" />
              <div className="text-xs text-gray-500 mt-1">0/1500 kí tự</div>
            </div>
          </div>
        </div>

        {/* Condition Selection (repeated for form completion) */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <Label className="text-gray-600 mb-3 block">
            Tình trạng <span className="text-red-500">*</span>
          </Label>
          <div className="flex space-x-2">
            <button onClick={() => handleInputChange('condition', 'Đã sử dụng')} className={`px-4 py-2 rounded-full text-sm font-medium ${formData.condition === 'Đã sử dụng' ? 'bg-yellow-brand text-black' : 'bg-gray-100 text-gray-600'}`}>
              Đã sử dụng
            </button>
            <button onClick={() => handleInputChange('condition', 'Mới')} className={`px-4 py-2 rounded-full text-sm font-medium ${formData.condition === 'Mới' ? 'bg-yellow-brand text-black' : 'bg-gray-100 text-gray-600'}`}>
              Mới
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pb-20">
          <Button variant="outline" onClick={() => navigate('/')} className="flex-1 py-3 text-gray-900 border-gray-300">
            Xem trước
          </Button>
          <Button onClick={handleSubmit} className="flex-1 py-3 bg-yellow-brand text-black hover:bg-yellow-brand/90">
            Đăng tin
          </Button>
        </div>
      </div>
    </div>;
};
export default PostForm;