'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
const SocialLinks = dynamic(() => import('@/components/SocialLinks/SocialLinks'), { ssr: true });
import Intro from '@/components/Intro/Intro';
import AudioControl from '@/components/AudioControl/AudioControl';
const MissionsSection = dynamic(() => import('@/components/Missions/MissionsSection'), { ssr: true });
import { FaPlay } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './page.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const aboutRef = useRef<HTMLElement>(null);

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

  const handleIntroComplete = () => {
    setIntroComplete(true);
    // Não toca automático por causa de políticas de autoplay, mas deixa pronto
  };

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
    if (introComplete) {
      // Pequeno delay para garantir que o DOM renderizou após o Intro sumir
      const timeout = setTimeout(() => {
        const revealElements = document.querySelectorAll('.reveal');
        
        revealElements.forEach((el) => {
          gsap.fromTo(el,
            { 
              opacity: 0, 
              y: 50,
              visibility: 'hidden'
            },
            {
              opacity: 1,
              y: 0,
              visibility: 'visible',
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
              }
            }
          );
        });
      }, 100);

      return () => {
        clearTimeout(timeout);
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    }
  }, [introComplete]);

  return (
    <main className={styles.main}>
      {!introComplete && <Intro onComplete={handleIntroComplete} />}
      
      {introComplete && (
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
            {/* Background garden video */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
              <video
                autoPlay muted loop playsInline
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }}
              >
                <source src="/garden.mov" type="video/quicktime" />
                <source src="/garden.mov" type="video/mp4" />
              </video>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #E8E2D4 0%, transparent 30%, transparent 70%, #E8E2D4 100%)' }} />
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
                      className={styles.sobreVideo}
                      onPlay={() => { setVideoPlaying(true); fadeAudio(0.05); }}
                      onPause={() => { setVideoPlaying(false); fadeAudio(0.4); }}
                      onEnded={() => { setVideoPlaying(false); fadeAudio(0.4); }}
                    >
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

          <footer className={styles.footer}>
            <div className={styles.footerVideoContainer}>
              <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                preload="none"
                className={styles.footerVideo}
              >
                <source src="/cloud.mov" type="video/quicktime" />
                <source src="/cloud.mov" type="video/mp4" />
                <source src="/cloud.mov" />
              </video>
              <div className={styles.footerOverlay} />
            </div>
            <div className={`${styles.footerContent} reveal`}>
              <p>&copy; {new Date().getFullYear()} Tata. stick to the plan.</p>
            </div>
          </footer>
        </div>
      )}
    </main>
  );
}
