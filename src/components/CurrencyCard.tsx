import React from "react";
import { Clock, User, TrendingUp, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BidCardProps {
  bid: {
    id: number;
    amount: number;
    bidderName: string;
    bidderAvatar?: string;
    timeAgo: string;
    status: "highest" | "outbid" | "pending";
  };
  onViewDetails?: (bidId: number) => void;
}

const BidCard = ({ bid, onViewDetails }: BidCardProps) => {
  const formatVND = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "highest":
        return "bg-green-50 text-green-800 border border-green-200 shadow-sm";
      case "outbid":
        return "bg-red-50 text-red-800 border border-red-200 shadow-sm";
      case "pending":
        return "bg-orange-50 text-orange-800 border border-orange-200 shadow-sm";
      default:
        return "bg-gray-50 text-gray-800 border border-gray-200 shadow-sm";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Đang chờ";
      case "accepted":
        return "Đang chờ";
      case "rejected":
        return "Đã từ chối";
      default:
        return "Đang chờ";
    }
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
      <div className="flex items-center space-x-3">
        <div className="w-20 h-20 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
          {bid.bidderAvatar ? (
            <img
              src={
                "https://cdn.pixabay.com/photo/2017/09/07/08/54/money-2724241_1280.jpg"
              }
              alt={bid.bidderName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-8 h-8 text-gray-600" />
            </div>
          )}
        </div>
        <div className="space-y-1">
          <h3 className="font-medium text-gray-900 text-sm">
            Giá đề nghị: {formatVND(bid.amount)}
          </h3>
          <p className="text-xs text-gray-500">
            bởi {bid.bidderName} • {bid.timeAgo}
          </p>
          <div className="space-y-3 flex">
            <Badge className={`text-xs ${getStatusColor(bid.status)}`}>
              {getStatusText(bid.status)}
            </Badge>
            {bid.status === "highest" && (
              <span className="text-xs text-green-600 mx-[8px] flex items-center space-x-1">
                <TrendingUp className="w-3 h-3" />
                <span>Giá cao nhất</span>
              </span>
            )}
          </div>
        </div>
      </div>
      {onViewDetails && (
        <button
          onClick={() => onViewDetails(bid.id)}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>
      )}
    </div>
  );
};

export default BidCard;
