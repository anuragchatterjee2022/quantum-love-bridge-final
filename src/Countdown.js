import React, { useState, useEffect } from 'react';
import './index.css'; 

function Countdown() {
  // Target date set to 33 days from current date (Dec 2, 2025)
  const targetDate = new Date('January 4, 2026 18:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer); 
        return { completed: true };
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());
    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.completed) {
    return (
      <section id="countdown-finished">
        <h2>WE ARE FINALLY HERE! ❤️</h2>
        <p>The distance is zero. Time for a hug!</p>
      </section>
    );
  }

  return (
    <section id="countdown">
      <h2>Time until I see you again...</h2>
      <div className="flex justify-center space-x-4">
        {Object.keys(timeLeft).map((unit) => (
          <div key={unit} className="timer-unit-advanced">
            <span className="unit-value text-glow">{String(timeLeft[unit]).padStart(2, '0')}</span>
            <span className="unit-label">{unit.toUpperCase()}</span>
          </div>
        ))}
      </div>
      <style jsx="true">{`
        .timer-unit-advanced {
            display: inline-block;
            margin: 0 15px;
            padding: 10px;
            min-width: 80px;
            background-color: rgba(255, 105, 180, 0.1); 
            border-radius: 10px;
            border: 1px solid var(--primary-color);
            box-shadow: 0 0 15px var(--primary-color);
            animation: breathe 3s infinite alternate;
        }
        .unit-value { display: block; font-size: 3em; font-weight: 700; }
        .unit-label { font-size: 0.8em; color: var(--text-light); text-transform: uppercase; }
        @keyframes breathe { from { opacity: 0.8; } to { opacity: 1; } }
      `}</style>
    </section>
  );
}

export default Countdown;