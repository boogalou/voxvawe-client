import { useEffect, useState } from "react";

export const useStopwatch = () => {
  // Initialize state variables
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Function to update the timer
  const updateTimer = () => {
    setMilliseconds((prevMilliseconds) => {
      let newMilliseconds = prevMilliseconds + 10;
      if (newMilliseconds === 1000) {
        setSeconds((prevSeconds) => {
          let newSeconds = prevSeconds + 1;
          if (newSeconds === 60) {
            setMinutes((prevMinutes) => prevMinutes + 1);
            newSeconds = 0;
          }
          return newSeconds;
        });
        newMilliseconds = 0;
      }
      return newMilliseconds;
    });
  };

  // Start the timer
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  // Stop the timer
  const stopTimer = () => {
    setIsRunning(false);
  };

  // Reset the timer
  const resetTimer = () => {
    setMinutes(0);
    setSeconds(0);
    setMilliseconds(0);
    setIsRunning(false);
  };

  // Effect to run the timer when isRunning is true
  useEffect(() => {
    let timerInterval: any;
    if (isRunning) {
      timerInterval = setInterval(updateTimer, 10);
    } else {
      clearInterval(timerInterval);
    }

    return () => clearInterval(timerInterval);
  }, [isRunning]);

  // Return values and functions to be used in the component
  return {
    minutes,
    seconds,
    milliseconds,
    isRunning,
    startTimer,
    stopTimer,
    resetTimer,
  };
};
