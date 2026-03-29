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
    'var(--font-outfit)',
    'var(--font-playfair)',
    'var(--font-montserrat)',
    'var(--font-space)',
    'var(--font-bebas)',
    'var(--font-caveat)',
    'var(--font-prata)',
    'var(--font-courier)',
    'var(--font-crimson)' // Final font
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

    // 1. Font switching 10x in 1s
    fonts.forEach((font, i) => {
      tl.to(textRef.current, {
        fontFamily: font,
        duration: 0.1, // 10 fonts * 0.1s = 1s
        ease: 'none'
      });
    });

    // 2. Stay in Crimson Pro (Serif) for 1s
    tl.to(textRef.current, {
      fontFamily: 'var(--font-crimson)',
      duration: 1,
      ease: 'none'
    });

  }, [onComplete]);

  return (
    <div className={styles.introContainer} ref={containerRef}>
      <div className={styles.glow} />
      <h1 className={styles.phrase} ref={textRef}>
        stick to the plan
      </h1>
    </div>
  );
}
