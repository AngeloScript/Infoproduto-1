import React, { useEffect, useState } from 'react';
import { AnalysisResult } from '../types';
import confetti from 'canvas-confetti';
import { Clock, Lock, ArrowRight, ShieldCheck, FileText, AlertTriangle } from 'lucide-react';

interface ResultPageProps {
  result: AnalysisResult;
}

const ResultPage: React.FC<ResultPageProps> = ({ result }) => {
  const [timeLeft, setTimeLeft] = useState(600);
  const [meterWidth, setMeterWidth] = useState(0);
  // Link exato solicitado
  const [checkoutUrl, setCheckoutUrl] = useState("https://pay.cakto.com.br/dmha2ta_727694");

  useEffect(() => {
    // Confetti
    const duration = 3000;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({ particleCount: 2, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#5e54e8', '#ff0000', '#00ff00'] });
      confetti({ particleCount: 2, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#5e54e8', '#ff0000', '#00ff00'] });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
    
    setTimeout(() => setMeterWidth(100), 500);

    // Mantém os parâmetros de URL (UTMs) do Facebook/Ads se existirem
    const currentParams = window.location.search;
    if (currentParams) {
        setCheckoutUrl(prev => {
            const separator = prev.includes('?') ? '&' : '?';
            return `${prev}${separator}${currentParams.substring(1)}`;
        });
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const currentAge = result.metabolicAge || 45;
  const targetAge = Math.max(25, currentAge - 15);

  return (
    <div className="w-full max-w-md mx-auto pt-0 pb-2 px-1">
      
      {/* Compact Urgency Banner */}
      <div className="bg-red-50 border border-red-100 rounded-lg p-1.5 mb-3 flex items-center justify-center gap-2 text-red-700 shadow-sm animate-pulse-slow">
        <Clock className="w-3 h-3" />
        <span className="text-[10px] font-bold uppercase tracking-wide">Acesso expira em: <span className="font-mono text-xs ml-1">{formatTime(timeLeft)}</span></span>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        <div className="p-4 flex flex-col items-center text-center relative">
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-rose-50 to-white z-0"></div>

            <div className="relative z-10 w-full">
                <div className="text-3xl mb-1 animate-bounce">🎉</div>

                <h1 className="text-xl font-black text-[#2e2a78] leading-tight mb-1">
                  Análise Concluída
                </h1>
                <p className="text-gray-500 text-[10px] font-medium mb-4">
                  Encontramos o protocolo ideal para você.
                </p>

                {/* Compact Graph */}
                <div className="w-full bg-gray-50 rounded-lg p-3 border border-gray-100 mb-4 shadow-inner">
                    <div className="flex justify-between items-end mb-2">
                        <div className="text-left">
                            <span className="text-[9px] text-gray-500 block">Metabolismo Atual</span>
                            <span className="text-sm font-bold text-red-500 leading-none">{currentAge} anos</span>
                        </div>
                        <div className="text-right">
                             <span className="text-[9px] text-gray-500 block">Potencial Ativado</span>
                             <span className="text-sm font-bold text-green-600 leading-none">{targetAge} anos</span>
                        </div>
                    </div>
                    
                    <div className="relative h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="absolute top-0 left-0 h-full bg-red-400 w-[85%] rounded-full opacity-30"></div>
                        <div 
                            className="absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(34,197,94,0.5)]" 
                            style={{ width: `${meterWidth > 0 ? '45%' : '0%'}` }}
                        ></div>
                    </div>
                </div>

                {/* THE HOOK: Mystery/Locked Content - FOCADO NA DIETA */}
                <div className="relative w-full bg-[#2e2a78] text-white rounded-xl p-4 mb-4 overflow-hidden text-left shadow-lg border border-[#1e1b58]">
                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] bg-[length:10px_10px]"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2 border-b border-white/20 pb-2">
                            <FileText className="w-4 h-4 text-yellow-400" />
                            <h3 className="font-bold text-xs tracking-wide text-yellow-400 uppercase">Sua Receita Personalizada</h3>
                        </div>

                        <p className="text-xs font-semibold mb-3 leading-snug">
                           O algoritmo gerou a combinação exata de ingredientes para destravar seu metabolismo:
                        </p>

                        {/* Blurred Content Visual - VERY PERSUASIVE */}
                        <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/10 relative">
                            {/* Fake text that looks like a recipe but blurred */}
                            <div className="blur-[4px] opacity-70 select-none text-[10px] space-y-2 font-mono text-gray-200">
                                <p>1. Ingrediente Principal: Gelatina Incolor Tipo B...</p>
                                <p>2. Ativador Enzimático: [NOME DO ALIMENTO] (Essencial)</p>
                                <p>3. Horário: Beber exatamente às 07:30h em jejum.</p>
                                <p>4. Mistura: Adicionar 5 gotas de limão e...</p>
                            </div>
                            
                            {/* Lock Overlay */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#2e2a78]/70 rounded-lg backdrop-blur-[2px]">
                                <div className="bg-white text-[#2e2a78] p-1.5 rounded-full mb-1 shadow-lg animate-pulse">
                                    <Lock className="w-4 h-4" />
                                </div>
                                <span className="text-[9px] font-bold uppercase tracking-widest bg-black/60 px-2 py-0.5 rounded text-white shadow-sm border border-white/20">Receita Bloqueada</span>
                            </div>
                        </div>

                        <div className="mt-3 flex gap-2 items-start">
                             <AlertTriangle className="w-3 h-3 text-yellow-400 shrink-0 mt-0.5" />
                             <p className="text-[9px] leading-tight text-gray-200">
                                <span className="font-bold text-white">Importante:</span> A gelatina comum de mercado não funciona sem o <span className="underline decoration-yellow-400">Ativador Enzimático</span> listado acima.
                             </p>
                        </div>
                    </div>
                </div>

                {/* CTA Button - LINK CONFIGURADO AQUI */}
                <a
                  href={checkoutUrl}
                  target="_self"
                  rel="noopener noreferrer"
                  className="group relative w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-black text-lg py-4 px-4 rounded-xl shadow-[0_4px_14px_0_rgba(34,197,94,0.39)] transform transition hover:-translate-y-1 active:scale-95 duration-200 overflow-hidden flex items-center justify-center decoration-none mb-1"
                >
                    <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-stripes opacity-30"></div>
                    <span className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-tight text-sm md:text-base">
                        Desbloquear Receita Agora
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                </a>
                
                <p className="text-[9px] text-gray-400 mt-2">
                    Acesso imediato enviado para seu e-mail.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;