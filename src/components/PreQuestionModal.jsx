// src/components/PreQuestionModal.jsx
import React from 'react';

const COLOR_NAMES = {
  green: '🟢 Verde (Sumas y restas)',
  yellow: '🟡 Amarillo (Multiplicaciones fáciles)',
  red: '🔴 Rojo (Multiplicaciones de dos cifras)',
  blue: '🔵 Azul (Divisiones)'
};

export default function PreQuestionModal({ diceValue, tileColor, onConfirm, specialTile }) {
  let mensajeEspecial = '';
  if (specialTile) {
    if (specialTile.type === 'step_back') {
      mensajeEspecial = `¡Cuidado! Vas a caer en una casilla que te hará retroceder ${specialTile.steps} pasos.`;
    } else if (specialTile.type === 'bridge_reward') {
      mensajeEspecial = '¡Has caído en un Puente Premio! Si respondes bien, ¡saltarás a una casilla avanzada.';
    } else if (specialTile.type === 'bridge_penalty') {
      mensajeEspecial = '¡Oh no! Vas a caer en un Puente Castigo. Si fallas, retrocederás.';
    } else if (specialTile.type === 'roll_again') {
      mensajeEspecial = '¡Tira de nuevo! Vas a caer en una casilla que te da otro turno.';
    }
  }

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
          padding: '1.8rem',
          maxWidth: '90vw',
          width: '400px',
          textAlign: 'center',
          border: '1px solid #48bb78',
          color: 'white',
        }}
      >
        <h2 style={{ color: '#68d391', marginBottom: '1rem' }}>🎲 ¡Dado lanzado!</h2>
        <p style={{ fontSize: '1.4rem', margin: '0.8rem 0' }}>
          ¡Has tirado un <strong>{diceValue}</strong>!
        </p>
        {mensajeEspecial && (
          <p style={{ fontSize: '1.2rem', margin: '0.8rem 0', color: '#fbbf24' }}>
            {mensajeEspecial}
          </p>
        )}
        <p style={{ fontSize: '1.3rem', margin: '0.8rem 0', color: '#fbbf24' }}>
          Vas a caer en una casilla {COLOR_NAMES[tileColor] || tileColor}.
        </p>
        <p style={{ marginTop: '1.2rem', fontSize: '1.1rem' }}>
          ¿Listo para responder?
        </p>
        <button
          onClick={onConfirm}
          style={{
            marginTop: '1.5rem',
            padding: '12px 30px',
            background: '#48bb78',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          ✅ Responder
        </button>
      </div>
    </div>
  );
}