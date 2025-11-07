// src/components/GameScreen.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GameScreen() {
  const [nombre, setNombre] = useState('');
  const [avatar, setAvatar] = useState('👽');
  const [paso, setPaso] = useState('seleccion'); // 'seleccion' o 'confirmacion'
  const navigate = useNavigate();

  const avatares = ['👽', '👾', '🤖', '🧞', '🧚', '🧑‍🚀', '🐙', '🦄'];

  const handleConfirmar = () => {
    if (!nombre.trim()) {
      alert('Por favor, escribe tu nombre');
      return;
    }
    localStorage.setItem('jugador', JSON.stringify({ nombre, avatar }));
    setPaso('confirmacion');
  };

  const handleIniciarJuego = () => {
    // Aquí irá la lógica para ir al tablero real
    navigate('/tablero');
  };

  if (paso === 'confirmacion') {
    return (
      <div className="avatar-modal">
        <div className="modal-content confirmation-modal">
          <h2 className="modal-title confirmation-title">¡Hola, <span className="nombre-jugador">{nombre}</span>!</h2>
          <div className="avatar-grande">
            {avatar}
          </div>
          <p className="mensaje-bienvenida">¡Estamos listos para salvar la galaxia!</p>
          <button onClick={handleIniciarJuego} className="btn-start btn-jugar">
            ¡Ahora vamos a jugar!
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="avatar-modal">
      <div className="modal-content">
        <h2 className="modal-title">🌌 ¡Elige tu identidad espacial!</h2>
        <input
          type="text"
          placeholder="Tu nombre..."
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="input-name"
          maxLength={15}
        />
        <p className="avatar-label">Selecciona tu avatar marciano:</p>
        <div className="avatar-grid">
          {avatares.map((a) => (
            <button
              key={a}
              onClick={() => setAvatar(a)}
              className={`avatar-option ${avatar === a ? 'selected' : ''}`}
              aria-label={`Seleccionar avatar ${a}`}
            >
              {a}
            </button>
          ))}
        </div>
        <button onClick={handleConfirmar} className="btn-start">
          ¡Listo! Empezar Aventura
        </button>
      </div>
    </div>
  );
}