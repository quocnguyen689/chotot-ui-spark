import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
interface SwapOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetItem: {
    title: string;
    owner: string;
  };
}
const SwapOfferModal = ({
  isOpen,
  onClose,
  targetItem
}: SwapOfferModalProps) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  // Sample user items - in real app this would come from API
  const userItems = [{
    id: 1,
    title: 'Loa Bluetooth JBL',
    author: 'Thiết bị âm thanh',
    category: 'Điện tử',
    condition: 'Tốt',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop'
  }, {
    id: 2,
    title: 'Máy ảnh Polaroid',
    author: 'Fujifilm Instax',
    category: 'Điện tử',
    condition: 'Như mới',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop'
  }, {
    id: 3,
    title: 'Bộ sách thiết kế',
    author: 'Design Collection',
    category: 'Sách',
    condition: 'Rất tốt',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop'
  }];
  const handleRequestSwap = () => {
    if (selectedItem) {
      console.log('Requesting swap:', {
        selectedItem,
        targetItem
      });
      // Handle swap request logic here
      onClose();
    }
  };
  return <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[90vh] max-w-sm mx-auto p-0 overflow-y-auto">
        <SheetHeader className="p-4 border-b border-gray-100">
          <div className="flex items-center space-x-2 justify-center py-[16px]">
            
            <SheetTitle className="font-bold text-gray-900 text-xl">
              Chọn món đồ để trao đổi
            </SheetTitle>
          </div>
          <p className="text-sm leading-relaxed text-center px-4 text-gray-950">
            Chọn một món đồ từ bộ sưu tập của bạn để trao đổi lấy "{targetItem.title}" của {targetItem.owner}
          </p>
        </SheetHeader>

        <div className="p-4 space-y-3 flex-1">
          {userItems.map(item => <div key={item.id} className={`p-4 border rounded-2xl cursor-pointer transition-all ${selectedItem === item.id ? 'border-yellow-brand bg-yellow-light' : 'border-gray-200 hover:border-gray-300 bg-white'}`} onClick={() => setSelectedItem(item.id)}>
              <div className="flex items-center space-x-3">
                <div className="w-16 h-16 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
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
            </div>)}
        </div>

        <div className="p-4 border-t border-gray-100 bg-white">
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1 py-3 rounded-2xl">
              Hủy
            </Button>
            <Button onClick={handleRequestSwap} disabled={!selectedItem} className="flex-1 bg-yellow-brand hover:bg-yellow-600 text-black font-semibold py-3 rounded-2xl">
              Đề nghị trao đổi
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>;
};
export default SwapOfferModal;