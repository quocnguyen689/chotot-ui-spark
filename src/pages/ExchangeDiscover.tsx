import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  MapPin,
  X,
  HelpCircle,
  Share,
  MessageCircle,
  ThumbsUp,
  Smile,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const ExchangeDiscover = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTooltip, setShowTooltip] = useState(true);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);

  // Sample data - in real app this would come from API based on groupId
  const items = [
    {
      id: 1,
      title: "Áo khoác Denim Vintage",
      description:
        "Áo khoác denim kinh điển thập niên 90 trong tình trạng tuyệt vời. Hoàn hảo để phối đồ!",
      location: "Trung tâm, cách 2km",
      owner: "StyleSeeker",
      ownerAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
      video:
        "https://images.unsplash.com/photo-1521577352947-9bb58764b69a?w=400&h=600&fit=crop",
      offers: 3,
      comments: [
        {
          id: 1,
          user: "Ruby Hoang",
          avatar:
            "https://ca.slack-edge.com/T0251K7U9-USVJXGXFD-1e04d2da2bf7-512",
          text: "Tuyệt vời! Mình cũng có một chiếc tương tự",
          time: "2 phút trước",
        },
        {
          id: 2,
          user: "Jacky Nguyen",
          avatar:
            "https://ca.slack-edge.com/T0251K7U9-UQL2YP8HZ-3f1926605b2e-512",
          text: "Kiểu dáng rất đẹp, chất liệu có vẻ bền",
          time: "5 phút trước",
        },
      ],
      reactions: {
        likes: 24,
        hearts: 18,
        smiles: 12,
      },
    },
    {
      id: 2,
      title: "Túi xách da thật",
      description:
        "Túi xách da thật cao cấp, được bảo quản cẩn thận. Thiết kế thanh lịch và sang trọng.",
      location: "Quận 1, cách 1.5km",
      owner: "FashionLover",
      ownerAvatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      video:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=600&fit=crop",
      offers: 5,
      comments: [
        {
          id: 1,
          user: "Ruby Hoang",
          avatar:
            "https://ca.slack-edge.com/T0251K7U9-USVJXGXFD-1e04d2da2bf7-512",
          text: "Thích cái màu này quá",
          time: "2 phút trước",
        },
        {
          id: 2,
          user: "Jacky Nguyen",
          avatar:
            "https://ca.slack-edge.com/T0251K7U9-UQL2YP8HZ-3f1926605b2e-512",
          text: "Cái này đi phượt đúng chất luôn",
          time: "5 phút trước",
        },
      ],
      reactions: {
        likes: 15,
        hearts: 8,
        smiles: 5,
      },
    },
    {
      id: 3,
      title: "Giày sneaker limited",
      description:
        "Giày sneaker phiên bản giới hạn, chỉ đi vài lần. Còn nguyên hộp và phụ kiện.",
      location: "Quận 3, cách 3km",
      owner: "Dung",
      ownerAvatar:
        "https://ca.slack-edge.com/T0251K7U9-U07J470DEBF-969b4113b4ed-512",
      video:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=600&fit=crop",
      offers: 3,
      comments: [
        {
          id: 1,
          user: "Ruby Hoang",
          avatar:
            "https://ca.slack-edge.com/T0251K7U9-USVJXGXFD-1e04d2da2bf7-512",
          text: "Đúng chất đường phố",
          time: "2 phút trước",
        },
        {
          id: 2,
          user: "Jacky Nguyen",
          avatar:
            "https://ca.slack-edge.com/T0251K7U9-UQL2YP8HZ-3f1926605b2e-512",
          text: "Khớp vibe với mình luôn",
          time: "5 phút trước",
        },
      ],
      reactions: {
        likes: 32,
        hearts: 21,
        smiles: 9,
      },
    },
  ];
  const currentItem = items[currentIndex];
  const handlePass = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };
  const handleLike = () => {
    console.log("Liked item:", currentItem.id);

    // Trigger heart animation
    setShowHeartAnimation(true);
    setTimeout(() => {
      setShowHeartAnimation(false);
    }, 1000);

    // Move to next item after a slight delay
    setTimeout(() => {
      if (currentIndex < items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
    }, 300);
  };
  const handleSwap = () => {
    console.log("Swap initiated for item:", currentItem.id);
    navigate(`/exchange/${groupId}/item/${currentItem.id}`);
  };
  const handleItemClick = () => {
    navigate(`/exchange/${groupId}/item/${currentItem.id}`);
  };
  if (!currentItem) {
    return (
      <div className="min-h-screen bg-black max-w-sm mx-auto flex items-center justify-center">
        <div className="text-center px-8">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-2xl">✨</span>
          </div>
          <h2 className="text-xl font-bold text-white mb-3 tracking-tight">
            Hết món đồ rồi!
          </h2>
          <p className="text-white/70 mb-8 text-sm leading-relaxed">
            Quay lại sau để xem thêm món đồ mới nhé
          </p>
          <Button
            onClick={() => navigate("/exchange")}
            className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-3 font-medium transition-all duration-200"
          >
            Quay lại
          </Button>
        </div>
      </div>
    );
  }
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-black max-w-sm mx-auto relative overflow-hidden">
        {/* Heart Animation Overlay */}
        {showHeartAnimation && (
          <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="animate-ping">
              <Heart className="w-20 h-20 text-red-500 fill-red-500" />
            </div>
            <div className="absolute animate-bounce">
              <Heart className="w-16 h-16 text-red-500 fill-red-500" />
            </div>
          </div>
        )}

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 p-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/exchange")}
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:bg-black/60"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="flex items-center space-x-4">
              <div className="bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                <span className="text-white text-sm font-medium">
                  {currentItem.offers} Đề nghị
                </span>
              </div>
              <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:bg-black/60">
                <Share className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative h-screen" onClick={handleItemClick}>
          {/* Image Background */}
          <div className="absolute inset-0">
            <img
              src={currentItem.video}
              alt={currentItem.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40"></div>
          </div>

          {/* Item Info */}
          <div className="absolute bottom-80 left-0 right-0 px-6 text-white z-10">
            <h1 className="text-2xl font-bold mb-3 tracking-tight leading-tight">
              {currentItem.title}
            </h1>

            {/* Owner info under title */}
            <div className="flex items-center space-x-2 mb-4">
              <Avatar className="w-6 h-6">
                <AvatarImage
                  src={currentItem.ownerAvatar}
                  alt={currentItem.owner}
                />
                <AvatarFallback className="w-6 h-6 text-xs bg-white/20">
                  {currentItem.owner.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="text-white/90 text-sm font-medium">
                {currentItem.owner}
              </span>
            </div>

            <p className="text-white/80 text-base mb-6 leading-relaxed font-light">
              {currentItem.description}
            </p>

            {/* Location in separate row */}
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10 w-fit">
              <MapPin className="w-4 h-4 text-white/90" />
              <span className="text-white/90 text-sm font-medium">
                {currentItem.location}
              </span>
            </div>
          </div>

          {/* Comments and Emotions Section */}
          <div
            className="absolute bottom-36 left-0 right-0 px-6 text-white z-10 max-h-40 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Reactions */}
            <div className="flex items-center space-x-4 mb-4 bg-black/40 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/10">
              <div className="flex items-center space-x-1">
                <ThumbsUp className="w-4 h-4 text-white/70" />
                <span className="text-white/90 text-sm">
                  {currentItem.reactions.likes}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4 text-red-400" />
                <span className="text-white/90 text-sm">
                  {currentItem.reactions.hearts}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Smile className="w-4 h-4 text-yellow-400" />
                <span className="text-white/90 text-sm">
                  {currentItem.reactions.smiles}
                </span>
              </div>
              <div className="flex items-center space-x-1 ml-auto">
                <MessageCircle className="w-4 h-4 text-white/70" />
                <span className="text-white/70 text-sm">
                  {currentItem.comments.length}
                </span>
              </div>
            </div>

            {/* Comments */}
            {currentItem.comments.length > 0 && (
              <div className="space-y-3">
                {currentItem.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 border border-white/10"
                  >
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={comment.avatar} alt={comment.user} />
                        <AvatarFallback className="w-8 h-8 text-xs bg-white/20">
                          {comment.user.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-white/90 text-sm font-medium">
                            {comment.user}
                          </span>
                          <span className="text-white/50 text-xs">
                            {comment.time}
                          </span>
                        </div>
                        <p className="text-white/80 text-sm leading-relaxed">
                          {comment.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div
            className="absolute bottom-8 left-0 right-0 px-6 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Help Tooltip */}
            {showTooltip && (
              <Tooltip open={showTooltip}>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-center mb-6">
                    <div className="backdrop-blur-sm px-4 border border-white/20 flex items-center space-x-2 rounded-2xl py-[16px] bg-zinc-950">
                      <HelpCircle className="w-4 h-4 text-white/70" />
                      <span className="text-white/70 text-sm font-light">
                        Vuốt trái để bỏ qua, vuốt phải để thích. Nhấn để xem chi
                        tiết
                      </span>
                      <button
                        onClick={() => setShowTooltip(false)}
                        className="ml-2 p-1 hover:bg-white/10 rounded-full transition-colors"
                      >
                        <X className="w-4 h-4 text-white/70" />
                      </button>
                    </div>
                  </div>
                </TooltipTrigger>
              </Tooltip>
            )}

            <div className="flex items-center justify-center space-x-4">
              {/* Like Button */}
              <button
                onClick={handleLike}
                className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 hover:bg-white/25 hover:scale-105 active:scale-95"
              >
                <Heart className="w-6 h-6 text-white" />
              </button>

              {/* Swap Button */}
              <button
                onClick={handleSwap}
                className="bg-white text-black px-8 py-4 rounded-full font-semibold text-base transition-all duration-200 hover:bg-white/90 hover:scale-105 shadow-lg"
              >
                Trao đổi
              </button>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};
export default ExchangeDiscover;
