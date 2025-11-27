import React, { useState } from 'react';
import { LikertQuestion, EvaluationData } from '../types';
import { LIKERT_QUESTIONS } from '../constants';
import Button from './Button';
import { Star, Send, Home } from 'lucide-react';

interface Props {
  onComplete: (data: EvaluationData) => void;
  onExit: () => void;
}

const Evaluation: React.FC<Props> = ({ onComplete, onExit }) => {
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [impression, setImpression] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRate = (questionId: number, score: number) => {
    setRatings(prev => ({ ...prev, [questionId]: score }));
  };

  const handleSubmit = () => {
    const data: EvaluationData = {
      ratings,
      impression,
      suggestion
    };
    
    // Call parent handler to submit everything
    onComplete(data);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    // This state might be brief if the parent redirects, but good for UI feedback
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-blue-100 text-center mt-10 animate-fade-in">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Star className="w-10 h-10 text-green-600 fill-current" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">ขอบคุณสำหรับความคิดเห็น</h2>
        <p className="text-gray-600 mb-8">ข้อมูลของท่านถูกบันทึกเรียบร้อยแล้ว</p>
        <Button onClick={onExit} fullWidth>
          <Home className="w-5 h-5 mr-2" />
          กลับหน้าหลัก
        </Button>
      </div>
    );
  }

  const allRated = LIKERT_QUESTIONS.every(q => ratings[q.id]);

  return (
    <div className="max-w-3xl mx-auto py-6">
      <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
        <div className="bg-blue-600 p-6 text-white">
          <h2 className="text-2xl font-bold text-center">แบบประเมินความพึงพอใจ</h2>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          
          {/* Part 1: Service Satisfaction */}
          <div>
            <h3 className="text-xl font-bold text-blue-800 mb-6 pb-2 border-b border-blue-100">
              ส่วนที่ 1: ความพึงพอใจต่อการให้บริการ
            </h3>
            <div className="space-y-8">
              {LIKERT_QUESTIONS.map((q, idx) => (
                <div key={q.id} className="pb-4 last:pb-0">
                  <p className="text-lg text-gray-800 mb-4 font-medium">{idx + 1}. {q.text}</p>
                  <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                    {[5, 4, 3, 2, 1].map((score) => (
                      <button
                        key={score}
                        onClick={() => handleRate(q.id, score)}
                        className={`
                          w-12 h-12 md:w-14 md:h-14 rounded-full flex flex-col items-center justify-center transition-all duration-200 border
                          ${ratings[q.id] === score 
                            ? 'bg-blue-600 text-white border-blue-600 shadow-lg scale-110' 
                            : 'bg-white text-gray-500 border-gray-200 hover:border-blue-300 hover:bg-blue-50'}
                        `}
                      >
                        <span className="text-lg md:text-xl font-bold">{score}</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-2 px-4 md:px-12">
                    <span>มากที่สุด</span>
                    <span>น้อยที่สุด</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Part 2: Open-ended Questions */}
          <div>
             <h3 className="text-xl font-bold text-blue-800 mb-6 pb-2 border-b border-blue-100">
              ส่วนที่ 2: ข้อเสนอแนะเพิ่มเติม
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-gray-800 font-medium mb-2">ท่านประทับใจสิ่งใดมากที่สุด?</label>
                <textarea
                  value={impression}
                  onChange={(e) => setImpression(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  rows={3}
                  placeholder="ระบุสิ่งที่ท่านประทับใจ..."
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-800 font-medium mb-2">ข้อเสนอแนะเพื่อปรับปรุงในครั้งต่อไป</label>
                <textarea
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  rows={3}
                  placeholder="ระบุข้อเสนอแนะ..."
                ></textarea>
              </div>
            </div>
          </div>

        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
          <button onClick={onExit} className="text-gray-500 hover:text-gray-700 font-medium">
            ยกเลิก
          </button>
          <Button onClick={handleSubmit} disabled={!allRated} className="px-8">
            <Send className="w-4 h-4 mr-2" />
            ส่งแบบประเมิน
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Evaluation;