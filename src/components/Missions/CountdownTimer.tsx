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
    <div className="flex flex-col items-center px-5 py-4 bg-white/60 border border-[#C9A84C]/30 rounded-2xl min-w-[72px] text-center shadow-sm text-[#1a1a1a]">
      <span className="font-mono text-3xl font-bold">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-xs uppercase tracking-widest text-[#C9A84C] mt-1 font-mono">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <TimeCard value={timeLeft.days} label="Dias" />
      <TimeCard value={timeLeft.hours} label="Horas" />
      <TimeCard value={timeLeft.minutes} label="Min" />
      <TimeCard value={timeLeft.seconds} label="Seg" />
    </div>
  );
}
