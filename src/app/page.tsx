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

          <section id="sobre" className="w-full bg-[#E8E2D4] py-[60px] px-[48px] relative overflow-hidden">
            {/* Background Grain Overlay from previous version */}
            <div className={styles.grainOverlay} />
            
            <div className="max-w-[900px] mx-auto relative z-10">
              {/* Eyebrow */}
              <div className="flex items-center gap-4 mb-12">
                <span className="text-xs tracking-[0.2em] uppercase text-stone-400 font-sans">Sobre Mim</span>
                <div className="flex-1 h-px bg-stone-300" />
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[64px] items-start">
                {/* Left Column - Text */}
                <div className="flex flex-col">
                  <h2 className="font-serif text-5xl font-normal italic leading-tight text-stone-900 mb-8">
                    Apaixonada por Jesus.
                  </h2>
                  <div className="space-y-5">
                    <p className="font-sans text-sm leading-relaxed text-stone-500">
                      Oi, eu sou a Tata. Tenho 28 anos e, acima de tudo, sou apaixonada por Jesus.
                    </p>
                    <p className="font-sans text-sm leading-relaxed text-stone-500">
                      Atualmente, vivo missões em tempo integral pela Dunamis School of Ministry, mas o meu coração não sossega aqui. Por isso te convido a acompanhar o inicio dessa minha jornada como missionaria e tambem fazer parte dela.
                    </p>
                    <blockquote className="border-l-2 border-yellow-600 pl-5 mt-0">
                      <p className="font-serif italic text-sm leading-relaxed text-stone-400">
                        "Curtindo, comentando, compartilhando — mas principalmente orando por mim. Deus te abençoe."
                      </p>
                    </blockquote>
                  </div>
                </div>

                {/* Right Column - Video */}
                <div className="relative">
                  {/* Decorative Golden Border Square */}
                  <div className="absolute bottom-[-16px] right-[-16px] w-20 h-20 border border-yellow-600 rounded-none z-0" />
                  
                  {/* Video Wrapper */}
                  <div 
                    className="relative z-10 rounded-sm overflow-hidden aspect-[4/5] bg-[#f0ebe0] cursor-pointer shadow-xl"
                    onClick={toggleVideo}
                  >
                    <video 
                      ref={videoRef}
                      playsInline 
                      className="w-full h-full object-cover block"
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
