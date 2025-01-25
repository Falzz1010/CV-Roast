import React from 'react';
import { Award, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

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
  const { t } = useLanguage();

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
    <div className="border-2 sm:border-4 border-black bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl 
      shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
      <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-[#93FFAB] p-1.5 sm:p-2 border-2 border-black rounded-lg transform -rotate-3">
          <Award className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>
        <h2 className="text-xl sm:text-3xl font-black">{t('score.title')}</h2>
      </div>
      
      <div className="space-y-4 sm:space-y-6">
        {Object.entries(score).map(([key, value]) => (
          <div key={key} className="space-y-1 sm:space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-base sm:text-lg capitalize">
                {t(`score.${key}`)}
              </span>
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-xl sm:text-2xl">{getScoreEmoji(value)}</span>
                <span className="font-black text-lg sm:text-xl bg-black text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg">
                  {value}%
                </span>
              </div>
            </div>
            <div className="w-full h-4 sm:h-6 bg-gray-100 rounded-full border-2 sm:border-3 border-black p-1">
              <div
                className={`h-full rounded-full ${getScoreColor(value)} border-r-2 border-black
                  transition-all duration-500 ease-out`}
                style={{ width: `${value}%` }}
              >
                <div className="w-full h-full relative">
                  <Zap 
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4"
                    size={12}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

