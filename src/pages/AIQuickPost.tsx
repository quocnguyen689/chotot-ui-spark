import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, X, RotateCcw } from 'lucide-react';
const AIQuickPost = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  const handleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordingTime(0);
    } else {
      setIsRecording(false);
      // Navigate to post form with AI processing
      navigate('/post/form', {
        state: {
          category: 'AI Generated',
          isAIPost: true
        }
      });
    }
  };
  const handleFlipCamera = () => {
    console.log('Flip camera');
  };
  return <div className="min-h-screen bg-black max-w-sm mx-auto relative overflow-hidden">
      {/* Status Bar */}
      <div className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center p-4 text-white">
        <span className="text-sm font-medium">18:12</span>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white/50 rounded-full"></div>
          </div>
          <span className="text-xs ml-1">5G</span>
          <div className="w-6 h-3 border border-white rounded-sm">
            <div className="w-4 h-2 bg-white rounded-sm m-0.5"></div>
          </div>
        </div>
      </div>

      {/* Recording Timer */}
      {isRecording && <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-black/70 rounded-full px-4 py-2 flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-white text-sm font-medium">
              {formatTime(recordingTime)}/00:30
            </span>
          </div>
        </div>}

      {/* Camera View */}
      <div className="relative w-full h-full min-h-screen bg-gradient-to-br from-amber-100 to-orange-200">
        {/* Book image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=800&fit=crop" alt="Book filming view" className="w-full h-full object-cover" />
        </div>

        {/* AI Prompts Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-30">
          <div className="bg-black/50 p-4 mx-8 text-center space-y-2 rounded-3xl">
            <p className="font-medium text-sm">Hãy nói:</p>
            <p className="text-base">Tên sản phẩm?</p>
            <p className="text-base">Giá bán?</p>
            <p className="text-base">Tình trạng?</p>
            <p className="text-base font-semibold">Chi tiết sản phẩm?</p>
          </div>
        </div>

        {/* Grid Overlay */}
        <div className="absolute inset-0 z-20">
          <div className="w-full h-full grid grid-cols-3 grid-rows-3">
            {Array.from({
            length: 9
          }).map((_, i) => <div key={i} className="border border-white/20"></div>)}
          </div>
        </div>
      </div>

      {/* Top Controls */}
      <div className="absolute top-16 left-0 right-0 z-40 flex justify-between items-center px-4">
        <button onClick={() => navigate('/post/category')} className="p-2 rounded-full bg-black/50">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        
        
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-8 left-0 right-0 z-40 flex justify-center items-center">
        <div className="flex items-center space-x-8">
          {/* Flip Camera Button */}
          <button onClick={handleFlipCamera} className="p-3 bg-black/50 rounded-full">
            <RotateCcw className="w-6 h-6 text-white" />
          </button>

          {/* Record Button */}
          <button onClick={handleRecord} className={`w-20 h-20 rounded-full border-4 border-white flex items-center justify-center transition-all duration-200 ${isRecording ? 'bg-red-500' : 'bg-transparent hover:bg-white/10'}`}>
            <div className={`transition-all duration-200 ${isRecording ? 'w-6 h-6 bg-white rounded-sm' : 'w-16 h-16 bg-red-500 rounded-full'}`}></div>
          </button>

          {/* Placeholder for symmetry */}
          <div className="w-12 h-12"></div>
        </div>
      </div>

      {/* Bottom Safe Area */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-black"></div>
    </div>;
};
export default AIQuickPost;