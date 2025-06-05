import React from "react";
import BidCard from "./CurrencyCard";

const AuctionDemo = () => {
  const sampleBids = [
    {
      id: 1,
      amount: 2500000,
      bidderName: "Minh Anh",
      bidderAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b1bc?w=100&h=100&fit=crop&crop=face",
      timeAgo: "2 phút trước",
      status: "highest" as const,
    },
    {
      id: 2,
      amount: 2300000,
      bidderName: "Quang Huy",
      bidderAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      timeAgo: "15 phút trước",
      status: "outbid" as const,
    },
    {
      id: 3,
      amount: 2100000,
      bidderName: "Thu Hà",
      bidderAvatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      timeAgo: "1 giờ trước",
      status: "outbid" as const,
    },
    {
      id: 4,
      amount: 1950000,
      bidderName: "Đức Anh",
      timeAgo: "2 giờ trước",
      status: "pending" as const,
    },
  ];

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-sm mx-auto space-y-4">
        <h1 className="text-xl font-bold text-gray-900 text-center mb-6">
          Lịch sử đấu giá
        </h1>

        {sampleBids.map((bid) => (
          <BidCard key={bid.id} bid={bid} />
        ))}
      </div>
    </div>
  );
};

export default AuctionDemo;
