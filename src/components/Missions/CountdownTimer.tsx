'use client';

import { useState, useEffect } from 'react';

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const TimeCard = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center px-4 py-3 bg-black/40 backdrop-blur-md border border-[#C9A84C]/30 rounded-lg min-w-[64px] transition-all duration-300 hover:border-[#C9A84C]/60">
      <span className="font-mono text-xl sm:text-2xl font-bold text-white tracking-tighter">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] text-[#C9A84C]/80 mt-0.5 font-medium">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
      <TimeCard value={timeLeft.days} label="Dias" />
      <TimeCard value={timeLeft.hours} label="Horas" />
      <TimeCard value={timeLeft.minutes} label="Min" />
      <TimeCard value={timeLeft.seconds} label="Seg" />
    </div>
  );
}
