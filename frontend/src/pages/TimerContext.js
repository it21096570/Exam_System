// TimerContext.js
import React, { createContext, useContext, useState } from 'react';

const TimerContext = createContext();

export function TimerProvider({ children }) {
  const [duration, setDuration] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  const startTimer = (initialTime) => {
    setDuration(initialTime);
    setTimeLeft(initialTime);
  };

  const decrementTimeLeft = () => {
    setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
  };

  const resetTimer = () => {
    setDuration(null);
    setTimeLeft(null);
  };

  return (
    <TimerContext.Provider
      value={{
        duration,
        timeLeft,
        startTimer,
        decrementTimeLeft,
        resetTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  return useContext(TimerContext);
}
