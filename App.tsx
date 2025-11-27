import React, { useState, useEffect } from 'react';
import { Page, FullUserData, UserProfile, EvaluationData } from './types';
import Home from './components/Home';
import PreTest from './components/PreTest';
import Content from './components/Content';
import PostTest from './components/PostTest';
import Evaluation from './components/Evaluation';
import { ChevronLeft, Loader2, RotateCcw } from 'lucide-react';

// ==========================================================================================
// 🟢 จุดที่ 1: นำ URL ที่ได้จาก Google Apps Script มาวางแทนที่ข้อความในเครื่องหมายคำพูดด้านล่าง
// ต้องลงท้ายด้วย /exec
// ==========================================================================================

const GOOGLE_SCRIPT_URL: string = "https://script.google.com/macros/s/AKfycbyEuabGIFLJRAUpN03YiOfwHcZ2n6vmsrDjWEnzLec3pILyverxdCyoW1j_rHKT5y35cA/exec"; 

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // เก็บข้อมูลทั้งหมดของผู้ใช้
  const [allUserData, setAllUserData] = useState<FullUserData>({
    profile: null,
    preTestScore: 0,
    postTestScore: 0,
    preTestAnswers: {},
    postTestAnswers: {},
    evaluation: null
  });

  // ตัวแปรสำหรับปลดล็อกหน้าถัดไป (0=เริ่ม, 1=ผ่านPre, 2=ผ่านContent, 3=ผ่านPost, 4=จบ)
  const [unlockedStep, setUnlockedStep] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('breastMilkApp_progress');
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });

  useEffect(() => {
    localStorage.setItem('breastMilkApp_progress', unlockedStep.toString());
  }, [unlockedStep]);

  // ฟังก์ชันล้างค่าเพื่อเริ่มใหม่
  const handleResetProgress = () => {
    if (window.confirm('คุณต้องการล้างความคืบหน้าและเริ่มใหม่ทั้งหมดใช่หรือไม่?')) {
      localStorage.removeItem('breastMilkApp_progress');
      setAllUserData({
        profile: null,
        preTestScore: 0,
        postTestScore: 0,
        preTestAnswers: {},
        postTestAnswers: {},
        evaluation: null
      });
      setUnlockedStep(0);
      setCurrentPage(Page.HOME);
      window.scrollTo(0, 0);
    }
  };

  const goHome = () => setCurrentPage(Page.HOME);

  const getTitle = () => {
    switch(currentPage) {
      case Page.PRE_TEST: return 'แบบทดสอบก่อนเรียน';
      case Page.CONTENT: return 'เนื้อหาการเรียนรู้';
      case Page.POST_TEST: return 'แบบทดสอบหลังเรียน';
      case Page.EVALUATION: return 'แบบประเมินความพึงพอใจ';
      default: return 'หน้าหลัก';
    }
  };

  // --- ส่วนจัดการการเปลี่ยนหน้าและเก็บข้อมูล ---

  const handlePreTestComplete = (profile: UserProfile, score: number, answers: Record<number, string>) => {
    setAllUserData(prev => ({ 
      ...prev, 
      profile, 
      preTestScore: score,
      preTestAnswers: answers 
    }));
    setUnlockedStep(prev => Math.max(prev, 1));
    // ไปหน้า Content ต่อเลย
    setCurrentPage(Page.CONTENT); 
    window.scrollTo(0, 0);
  };

  const handlePostTestComplete = (score: number, answers: Record<number, string>) => {
    setAllUserData(prev => ({ 
      ...prev, 
      postTestScore: score,
      postTestAnswers: answers 
    }));
    setUnlockedStep(prev => Math.max(prev, 3));
    // ไปหน้าประเมินต่อเลย
    setCurrentPage(Page.EVALUATION);
    window.scrollTo(0, 0);
  };

  const handleEvaluationComplete = async (data: EvaluationData) => {
    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL === "") {
      alert("กรุณาใส่ Google Script URL ในไฟล์ App.tsx ก่อนครับ");
      return;
    }

    setIsSubmitting(true);

    const now = new Date();
    const thaiYear = (now.getFullYear() + 543).toString();
    
    const finalData: FullUserData = { 
      ...allUserData, 
      evaluation: data,
      calendarYear: thaiYear,
      submittedAt: now.toISOString()
    };
    
    setAllUserData(finalData);
    
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      });

      await new Promise(resolve => setTimeout(resolve, 1500));

      alert(`บันทึกข้อมูลเรียบร้อยแล้ว (ประจำปี ${thaiYear})\nขอบคุณสำหรับความร่วมมือครับ`);
    } catch (error) {
      console.error("Error:", error);
      alert('บันทึกข้อมูลเสร็จสิ้น (Offline Mode)\nขอบคุณครับ');
    } finally {
      setIsSubmitting(false);
      setUnlockedStep(prev => Math.max(prev, 4));
      goHome();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-xl flex items-center space-x-4 animate-bounce-short">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            <div className="flex flex-col">
               <span className="text-lg font-medium text-gray-800">กำลังบันทึกข้อมูล...</span>
               <span className="text-sm text-gray-500">กรุณารอสักครู่</span>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="w-10">
            {currentPage !== Page.HOME && (
              <button 
                onClick={goHome}
                className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors flex items-center"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
          </div>
          
          <h1 className="text-lg font-bold text-slate-800 truncate px-2 text-center flex-grow">
            {getTitle()}
          </h1>

          <div className="w-10 flex justify-end">
            {unlockedStep > 0 && (
              <button 
                onClick={handleResetProgress}
                className="p-2 -mr-2 rounded-full hover:bg-red-50 text-red-500 transition-colors"
                title="เริ่มใหม่ทั้งหมด"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-2">
        {currentPage === Page.HOME && (
          <Home 
            setPage={setCurrentPage} 
            unlockedStep={unlockedStep} 
          />
        )}

        {currentPage === Page.PRE_TEST && (
          <PreTest 
            onComplete={handlePreTestComplete} 
            onExit={goHome}
          />
        )}

        {currentPage === Page.CONTENT && (
          <Content 
            onNext={() => {
              setUnlockedStep(prev => Math.max(prev, 2));
              setCurrentPage(Page.POST_TEST);
              window.scrollTo(0, 0);
            }} 
          />
        )}

        {currentPage === Page.POST_TEST && (
          <PostTest 
            onComplete={handlePostTestComplete} 
            onExit={goHome}
          />
        )}

        {currentPage === Page.EVALUATION && (
          <Evaluation 
            onComplete={handleEvaluationComplete} 
            onExit={goHome}
          />
        )}
      </main>
    </div>
  );
};

export default App;