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
        relative border-4 border-black bg-[#93FFAB] p-12 rounded-2xl
        shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
        hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]
        transition-all cursor-pointer
        ${isDragActive ? 'bg-[#CBFFD3]' : ''}
        ${isAnalyzing ? 'opacity-75 cursor-not-allowed' : ''}
        transform hover:-rotate-1
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4">
        {isAnalyzing ? (
          <Loader2 size={48} className="text-black animate-spin" />
        ) : (
          <Upload size={48} className="text-black" />
        )}
        <div className="bg-white border-2 border-black rounded-lg px-4 py-2 transform rotate-1">
          <p className="text-xl font-bold text-black">
            {isDragActive
              ? t('dropzone.drop')
              : isAnalyzing
              ? t('dropzone.analyzing')
              : t('dropzone.title')}
          </p>
        </div>
        <p className="text-sm font-medium text-gray-800 bg-white px-3 py-1 border-2 border-black rounded-full transform -rotate-1">
          {t('dropzone.formats')}
        </p>
      </div>
    </div>
  );
};