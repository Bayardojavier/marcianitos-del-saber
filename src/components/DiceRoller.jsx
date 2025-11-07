// src/components/DiceRoller.jsx
import { useState } from 'react';

export default function DiceRoller({ onRoll }) {
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState(null);

  const handleRoll = () => {
    if (isRolling) return;

    setIsRolling(true);
    setResult(null);

    // Simular "giro" durante 1.2 segundos
    setTimeout(() => {
      const num = Math.floor(Math.random() * 6) + 1;
      setResult(num);
      setIsRolling(false);
      if (onRoll) onRoll(num);
    }, 1200);
  };

  return (
    <div className="dice-roller-container">
      <button
        className={`dice-button ${isRolling ? 'rolling' : ''}`}
        onClick={handleRoll}
        aria-label={isRolling ? "Dado girando..." : "Tirar el dado"}
        disabled={isRolling}
      >
        {isRolling ? '🎲' : result ? `🎲 ${result}` : '🎲'}
      </button>

      {result && (
        <div className="dice-result-text">
          Número: <span className="dice-number">{result}</span>
        </div>
      )}
    </div>
  );
}