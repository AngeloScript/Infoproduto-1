import React, { useEffect, useState } from 'react';
import { Activity, Brain, CheckCircle, Search } from 'lucide-react';

const LoadingAnalysis: React.FC = () => {
  const [step, setStep] = useState(0);

  const steps = [
    { text: "Conectando ao banco de dados...", icon: <Search className="w-6 h-6 text-blue-500" /> },
    { text: "Analisando seu perfil metabólico...", icon: <Activity className="w-6 h-6 text-rose-500" /> },
    { text: "Comparando com 12.400 casos...", icon: <Brain className="w-6 h-6 text-purple-500" /> },
    { text: "Gerando plano personalizado...", icon: <CheckCircle className="w-6 h-6 text-green-500" /> }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1500);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 max-w-md mx-auto">
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-rose-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
        <div className="relative bg-white p-4 rounded-full shadow-lg">
          <Activity className="w-16 h-16 text-rose-600 animate-pulse-slow" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Analisando suas respostas...
      </h2>

      <div className="w-full space-y-4">
        {steps.map((s, idx) => (
          <div 
            key={idx} 
            className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-500 ${
              idx <= step ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-4'
            } ${idx === step ? 'bg-white shadow-md border border-gray-100 scale-105' : ''}`}
          >
            <div className={`transition-all duration-300 ${idx < step ? 'scale-0 w-0' : 'scale-100'}`}>
                {idx === step && <div className="w-4 h-4 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />}
            </div>
             {idx < step && <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />}
            
            <span className={`text-sm font-medium ${idx === step ? 'text-gray-900' : 'text-gray-400'}`}>
              {s.text}
            </span>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center text-xs text-gray-400">
        Isso pode levar alguns segundos. Por favor, não feche a página.
      </div>
    </div>
  );
};

export default LoadingAnalysis;