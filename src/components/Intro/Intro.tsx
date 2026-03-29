'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './Intro.module.css';

export default function Intro({ onComplete }: { onComplete: () => void }) {
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // List of 10 fonts for the dynamic effect
  const fonts = [
    'var(--font-inter)',
    'var(--font-playfair)',
    'var(--font-bebas)',
    'var(--font-caveat)',
    'var(--font-prata)'
  ];

  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 1,
          ease: 'power2.inOut',
          onComplete: onComplete
        });
      }
    });

    // Font switching: 5 fonts in 1s total (0.2s each to reduce reflow)
    fonts.forEach((font, i) => {
      tl.to(textRef.current, {
        fontFamily: font,
        duration: 0.2,
        ease: 'none'
      });
    });

  }, [onComplete]);

  return (
    <div className={`${styles.introContainer} crit-intro`} ref={containerRef}>
      <div className={styles.glow} />
      <h1 className={`${styles.phrase} crit-text`} ref={textRef}>
        stick to the plan
      </h1>
    </div>
  );
}
