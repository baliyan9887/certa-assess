import React, { useState, useRef, useEffect } from "react";
import "./App.css";

const Counter: React.FC = () => {
  const [counter, setCounter] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startCounter = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setCounter((prevCounter) => prevCounter + 1);
      }, 1000);
    }
  };

  const pauseCounter = () => {
    if (isRunning) {
      setIsRunning(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  const resetCounter = () => {
    setCounter(0);
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    // Cleanup interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="App">
      <div>
        <h1>{counter}</h1>
        <button onClick={isRunning ? pauseCounter : startCounter}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button onClick={resetCounter}>Reset</button>
      </div>
    </div>
  );
};

export default Counter;
