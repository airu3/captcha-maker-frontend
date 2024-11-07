import { useEffect, useState } from 'react';

interface TimerProps {
  duration: number;
  onTimeUp?: () => void;
}

export function Timer({ duration, onTimeUp }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const progress = (timeLeft / duration) * 100;

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 0.1);
    }, 100);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  return (
    <div className="w-full space-y-2">
      <div className="h-5 bg-[#ecf0f1] rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#2ecc71] transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-center text-lg">
        {timeLeft.toFixed(1)}秒
      </div>
    </div>
  );
}