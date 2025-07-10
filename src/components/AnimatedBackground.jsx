import React from 'react';
import '../styles/AnimatedBackground.css';

const AnimatedBackground = ({ theme }) => {
  return (
    <div className="animated-background">
      {/* Main animated gradient background */}
      <div className={`background-gradient ${theme}`}></div>

      {/* Floating orbs */}
      <div className="orbs-container">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={`orb ${theme}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${20 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>

      {/* Overlay for better text readability */}
      <div className="background-overlay"></div>
    </div>
  );
};

export default AnimatedBackground;
