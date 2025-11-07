// src/components/GlobalStatsModal.jsx
import React, { useRef } from 'react';

// Función auxiliar para cargar estadísticas globales desde localStorage
const loadGlobalStats = () => {
  const saved = localStorage.getItem('globalStats');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Error al parsear estadísticas globales:', e);
      return {
        verde: { total: 0, correctas: 0, incorrectas: 0 },
        amarillo: { total: 0, correctas: 0, incorrectas: 0 },
        rojo: { total: 0, correctas: 0, incorrectas: 0 },
        azul: { total: 0, correctas: 0, incorrectas: 0 },
        total: { total: 0, correctas: 0, incorrectas: 0 }
      };
    }
  }
  return {
    verde: { total: 0, correctas: 0, incorrectas: 0 },
    amarillo: { total: 0, correctas: 0, incorrectas: 0 },
    rojo: { total: 0, correctas: 0, incorrectas: 0 },
    azul: { total: 0, correctas: 0, incorrectas: 0 },
    total: { total: 0, correctas: 0, incorrectas: 0 }
  };
};

export default function GlobalStatsModal({ onClose, onShare }) {
  const statsRef = useRef(null); // Ref para el área a capturar
  const globalStats = loadGlobalStats(); // Cargar estadísticas globales

  const {
    verde,
    amarillo,
    rojo,
    azul,
    total
  } = globalStats;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 500,
      }}
    >
      {/* Contenedor principal con fondo */}
      <div
        style={{
          position: 'relative', // Para posicionar la marca de agua
          background: 'linear-gradient(135deg, #0b0b2a, #00001a)',
          padding: '2rem',
          borderRadius: '20px',
          color: 'white',
          maxWidth: '90vw',
          width: '400px',
          textAlign: 'center',
          border: '2px solid #48bb78',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        }}
      >
        {/* Marca de agua del logo + nombre del colegio */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-15deg)',
            opacity: 0.08,
            zIndex: 1,
            pointerEvents: 'none',
            textAlign: 'center',
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#68d391',
            whiteSpace: 'nowrap',
            textShadow: '0 0 10px rgba(104, 211, 148, 0.3)',
          }}
        >
          <div style={{ marginBottom: '10px' }}>
            <img
              src="/logo-inmaculada.jpg"
              alt="Logo Instituto La Inmaculada"
              style={{
                width: '80px',
                height: 'auto',
                opacity: 0.8,
              }}
            />
          </div>
          <div style={{ fontSize: '14px', color: '#e2e8f0', fontWeight: 'normal' }}>
            Instituto Técnico La Inmaculada
          </div>
        </div>

        {/* Contenido principal (este es el área que se capturará) */}
        <div
          ref={statsRef} // ✅ Este ref apunta al contenido sin botones
          style={{
            position: 'relative', // Para que esté por encima de la marca de agua
            zIndex: 2, // Mayor que la marca de agua
            overflow: 'visible', // Asegura que el contenido no se corte
          }}
        >
          <h2 style={{ color: '#68d391', marginBottom: '1rem', fontSize: '1.8rem' }}>
            🧠 ESTADÍSTICAS ACUMULADAS
          </h2>
          <p style={{ fontSize: '1.4rem', margin: '0.5rem 0', color: '#fbbf24' }}>
            👤 Marcianito del Saber
          </p>

          {/* Contenedor de estadísticas en columnas */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginTop: '1.5rem', fontSize: '1.1rem' }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ marginBottom: '0.8rem' }}>
                <span>🟢 Verde:</span>
                <div style={{ marginLeft: '1rem' }}>
                  <p>Total: {verde.total}</p>
                  <p style={{ color: '#68d391' }}>Correctas: {verde.correctas}</p>
                  <p style={{ color: '#f56565' }}>Incorrectas: {verde.incorrectas}</p>
                </div>
              </div>
              <div style={{ marginBottom: '0.8rem' }}>
                <span>🔴 Rojo:</span>
                <div style={{ marginLeft: '1rem' }}>
                  <p>Total: {rojo.total}</p>
                  <p style={{ color: '#68d391' }}>Correctas: {rojo.correctas}</p>
                  <p style={{ color: '#f56565' }}>Incorrectas: {rojo.incorrectas}</p>
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ marginBottom: '0.8rem' }}>
                <span>🟡 Amarillo:</span>
                <div style={{ marginLeft: '1rem' }}>
                  <p>Total: {amarillo.total}</p>
                  <p style={{ color: '#68d391' }}>Correctas: {amarillo.correctas}</p>
                  <p style={{ color: '#f56565' }}>Incorrectas: {amarillo.incorrectas}</p>
                </div>
              </div>
              <div style={{ marginBottom: '0.8rem' }}>
                <span>🔵 Azul:</span>
                <div style={{ marginLeft: '1rem' }}>
                  <p>Total: {azul.total}</p>
                  <p style={{ color: '#68d391' }}>Correctas: {azul.correctas}</p>
                  <p style={{ color: '#f56565' }}>Incorrectas: {azul.incorrectas}</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', borderTop: '1px solid #48bb78', paddingTop: '1rem' }}>
            <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>📊 Total General: {total.total} preguntas</p>
            <p style={{ color: '#68d391', fontWeight: 'bold' }}>✔️ Correctas: {total.correctas}</p>
            <p style={{ color: '#f56565', fontWeight: 'bold' }}>❌ Incorrectas: {total.incorrectas}</p>
          </div>

          <p style={{ marginTop: '1.5rem', color: '#68d391', fontStyle: 'italic', fontSize: '1.1rem' }}>
            🎉 ¡Orgulloso Marcianito del Saber!
          </p>
        </div>
      </div>

      {/* Botones fuera del área a capturar */}
      <div style={{ position: 'absolute', bottom: '40px', zIndex: 501, display: 'flex', gap: '10px' }}>
        <button
          onClick={() => onShare(statsRef)} // ✅ Pasar el ref correcto
          style={{
            padding: '10px 20px',
            background: '#25d366',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          📤 Compartir en WhatsApp
        </button>
        <button
          onClick={onClose}
          style={{
            padding: '10px 20px',
            background: '#718096',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          ✖️ Cerrar
        </button>
      </div>
    </div>
  );
}