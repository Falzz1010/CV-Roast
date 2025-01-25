import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface DropZoneProps {
  onFileUpload: (file: File) => void;
  isAnalyzing: boolean;
}

export const DropZone: React.FC<DropZoneProps> = ({ onFileUpload, isAnalyzing }) => {
  const { t } = useLanguage();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    disabled: isAnalyzing
  });

  return (
    <div
      {...getRootProps()}
      className={`
        relative border-2 sm:border-4 border-black bg-[#93FFAB] p-4 sm:p-8 md:p-12 rounded-xl sm:rounded-2xl
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
        hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]
        transition-all cursor-pointer
        ${isDragActive ? 'bg-[#CBFFD3]' : ''}
        ${isAnalyzing ? 'opacity-75 cursor-not-allowed' : ''}
        transform hover:-rotate-1
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-2 sm:gap-4">
        {isAnalyzing ? (
          <Loader2 size={32} className="sm:w-12 sm:h-12 text-black animate-spin" />
        ) : (
          <Upload size={32} className="sm:w-12 sm:h-12 text-black" />
        )}
        <div className="bg-white border-2 border-black rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 transform rotate-1">
          <p className="text-sm sm:text-xl font-bold text-black">
            {isDragActive
              ? t('dropzone.dragActive')
              : isAnalyzing
              ? t('dropzone.analyzing')
              : t('dropzone.default')}
          </p>
        </div>
        <p className="text-xs sm:text-sm font-medium text-gray-800 bg-white px-2 sm:px-3 py-1 border-2 border-black rounded-full transform -rotate-1">
          {t('dropzone.supportedFormats')}
        </p>
      </div>
    </div>
  );
};