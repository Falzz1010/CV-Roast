import React from 'react';
import { Lightbulb, ArrowRight, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Suggestion {
  title: string;
  description: string;
  impact: string;
  priority: 'high' | 'medium' | 'low';
  category: 'format' | 'content' | 'skills' | 'impact' | 'ats';
}

interface SuggestionsProps {
  suggestions: Suggestion[];
}

export const Suggestions: React.FC<SuggestionsProps> = ({ suggestions }) => {
  const { t } = useLanguage();

  const defaultSuggestions: Suggestion[] = [
    {
      title: "Add Quantifiable Achievements",
      description: "Your experience section could be stronger with specific metrics and achievements.",
      impact: "Adding numbers and metrics makes your accomplishments more credible and impressive to recruiters.",
      priority: "high",
      category: "impact"
    },
    {
      title: "Enhance Professional Summary",
      description: "Include a compelling professional summary at the top of your CV.",
      impact: "A strong summary immediately captures the recruiter's attention and highlights your key value proposition.",
      priority: "high",
      category: "content"
    },
    {
      title: "Optimize for ATS",
      description: "Include more industry-specific keywords throughout your CV.",
      impact: "Better ATS optimization increases your chances of getting past automated screening systems.",
      priority: "medium",
      category: "ats"
    }
  ];

  const validSuggestions = suggestions?.length > 0 ? suggestions : defaultSuggestions;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'format':
        return <Info className="w-4 h-4" />;
      case 'content':
        return <AlertCircle className="w-4 h-4" />;
      case 'impact':
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  return (
    <div className="border-4 border-black bg-[#FF90E8] p-8 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-white p-2 border-2 border-black rounded-lg transform rotate-3">
          <Lightbulb className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-black">{t('suggestions.title')}</h2>
      </div>
      
      <div className="text-sm text-gray-600 mb-4">
        {t('suggestions.description')}
      </div>
      
      <ul className="space-y-4">
        {validSuggestions.map((suggestion, index) => (
          <li
            key={index}
            className="group bg-white p-6 border-3 border-black rounded-xl 
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
              hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
              transition-all duration-200"
          >
            <div className="space-y-3">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform" />
                  <h3 className="font-bold text-lg">{suggestion.title}</h3>
                </div>
                <div className="flex gap-2">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getPriorityColor(suggestion.priority)}`}>
                    {suggestion.priority} priority
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 bg-gray-100 rounded-full border border-gray-300 flex items-center gap-1">
                    {getCategoryIcon(suggestion.category)}
                    {suggestion.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="pl-8">
                <p className="text-gray-700">{suggestion.description}</p>
                <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">Impact: </span>
                    {suggestion.impact}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Conclusion Section */}
      <div className="mt-6 bg-white border-3 border-black rounded-xl p-4">
        <h3 className="font-bold text-lg mb-2">Next Steps</h3>
        <p className="text-gray-700">
          Start by addressing high-priority suggestions first. These improvements will have the most significant impact on your CV's effectiveness. 
          Remember to maintain consistency throughout your updates and verify all information is accurate.
        </p>
      </div>
    </div>
  );
};



