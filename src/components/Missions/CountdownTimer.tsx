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
    <div className="group flex flex-col items-center px-8 py-6 bg-white/[0.03] backdrop-blur-2xl border border-white/20 rounded-[2.5rem] min-w-[100px] sm:min-w-[130px] text-center shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-700 hover:bg-white/[0.06] hover:-translate-y-3 hover:scale-105 hover:border-[#C9A84C]/50">
      <span className="font-mono text-5xl sm:text-6xl font-extralight tracking-tighter text-[#1C1917] drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)] select-none">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#C9A84C] mt-3 select-none">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex flex-wrap gap-4 sm:gap-8 justify-center items-center py-8">
      <TimeCard value={timeLeft.days} label="Dias" />
      <TimeCard value={timeLeft.hours} label="Horas" />
      <div className="hidden sm:block h-6 w-[1px] bg-[#C9A84C]/20 mx-[-4px]" />
      <TimeCard value={timeLeft.minutes} label="Min" />
      <TimeCard value={timeLeft.seconds} label="Seg" />
    </div>
  );
}
