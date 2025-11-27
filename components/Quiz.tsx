import React, { useState } from 'react';
import { Question } from '../types';
import Button from './Button';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface QuizProps {
  questions: Question[];
  title: string;
  onComplete: (score: number, total: number, answers: Record<number, string>) => void;
  onExit: () => void;
  showAnswerKey?: boolean;
}

const Quiz: React.FC<QuizProps> = ({ questions, title, onComplete, onExit, showAnswerKey = true }) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (questionId: number, optionId: string) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = () => {
    // Calculate score
    let calculatedScore = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswerId) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    setIsSubmitted(true);
  };

  // Check if all questions are answered
  const allAnswered = questions.every(q => answers[q.id]);

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-blue-100 text-center animate-fade-in">
        <div className="mb-6 flex justify-center">
          {score >= questions.length / 2 ? (
            <CheckCircle className="w-20 h-20 text-green-500" />
          ) : (
            <AlertCircle className="w-20 h-20 text-yellow-500" />
          )}
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">สรุปคะแนนของคุณ</h2>
        <p className="text-gray-600 mb-8 text-lg">
          คุณทำได้ <span className="font-bold text-4xl text-blue-600 mx-2">{score}</span> / {questions.length} คะแนน
        </p>

        {/* Answer Key Review - Conditional Rendering */}
        {showAnswerKey && (
          <div className="text-left space-y-4 mb-8 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
            {questions.map((q, idx) => {
              const userAnswer = answers[q.id];
              const isCorrect = userAnswer === q.correctAnswerId;
              return (
                <div key={q.id} className={`p-4 rounded-lg border ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                  <p className="font-semibold text-gray-800 mb-2">{idx + 1}. {q.question}</p>
                  <p className="text-sm">
                    คำตอบของคุณ: <span className={isCorrect ? 'text-green-700 font-bold' : 'text-red-700 font-bold'}>
                      {q.options.find(o => o.id === userAnswer)?.text}
                    </span>
                  </p>
                  {!isCorrect && (
                    <p className="text-sm text-green-700 mt-1">
                      เฉลย: {q.options.find(o => o.id === q.correctAnswerId)?.text}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => onComplete(score, questions.length, answers)}>
             ไปขั้นตอนถัดไป
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
       <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
        <div className="bg-blue-600 p-6 text-white">
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="opacity-90 mt-1">จำนวน {questions.length} ข้อ</p>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          {questions.map((q, index) => (
            <div key={q.id} className="pb-6 border-b border-gray-100 last:border-0">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {index + 1}. {q.question}
              </h3>
              <div className="space-y-3">
                {q.options.map((opt) => (
                  <label 
                    key={opt.id}
                    className={`flex items-start p-3 rounded-lg border cursor-pointer transition-all duration-200 
                      ${answers[q.id] === opt.id 
                        ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' 
                        : 'border-gray-200 hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center h-5">
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={opt.id}
                        checked={answers[q.id] === opt.id}
                        onChange={() => handleSelect(q.id, opt.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                    </div>
                    <div className="ml-3 text-gray-700">
                      <span className="font-medium mr-2">{opt.id}.</span>
                      {opt.text}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
          <button onClick={onExit} className="text-gray-500 hover:text-gray-700 font-medium">
            ยกเลิก
          </button>
          <Button 
            onClick={handleSubmit} 
            disabled={!allAnswered}
          >
            ส่งคำตอบ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;