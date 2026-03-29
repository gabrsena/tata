'use client';

import { useEffect, useState } from 'react';
import styles from './PetalEffect.module.css';

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  horizontalRange: number;
}

export default function PetalEffect() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const petalCount = 40; // High density as requested
    const newPetals: Petal[] = Array.from({ length: petalCount }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 15 + Math.random() * 15,
      size: 10 + Math.random() * 15,
      horizontalRange: 50 + Math.random() * 150,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className={styles.container}>
      {petals.map((petal) => (
        <div
          key={petal.id}
          className={styles.petal}
          style={{
            left: `${petal.left}%`,
            width: `${petal.size}px`,
            height: `${petal.size * 0.8}px`,
            animationDelay: `-${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
            '--horizontal-range': `${petal.horizontalRange}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
