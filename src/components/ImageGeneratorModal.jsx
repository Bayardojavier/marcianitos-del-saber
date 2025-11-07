// src/components/ImageGeneratorModal.jsx
import React, { useRef, useEffect } from 'react';

export default function ImageGeneratorModal({ jugador, record, isVisible, onClose, onDataUrl }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (isVisible && containerRef.current) {
      // Esperar un tick para asegurar que el DOM esté listo
      setTimeout(async () => {
        try {
          const { toPng } = await import('html-to-image');
          const dataUrl = await toPng(containerRef.current, {
            cacheBust: true,
            pixelRatio: 2, // Mejor resolución
            backgroundColor: '#0b0b2a' // Asegurar fondo si no tiene
          });
          onDataUrl(dataUrl);
        } catch (error) {
          console.error('Error al generar imagen:', error);
          onDataUrl(null);
        } finally {
          onClose(); // Cerrar el modal de generación
        }
      }, 100); // Pequeño delay para asegurar renderizado
    }
  }, [isVisible, jugador, record, onClose, onDataUrl]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: '-9999px',
        left: '-9999px',
        width: '400px',
        zIndex: -1000, // Muy atrás
        pointerEvents: 'none',
        opacity: 0,
      }}
      ref={containerRef}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #0b0b2a, #00001a)',
          color: 'white',
          padding: '30px',
          border: '2px solid #48bb78',
          borderRadius: '20px',
          fontFamily: 'Arial, sans-serif',
          textAlign: 'center',
          boxSizing: 'border-box',
          width: '100%',
        }}
      >
        <h2 style={{ color: '#68d391', margin: '0 0 20px', fontSize: '24px' }}>🏆 RESULTADOS ACUMULADOS</h2>
        <p style={{ fontSize: '18px', margin: '10px 0' }}><strong>Jugador:</strong> {jugador.nombre}</p>
        <p style={{ fontSize: '18px', margin: '10px 0' }}><strong>Puntaje Actual:</strong> ⭐ {jugador.score}</p>
        <p style={{ fontSize: '18px', margin: '10px 0' }}><strong>Récord Personal:</strong> ⭐ {record.score} por {record.nombre || 'Nadie'}</p>
        <p style={{ fontSize: '16px', color: '#fbbf24', margin: '20px 0 10px' }}>🎉 ¡Orgulloso Marcianito del Saber!</p>
        <p style={{ fontSize: '14px', color: '#cbd5e0', margin: '0' }}>Instituto Técnico La Inmaculada</p>
      </div>
    </div>
  );
}