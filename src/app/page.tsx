'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import SocialLinks from '@/components/SocialLinks/SocialLinks';
import AudioControl from '@/components/AudioControl/AudioControl';
const MissionsSection = dynamic(() => import('@/components/Missions/MissionsSection'), { ssr: true });
import { FaPlay } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './page.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Inicializar áudio
    audioRef.current = new Audio('/music.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Definimos visibilidade do controle de áudio apenas enquanto for o Hero (através do window.scrollY)
      setIsHeroVisible(window.scrollY < 400); 
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const toggleAudio = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        gsap.to(audioRef.current, { volume: 0, duration: 1, onComplete: () => audioRef.current?.pause() });
      } else {
        audioRef.current.play();
        gsap.to(audioRef.current, { volume: 0.4, duration: 1 });
      }
      setIsAudioPlaying(!isAudioPlaying);
    }
  };

  const fadeAudio = (targetVolume: number) => {
    if (audioRef.current && isAudioPlaying) {
      gsap.to(audioRef.current, { 
        volume: targetVolume, 
        duration: 1,
        ease: 'power2.inOut'
      });
    }
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  useEffect(() => {
    // Pequeno delay para garantir que o DOM renderizou
    const timeout = setTimeout(() => {
      const ctx = gsap.context(() => {
        ScrollTrigger.batch('.reveal', {
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              visibility: 'visible',
              duration: 1.2,
              stagger: 0.15,
              ease: 'power3.out',
              overwrite: true
            });
          },
          start: 'top 85%',
        });
      });
      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <main className={styles.main}>
      <div className="fade-in">
        <Navbar />
        <AudioControl 
          isPlaying={isAudioPlaying} 
          onToggle={toggleAudio} 
          isVisible={isHeroVisible}
        />
        
        {/* Cloud Effects Background */}
        <div className="clouds-container">
          <div className="cloud cloud-1" />
          <div className="cloud cloud-2" />
          <div className="cloud cloud-3" />
        </div>

        <Hero>
          <SocialLinks />
        </Hero>

        <section id="sobre" className={styles.sobreSection}>
          {/* Background atmosphere */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', background: '#E8E2D4' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 0%, rgba(215, 198, 168, 0.2) 50%, transparent 100%)' }} />
            <div className={styles.grainOverlay} />
          </div>

          <div className={`${styles.sobreContainer} reveal`}>
            {/* Eyebrow */}
            <div className={styles.sobreEyebrow}>
              <span className={styles.sobreEyebrowLabel}>Sobre Mim</span>
              <div className={styles.sobreEyebrowLine} />
            </div>

            {/* Grid */}
            <div className={styles.sobreGrid}>
              {/* Texto */}
              <div className={styles.sobreTextColumn}>
                <h2 className={styles.sobreTitle}>
                  Apaixonada por Jesus.
                </h2>
                <p className={styles.sobreParagraph}>
                  Oi, eu sou a Tata. Tenho 28 anos e, acima de tudo, sou apaixonada por Jesus.
                </p>
                <p className={styles.sobreParagraph}>
                  Atualmente, vivo missões em tempo integral pela Dunamis School of Ministry, mas o meu coração não sossega aqui. Por isso te convido a acompanhar o início dessa minha jornada como missionária e também fazer parte dela.
                </p>
                <blockquote className={styles.sobreVerse}>
                  <p className={styles.sobreVerseText}>
                    "Mas recebereis poder ao descer sobre vós o Espírito Santo; e ser-me-eis testemunhas tanto em Jerusalém como em toda a Judéia e Samaria e até aos confins da terra." Atos 1:8
                  </p>
                </blockquote>
              </div>

              {/* Vídeo */}
              <div className={styles.sobreVideoColumn}>
                <div className={styles.sobreVideoDecor} />
                <div className={styles.sobreVideoWrapper} onClick={toggleVideo}>
                  <video
                    ref={videoRef}
                    playsInline
                    preload="none"
                    className={styles.sobreVideo}
                    onPlay={() => { setVideoPlaying(true); fadeAudio(0.05); }}
                    onPause={() => { setVideoPlaying(false); fadeAudio(0.4); }}
                    onEnded={() => { setVideoPlaying(false); fadeAudio(0.4); }}
                  >
                    <source src="/sobre.webm" type="video/webm" />
                    <source src="/sobre.MOV" type="video/quicktime" />
                    <source src="/sobre.MOV" type="video/mp4" />
                  </video>
                  {!videoPlaying && (
                    <div className={styles.sobrePlayOverlay}>
                      <FaPlay size={30} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <MissionsSection />

        <footer className={styles.footer} ref={footerRef} style={{ background: '#E8E2D4', padding: '6rem 0' }}>
          <div className={`${styles.footerContent} reveal`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <h2 style={{ 
              fontFamily: 'var(--font-bebas)', 
              fontSize: '1.5rem', 
              color: '#333', 
              letterSpacing: '0.2em',
              textAlign: 'center',
              opacity: 0.7,
              textTransform: 'uppercase'
            }}>
              stick to the plan
            </h2>
            <div style={{ width: '40px', height: '1px', background: 'rgba(0,0,0,0.2)' }} />
            <p style={{ color: '#666', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
              &copy; {new Date().getFullYear()} Tata.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
