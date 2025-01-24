import React from 'react';
import { Tag, Sparkles } from 'lucide-react';

interface KeywordsProps {
  keywords: string[];
}

export const Keywords: React.FC<KeywordsProps> = ({ keywords }) => {
  const validKeywords = keywords?.filter(k => typeof k === 'string' && k.trim().length > 0) || [];

  if (validKeywords.length === 0) {
    return (
      <div className="border-4 border-black bg-[#FFF3B2] p-8 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-white p-2 border-2 border-black rounded-lg transform -rotate-3">
            <Tag className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-black">Key Skills Found</h2>
        </div>
        
        <p className="text-gray-600 font-medium">No key skills detected. Try adding more specific skills to your CV.</p>
      </div>
    );
  }

  return (
    <div className="border-4 border-black bg-[#FFF3B2] p-8 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-white p-2 border-2 border-black rounded-lg transform -rotate-3">
          <Tag className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-black">Key Skills Found</h2>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {validKeywords.map((keyword, index) => (
          <div
            key={index}
            className="group relative bg-white px-4 py-2 border-3 border-black rounded-xl
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
              hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
              transition-all duration-200 cursor-default
              transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-2">
              <span className="font-bold">{keyword}</span>
              <Sparkles 
                className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: '#FFD700' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

