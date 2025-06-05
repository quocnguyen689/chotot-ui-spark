
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
    postType: [] as string[] // Changed to array to allow multiple selections
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePostTypeChange = (type: string) => {
    setFormData(prev => ({
      ...prev,
      postType: prev.postType.includes(type)
        ? prev.postType.filter(t => t !== type)
        : [...prev.postType, type]
    }));
  };

  const handleSubmit = () => {
    console.log('Posting item:', {
      category,
      ...formData
    });
    navigate('/exchange');
  };

  const postTypeOptions = [
    { id: 'exchange', label: 'Trao đổi' },
    { id: 'giveaway', label: 'Cho tặng' },
    { id: 'sell', label: 'Bán' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 max-w-sm mx-auto pb-24">
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

        {/* Post Type Selection - Merged Section with Chips */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <Label className="text-gray-600 mb-3 block">
            Loại tin đăng <span className="text-red-500">*</span>
          </Label>
          <div className="flex flex-wrap gap-2">
            {postTypeOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handlePostTypeChange(option.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  formData.postType.includes(option.id)
                    ? 'bg-yellow-brand text-black'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price Input - Only show if "sell" is selected */}
        {formData.postType.includes('sell') && (
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <Label className="text-gray-600 mb-3 block">
              Giá bán <span className="text-red-500">*</span>
            </Label>
            <Input 
              type="text" 
              value={formData.price} 
              onChange={e => handleInputChange('price', e.target.value)} 
              className="w-full" 
              placeholder="Nhập giá bán" 
            />
          </div>
        )}

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
              <Textarea value={formData.description} onChange={e => handleInputChange('description', e.target.value)} className="w-full min-h-[120px]" placeholder="Sách New Moon của Stephenie Meyer, bản tiếng Anh.&#10;- Câu chuyện tiếp nối Twilight, xoay quanh Bella và Edward.&#10;- Lần này, cuộc sống của Bella sẽ có nhiều thử thách mới.&#10;- Sách được giữ gìn cẩn thận.&#10;Nội dung: Bella đối mặt với cuộc sống khó khăn sau khi chia tay Edward. Cô tìm cách vượt qua nỗi đau và khám phá những bí ẩn mới." />
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
      </div>

      {/* Fixed Floating Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto bg-white border-t border-gray-200 p-4">
        <div className="flex space-x-2">
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
