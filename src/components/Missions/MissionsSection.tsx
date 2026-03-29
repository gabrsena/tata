'use client';

import { useEffect, useRef } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import CountdownTimer from './CountdownTimer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MissionsSection() {
  const targetDate = "2026-04-28T00:00:00"; 
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Lazy load and play videos when in view
      if (video1Ref.current) {
        ScrollTrigger.create({
          trigger: video1Ref.current,
          start: 'top bottom',
          onEnter: () => video1Ref.current?.play(),
        });
      }
      if (video2Ref.current) {
        ScrollTrigger.create({
          trigger: video2Ref.current,
          start: 'top bottom',
          onEnter: () => video2Ref.current?.play(),
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="missao-v4" className="relative min-h-screen flex items-center py-24 sm:py-32 overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video 
          ref={video1Ref}
          muted 
          loop 
          playsInline 
          preload="none"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="/nordeste.webm" type="video/webm" />
          <source src="/nordeste.mp4" type="video/mp4" />
        </video>
        {/* Adiciona o vídeo br como overlay */}
        <video 
          ref={video2Ref}
          muted 
          loop 
          playsInline 
          preload="none"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-overlay"
        >
          <source src="/br.webm" type="video/webm" />
          <source src="/br.mp4" type="video/mp4" />
        </video>
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
      </div>

      {/* Decorative SVG Map (Overlayed) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden text-[#C9A96E] z-1">
        <svg 
          viewBox="0 0 800 800" 
          className="absolute right-[-150px] top-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-auto opacity-[0.2]"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Coordinate Grid */}
          <g className="stroke-[#C9A96E] stroke-[0.3] [stroke-dasharray:4_8]">
            <line x1="0" y1="200" x2="800" y2="200" />
            <line x1="0" y1="400" x2="800" y2="400" />
            <line x1="0" y1="600" x2="800" y2="600" />
            <line x1="200" y1="0" x2="200" y2="800" />
            <line x1="400" y1="0" x2="400" y2="800" />
            <line x1="600" y1="0" x2="600" y2="800" />
          </g>

          {/* Northeast Abstract Contours */}
          <path 
            className="stroke-[#C9A96E] stroke-[1] opacity-30" 
            d="M500,100 L650,150 L750,300 L710,520 L580,680 L420,620 L380,450 Z" 
          />
          
          <circle cx="520" cy="180" r="5" className="fill-[#C9A96E] animate-pulse opacity-40" />
          <circle cx="680" cy="320" r="5" className="fill-[#C9A96E] animate-pulse opacity-20 [animation-delay:1.5s]" />
          <circle cx="560" cy="580" r="5" className="fill-[#C9A96E] animate-pulse opacity-30 [animation-delay:3s]" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center reveal">
        {/* Left Column: Narrative */}
        <div className="flex flex-col pt-8 lg:pt-0">
          <div className="flex items-center gap-4 mb-6 sm:mb-8">
            <div className="w-12 h-[1px] bg-[#C9A96E]/60 shadow-[0_0_8px_#C9A96E]" />
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.4em] text-[#C9A96E] uppercase">
              Atos 1:8
            </span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F2E8D9] mb-8 sm:mb-10 leading-[1.2] lg:leading-[1.1] drop-shadow-lg">
            MISSÕES / <br className="hidden sm:block" />
            <span className="text-[#C9A96E] italic font-light italic">no Nordeste</span>
          </h2>

          <div className="space-y-6 sm:space-y-8 text-[#B8A898] font-serif text-lg sm:text-xl leading-relaxed max-w-full lg:max-w-[550px] drop-shadow-md">
            <p>
              Daqui alguns dias, eu embarco para o Nordeste para levar o Evangelho onde ele ainda não chegou: 
              aldeias indígenas, povos ribeirinhos, igrejas locais, bases da Iris e cada lugar que o Senhor me apontar.
            </p>
            <p className="border-l-2 border-[#C9A96E]/20 pl-8 sm:pl-12 italic">
              "Nesta temporada, o Senhor tem me dado um coração missionário de fato. Isso não é apenas algo que eu faço; 
              faz parte do meu chamado, faz parte de quem eu sou!"
            </p>
            <p>
              Eu e mais 10 mulheres de Deus estaremos juntas nessa. Aprendi que, se dói no coração de Cristo ver que ainda existem pessoas não alcançadas, essa dor também precisa ser a minha.
            </p>
          </div>
        </div>

        {/* Right Column: Interaction & Media */}
        <div className="flex flex-col gap-10 lg:gap-12 pb-8 lg:pb-0">
          {/* Mission Group Photo with Glow Effect */}
          <div className="relative order-first lg:order-none">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C9A96E]/40 to-transparent rounded-[14px] blur opacity-30" />
            <div className="relative overflow-hidden rounded-xl border border-white/10 shadow-2xl">
              <img 
                src="/missoes.jpg" 
                alt="Equipe de Missionárias Tata" 
                width={600}
                height={400}
                className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          <div className="space-y-8 flex flex-col items-center lg:items-start">
            <div className="space-y-4 w-full">
              <h3 className="font-mono text-[0.7rem] sm:text-[0.75rem] uppercase tracking-widest text-[#C9A96E] flex items-center justify-center lg:justify-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#C9A96E] animate-pulse" />
                CONTAGEM PARA PARTIDA
              </h3>
              <CountdownTimer targetDate={targetDate} />
            </div>

            <a 
              href="https://wa.me/5515998618920" 
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center gap-8 py-6 sm:py-7 px-12 sm:px-14 overflow-hidden transition-all duration-500 rounded-full w-full sm:w-auto shadow-[0_0_20px_rgba(201,169,110,0.15)]"
            >
              {/* Premium Button Background & Effects */}
              <div className="absolute inset-0 bg-[#C9A96E]/15 backdrop-blur-md border border-[#C9A96E]/50 group-hover:border-[#C9A96E] transition-colors duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <span className="relative z-10 text-[#C9A96E] group-hover:text-white font-serif text-xl sm:text-2xl tracking-widest transition-colors duration-500">
                APOIAR ESSA MISSÃO
              </span>
              <FaArrowRight className="relative z-10 text-[#C9A96E] group-hover:text-white group-hover:translate-x-4 transition-all duration-500 text-2xl" />
              
              {/* Pulsing Glow */}
              <div className="absolute inset-0 shadow-[0_0_30px_rgba(201,169,110,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
