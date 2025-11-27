import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";
import { CONTENT_DESCRIPTION, CONTENT_TITLE, VIDEO_EMBED_URL } from '../constants';
import Button from './Button';
import { ArrowRight, Info, Volume2, Square, Loader2 } from 'lucide-react';

interface Props {
  onNext: () => void;
}

const Content: React.FC<Props> = ({ onNext }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [sourceNode, setSourceNode] = useState<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (sourceNode) {
        try { sourceNode.stop(); } catch (e) {}
      }
      if (audioContext) {
        try { audioContext.close(); } catch (e) {}
      }
    };
  }, [sourceNode, audioContext]);

  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const decodeAudioData = async (
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
  ): Promise<AudioBuffer> => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  const handleSpeak = async () => {
    // Stop if already speaking
    if (isSpeaking) {
      if (sourceNode) {
        sourceNode.stop();
        setSourceNode(null);
      }
      setIsSpeaking(false);
      return;
    }

    setLoadingAudio(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `ขอต้อนรับสู่บทเรียนเรื่อง ${CONTENT_TITLE}. ${CONTENT_DESCRIPTION}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      
      if (!base64Audio) {
        throw new Error("No audio data returned");
      }

      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      setAudioContext(ctx);

      const audioBuffer = await decodeAudioData(
        decode(base64Audio),
        ctx,
        24000,
        1,
      );

      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      
      source.onended = () => {
        setIsSpeaking(false);
        setSourceNode(null);
      };

      source.start();
      setSourceNode(source);
      setIsSpeaking(true);

    } catch (error) {
      console.error("Error generating speech:", error);
      alert("ไม่สามารถเล่นเสียงบรรยายได้ในขณะนี้");
    } finally {
      setLoadingAudio(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-blue-900">เนื้อหาการเรียนรู้</h2>
        <p className="text-blue-600 font-medium">เรื่อง ความสำคัญของน้ำนมแม่หยดแรก</p>
      </div>

      {/* Video Player */}
      <div className="bg-black/5 rounded-2xl p-1 md:p-2 border border-blue-100 shadow-lg">
        <div className="bg-black rounded-xl overflow-hidden aspect-video relative w-full">
            <iframe 
            src={VIDEO_EMBED_URL} 
            className="w-full h-full" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            title="วิดีโอสื่อการสอน"
            ></iframe>
        </div>
      </div>

      {/* Description Section with AI Narration */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-blue-50 relative overflow-hidden">
        
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

        <div className="flex flex-col md:flex-row items-start md:space-x-6 relative z-10">
          <div className="bg-blue-100 p-3 rounded-full hidden md:block flex-shrink-0">
            <Info className="w-6 h-6 text-blue-600" />
          </div>
          
          <div className="space-y-4 text-gray-700 leading-relaxed flex-grow">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <h3 className="text-xl font-bold text-gray-900">คำอธิบายเพิ่มเติม</h3>
              
              <button
                onClick={handleSpeak}
                disabled={loadingAudio}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm
                  ${isSpeaking 
                    ? 'bg-red-100 text-red-600 hover:bg-red-200 border border-red-200' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
                  }
                  disabled:opacity-70 disabled:cursor-not-allowed
                `}
              >
                {loadingAudio ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    กำลังสร้างเสียง...
                  </>
                ) : isSpeaking ? (
                  <>
                    <Square className="w-4 h-4 mr-2 fill-current" />
                    หยุดเสียงบรรยาย
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 mr-2" />
                    ฟังเสียงบรรยาย (AI)
                  </>
                )}
              </button>
            </div>

            <p className="font-semibold text-blue-900 text-lg">{CONTENT_TITLE}</p>
            <div className="whitespace-pre-line text-gray-700">
              {CONTENT_DESCRIPTION}
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 mt-4 text-sm md:text-base">
              <p className="font-bold text-blue-800 mb-1">💡 เคล็ดลับ:</p>
              <p>การให้นมแม่ในระยะแรกอาจจะดูเหมือนมีปริมาณน้อย แต่เพียงพอสำหรับกระเพาะของลูกน้อยที่มีขนาดเท่าลูกแก้ว</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-end pt-4 pb-8">
        <Button onClick={onNext} className="group text-lg px-8 shadow-lg shadow-blue-200 hover:shadow-xl">
          ไปยังแบบทดสอบหลังเรียน
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default Content;