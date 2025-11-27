import React from 'react';
import { UserProfile } from '../types';
import { EDUCATION_LEVELS, PARENTING_EXP, DELIVERY_METHODS } from '../constants';
import Button from './Button';

interface Props {
  data: UserProfile;
  onChange: (field: keyof UserProfile, value: string) => void;
  onNext: () => void;
  title?: string;
}

const PersonalInfoForm: React.FC<Props> = ({ data, onChange, onNext, title = "ข้อมูลส่วนบุคคล" }) => {
  const isComplete = data.age && data.education && data.experience && data.deliveryMethod;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-blue-100">
      <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">{title}</h2>
      
      <div className="space-y-6">
        {/* Age */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">อายุ (ปี)</label>
          <input
            type="number"
            value={data.age}
            onChange={(e) => onChange('age', e.target.value)}
            placeholder="กรอกอายุของคุณ"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        {/* Education */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">ระดับการศึกษา</label>
          <select
            value={data.education}
            onChange={(e) => onChange('education', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
          >
            <option value="">-- กรุณาเลือก --</option>
            {EDUCATION_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">ประสบการณ์เลี้ยงลูก</label>
          <div className="space-y-2">
            {PARENTING_EXP.map(exp => (
              <label key={exp} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-100 hover:bg-blue-50 cursor-pointer transition">
                <input
                  type="radio"
                  name="experience"
                  value={exp}
                  checked={data.experience === exp}
                  onChange={(e) => onChange('experience', e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">{exp}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Delivery Method */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">ลักษณะการคลอด (หรือคาดว่าจะคลอด)</label>
          <div className="space-y-2">
            {DELIVERY_METHODS.map(m => (
              <label key={m} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-100 hover:bg-blue-50 cursor-pointer transition">
                <input
                  type="radio"
                  name="deliveryMethod"
                  value={m}
                  checked={data.deliveryMethod === m}
                  onChange={(e) => onChange('deliveryMethod', e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">{m}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <Button 
            onClick={onNext} 
            fullWidth 
            disabled={!isComplete}
          >
            เริ่มทำแบบทดสอบ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;