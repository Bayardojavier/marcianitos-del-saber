// src/components/GameBoard.jsx
import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { BOARD_POSITIONS } from '../data/positions';
import '../styles/game-board.css';

const GameBoard = forwardRef(({ avatar, posicion = 0 }, ref) => {
  const containerRef = useRef(null);
  const avatarRef = useRef(null);
  const [showBackButton, setShowBackButton] = useState(false);

  const { x, y } = BOARD_POSITIONS[posicion] || { x: 100, y: 250 };

  // Función para centrar el avatar
  const centerOnAvatar = () => {
    if (!containerRef.current || !avatarRef.current) return;
    const container = containerRef.current;
    const avatarRect = avatarRef.current.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const dx = avatarRect.left - containerRect.left - containerRect.width / 2 + avatarRect.width / 2;
    const dy = avatarRect.top - containerRect.top - containerRect.height / 2 + avatarRect.height / 2;

    container.scrollTo({
      left: container.scrollLeft + dx,
      top: container.scrollTop + dy,
      behavior: 'smooth',
    });
    setShowBackButton(false);
  };

  // Exponer la función al padre (BoardScreen)
  useImperativeHandle(ref, () => ({
    centerOnAvatar,
  }));

  // Verificar si el avatar está fuera de vista
  const checkVisibility = () => {
    if (!containerRef.current || !avatarRef.current) return;

    const container = containerRef.current;
    const avatarRect = avatarRef.current.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const isOutside =
      avatarRect.right < containerRect.left ||
      avatarRect.left > containerRect.right ||
      avatarRect.bottom < containerRect.top ||
      avatarRect.top > containerRect.bottom;

    setShowBackButton(isOutside);
  };

  // Escuchar scroll para mostrar/ocultar el botón
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => checkVisibility();
    checkVisibility(); // al inicio
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [posicion]);

  return (
    <>
      {/* Contenedor con scroll */}
      <div
        ref={containerRef}
        className="game-board-scroll-container"
        style={{ touchAction: 'auto' }}
      >
        <div className="game-board-content">
          <img
            src="/tablero-marcianitos.png"
            alt="Tablero de Los Marcianitos del Saber"
            className="game-board-tablero"
            onError={(e) => {
              e.target.style.display = 'none';
              console.error('❌ Imagen del tablero no cargó');
            }}
          />

          {/* Avatar */}
          <div
            ref={avatarRef}
            className="game-board-avatar"
            style={{ left: x, top: y }}
          >
            {avatar}
          </div>

          {/* Fondo espacial superdecorado y estático */}
          <div className="game-board-fondo">
            <div className="game-board-estrellas-fijas"></div>
            <div className="game-board-decoracion">
              {/* Cohetes 🚀 */}
              <div style={{ position: 'absolute', top: '3%', left: '2%', fontSize: '18px', transform: 'rotate(-10deg)' }}>🚀</div>
              <div style={{ position: 'absolute', top: '8%', left: '87%', fontSize: '20px', transform: 'rotate(12deg)' }}>🚀</div>
              <div style={{ position: 'absolute', top: '22%', left: '93%', fontSize: '16px', transform: 'rotate(-8deg)' }}>🚀</div>
              <div style={{ position: 'absolute', top: '45%', left: '95%', fontSize: '18px', transform: 'rotate(20deg)' }}>🚀</div>
              <div style={{ position: 'absolute', top: '70%', left: '3%', fontSize: '22px', transform: 'rotate(10deg)' }}>🚀</div>
              <div style={{ position: 'absolute', top: '85%', left: '88%', fontSize: '18px', transform: 'rotate(-5deg)' }}>🚀</div>
              <div style={{ position: 'absolute', top: '95%', left: '10%', fontSize: '20px' }}>🚀</div>

              {/* Platillos voladores 🛸 */}
              <div style={{ position: 'absolute', top: '5%', left: '40%', fontSize: '24px' }}>🛸</div>
              <div style={{ position: 'absolute', top: '18%', left: '10%', fontSize: '20px' }}>🛸</div>
              <div style={{ position: 'absolute', top: '32%', left: '78%', fontSize: '26px' }}>🛸</div>
              <div style={{ position: 'absolute', top: '50%', left: '85%', fontSize: '22px' }}>🛸</div>
              <div style={{ position: 'absolute', top: '65%', left: '20%', fontSize: '20px' }}>🛸</div>
              <div style={{ position: 'absolute', top: '80%', left: '50%', fontSize: '24px' }}>🛸</div>
              <div style={{ position: 'absolute', top: '92%', left: '70%', fontSize: '18px' }}>🛸</div>

              {/* Marcianitos exploradores 👽👾🤖🧚 */}
              <div style={{ position: 'absolute', top: '12%', left: '25%', fontSize: '16px' }}>👽</div>
              <div style={{ position: 'absolute', top: '28%', left: '60%', fontSize: '18px' }}>👾</div>
              <div style={{ position: 'absolute', top: '40%', left: '15%', fontSize: '16px' }}>🧑‍🚀</div>
              <div style={{ position: 'absolute', top: '55%', left: '75%', fontSize: '18px' }}>🤖</div>
              <div style={{ position: 'absolute', top: '72%', left: '30%', fontSize: '16px' }}>🧚</div>
              <div style={{ position: 'absolute', top: '88%', left: '5%', fontSize: '20px' }}>🐙</div>
              <div style={{ position: 'absolute', top: '6%', left: '75%', fontSize: '16px' }}>🦄</div>

              {/* Planetas y cuerpos celestes 🪐🌕🔴 */}
              <div style={{ position: 'absolute', top: '48%', left: '4%', fontSize: '28px' }}>🪐</div>
              <div style={{ position: 'absolute', top: '20%', left: '92%', fontSize: '22px' }}>🌕</div>
              <div style={{ position: 'absolute', top: '87%', left: '8%', fontSize: '20px' }}>🔴</div>
              <div style={{ position: 'absolute', top: '35%', left: '5%', fontSize: '18px' }}>✨</div>
              <div style={{ position: 'absolute', top: '60%', left: '90%', fontSize: '20px' }}>⭐</div>
            </div>
          </div>
        </div>
      </div>

      {/* Botón flotante de "Volver" */}
      {showBackButton && (
        <div className="game-board-back-to-avatar-overlay">
          <button
            className="game-board-back-to-avatar"
            onClick={centerOnAvatar}
            aria-label="Volver al avatar"
          >
            <span>👽</span>
            <span>Volver</span>
          </button>
        </div>
      )}
    </>
  );
});

    export default GameBoard;