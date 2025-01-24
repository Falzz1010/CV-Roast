import { useState } from 'react';
import { DropZone } from './components/DropZone';
import { ScoreCard } from './components/ScoreCard';
import { Suggestions } from './components/Suggestions';
import { Keywords } from './components/Keywords';
import { FileText, Sparkles } from 'lucide-react';
import { CVAnalysis } from './types';
import toast, { Toaster } from 'react-hot-toast';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as pdfjsLib from 'pdfjs-dist';
import { useLanguage } from './contexts/LanguageContext';
import { LanguageSwitch } from './components/LanguageSwitch';
import { Footer } from './components/Footer';
import { ProgressSteps } from './components/ProgressSteps';
import { LanguageProvider } from './contexts/LanguageContext';

// @ts-ignore
const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.mjs');
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

function App() {
  const [analysis, setAnalysis] = useState<CVAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);

  // Move defaultSuggestions here, before it's used
  const defaultSuggestions = [
    {
      title: language === 'en' ? "Add Quantifiable Achievements" : "Tambahkan Pencapaian Terukur",
      description: language === 'en' 
        ? "Include specific metrics, numbers, and measurable achievements in your work experience. For example: 'Increased sales by 25%' or 'Managed a team of 15 people'"
        : "Sertakan metrik, angka, dan pencapaian terukur dalam pengalaman kerja Anda. Contoh: 'Meningkatkan penjualan sebesar 25%' atau 'Mengelola tim beranggotakan 15 orang'",
      impact: language === 'en'
        ? "Makes your accomplishments more credible and helps you stand out from other candidates"
        : "Membuat pencapaian Anda lebih kredibel dan membantu Anda menonjol dari kandidat lain",
      priority: "high",
      category: "impact"
    },
    {
      title: language === 'en' ? "Enhance Professional Summary" : "Tingkatkan Ringkasan Profesional",
      description: language === 'en'
        ? "Add a powerful 3-4 line summary at the top that highlights your key expertise, years of experience, and unique value proposition"
        : "Tambahkan ringkasan 3-4 baris yang kuat di bagian atas yang menyoroti keahlian utama, tahun pengalaman, dan nilai unik Anda",
      impact: language === 'en'
        ? "Quickly captures recruiter attention and sets the tone for your CV"
        : "Cepat menarik perhatian recruiter dan menentukan kesan untuk CV Anda",
      priority: "high",
      category: "content"
    },
    {
      title: language === 'en' ? "Optimize ATS Keywords" : "Optimalkan Kata Kunci ATS",
      description: language === 'en'
        ? "Include relevant industry keywords, technical skills, and job-specific terms throughout your CV. Match them with the job description"
        : "Sertakan kata kunci industri yang relevan, keahlian teknis, dan istilah spesifik pekerjaan di seluruh CV Anda. Sesuaikan dengan deskripsi pekerjaan",
      impact: language === 'en'
        ? "Improves your CV's visibility in ATS systems and increases chances of getting shortlisted"
        : "Meningkatkan visibilitas CV Anda dalam sistem ATS dan meningkatkan peluang masuk shortlist",
      priority: "high",
      category: "ats"
    },
    {
      title: language === 'en' ? "Improve Formatting Consistency" : "Tingkatkan Konsistensi Format",
      description: language === 'en'
        ? "Ensure consistent font sizes, bullet points, date formats, and spacing throughout your CV. Use clean, ATS-friendly fonts like Arial or Calibri"
        : "Pastikan ukuran font, poin bullet, format tanggal, dan spasi yang konsisten di seluruh CV Anda. Gunakan font yang bersih dan ramah ATS seperti Arial atau Calibri",
      impact: language === 'en'
        ? "Enhances readability and ensures proper parsing by ATS systems"
        : "Meningkatkan keterbacaan dan memastikan penguraian yang tepat oleh sistem ATS",
      priority: "medium",
      category: "format"
    },
    {
      title: language === 'en' ? "Strengthen Action Verbs" : "Perkuat Kata Kerja Aktif",
      description: language === 'en'
        ? "Begin achievement bullets with strong action verbs like 'Spearheaded', 'Implemented', 'Developed' instead of passive language"
        : "Mulai poin pencapaian dengan kata kerja aktif yang kuat seperti 'Memimpin', 'Mengimplementasikan', 'Mengembangkan' alih-alih bahasa pasif",
      impact: language === 'en'
        ? "Makes your achievements more impactful and demonstrates leadership"
        : "Membuat pencapaian Anda lebih berpengaruh dan menunjukkan kepemimpinan",
      priority: "medium",
      category: "content"
    },
    {
      title: language === 'en' ? "Add Technical Skills Section" : "Tambahkan Bagian Keahlian Teknis",
      description: language === 'en'
        ? "Create a dedicated technical skills section grouping skills by category (e.g., Programming Languages, Tools, Methodologies)"
        : "Buat bagian keahlian teknis khusus yang mengelompokkan keahlian berdasarkan kategori (mis., Bahasa Pemrograman, Alat, Metodologi)",
      impact: language === 'en'
        ? "Makes it easier for recruiters and ATS to identify your technical capabilities"
        : "Mempermudah recruiter dan ATS mengidentifikasi kemampuan teknis Anda",
      priority: "high",
      category: "skills"
    },
    {
      title: language === 'en' ? "Enhance Education Details" : "Tingkatkan Detail Pendidikan",
      description: language === 'en'
        ? "Include relevant coursework, projects, academic achievements, and GPA (if above 3.5) in your education section"
        : "Sertakan mata kuliah relevan, proyek, prestasi akademik, dan IPK (jika di atas 3,5) di bagian pendidikan Anda",
      impact: language === 'en'
        ? "Provides a fuller picture of your academic background and relevant skills"
        : "Memberikan gambaran lebih lengkap tentang latar belakang akademik dan keahlian relevan Anda",
      priority: "medium",
      category: "content"
    },
    {
      title: language === 'en' ? "Add Certifications Section" : "Tambahkan Bagian Sertifikasi",
      description: language === 'en'
        ? "Create a dedicated section for professional certifications, including name, issuing organization, and date obtained"
        : "Buat bagian khusus untuk sertifikasi profesional, termasuk nama, organisasi penerbit, dan tanggal diperoleh",
      impact: language === 'en'
        ? "Validates your skills and shows commitment to professional development"
        : "Memvalidasi keahlian Anda dan menunjukkan komitmen untuk pengembangan profesional",
      priority: "medium",
      category: "content"
    }
  ];

  const extractTextFromPDF = async (file: File): Promise<string> => {
    try {
      console.log('Starting PDF extraction...');
      
      // Convert file to ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      console.log('File converted to ArrayBuffer');

      // Load the PDF document
      const pdfDoc = await pdfjsLib.getDocument({
        data: arrayBuffer,
        useWorkerFetch: false,
        isEvalSupported: false,
        useSystemFonts: true
      }).promise;
      
      console.log(`PDF loaded. Number of pages: ${pdfDoc.numPages}`);

      // Extract text from each page
      let fullText = '';
      for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
        console.log(`Processing page ${pageNum}...`);
        
        const page = await pdfDoc.getPage(pageNum);
        const textContent = await page.getTextContent();
        
        const pageText = textContent.items
          .filter((item: any) => item.str && typeof item.str === 'string')
          .map((item: any) => item.str.trim())
          .join(' ');
        
        console.log(`Page ${pageNum} text length: ${pageText.length}`);
        fullText += pageText + '\n';
      }

      const cleanText = fullText.trim();
      console.log('Total extracted text length:', cleanText.length);
      
      if (cleanText.length < 50) {
        throw new Error('Extracted text is too short to be a valid CV');
      }

      return cleanText;
    } catch (error) {
      console.error('PDF extraction failed:', error);
      if (error instanceof Error) {
        throw new Error(`PDF extraction failed: ${error.message}`);
      }
      throw new Error('Failed to extract text from PDF');
    }
  };

  const analyzeCV = async (text: string) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `You are a CV analyzer. Analyze this CV and provide feedback in the following JSON format only. Do not include any other text or explanation:

{
  "personalInfo": {
    "complete": true,
    "missing": []
  },
  "education": {
    "complete": true,
    "missing": []
  },
  "experience": {
    "complete": true,
    "missing": []
  },
  "skills": {
    "complete": true,
    "missing": []
  },
  "score": {
    "completeness": 85,
    "relevance": 80,
    "grammar": 90,
    "visualClarity": 85,
    "overall": 85
  },
  "suggestions": [
    {
      "title": "Add Quantifiable Achievements",
      "description": "Include specific metrics, numbers, and measurable achievements in your work experience. For example: 'Increased sales by 25%' or 'Managed a team of 15 people'",
      "impact": "Makes your accomplishments more credible and helps you stand out from other candidates",
      "priority": "high",
      "category": "impact"
    },
    {
      "title": "Enhance Professional Summary",
      "description": "Add a powerful 3-4 line summary at the top that highlights your key expertise, years of experience, and unique value proposition",
      "impact": "Quickly captures recruiter attention and sets the tone for your CV",
      "priority": "high",
      "category": "content"
    },
    {
      "title": "Optimize ATS Keywords",
      "description": "Include relevant industry keywords, technical skills, and job-specific terms throughout your CV. Match them with the job description",
      "impact": "Improves your CV's visibility in ATS systems and increases chances of getting shortlisted",
      "priority": "high",
      "category": "ats"
    },
    {
      "title": "Improve Formatting Consistency",
      "description": "Ensure consistent font sizes, bullet points, date formats, and spacing throughout your CV. Use clean, ATS-friendly fonts like Arial or Calibri",
      "impact": "Enhances readability and ensures proper parsing by ATS systems",
      "priority": "medium",
      "category": "format"
    },
    {
      "title": "Strengthen Action Verbs",
      "description": "Begin achievement bullets with strong action verbs like 'Spearheaded', 'Implemented', 'Developed' instead of passive language",
      "impact": "Makes your achievements more impactful and demonstrates leadership",
      "priority": "medium",
      "category": "content"
    },
    {
      "title": "Add Technical Skills Section",
      "description": "Create a dedicated technical skills section grouping skills by category (e.g., Programming Languages, Tools, Methodologies)",
      "impact": "Makes it easier for recruiters and ATS to identify your technical capabilities",
      "priority": "high",
      "category": "skills"
    },
    {
      "title": "Enhance Education Details",
      "description": "Include relevant coursework, projects, academic achievements, and GPA (if above 3.5) in your education section",
      "impact": "Provides a fuller picture of your academic background and relevant skills",
      "priority": "medium",
      "category": "content"
    },
    {
      "title": "Add Certifications Section",
      "description": "Create a dedicated section for professional certifications, including name, issuing organization, and date obtained",
      "impact": "Validates your skills and shows commitment to professional development",
      "priority": "medium",
      "category": "content"
    }
  ],
  "keywords": ["skill1", "skill2", "skill3"]
}

Analyze this CV content: ${text}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const responseText = response.text();

      // Clean the response text
      const cleanedResponse = responseText
        .replace(/```json\s*/g, '')
        .replace(/```/g, '')
        .replace(/^[\s\n]*\{/, '{')
        .replace(/\}[\s\n]*$/, '}')
        .trim();

      try {
        const analysisResult = JSON.parse(cleanedResponse);

        // Sanitize and validate the response
        const sanitizedResult = {
          personalInfo: {
            complete: Boolean(analysisResult.personalInfo?.complete),
            missing: Array.isArray(analysisResult.personalInfo?.missing) ? 
              analysisResult.personalInfo.missing : []
          },
          education: {
            complete: Boolean(analysisResult.education?.complete),
            missing: Array.isArray(analysisResult.education?.missing) ? 
              analysisResult.education.missing : []
          },
          experience: {
            complete: Boolean(analysisResult.experience?.complete),
            missing: Array.isArray(analysisResult.experience?.missing) ? 
              analysisResult.experience.missing : []
          },
          skills: {
            complete: Boolean(analysisResult.skills?.complete),
            missing: Array.isArray(analysisResult.skills?.missing) ? 
              analysisResult.skills.missing : []
          },
          score: {
            completeness: Math.min(100, Math.max(0, Number(analysisResult.score?.completeness) || 70)),
            relevance: Math.min(100, Math.max(0, Number(analysisResult.score?.relevance) || 70)),
            grammar: Math.min(100, Math.max(0, Number(analysisResult.score?.grammar) || 70)),
            visualClarity: Math.min(100, Math.max(0, Number(analysisResult.score?.visualClarity) || 70)),
            overall: Math.min(100, Math.max(0, Number(analysisResult.score?.overall) || 70))
          },
          suggestions: Array.isArray(analysisResult.suggestions) && 
            analysisResult.suggestions.length > 0 && 
            analysisResult.suggestions[0].title ? 
              analysisResult.suggestions : defaultSuggestions,
          keywords: Array.isArray(analysisResult.keywords) ? 
            analysisResult.keywords.filter((k: string) => typeof k === 'string' && k.trim()) : []
        };

        return sanitizedResult;

      } catch (parseError) {
        console.error('Parse error:', parseError);
        console.log('Response text:', cleanedResponse);
        
        // Return default structure if parsing fails
        return {
          personalInfo: { complete: true, missing: [] },
          education: { complete: true, missing: [] },
          experience: { complete: true, missing: [] },
          skills: { complete: true, missing: [] },
          score: {
            completeness: 70,
            relevance: 70,
            grammar: 70,
            visualClarity: 70,
            overall: 70
          },
          suggestions: defaultSuggestions,
          keywords: []
        };
      }
    } catch (error) {
      console.error('Analysis error:', error);
      throw new Error('Failed to analyze CV');
    }
  };

  const handleFileUpload = async (file: File) => {
    setCurrentStep(1);
    setIsAnalyzing(true);
    
    try {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('File size exceeds 10MB limit');
      }

      // Validate file type
      if (file.type !== 'application/pdf') {
        throw new Error('Please upload a PDF file');
      }

      let text: string;
      
      if (file.type === 'application/pdf') {
        text = await extractTextFromPDF(file);
      } else {
        throw new Error('Please upload a PDF file');
      }

      if (!text.trim()) {
        throw new Error('No text content found in the file');
      }

      toast.promise(
        analyzeCV(text),
        {
          loading: 'AI is analyzing your CV...',
          success: (data: CVAnalysis) => {
            setAnalysis(data);
            setCurrentStep(2);
            return 'Analysis complete! 🎉';
          },
          error: (err) => `${err.message}`,
        }
      );
    } catch (error) {
      setCurrentStep(0);
      console.error('Error processing file:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to process CV file');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#FFECEC] to-[#FFE0E0] 
        touch-none select-none overflow-x-hidden">
        <div className="flex-grow p-2 sm:p-4 md:p-8 overscroll-none">
          <LanguageSwitch />
          <div className="max-w-7xl mx-auto space-y-3 sm:space-y-8 md:space-y-12">
            {/* Header */}
            <div className="text-center space-y-3 sm:space-y-6">
              <div className="inline-block bg-[#FF90E8] border-2 sm:border-4 border-black rounded-lg sm:rounded-2xl p-2 sm:p-4 md:p-6 
                rotate-2 hover:rotate-0 transition-transform duration-300
                hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center justify-center gap-1.5 sm:gap-3 md:gap-4">
                  <FileText size={20} className="sm:w-8 sm:h-8 md:w-12 md:h-12 text-black" />
                  <h1 className="text-lg sm:text-3xl md:text-5xl font-black bg-white px-2 sm:px-4 py-1 sm:py-2 border-2 sm:border-4 
                    border-black rounded-md sm:rounded-xl transform hover:scale-105 transition-transform">
                    CV Analyzer
                  </h1>
                </div>
              </div>
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                <Sparkles className="text-yellow-500 w-3 h-3 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                <p className="text-xs sm:text-lg md:text-xl font-bold text-gray-800 bg-[#FFF3B2] px-2 sm:px-4 py-1 sm:py-2 
                  border-[1.5px] sm:border-2 border-black rounded-md sm:rounded-lg transform -rotate-1
                  hover:rotate-0 transition-transform">
                  Powered by Gemini AI
                </p>
                <Sparkles className="text-yellow-500 w-3 h-3 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </div>
            </div>

            {/* Description */}
            <div className="text-center max-w-2xl mx-auto px-2 sm:px-0">
              <p className="text-xs sm:text-lg md:text-xl text-gray-700 bg-white px-2 sm:px-6 py-1.5 sm:py-3 
                rounded-md sm:rounded-xl border-[1.5px] sm:border-2 border-black
                shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                transform hover:-translate-y-1 transition-transform
                select-text">
                Upload your CV and get instant AI-powered feedback to make it stand out! 🚀
              </p>
            </div>

            {/* Progress Steps */}
            <div className="flex justify-center w-full px-1 sm:px-0">
              <div className="w-full max-w-2xl">
                <ProgressSteps currentStep={currentStep} />
              </div>
            </div>

            {/* Main Content */}
            <div className="grid gap-3 sm:gap-6 md:gap-8 lg:grid-cols-2">
              <div className="space-y-3 sm:space-y-6 md:space-y-8">
                <DropZone onFileUpload={handleFileUpload} isAnalyzing={isAnalyzing} />
                {analysis && <ScoreCard score={analysis.score} />}
              </div>
              
              <div className="space-y-3 sm:space-y-6 md:space-y-8">
                {analysis && analysis.suggestions && analysis.suggestions.length > 0 && (
                  <Suggestions suggestions={analysis.suggestions} />
                )}
                {analysis && <Keywords keywords={analysis.keywords} />}
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <Toaster 
          position="bottom-right"
          toastOptions={{
            className: 'text-xs sm:text-base touch-none',
            duration: 3000,
            style: {
              maxWidth: '90vw',
              margin: '0 auto',
              userSelect: 'none',
              padding: '8px',
            },
          }} 
        />
      </div>
    </LanguageProvider>
  );
}

export default App;



