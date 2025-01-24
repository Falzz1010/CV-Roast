import React from 'react';
import { Award, Zap } from 'lucide-react';

interface CVScore {
  completeness: number;
  relevance: number;
  grammar: number;
  visualClarity: number;
  overall: number;
}

interface ScoreCardProps {
  score: CVScore;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ score }) => {
  const defaultScore = {
    ...score,
    completeness: score.completeness || 0,
    relevance: score.relevance || 0,
    grammar: score.grammar || 0,
    visualClarity: score.visualClarity || 0,
    overall: score.overall || 0
  };

  const getScoreColor = (value: number) => {
    if (value >= 80) return 'bg-[#93FFAB]';
    if (value >= 60) return 'bg-[#FFF3B2]';
    return 'bg-[#FF90E8]';
  };

  const getScoreEmoji = (value: number) => {
    if (value >= 80) return '🚀';
    if (value >= 60) return '👍';
    return '💪';
  };

  const getScoreDescription = (label: string, value: number) => {
    switch(label) {
      case 'Overall':
        return value >= 70 ? 'Your CV is well-optimized!' : 'Your CV needs some improvements';
      case 'Completeness':
        return value >= 70 ? 'All essential sections are present' : 'Some important sections are missing';
      case 'Relevance':
        return value >= 70 ? 'Content matches job requirements' : 'Content could be more targeted';
      case 'Grammar':
        return value >= 70 ? 'Text is well-written' : 'Consider reviewing the text';
      case 'Visual Clarity':
        return value >= 70 ? 'Layout is clear and professional' : 'Layout could be improved';
      default:
        return '';
    }
  };

  return (
    <div className="border-4 border-black bg-white p-8 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-[#93FFAB] p-2 border-2 border-black rounded-lg transform -rotate-3">
          <Award className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-black">CV Score Analysis</h2>
      </div>
      
      <div className="space-y-6">
        {Object.entries(defaultScore).map(([key, value]) => (
          <div key={key} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{getScoreEmoji(value)}</span>
                <span className="font-black text-xl bg-black text-white px-3 py-1 rounded-lg">
                  {Math.round(value)}%
                </span>
              </div>
            </div>
            <div className="w-full h-6 bg-gray-100 rounded-full border-3 border-black p-1">
              <div
                className={`h-full rounded-full ${getScoreColor(value)} border-r-2 border-black
                  transition-all duration-500 ease-out`}
                style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
              >
                <div className="w-full h-full relative">
                  <Zap 
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2"
                    size={16}
                  />
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600">{getScoreDescription(key.replace(/([A-Z])/g, ' $1'), value)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

