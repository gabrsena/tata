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
    <div className="flex flex-col items-center p-3 sm:p-4 border border-[rgba(201,169,110,0.3)] rounded-lg bg-mission-bg/50 backdrop-blur-sm min-w-[70px] sm:min-w-[90px]">
      <span className="font-mono text-2xl sm:text-3xl text-mission-gold">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-[0.6rem] sm:text-[0.7rem] uppercase tracking-widest text-[#B8A898] mt-1">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex gap-2 sm:gap-4 justify-center sm:justify-start">
      <TimeCard value={timeLeft.days} label="Dias" />
      <TimeCard value={timeLeft.hours} label="Horas" />
      <TimeCard value={timeLeft.minutes} label="Min" />
      <TimeCard value={timeLeft.seconds} label="Seg" />
    </div>
  );
}
