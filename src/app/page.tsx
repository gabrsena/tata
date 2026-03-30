'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import SocialLinks from '@/components/SocialLinks/SocialLinks';
import AudioControl from '@/components/AudioControl/AudioControl';
const MissionsSection = dynamic(() => import('@/components/Missions/MissionsSection'), { ssr: false });
const AboutSection = dynamic(() => import('@/components/About/AboutSection'), { ssr: false });
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
  const aboutSectionRef = useRef<HTMLElement>(null);
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

    if (aboutSectionRef.current) observer.observe(aboutSectionRef.current);
    
    return () => {
      observer.disconnect();
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

        <AboutSection 
          aboutSectionRef={aboutSectionRef}
          videoRef={videoRef}
          videoPlaying={videoPlaying}
          toggleVideo={toggleVideo}
          fadeAudio={fadeAudio}
          setVideoPlaying={setVideoPlaying}
        />

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
