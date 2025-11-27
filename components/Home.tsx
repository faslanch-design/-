import React from 'react';
import { Page } from '../types';
import { FileText, PlayCircle, ClipboardCheck, Heart, Lock, CheckCircle, Droplets, BookOpen, Baby, Share2 } from 'lucide-react';

interface Props {
  setPage: (page: Page) => void;
  unlockedStep: number;
}

const Home: React.FC<Props> = ({ setPage, unlockedStep }) => {
  const menuItems = [
    {
      page: Page.PRE_TEST,
      title: '1. ทดสอบก่อนเรียน',
      subtitle: 'วัดความรู้พื้นฐาน',
      icon: FileText,
      color: 'bg-indigo-500',
      shadow: 'shadow-indigo-200'
    },
    {
      page: Page.CONTENT,
      title: '2. เข้าสู่บทเรียน',
      subtitle: 'วิดีโอและเนื้อหาสาระ',
      icon: BookOpen,
      color: 'bg-blue-500',
      shadow: 'shadow-blue-200'
    },
    {
      page: Page.POST_TEST,
      title: '3. ทดสอบหลังเรียน',
      subtitle: 'วัดผลการเรียนรู้',
      icon: ClipboardCheck,
      color: 'bg-teal-500',
      shadow: 'shadow-teal-200'
    },
    {
      page: Page.EVALUATION,
      title: '4. ประเมินความพึงพอใจ',
      subtitle: 'แสดงความคิดเห็น',
      icon: Heart,
      color: 'bg-rose-500',
      shadow: 'shadow-rose-200'
    }
  ];

  const handleShare = async () => {
    const shareData = {
      title: 'ความสำคัญของน้ำนมแม่หยดแรก',
      text: 'สื่อการเรียนรู้เชิงโต้ตอบ เรื่องความสำคัญของน้ำนมแม่หยดแรก (Colostrum)',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('คัดลอกลิงก์เรียบร้อยแล้ว คุณสามารถส่งต่อให้เพื่อนได้เลย');
      } catch (error) {
        console.error('Copy failed', error);
        alert('ไม่สามารถคัดลอกลิงก์ได้ กรุณาก็อปปี้จากช่อง URL ด้านบน');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto w-full pb-8">
      {/* Hero / Logo Section */}
      <div className="relative bg-white pt-12 pb-10 px-4 rounded-b-[3rem] shadow-lg shadow-blue-100/50 mb-8 text-center overflow-hidden">
        
        {/* Decorative Background Elements - Soft & Abstract */}
        <div className="absolute top-0 inset-x-0 h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-blue-50/50 to-transparent"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          {/* Main Logo Container */}
          <div className="relative mb-6 group cursor-pointer">
            <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
            <div className="relative w-36 h-36 bg-white rounded-full shadow-xl ring-4 ring-white flex items-center justify-center transform transition-transform duration-500 group-hover:scale-105">
               <img 
                src="https://cdn-icons-png.flaticon.com/512/2917/2917633.png" 
                alt="โลโก้แอปพลิเคชัน" 
                className="w-20 h-20 object-contain drop-shadow-sm"
              />
              <div className="absolute bottom-1 right-1 bg-blue-500 text-white p-2.5 rounded-full border-4 border-white shadow-sm">
                <Droplets size={20} fill="currentColor" className="animate-pulse-slow" />
              </div>
            </div>
          </div>
          
          {/* App Name / Lesson Title */}
          <div className="space-y-2 max-w-xs mx-auto">
            <h2 className="text-sm font-semibold text-blue-500 tracking-wider uppercase">สื่อการเรียนรู้</h2>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
              ความสำคัญของ
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 text-3xl md:text-4xl mt-1 drop-shadow-sm">
                น้ำนมแม่หยดแรก
              </span>
            </h1>
            <p className="text-slate-500 text-sm font-medium pt-2">
              (Colostrum Education)
            </p>
          </div>
          
          {/* Decorative Divider */}
          <div className="mt-6 flex items-center space-x-2 opacity-50">
             <div className="w-10 h-0.5 bg-blue-200 rounded-full"></div>
             <Baby className="w-4 h-4 text-blue-300" />
             <div className="w-10 h-0.5 bg-blue-200 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="px-5">
          <div className="flex items-center space-x-3 mb-5 px-1">
             <div className="h-6 w-1.5 bg-blue-500 rounded-full"></div>
             <h2 className="font-bold text-slate-700 text-lg">เมนูการเรียนรู้</h2>
          </div>

          {/* Navigation Grid */}
          <div className="grid grid-cols-1 gap-4">
            {menuItems.map((item, index) => {
              const isLocked = index > unlockedStep;
              const isCompleted = index < unlockedStep;

              return (
                <button
                  key={item.page}
                  onClick={() => !isLocked && setPage(item.page)}
                  disabled={isLocked}
                  className={`group relative overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 p-4 flex items-center text-left
                    ${isLocked ? 'opacity-80 bg-slate-50' : 'hover:border-blue-200 hover:-translate-y-0.5'}
                  `}
                >
                  <div className={`flex-shrink-0 p-3.5 rounded-xl text-white shadow-md mr-4 transition-transform duration-300 ${!isLocked && 'group-hover:scale-110 group-hover:rotate-3'} ${isLocked ? 'bg-slate-300 shadow-none' : `${item.color}`}`}>
                    {isLocked ? <Lock className="w-6 h-6" /> : <item.icon className="w-6 h-6" />}
                  </div>
                  
                  <div className="flex-grow min-w-0">
                    <h3 className={`font-bold ${isLocked ? 'text-slate-500' : 'text-slate-800'} text-base truncate`}>
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm mt-0.5 truncate">
                      {isLocked ? 'ต้องทำขั้นตอนก่อนหน้า' : item.subtitle}
                    </p>
                  </div>

                  <div className="ml-2 flex-shrink-0">
                    {isLocked ? (
                      <Lock className="w-5 h-5 text-slate-300" />
                    ) : isCompleted ? (
                      <div className="bg-green-100 text-green-600 p-1.5 rounded-full">
                          <CheckCircle className="w-5 h-5" />
                      </div>
                    ) : (
                      <div className="bg-blue-50 text-blue-500 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                         <PlayCircle className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Share Button Section */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-blue-200 rounded-full shadow-sm text-blue-600 font-semibold hover:bg-blue-50 hover:shadow-md transition-all active:scale-95"
            >
              <Share2 className="w-5 h-5" />
              แชร์แอปพลิเคชัน
            </button>
          </div>

          <div className="mt-8 text-center space-y-6 pb-8">
            <div className="flex flex-col items-center justify-center text-slate-400 space-y-1">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mb-1">
                 <img src="https://cdn-icons-png.flaticon.com/512/2917/2917633.png" alt="โลโก้ขนาดเล็ก" className="w-4 h-4 grayscale opacity-50" />
              </div>
              <p className="text-[10px] uppercase tracking-wider">แอปพลิเคชันส่งเสริมการเลี้ยงลูกด้วยนมแม่</p>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Home;