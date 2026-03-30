'use client';

import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import styles from '@/app/page.module.css';

export default function MissionsSection() {
  const targetDate = "2026-04-28T00:00:00"; 
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play();
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      id="missao-v4" 
      ref={sectionRef}
      className="bg-[#E8E2D4] min-h-screen flex items-center py-24 sm:py-32"
    >
      <div className="container mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Left Column: Narrative Content */}
        <div className="flex flex-col">
          {/* Eyebrow Label (Synced with Sobre Mim) */}
          <div className="flex items-center gap-4 mb-4">
            <span className={styles.sobreEyebrowLabel}>
              Atos 1:8
            </span>
            <div className={styles.sobreEyebrowLine} />
          </div>
          
          {/* Headings (Unified on a single line, removed slash) */}
          <h2 className={`${styles.sobreTitle} whitespace-nowrap`} style={{ marginBottom: '12px' }}>
            Missões no Nordeste
          </h2>

          {/* Narrative Content */}
          <div className="flex flex-col items-start">
            <p className={styles.sobreParagraph}>
              Daqui alguns dias, eu embarco para o Nordeste para levar o Evangelho onde ele ainda não chegou: 
              aldeias indígenas, povos ribeirinhos, igrejas locais, bases da Iris e cada lugar que o Senhor me apontar.
            </p>
            <div className={styles.sobreVerse} style={{ marginTop: '24px', marginBottom: '24px' }}>
              <p className={styles.sobreVerseText}>
                "Nesta temporada, o Senhor tem me dado um coração missionário de fato. Isso não é apenas algo que eu faço; 
                faz parte do meu chamado, faz parte de quem eu sou!"
              </p>
            </div>
            <p className={styles.sobreParagraph}>
              Eu e mais 10 mulheres de Deus estaremos juntas nessa. Aprendi que, se dói no coração de Cristo ver que ainda existem pessoas não alcançadas, essa dor também precisa ser a minha.
            </p>

            {/* Support Button (Refined Design) */}
            <a 
              href="https://wa.me/5515998618920" 
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-4 mt-12 px-12 py-5 bg-[#C9A84C] text-white text-[10px] sm:text-xs tracking-[0.3em] uppercase font-bold rounded-full shadow-[0_20px_40px_-15px_rgba(201,168,76,0.5)] hover:bg-[#b8943f] hover:scale-105 hover:shadow-[0_30px_60px_-15px_rgba(201,168,76,0.6)] active:scale-95 transition-all duration-500 cursor-pointer border border-white/20 backdrop-blur-sm overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-4">
                APOIAR ESSA MISSÃO
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </a>
          </div>
        </div>

        {/* Right Column: Mission Video & Countdown */}
        <div className="flex flex-col">
          <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="none"
              className="w-full h-full object-cover"
            >
              <source src="/mission.mp4" type="video/mp4" />
            </video>
          </div>
          
          {/* Countdown Block (Increased spacing for better breathe room) */}
          <div className="mt-24 sm:mt-32 w-full flex justify-center">
            <CountdownTimer targetDate={targetDate} />
          </div>
        </div>
      </div>
    </section>
  );
}
