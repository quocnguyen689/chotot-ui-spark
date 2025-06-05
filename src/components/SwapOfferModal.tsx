import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { DataService } from "@/services/data.service";
import { ProductItem } from "@/type";
import { Input } from "./ui/input";

interface SwapOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  callBack: () => void;
  target_ads_id: string | number;
  targetItem: {
    title: string;
    owner: string;
  };
}

const SwapOfferModal = ({
  isOpen,
  onClose,
  targetItem,
  target_ads_id,
  callBack,
}: SwapOfferModalProps) => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [price, setPrice] = useState<number | null>(null);

  const [productItems, setProductItems] = useState<ProductItem[]>([]);

  useEffect(() => {
    const fetchCollections = async () => {
      const response: any = await DataService.getById<ProductItem>(
        "ads/get-by-owner",
        "2"
      );
      // console.debug("----------response: ", response);
      setProductItems(response.Data);
      // setLoading(false);
    };
    fetchCollections();
  }, []); // Sample user items - in real app this would come from API

  const handleRequestSwap = async () => {
    console.debug("----------selectedItem: ", selectedItem);

    if (selectedItem) {
      const data = {
        source_ads_id: selectedItem,
        target_ads_id: target_ads_id,
        owner_id: 2,
        status: "accepted",
      };
      // Handle swap request logic here
      // const { title, description } = formData;
      try {
        await DataService.create<any, any>(
          "offer/goods", // endpoint (sẽ nối vào URL base)
          data
        );
        callBack();
        onClose();
        setSelectedItem(null);
        setPrice(null);
      } catch (error) {
        console.error("Error creating collection:", error);
      }
    } else {
      const data = {
        target_ads_id: target_ads_id,
        price: price,
        owner_id: 2,
        status: "accepted",
      };
      // Handle swap request logic here
      // const { title, description } = formData;
      try {
        await DataService.create<any, any>(
          "offer/cash", // endpoint (sẽ nối vào URL base)
          data
        );
        callBack();
        onClose();
        setSelectedItem(null);
        setPrice(null);
      } catch (error) {
        console.error("Error creating collection:", error);
      }
    }
  };

  const handleAddItem = () => {
    // navigate("/post/form");
    onClose();
  };

  return (
    <Sheet
      open={isOpen}
      onOpenChange={() => {
        onClose();
        setSelectedItem(null);
      }}
    >
      <SheetContent
        side="bottom"
        className="h-[90vh] max-w-sm mx-auto p-0 overflow-y-auto"
      >
        <SheetHeader className="p-4 border-b border-gray-100">
          <div className="flex items-center space-x-2 justify-center py-[16px]">
            <SheetTitle className="font-bold text-gray-900 text-xl">
              Chọn món đồ để trao đổi
            </SheetTitle>
          </div>
          <p className="text-sm leading-relaxed text-center px-4 text-gray-950">
            Chọn một món đồ từ bộ sưu tập của bạn để trao đổi lấy "
            {targetItem.title}" của {targetItem.owner}
          </p>
        </SheetHeader>

        <div className="p-4 space-y-3 flex-1">
          {/* Existing Items */}
          {productItems.map((item) => (
            <div
              key={item.id}
              className={`p-4 border rounded-2xl cursor-pointer transition-all ${
                selectedItem === item.id
                  ? "border-yellow-brand bg-yellow-light"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
              onClick={() => setSelectedItem(item.id)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-16 h-16 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={item?.image_url}
                    alt={item?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {item?.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {item.short_description}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      không dõ
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      Như mới
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Add Item Section */}
          <div
            onClick={handleAddItem}
            className="p-4 rounded-2xl cursor-pointer transition-all bg-gray-100"
          >
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center bg-gray-200">
                <Plus className="w-8 h-8 text-black" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900">
                  Thêm món đồ để trao đổi
                </h3>
                <p className="text-sm text-gray-600">Đăng món đồ mới của bạn</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl p-4 shadow-sm space-y-3 border-gray-400 bg-gray-100">
            <h3 className="font-semibold text-gray-900">
              Giá đề nghị chốt luôn{" "}
            </h3>
            <p className="text-sm text-gray-600">
              Thêm mức giá trả thẳng để chốt luôn
            </p>
            <div className="relative">
              <Input
                type="number"
                placeholder="0"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="pl-3 pr-12 text-right rounded-xl border-gray-200"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                VND
              </span>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 p-4 border-t border-gray-100 bg-white shadow-lg">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => {
                onClose();
                setSelectedItem(null);
              }}
              className="flex-1 py-3 rounded-2xl"
            >
              Hủy
            </Button>
            <Button
              onClick={handleRequestSwap}
              disabled={!selectedItem && !price}
              className="flex-1 bg-yellow-brand hover:bg-yellow-600 text-black font-semibold py-3 rounded-2xl"
            >
              Đề nghị trao đổi
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SwapOfferModal;
