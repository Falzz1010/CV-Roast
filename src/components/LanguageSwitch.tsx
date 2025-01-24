import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageSwitch: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
      className="fixed top-4 right-4 bg-white border-3 border-black rounded-xl
        px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
        transition-all duration-200 transform hover:-translate-y-1
        flex items-center gap-2"
    >
      <Globe className="w-5 h-5" />
      <span className="font-bold">{language === 'en' ? 'ID' : 'EN'}</span>
    </button>
  );
};


