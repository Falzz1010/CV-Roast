import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Github, Twitter, Coffee, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="mt-20 border-t-4 border-black bg-white">
      <div className="max-w-7xl mx-auto py-8 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-black bg-[#93FFAB] px-3 py-1 border-2 border-black rounded-lg inline-block transform -rotate-2">
              {t('footer.about')}
            </h3>
            <p className="font-medium">
              {t('footer.description')}
            </p>
            <div className="flex items-center gap-2">
              <Coffee className="w-4 h-4" />
              <a
                href="https://www.buymeacoffee.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold hover:underline"
              >
                {t('footer.buyMeCoffee')}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-black bg-[#FFF3B2] px-3 py-1 border-2 border-black rounded-lg inline-block transform rotate-2">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="font-medium hover:underline flex items-center gap-2">
                  📚 {t('footer.howItWorks')}
                </a>
              </li>
              <li>
                <a href="#" className="font-medium hover:underline flex items-center gap-2">
                  🔒 {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a href="#" className="font-medium hover:underline flex items-center gap-2">
                  📝 {t('footer.terms')}
                </a>
              </li>
              <li>
                <a href="#" className="font-medium hover:underline flex items-center gap-2">
                  💡 {t('footer.tips')}
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="text-xl font-black bg-[#FF90E8] px-3 py-1 border-2 border-black rounded-lg inline-block transform -rotate-1">
              {t('footer.connect')}
            </h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-2 border-2 border-black rounded-lg
                  hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                  transform transition-all hover:-translate-y-1"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-2 border-2 border-black rounded-lg
                  hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                  transform transition-all hover:-translate-y-1"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-4 border-t-2 border-dashed border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm font-medium">
              © 2024 CV Analyzer. {t('footer.rights')}
            </p>
            <div className="flex items-center gap-2 text-sm font-medium">
              <span>{t('footer.madeWith')}</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>{t('footer.by')} Naufal Rizky</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
