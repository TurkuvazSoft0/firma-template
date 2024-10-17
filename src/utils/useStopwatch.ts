import React, {useState, useRef} from 'react';

const useStopwatch = () => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const interval = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (interval.current) return;

    interval.current = setInterval(() => {
      setTimeElapsed(prevTimeElapsed => prevTimeElapsed + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (interval.current) clearInterval(interval.current);
    interval.current = null;
  };

  const resetTimer = () => {
    stopTimer();
    setTimeElapsed(0);
  };

  const minutes = Math.floor(timeElapsed / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (timeElapsed % 60).toString().padStart(2, '0');
  const time = `${minutes}:${seconds}`;
  return {time, startTimer};
};
export default useStopwatch;
