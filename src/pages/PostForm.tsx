import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Camera, Plus } from 'lucide-react';
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
    freeGiveaway: false
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
  return (
    <div className="min-h-screen bg-gray-50 max-w-sm mx-auto">
      {/* Header */}
      <div className="p-4 flex items-center justify-center bg-yellow-brand">
        <button onClick={() => navigate('/post/category')} className="absolute left-4 p-2">
          <ArrowLeft className="w-6 h-6 text-black" />
        </button>
        <h1 className="text-lg font-bold text-black text-center">Đăng tin với AI</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Category Display */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Danh Mục Tin Đăng</span>
            <span className="text-red-500">*</span>
          </div>
          <div className="mt-2 text-sm text-gray-900">{category}</div>
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
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <label className="flex items-center space-x-3">
            <input type="checkbox" checked={formData.freeGiveaway} onChange={e => handleInputChange('freeGiveaway', e.target.checked)} className="w-4 h-4" />
            <span className="text-gray-900">Tôi muốn trao đổi</span>
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
        <div className="bg-gray-100 p-4 rounded-lg">
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

        {/* Photo Upload Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-bold text-gray-700 mb-4">THÔNG TIN CHI TIẾT</h3>
          <p className="text-sm text-gray-600 mb-4">
            Xem thêm về <span className="text-blue-500 underline">Quy định đăng tin của Chợ Tốt</span>
          </p>

          {/* Photo Upload Areas */}
          <div className="space-y-4">
            <div className="border-2 border-dashed border-yellow-400 rounded-lg p-8 text-center">
              <div className="text-blue-500 mb-2">ℹ️ Hình ảnh hợp lệ</div>
              <Camera className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
              <div className="text-gray-600 text-sm">ĐĂNG TỪ 01 ĐẾN 06 HÌNH</div>
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

        {/* Seller Information */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-bold text-gray-700 mb-4">THÔNG TIN NGƯỜI BÁN</h3>
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
    </div>
  );
};

export default PostForm;
