import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'id';

// Add this type definition
type TranslationKey = keyof typeof translations.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const translations = {
  en: {
    // Header
    'app.title': 'CV Analyzer',
    'app.subtitle': 'Powered by Gemini AI',
    
    // Dropzone
    'dropzone.title': 'Drag & drop your CV, or click to select',
    'dropzone.analyzing': 'Analyzing...',
    'dropzone.drop': 'Drop your CV here!',
    'dropzone.formats': 'Supports PDF and DOCX formats',
    
    // Score Card
    'score.title': 'CV Score Analysis',
    'score.completeness': 'Completeness',
    'score.relevance': 'Relevance',
    'score.grammar': 'Grammar',
    'score.visualClarity': 'Visual Clarity',
    'score.overall': 'Overall',
    'score.excellent': 'Excellent',
    'score.good': 'Good',
    'score.fair': 'Fair',
    'score.needsWork': 'Needs Work',
    
    // Suggestions
    'suggestions.title': 'Smart Suggestions',
    'suggestions.format': 'Format Improvements',
    'suggestions.content': 'Content Improvements',
    'suggestions.skills': 'Skills Improvements',
    'suggestions.impact': 'Impact Improvements',
    'suggestions.ats': 'ATS Improvements',
    'suggestions.howToImprove': 'How to improve',
    'suggestions.priority.high': 'HIGH PRIORITY',
    'suggestions.priority.medium': 'MEDIUM PRIORITY',
    'suggestions.priority.low': 'LOW PRIORITY',
    'suggestions.category.format': 'FORMAT',
    'suggestions.category.content': 'CONTENT',
    'suggestions.category.skills': 'SKILLS',
    'suggestions.category.impact': 'IMPACT',
    'suggestions.category.ats': 'ATS',
    'suggestions.empty': 'No suggestions available',
    
    // Keywords
    'keywords.title': 'Key Skills Found',
    
    // Messages
    'message.analyzing': 'AI is analyzing your CV...',
    'message.complete': 'Analysis complete! Check out the suggestions below 🎉',
    'message.error': 'Analysis failed: {error}. Please try again.',
    'message.fileSize': 'File size exceeds 10MB limit',
    'message.fileType': 'Please upload a PDF or DOCX file',
    'message.noContent': 'No text content found in the file',
    
    // Footer translations
    'footer.about': 'About CV Analyzer',
    'footer.description': 'AI-powered CV analysis tool to help you create the perfect resume and land your dream job.',
    'footer.buyMeCoffee': 'Buy me a coffee',
    'footer.quickLinks': 'Quick Links',
    'footer.howItWorks': 'How it Works',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.tips': 'CV Writing Tips',
    'footer.connect': 'Connect',
    'footer.rights': 'All rights reserved.',
    'footer.madeWith': 'Made with',
    'footer.by': 'by',
  },
  id: {
    // Header
    'app.title': 'Analisis CV',
    'app.subtitle': 'Didukung oleh Gemini AI',
    
    // Dropzone
    'dropzone.title': 'Tarik & letakkan CV Anda, atau klik untuk memilih',
    'dropzone.analyzing': 'Menganalisis...',
    'dropzone.drop': 'Letakkan CV Anda di sini!',
    'dropzone.formats': 'Mendukung format PDF dan DOCX',
    
    // Score Card
    'score.title': 'Analisis Skor CV',
    'score.completeness': 'Kelengkapan',
    'score.relevance': 'Relevansi',
    'score.grammar': 'Tata Bahasa',
    'score.visualClarity': 'Kejelasan Visual',
    'score.overall': 'Keseluruhan',
    'score.excellent': 'Sangat Baik',
    'score.good': 'Baik',
    'score.fair': 'Cukup',
    'score.needsWork': 'Perlu Perbaikan',
    
    // Suggestions
    'suggestions.title': 'Saran Cerdas',
    'suggestions.format': 'Perbaikan Format',
    'suggestions.content': 'Perbaikan Konten',
    'suggestions.skills': 'Perbaikan Keterampilan',
    'suggestions.impact': 'Perbaikan Dampak',
    'suggestions.ats': 'Perbaikan ATS',
    'suggestions.howToImprove': 'Cara memperbaiki',
    'suggestions.priority.high': 'PRIORITAS TINGGI',
    'suggestions.priority.medium': 'PRIORITAS SEDANG',
    'suggestions.priority.low': 'PRIORITAS RENDAH',
    'suggestions.category.format': 'FORMAT',
    'suggestions.category.content': 'KONTEN',
    'suggestions.category.skills': 'KETERAMPILAN',
    'suggestions.category.impact': 'DAMPAK',
    'suggestions.category.ats': 'ATS',
    'suggestions.empty': 'Tidak ada saran tersedia',
    
    // Keywords
    'keywords.title': 'Kata Kunci Ditemukan',
    
    // Messages
    'message.analyzing': 'AI sedang menganalisis CV Anda...',
    'message.complete': 'Analisis selesai! Lihat saran di bawah 🎉',
    'message.error': 'Analisis gagal: {error}. Silakan coba lagi.',
    'message.fileSize': 'Ukuran file melebihi batas 10MB',
    'message.fileType': 'Mohon unggah file PDF atau DOCX',
    'message.noContent': 'Tidak ada konten teks ditemukan dalam file',
    
    // Footer translations
    'footer.about': 'Tentang CV Analyzer',
    'footer.description': 'Alat analisis CV berbasis AI untuk membantu Anda membuat resume sempurna dan mendapatkan pekerjaan impian.',
    'footer.buyMeCoffee': 'Traktir kopi',
    'footer.quickLinks': 'Link Cepat',
    'footer.howItWorks': 'Cara Kerja',
    'footer.privacy': 'Kebijakan Privasi',
    'footer.terms': 'Ketentuan Layanan',
    'footer.tips': 'Tips Menulis CV',
    'footer.connect': 'Hubungi Kami',
    'footer.rights': 'Hak cipta dilindungi.',
    'footer.madeWith': 'Dibuat dengan',
    'footer.by': 'oleh',
  }
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};



