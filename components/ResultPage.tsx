import React, { useEffect, useState } from 'react';
import { AnalysisResult } from '../types';
import confetti from 'canvas-confetti';
import { Clock, CheckCircle2, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

interface ResultPageProps {
  result: AnalysisResult;
}

const ResultPage: React.FC<ResultPageProps> = ({ result }) => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [meterWidth, setMeterWidth] = useState(0);
  const [checkoutUrl, setCheckoutUrl] = useState("https://pay.cakto.com.br/dmha2ta_727694");

  // Trigger Confetti and Animations on Mount
  useEffect(() => {
    // 1. Confetti Effect
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#5e54e8', '#ff0000', '#00ff00']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#5e54e8', '#ff0000', '#00ff00']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
    
    // 2. Animate Meter
    setTimeout(() => {
        setMeterWidth(100);
    }, 500);

    // 3. Ensure UTMs are passed to Checkout (Critical for Tracking)
    // This grabs the ?utm_source=... from your quiz URL and adds it to the checkout button
    const currentParams = window.location.search;
    if (currentParams) {
        // Check if checkout URL already has params to decide between ? and &
        const separator = checkoutUrl.includes('?') ? '&' : '?';
        // Remove '?' from currentParams if using '&' or keep it if using '?' logic
        // Simple append approach:
        setCheckoutUrl(prev => `${prev}${currentParams}`);
    }

  }, []);

  // Countdown Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Calculate generic age improvement for the visual
  const currentAge = result.metabolicAge || 45;
  const targetAge = Math.max(25, currentAge - 15);

  return (
    <div className="w-full max-w-lg mx-auto pt-4 pb-12 px-4">
      
      {/* Urgency Banner */}
      <div className="bg-red-50 border border-red-100 rounded-xl p-3 mb-6 flex items-center justify-between text-red-700 shadow-sm animate-pulse-slow">
        <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span className="text-sm font-semibold">Oferta expira em:</span>
        </div>
        <span className="font-mono font-bold text-lg">{formatTime(timeLeft)}</span>
      </div>

      <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100">
        
        <div className="p-8 md:p-10 flex flex-col items-center text-center relative">
            {/* Background pattern */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#f0f0ff] to-white z-0"></div>

            <div className="relative z-10">
                <div className="text-6xl mb-4 animate-bounce">
                🎉
                </div>

                <h1 className="text-3xl md:text-4xl font-extrabold text-[#2e2a78] mb-2">
                Plano Pronto!
                </h1>
                
                <p className="text-gray-500 text-sm mb-6 font-medium">
                Seu protocolo personalizado foi gerado.
                </p>

                {/* Animated Comparison Graph */}
                <div className="w-full bg-gray-50 rounded-xl p-4 border border-gray-100 mb-6 text-left shadow-inner">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Sua Idade Metabólica</h3>
                    
                    {/* Bar 1: Current */}
                    <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600 font-medium">Atual (Estimada)</span>
                            <span className="text-red-500 font-bold">{currentAge} anos</span>
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-red-400 rounded-full transition-all duration-1000 ease-out" 
                                style={{ width: `${meterWidth > 0 ? '85%' : '0%'}` }}
                            ></div>
                        </div>
                    </div>

                    {/* Bar 2: Target */}
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600 font-medium">Com o Truque da Gelatina</span>
                            <span className="text-green-600 font-bold">{targetAge} anos</span>
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-green-500 rounded-full transition-all duration-1000 delay-500 ease-out" 
                                style={{ width: `${meterWidth > 0 ? '45%' : '0%'}` }}
                            ></div>
                        </div>
                    </div>
                </div>

                <div className="space-y-3 text-gray-600 text-sm leading-relaxed mb-8 text-left bg-[#f8f9fc] p-4 rounded-xl">
                    <p className="font-semibold text-[#2e2a78] mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        O que você vai receber:
                    </p>
                    <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#5e54e8] mt-1.5 shrink-0"></div>
                            <span>Receita exata da gelatina termo-ativa.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#5e54e8] mt-1.5 shrink-0"></div>
                            <span>Lista de compras econômica (supermercado comum).</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#5e54e8] mt-1.5 shrink-0"></div>
                            <span>Cronograma de 7 dias para reativar o colágeno.</span>
                        </li>
                    </ul>
                </div>

                {/* Botão de Ação (Com UTMs garantidas) */}
                <a
                  href={checkoutUrl}
                  className="group relative w-full bg-[#2e2a78] hover:bg-[#242163] text-white font-bold text-lg py-4 px-6 rounded-xl shadow-[0_10px_20px_-5px_rgba(46,42,120,0.4)] transform transition hover:-translate-y-1 active:translate-y-0 active:scale-95 duration-200 overflow-hidden flex items-center justify-center decoration-none"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <span className="flex items-center justify-center gap-2">
                        BAIXAR MEU PLANO AGORA
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                </a>
                
                <div className="mt-4 flex items-center justify-center gap-1 text-xs text-gray-400">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Compra Segura e Garantida</span>
                </div>
            </div>
        </div>
      </div>
      
      <p className="text-center mt-6 text-gray-400 text-xs px-8">
        Ao clicar no botão acima, você concorda em receber o material digital imediatamente. Acesso vitalício.
      </p>
    </div>
  );
};

export default ResultPage;