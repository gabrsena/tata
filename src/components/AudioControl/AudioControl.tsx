'use client';

import { useState, useEffect } from 'react';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import styles from './AudioControl.module.css';

interface AudioControlProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export default function AudioControl({ isPlaying, onToggle }: AudioControlProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button 
      className={styles.audioToggle} 
      onClick={onToggle}
      aria-label={isPlaying ? 'Pausar música' : 'Tocar música'}
    >
      {isPlaying ? <HiVolumeUp size={20} /> : <HiVolumeOff size={20} />}
      <span className={styles.line}></span>
      <span className={styles.line}></span>
      <span className={styles.line}></span>
    </button>
  );
}
