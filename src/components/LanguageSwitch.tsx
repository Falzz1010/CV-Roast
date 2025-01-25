import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageSwitch: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-4 right-4 sm:top-8 sm:right-8 z-50">
      <button
        onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
        className="bg-white px-3 py-1.5 sm:px-4 sm:py-2 border-2 border-black rounded-lg
          shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
          transition-all duration-200 transform hover:-translate-y-0.5
          text-sm sm:text-base font-bold
          flex items-center gap-2"
      >
        <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
        {language === 'en' ? (
          <span className="flex items-center gap-1">
            <img 
              src="https://flagcdn.com/id.svg" 
              alt="Indonesia Flag"
              className="w-4 h-4 sm:w-5 sm:h-5 rounded-sm"
            />
            ID
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <img 
              src="https://flagcdn.com/gb.svg" 
              alt="UK Flag"
              className="w-4 h-4 sm:w-5 sm:h-5 rounded-sm"
            />
            EN
          </span>
        )}
      </button>
    </div>
  );
};


