import React, { useState, useEffect } from 'react';
import { AppPhase, UserAnswers, Question, AnalysisResult } from './types';
import ProgressBar from './components/ProgressBar';
import QuizCard from './components/QuizCard';
import LoadingAnalysis from './components/LoadingAnalysis';
import ResultPage from './components/ResultPage';
import { generateHealthAnalysis } from './services/geminiService';
import { ChevronRight, AlertCircle, Eye, ShieldCheck, Lock, Ban, Activity } from 'lucide-react';

// Hardcoded questions for the flow
const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Qual é o seu objetivo principal hoje?",
    options: [
      { id: "1a", label: "Perder gordura localizada", value: "loss" },
      { id: "1b", label: "Melhorar flacidez da pele", value: "skin" },
      { id: "1c", label: "Reduzir dores nas articulações", value: "joints" },
      { id: "1d", label: "Acelerar metabolismo lento", value: "metabolism" },
    ]
  },
  {
    id: 2,
    question: "Qual sua faixa etária?",
    options: [
      { id: "2a", label: "18 a 29 anos", value: "18-29" },
      { id: "2b", label: "30 a 45 anos", value: "30-45" },
      { id: "2c", label: "46 a 59 anos", value: "46-59" },
      { id: "2d", label: "60 anos ou mais", value: "60+" },
    ]
  },
  {
    id: 3,
    question: "Você sente inchaço abdominal após as refeições?",
    options: [
      { id: "3a", label: "Sim, quase sempre", value: "always" },
      { id: "3b", label: "Às vezes", value: "sometimes" },
      { id: "3c", label: "Raramente", value: "rarely" },
      { id: "3d", label: "Nunca", value: "never" },
    ]
  },
  {
    id: 4,
    question: "Como está seu nível de energia ao acordar?",
    options: [
      { id: "4a", label: "Baixo, acordo cansada", value: "low" },
      { id: "4b", label: "Médio, demoro a engrenar", value: "medium" },
      { id: "4c", label: "Alto, acordo disposta", value: "high" },
    ]
  },
  {
    id: 5,
    question: "Quanto peso você gostaria de eliminar?",
    options: [
      { id: "5a", label: "Menos de 5kg", value: "<5kg" },
      { id: "5b", label: "Entre 5kg e 10kg", value: "5-10kg" },
      { id: "5c", label: "Mais de 10kg", value: ">10kg" },
      { id: "5d", label: "Não quero perder peso, apenas firmar", value: "tone" },
    ]
  }
];

const App: React.FC = () => {
  const [phase, setPhase] = useState<AppPhase>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [onlineUsers, setOnlineUsers] = useState(112);

  // Fake live user counter effect
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    setPhase('quiz');
  };

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({ ...prev, [QUESTIONS[currentQuestionIndex].id]: value }));

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 250); // Small delay for better UX
    } else {
      setPhase('analyzing');
    }
  };

  useEffect(() => {
    if (phase === 'analyzing') {
      const runAnalysis = async () => {
        // Minimum wait time for the "Analyzing" animation to feel real
        const minTimePromise = new Promise(resolve => setTimeout(resolve, 5000));
        const analysisPromise = generateHealthAnalysis(QUESTIONS, answers);
        
        const [_, result] = await Promise.all([minTimePromise, analysisPromise]);
        
        setAnalysis(result);
        setPhase('result');
      };
      runAnalysis();
    }
  }, [phase, answers]);

  return (
    <div className="min-h-screen bg-[#f0f4f8] font-sans text-gray-900 flex flex-col overflow-hidden">
      
      {/* Main Content Area - Centered Vertically */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 flex flex-col justify-center items-center pb-20 pt-4">
        
        {phase === 'intro' && (
          <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in border border-white">
            
            {/* Super Aggressive "Breaking News" Style Banner */}
            <div className="bg-gradient-to-r from-red-600 to-rose-600 p-3 text-center shadow-lg relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
               <div className="relative z-10 flex flex-col items-center justify-center">
                  <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider mb-1">
                    <AlertCircle className="w-3 h-3" />
                    Alerta Urgente
                  </span>
                  <p className="text-white text-lg font-extrabold leading-tight tracking-tight drop-shadow-md">
                    PARE DE FAZER DIETA.
                  </p>
               </div>
            </div>

            <div className="p-5 text-center relative">
              {/* Background accent */}
              <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-rose-50 to-transparent z-0"></div>
              
              <div className="relative z-10">
                <h1 className="text-xl md:text-2xl font-black text-gray-900 leading-tight mb-3 tracking-tight">
                  Sua Barriga Não Diminui? <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-red-600">O Problema Não É Comida.</span>
                </h1>
                
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-5 font-medium">
                  Se você tem "pochete" ou pele flácida, pare de se culpar. 
                  Você provavelmente sofre de um <span className="bg-yellow-100 px-1 font-bold text-gray-900">Bloqueio Oculto do Colágeno</span>.
                </p>

                {/* Pulsing CTA Button */}
                <div className="relative group mb-2">
                  <button 
                    onClick={handleStart}
                    className="animate-heartbeat relative w-full bg-gradient-to-b from-[#2e2a78] to-[#1e1b58] text-white font-black text-lg py-4 px-6 rounded-xl shadow-[0_10px_30px_rgba(46,42,120,0.4)] flex items-center justify-center gap-2 transition-all hover:brightness-110"
                  >
                    <span>DESCOBRIR MEU BLOQUEIO</span>
                    <ChevronRight className="w-5 h-5 stroke-[3]" />
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-center gap-2 opacity-80">
                  <Eye className="w-3 h-3 text-gray-400" />
                  <span className="text-[10px] text-gray-500 font-medium">Esta ferramenta sairá do ar em breve.</span>
                </div>

              </div>
            </div>
          </div>
        )}

        {phase === 'quiz' && (
          <div className="w-full">
            <ProgressBar current={currentQuestionIndex + 1} total={QUESTIONS.length} />
            <QuizCard 
              question={QUESTIONS[currentQuestionIndex]} 
              onAnswer={handleAnswer} 
            />
          </div>
        )}

        {phase === 'analyzing' && <LoadingAnalysis />}

        {phase === 'result' && analysis && <ResultPage result={analysis} />}

      </main>

      {/* Footer Status Bar - Fixed at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-4 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div className="flex items-center gap-1.5">
             <ShieldCheck className="w-4 h-4 text-green-600" />
             <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-800 uppercase leading-none">Site Seguro</span>
                <span className="text-[8px] text-gray-400 leading-none">Dados Criptografados</span>
             </div>
          </div>
          
          <div className="flex items-center gap-1.5 bg-red-50 px-2 py-1 rounded-full border border-red-100">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
            </span>
            <span className="text-[9px] font-bold text-red-600 tabular-nums">{onlineUsers} pessoas online</span>
          </div>
        </div>
        
        {/* Copyright in very small text below the status bar */}
        <div className="text-center mt-2">
            <p className="text-[8px] text-gray-300">&copy; {new Date().getFullYear()} O Segredo da Gelatina.</p>
        </div>
      </div>

    </div>
  );
};

export default App;