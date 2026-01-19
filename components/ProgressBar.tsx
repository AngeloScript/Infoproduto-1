import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = Math.min(100, Math.max(0, ((current) / total) * 100));

  return (
    <div className="w-full max-w-md mx-auto mb-6 px-4">
      <div className="flex justify-between text-xs font-semibold text-rose-600 mb-1">
        <span>Progresso</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden shadow-inner">
        <div 
          className="h-full bg-rose-500 transition-all duration-500 ease-out animate-stripes"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;