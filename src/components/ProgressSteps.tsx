import React from 'react';
import { Check, FileText, Brain, ListChecks } from 'lucide-react';

interface ProgressStepsProps {
  currentStep: number;
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep }) => {
  const steps = [
    { icon: <FileText />, label: 'Upload CV' },
    { icon: <Brain />, label: 'AI Analysis' },
    { icon: <ListChecks />, label: 'Results' }
  ];

  return (
    <div className="bg-white border-4 border-black rounded-xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center relative">
            <div className={`
              w-14 h-14 rounded-full border-3 border-black flex items-center justify-center
              ${index < currentStep ? 'bg-[#93FFAB]' : 
                index === currentStep ? 'bg-[#FF90E8]' : 'bg-white'}
              ${index <= currentStep ? 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : ''}
              transition-all duration-300
            `}>
              {index < currentStep ? <Check className="w-6 h-6" /> : step.icon}
            </div>
            <p className="mt-3 font-bold text-sm md:text-base">{step.label}</p>
            {index < steps.length - 1 && (
              <div className={`
                absolute top-7 left-14 w-[calc(100%)] h-1 border-b-3 border-black
                ${index < currentStep ? 'border-[#93FFAB]' : 'border-gray-200'}
                transition-all duration-300
              `} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
