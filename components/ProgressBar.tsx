import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = Math.min(100, Math.max(0, ((current) / total) * 100));

  return (
    <div className="w-full max-w-md mx-auto mb-4 px-2">
      <div className="flex justify-between text-[10px] font-bold text-rose-600 mb-1 uppercase tracking-wide">
        <span>Análise</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="h-1.5 w-full bg-white rounded-full overflow-hidden shadow-sm border border-gray-100">
        <div 
          className="h-full bg-gradient-to-r from-rose-400 to-rose-600 transition-all duration-500 ease-out animate-stripes"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;