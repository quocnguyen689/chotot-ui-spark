
import React, { useState } from 'react';
import { X, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface SwapOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetItem: {
    title: string;
    owner: string;
  };
}

const SwapOfferModal = ({ isOpen, onClose, targetItem }: SwapOfferModalProps) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  // Sample user items - in real app this would come from API
  const userItems = [
    {
      id: 1,
      title: 'Loa Bluetooth JBL',
      author: 'Thiết bị âm thanh',
      category: 'Điện tử',
      condition: 'Tốt',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'Máy ảnh Polaroid',
      author: 'Fujifilm Instax',
      category: 'Điện tử',
      condition: 'Như mới',
      image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Bộ sách thiết kế',
      author: 'Design Collection',
      category: 'Sách',
      condition: 'Rất tốt',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop'
    }
  ];

  const handleRequestSwap = () => {
    if (selectedItem) {
      console.log('Requesting swap:', { selectedItem, targetItem });
      // Handle swap request logic here
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3 pb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-purple-600" />
            </div>
            <DialogTitle className="text-lg font-bold text-gray-900">
              Chọn món đồ để trao đổi
            </DialogTitle>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Chọn một món đồ từ bộ sưu tập của bạn để trao đổi lấy "{targetItem.title}" của {targetItem.owner}
          </p>
        </DialogHeader>

        <div className="space-y-3">
          {userItems.map((item) => (
            <div
              key={item.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedItem === item.id
                  ? 'border-yellow-brand bg-yellow-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedItem(item.id)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {item.author}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {item.category}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      {item.condition}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex space-x-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Hủy
          </Button>
          <Button
            onClick={handleRequestSwap}
            disabled={!selectedItem}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
          >
            Đề nghị trao đổi
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SwapOfferModal;
