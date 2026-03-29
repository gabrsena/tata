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

      // 1. Phrase slides up and fades in (first element to appear)
      tl.fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0 }
      )
      // 2. Background Video Fades in
      .to(videoLayerRef.current, { opacity: 1, duration: 2 }, '-=0.5')
      // 3. Actions (buttons) slide up and fade in
      .fromTo(actionsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0 },
        '-=1.2'
      );
    }
  }, []);

  return (
    <header id="home" className={styles.hero}>
      <div className={styles.background} ref={videoLayerRef} style={{ opacity: 0 }}>
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className={styles.video}
        >
          <source src="/background.webm" type="video/webm" />
          <source src="/background.mov" type="video/quicktime" />
          <source src="/background.mov" type="video/mp4" />
        </video>
        
        {/* Camada de Partículas Overlay */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className={styles.particles}
        >
          <source src="/particles.mp4" type="video/mp4" />
        </video>
        
        <div className={styles.vignette} />
      </div>

      <div className={styles.content}>
        <p ref={subtitleRef} className={styles.subtitle} style={{ opacity: 0 }}>
          Criando com intencionalidade e propósito.<br/>
          Tudo para a honra e glória de Deus.
        </p>
        <div ref={actionsRef} className={styles.actions} style={{ opacity: 0 }}>
          {children}
        </div>
      </div>
    </header>
  );
}
