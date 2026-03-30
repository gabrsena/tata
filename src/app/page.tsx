'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import SocialLinks from '@/components/SocialLinks/SocialLinks';
import AudioControl from '@/components/AudioControl/AudioControl';
const MissionsSection = dynamic(() => import('@/components/Missions/MissionsSection'), { ssr: false });
import AboutSection from '@/components/About/AboutSection';
import { FaPlay } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './page.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Audio object is now initialized in toggleAudio only when needed (saves 24MB bandwidth)
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Interaction observers for About are now handled within AboutVideo component

  useEffect(() => {
    const handleScroll = () => {
      // Definimos visibilidade do controle de áudio apenas enquanto for o Hero (através do window.scrollY)
      setIsHeroVisible(window.scrollY < 400); 
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const toggleAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/music.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0;
    }

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

  // Video toggling is now handled internally by AboutVideo to allow Server Component text rendering

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

        <AboutSection />

        <MissionsSection />

        <footer className={styles.footer} ref={footerRef} style={{ background: '#E8E2D4', padding: '6rem 0' }}>
          <div className={`${styles.footerContent} reveal`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <h2 className="neonWhite" style={{ 
              fontFamily: 'var(--font-bebas)', 
              fontSize: '1rem', 
              letterSpacing: '0.5em',
              textAlign: 'center',
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
