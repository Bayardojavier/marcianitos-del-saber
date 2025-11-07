// src/components/QuestionModal.jsx
import { useState, useEffect } from 'react';

export default function QuestionModal({ question, onAnswer }) {
  const [userAnswer, setUserAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(60); // ✅ Estado para el tiempo restante
  const [selectedOption, setSelectedOption] = useState(null);

  // ✅ Temporizador
  useEffect(() => {
    if (timeLeft <= 0) {
      // ✅ Tiempo agotado
      onAnswer(false, 0); // (esCorrecta, timeLeft)
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // ✅ Limpiar intervalo al desmontar
  }, [timeLeft, onAnswer]); // ✅ Asegurar que onAnswer no cambie frecuentemente o usar useCallback

  const handleSubmit = () => {
    let isCorrect = false;

    if (question.color === 'green' || question.color === 'yellow') {
      // Respuesta abierta
      const num = parseInt(userAnswer, 10);
      isCorrect = !isNaN(num) && num === question.a;
    } else {
      // Opción múltiple
      if (selectedOption !== null) {
        const num = parseInt(selectedOption, 10);
        isCorrect = !isNaN(num) && num === question.a;
      }
    }

    // ✅ Pasar isCorrect y el tiempo restante
    onAnswer(isCorrect, timeLeft);
  };

  const handleOptionClick = (value) => {
    setSelectedOption(value);
  };

  const isMultipleChoice = question.color === 'red' || question.color === 'blue';

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 200,
        padding: '1rem',
      }}
    >
      <div
        style={{
          background: 'rgba(10,5,30,0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '1.5rem',
          maxWidth: '90vw',
          width: '400px',
          textAlign: 'center',
          border: '1px solid #48bb78',
          color: 'white',
        }}
      >
        {/* ✅ Mostrar temporizador */}
        <div
          style={{
            fontSize: '1.2rem',
            marginBottom: '1rem',
            color: timeLeft <= 10 ? '#fbbf24' : '#68d391',
            fontWeight: 'bold',
          }}
        >
          ⏱️ Tiempo: {timeLeft} segundos
        </div>

        {/* Pregunta */}
        <div style={{ fontSize: '1.8rem', margin: '1.5rem 0', fontFamily: 'monospace' }}>
          ¿{question.q} = ?
        </div>

        {/* Campo de respuesta o botones */}
        {isMultipleChoice ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '1.5rem 0' }}>
            {question.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleOptionClick(opt.toString())}
                style={{
                  padding: '12px',
                  fontSize: '1.3rem',
                  background: selectedOption === opt.toString() ? '#48bb78' : 'rgba(255,255,255,0.1)',
                  border: '1px solid #48bb78',
                  borderRadius: '10px',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        ) : (
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Escribe tu respuesta"
             id="respuesta-abierta-input"
  name="respuestaAbierta"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '1.4rem',
              textAlign: 'center',
              borderRadius: '10px',
              border: '2px solid #48bb78',
              background: 'rgba(0,0,0,0.3)',
              color: 'white',
              marginBottom: '1.5rem',
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
        )}

        {/* Solo botón de responder */}
        <div style={{ marginTop: '1.5rem' }}>
          <button
            onClick={handleSubmit}
            disabled={isMultipleChoice ? selectedOption === null : !userAnswer.trim()}
            style={{
              padding: '12px 40px',
              background: '#48bb78',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '1.3rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              opacity: isMultipleChoice ? (selectedOption === null ? 0.6 : 1) : (!userAnswer.trim() ? 0.6 : 1),
            }}
          >
            ✅ Responder
          </button>
        </div>
      </div>
    </div>
  );
}