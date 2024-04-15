import { useState, useEffect } from 'react';

export const useCountdown = (initialValue) => {
  const [count, setCount] = useState(initialValue);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount > 0) {
          return prevCount - 1;
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [initialValue]);

  return count;
};