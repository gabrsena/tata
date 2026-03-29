'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import PetalEffect from '@/components/Effects/PetalEffect';
import styles from './Hero.module.css';

interface HeroProps {
  children?: React.ReactNode;
}

export default function Hero({ children }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Initial content reveal (triggered by parent after intro)
    if (typeof window !== 'undefined') {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.2 } });

      tl.fromTo(titleRef.current, 
        { opacity: 0, scale: 0.95 }, 
        { opacity: 1, scale: 1, delay: 0.2 }
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0 },
        '-=1.0'
      );
    }
  }, []);

  return (
    <header id="home" className={styles.hero} ref={containerRef}>
      <div className={styles.background}>
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className={styles.video}
        >
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
        <PetalEffect />
      </div>

      <div className={styles.content}>
        <p ref={subtitleRef} className={styles.subtitle}>
          Criando com intencionalidade e propósito.<br/>
          Tudo para a honra e glória de Deus.
        </p>
        <div className={styles.actions}>
          {children}
        </div>
      </div>
    </header>
  );
}
