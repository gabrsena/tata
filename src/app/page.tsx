'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import SocialLinks from '@/components/SocialLinks/SocialLinks';
import Section from '@/components/Section/Section';
import Intro from '@/components/Intro/Intro';
import AudioControl from '@/components/AudioControl/AudioControl';
import MissionsSection from '@/components/Missions/MissionsSection';
import { FaPlay } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './page.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
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

  return (
    <main className={styles.main}>
      {!introComplete && <Intro onComplete={handleIntroComplete} />}
      
      {introComplete && (
        <div className="fade-in">
          <Navbar />
          <AudioControl isPlaying={isAudioPlaying} onToggle={toggleAudio} />
          
          {/* Cloud Effects Background */}
          <div className="clouds-container">
            <div className="cloud cloud-1" />
            <div className="cloud cloud-2" />
            <div className="cloud cloud-3" />
          </div>

          <Hero>
            <SocialLinks />
          </Hero>

          <Section id="sobre" title="Sobre Mim">
            {/* Background Videos */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              >
                <source src="/garden.mov" type="video/quicktime" />
                <source src="/garden.mov" type="video/mp4" />
              </video>
              <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen"
              >
                <source src="/particles.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-b from-[#E8E2D4] via-transparent to-[#E8E2D4] opacity-80" />
              {/* Grain Overlay */}
              <div className={styles.grainOverlay} />
            </div>

            <div className={`${styles.contentGrid} relative z-10`}>
              <div className={styles.textStack}>
                <p>
                  Oi, eu sou a Tata. Tenho 28 anos e, acima de tudo, sou apaixonada por Jesus.
                </p>
                <p>
                  Atualmente, vivo missões em tempo integral pela Dunamis School of Ministry, mas o meu coração não sossega aqui. Por isso te convido a acompanhar o inicio desssa minha jornada como missionaria e tambem fazer parte dela, curtindo, comentando, compartilhando mas principalmente orando por mim. Deus te abencoe.
                </p>
              </div>
              <div className={styles.mediaContainer}>
                <div className={styles.videoWrapper} onClick={toggleVideo}>
                  <video 
                    ref={videoRef}
                    playsInline 
                    className={styles.aboutVideo}
                    onPlay={() => {
                      setVideoPlaying(true);
                      fadeAudio(0.05);
                    }}
                    onPause={() => {
                      setVideoPlaying(false);
                      fadeAudio(0.4);
                    }}
                    onEnded={() => {
                      setVideoPlaying(false);
                      fadeAudio(0.4);
                    }}
                  >
                    <source src="/sobre.MOV" type="video/quicktime" />
                    <source src="/sobre.MOV" type="video/mp4" />
                  </video>
                  
                  {!videoPlaying && (
                    <div className={styles.playOverlay}>
                      <FaPlay size={30} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Section>

          <MissionsSection />

          <footer className={styles.footer}>
            <div className={styles.footerVideoContainer}>
              <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                preload="auto"
                className={styles.footerVideo}
              >
                <source src="/cloud.mov" type="video/quicktime" />
                <source src="/cloud.mov" type="video/mp4" />
                <source src="/cloud.mov" />
              </video>
              <div className={styles.footerOverlay} />
            </div>
            <div className={styles.footerContent}>
              <p>&copy; {new Date().getFullYear()} Tata. stick to the plan.</p>
            </div>
          </footer>
        </div>
      )}
    </main>
  );
}
