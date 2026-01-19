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
    <div className="min-h-screen bg-[#f0f4f8] font-sans text-gray-900 flex flex-col">
      
      {/* Header with "Live" status */}
      <header className="bg-white shadow-sm py-2 sticky top-0 z-20 border-b border-gray-200">
        <div className="container mx-auto px-4 flex justify-between items-center max-w-lg">
          <div className="flex items-center gap-2">
             <ShieldCheck className="w-4 h-4 text-green-600" />
             <span className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">Site Oficial • Seguro</span>
          </div>
          <div className="flex items-center gap-1.5 bg-red-50 px-2 py-1 rounded-full border border-red-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-[10px] font-bold text-red-600 tabular-nums">{onlineUsers} pessoas analisando agora</span>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-4 md:py-8 flex flex-col items-center justify-start">
        
        {phase === 'intro' && (
          <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in border border-white">
            
            {/* Super Aggressive "Breaking News" Style Banner */}
            <div className="bg-gradient-to-r from-red-600 to-rose-600 p-4 text-center shadow-lg relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
               <div className="relative z-10 flex flex-col items-center justify-center">
                  <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider mb-1">
                    <AlertCircle className="w-3 h-3" />
                    Alerta Urgente
                  </span>
                  <p className="text-white text-lg md:text-xl font-extrabold leading-tight tracking-tight drop-shadow-md">
                    PARE DE FAZER DIETA.
                  </p>
               </div>
            </div>

            <div className="p-6 md:p-8 text-center relative">
              {/* Background accent */}
              <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-rose-50 to-transparent z-0"></div>
              
              <div className="relative z-10">
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-4 tracking-tight">
                  Sua Barriga Não Diminui? <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-red-600">O Problema Não É Comida.</span>
                </h1>
                
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 font-medium">
                  Se você tem "pochete", estômago alto ou pele flácida, pare de se culpar. 
                  Você provavelmente sofre de um <span className="bg-yellow-100 px-1 font-bold text-gray-900">Bloqueio Oculto do Colágeno</span> que impede a queima de gordura.
                </p>

                {/* "The Gap" - Problem vs Solution Visual */}
                <div className="bg-gray-50 rounded-2xl p-5 mb-8 text-left border border-gray-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3 text-center">O Que Você Precisa Saber</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                      <div className="bg-red-100 rounded-full p-2 shrink-0">
                        <Ban className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <span className="block text-gray-900 font-bold text-sm">Não é Excesso de Calorias</span>
                        <span className="text-xs text-gray-500">Dietas restritivas podem piorar o bloqueio.</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm border-l-4 border-l-green-500">
                      <div className="bg-green-100 rounded-full p-2 shrink-0">
                        <Activity className="w-4 h-4 text-green-600" />
                      </div>
                       <div>
                        <span className="block text-gray-900 font-bold text-sm">Ative o "Interruptor" Natural</span>
                        <span className="text-xs text-gray-500">Descubra como a gelatina correta reverte isso.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pulsing CTA Button */}
                <div className="relative group mb-4">
                  <button 
                    onClick={handleStart}
                    className="animate-heartbeat relative w-full bg-gradient-to-b from-[#2e2a78] to-[#1e1b58] text-white font-black text-lg md:text-xl py-5 px-6 rounded-xl shadow-[0_10px_30px_rgba(46,42,120,0.4)] flex items-center justify-center gap-2 transition-all hover:brightness-110"
                  >
                    <span>DESCOBRIR MEU BLOQUEIO</span>
                    <ChevronRight className="w-6 h-6 stroke-[3]" />
                  </button>
                  <p className="text-[10px] text-gray-400 mt-3 flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3" />
                    Análise confidencial. Seus dados não serão compartilhados.
                  </p>
                </div>

                {/* Scarcity Footer */}
                <div className="border-t border-gray-100 pt-4 flex items-center justify-center gap-2 opacity-80">
                  <Eye className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-500 font-medium">Esta ferramenta será removida do ar em breve.</span>
                </div>

              </div>
            </div>
            
            {/* Progress Bar Visual (Fake start) */}
            <div className="bg-gray-100 h-1.5 w-full">
               <div className="bg-gradient-to-r from-red-500 to-rose-500 h-1.5 w-[8%]"></div>
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

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-gray-400 text-[10px] md:text-xs bg-transparent">
        <div className="container mx-auto px-4">
          <p className="mb-2">Este site não faz parte do site do Facebook ou Facebook Inc.</p>
          <p>&copy; {new Date().getFullYear()} O Segredo da Gelatina. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;