import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Github, Twitter, Coffee, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="mt-6 xs:mt-8 sm:mt-20 border-t-2 sm:border-t-4 border-black bg-white">
      <div className="max-w-7xl mx-auto py-4 xs:py-6 sm:py-8 px-3 xs:px-4 md:px-8">
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8">
          {/* About Section */}
          <div className="space-y-2 xs:space-y-3 sm:space-y-4">
            <h3 className="text-base xs:text-lg sm:text-xl font-black bg-[#93FFAB] 
              px-2 sm:px-3 py-0.5 sm:py-1 border-2 border-black 
              rounded-md sm:rounded-lg inline-block transform -rotate-2">
              {t('footer.about')}
            </h3>
            <p className="text-xs xs:text-sm sm:text-base font-medium">
              {t('footer.description')}
            </p>
            <div className="flex items-center gap-1.5 xs:gap-2">
              <Coffee className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" />
              <a href="https://www.buymeacoffee.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] xs:text-xs sm:text-sm font-bold hover:underline">
                {t('footer.buyMeCoffee')}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2 xs:space-y-3 sm:space-y-4">
            <h3 className="text-base xs:text-lg sm:text-xl font-black bg-[#FFF3B2] 
              px-2 sm:px-3 py-0.5 sm:py-1 border-2 border-black 
              rounded-md sm:rounded-lg inline-block transform rotate-2">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-1 xs:space-y-1.5 sm:space-y-2">
              {['howItWorks', 'privacy', 'terms', 'tips'].map((link) => (
                <li key={link}>
                  <a href="#" 
                    className="text-xs xs:text-sm sm:text-base font-medium hover:underline 
                    flex items-center gap-1 xs:gap-1.5 sm:gap-2">
                    {link === 'howItWorks' && '📚'}
                    {link === 'privacy' && '🔒'}
                    {link === 'terms' && '📝'}
                    {link === 'tips' && '💡'}
                    {t(`footer.${link}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-2 xs:space-y-3 sm:space-y-4">
            <h3 className="text-base xs:text-lg sm:text-xl font-black bg-[#FF90E8] 
              px-2 sm:px-3 py-0.5 sm:py-1 border-2 border-black 
              rounded-md sm:rounded-lg inline-block transform -rotate-1">
              {t('footer.connect')}
            </h3>
            <div className="flex gap-2 xs:gap-3 sm:gap-4">
              {[
                { icon: Github, href: 'https://github.com/yourusername' },
                { icon: Twitter, href: 'https://twitter.com/yourusername' }
              ].map(({ icon: Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-1.5 xs:p-2 border-2 border-black rounded-lg
                    hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
                    sm:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                    transform transition-all hover:-translate-y-0.5 sm:hover:-translate-y-1"
                >
                  <Icon className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-4 xs:mt-6 sm:mt-8 pt-3 sm:pt-4 border-t-2 border-dashed border-gray-200">
          <div className="flex flex-col xs:flex-row justify-between items-center gap-2 sm:gap-4">
            <p className="text-[10px] xs:text-xs sm:text-sm font-medium text-center xs:text-left">
              © 2024 CV Analyzer. {t('footer.rights')}
            </p>
            <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 
              text-[10px] xs:text-xs sm:text-sm font-medium">
              <span>{t('footer.madeWith')}</span>
              <Heart className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4 text-red-500 animate-pulse" />
              <span>{t('footer.by')} Naufal Rizky</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

