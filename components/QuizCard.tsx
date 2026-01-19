import React from 'react';
import { Question } from '../types';
import { ChevronRight } from 'lucide-react';

interface QuizCardProps {
  question: Question;
  onAnswer: (value: string) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ question, onAnswer }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-5 w-full mx-auto animate-fade-in-up border-b-4 border-rose-100">
      <h2 className="text-lg font-bold text-gray-800 mb-5 text-center leading-tight">
        {question.question}
      </h2>
      
      <div className="flex flex-col gap-2">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => onAnswer(option.value)}
            className="group relative flex items-center w-full p-3 bg-gray-50 border border-gray-200 rounded-xl hover:border-rose-400 hover:bg-rose-50 transition-all duration-200 active:scale-95 text-left shadow-sm"
          >
            <div className="flex-1">
              <span className="text-sm font-semibold text-gray-700 group-hover:text-rose-700">
                {option.label}
              </span>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
               <ChevronRight className="w-4 h-4 text-rose-500" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizCard;