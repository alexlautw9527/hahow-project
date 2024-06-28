import { useState, useEffect } from "react";

interface CountdownOptions {
  autostart?: boolean;
  seconds: number;
}

const useCountdown = ({ autostart = true, seconds }: CountdownOptions) => {
  const [count, setCount] = useState(seconds);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    const startCountdown = () => {
      timer = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount === 1) {
            setIsComplete(true);
            clearInterval(timer!);
            timer = null;
          }
          return prevCount - 1;
        });
      }, 1000);
    };

    const stopCountdown = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    if (autostart) {
      startCountdown();
    }

    return () => {
      stopCountdown();
    };
  }, [autostart]);

  return { count, isComplete };
};

export default useCountdown;
