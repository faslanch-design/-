import React, { useState } from 'react';
import { UserProfile } from '../types';
import { QUIZ_QUESTIONS } from '../constants';
import PersonalInfoForm from './PersonalInfoForm';
import Quiz from './Quiz';

interface Props {
  onComplete: (profile: UserProfile, score: number, answers: Record<number, string>) => void;
  onExit: () => void;
}

const PreTest: React.FC<Props> = ({ onComplete, onExit }) => {
  const [step, setStep] = useState<'profile' | 'quiz'>('profile');
  const [profile, setProfile] = useState<UserProfile>({
    age: '',
    education: '',
    experience: '',
    deliveryMethod: ''
  });

  const handleProfileChange = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleQuizComplete = (score: number, total: number, answers: Record<number, string>) => {
    // Pass profile, score, and DETAILED ANSWERS back to parent
    onComplete(profile, score, answers);
  };

  return (
    <div className="py-6">
      {step === 'profile' ? (
        <PersonalInfoForm 
          data={profile} 
          onChange={handleProfileChange} 
          onNext={() => setStep('quiz')}
          title="ส่วนที่ 1: ข้อมูลทั่วไป"
        />
      ) : (
        <Quiz 
          questions={QUIZ_QUESTIONS} 
          title="ส่วนที่ 2: แบบทดสอบก่อนเรียน" 
          onComplete={handleQuizComplete}
          onExit={onExit}
          showAnswerKey={false}
        />
      )}
    </div>
  );
};

export default PreTest;