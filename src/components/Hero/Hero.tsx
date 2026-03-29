'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import styles from './Hero.module.css';

interface HeroProps {
  children?: React.ReactNode;
}

export default function Hero({ children }: HeroProps) {
  const videoLayerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const tl = gsap.timeline({ 
        defaults: { ease: 'power3.out', duration: 1.5 } 
      });

      // 1. Phrase slides up and fades in (starts visible in DOM for LCP)
      tl.from(subtitleRef.current, { 
        opacity: 0, 
        y: 30 
      })
      // 2. Background Video Layers Fade in to full vibrancy
      .to(videoLayerRef.current, { opacity: 1, duration: 1 })
      // 3. Actions (buttons) slide up and fade in
      .from(actionsRef.current, { 
        opacity: 0, 
        y: 20 
      }, '-=1.2');
    }
  }, []);

  return (
    <header id="home" className={styles.hero}>
      <div className={styles.background} ref={videoLayerRef} style={{ opacity: 1 }}>
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          poster="/hero.webp"
          width={1920}
          height={1080}
          className={styles.video}
          style={{ objectFit: 'cover' }}
          // @ts-ignore
          fetchpriority="high"
          preload="none"
        >
          <source src="/background.mp4" type="video/mp4" />
          <source src="/background.mov" type="video/quicktime" />
        </video>
        
        {/* Cinematic Overlays for Depth and Legibility */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 z-10" />
        <div className={styles.vignette} />
      </div>

      <div className={styles.content}>
        <p ref={subtitleRef} className={styles.subtitle}>
          Criando com intencionalidade e propósito.<br/>
          Tudo para a honra e glória de Deus.
        </p>
        <div ref={actionsRef} className={styles.actions}>
          {children}
        </div>
      </div>
    </header>
  );
}
