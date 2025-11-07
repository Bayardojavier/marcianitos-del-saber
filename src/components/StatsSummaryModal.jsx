// src/components/StatsSummaryModal.jsx
import React, { useRef } from 'react';

export default function StatsSummaryModal({ estadisticas, jugador, record, onClose, onShare }) {
  const statsRef = useRef(null); // Ref para el contenedor de contenido
  const containerRef = useRef(null); // Ref para el contenedor principal (fondo, botones)

  // ✅ Protección de seguridad: si estadisticas no existe, usar un objeto por defecto
  const stats = estadisticas || {
    verde: { total: 0, correctas: 0, incorrectas: 0 },
    amarillo: { total: 0, correctas: 0, incorrectas: 0 },
    rojo: { total: 0, correctas: 0, incorrectas: 0 },
    azul: { total: 0, correctas: 0, incorrectas: 0 },
    total: { total: 0, correctas: 0, incorrectas: 0 }
  };

  const totalVerde = stats.verde.total;
  const totalAmarillo = stats.amarillo.total;
  const totalRojo = stats.rojo.total;
  const totalAzul = stats.azul.total;
  const totalGeneral = stats.total.total;

  const correctasVerde = stats.verde.correctas;
  const correctasAmarillo = stats.amarillo.correctas;
  const correctasRojo = stats.rojo.correctas;
  const correctasAzul = stats.azul.correctas;
  const correctasGeneral = stats.total.correctas;

  const incorrectasVerde = stats.verde.incorrectas;
  const incorrectasAmarillo = stats.amarillo.incorrectas;
  const incorrectasRojo = stats.rojo.incorrectas;
  const incorrectasAzul = stats.azul.incorrectas;
  const incorrectasGeneral = stats.total.incorrectas;

  return (
    <div
      ref={containerRef} // ✅ Este ref es para el fondo oscuro y la posición general
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
      {/* ✅ Contenedor solo del contenido para captura */}
      <div
        ref={statsRef}
        style={{
          background: 'linear-gradient(135deg, #0b0b2a, #00001a)',
          padding: '2rem',
          borderRadius: '20px',
          color: 'white',
          maxWidth: '90vw',
          width: '400px',
          textAlign: 'center',
          border: '2px solid #48bb78',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          position: 'relative', // Necesario para posicionar la marca de agua
          overflow: 'visible', // ✅ Permitir que la marca de agua se vea
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

        {/* Contenido principal */}
        <h2 style={{ color: '#68d391', marginBottom: '1rem', fontSize: '1.8rem', position: 'relative', zIndex: 2 }}>
          🧠 RESULTADOS ACUMULADOS
        </h2>
        <p style={{ fontSize: '1.4rem', margin: '0.5rem 0', color: '#fbbf24', position: 'relative', zIndex: 2 }}>
          👤 {jugador.nombre}
        </p>
        <p style={{ fontSize: '1.2rem', margin: '0.5rem 0', color: '#68d391', position: 'relative', zIndex: 2 }}>
          🏆 Récord: ⭐ {record.score}
        </p>

        {/* ✅ Contenedor de estadísticas en columnas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'left', fontSize: '1.1rem' }}>
            <div style={{ marginBottom: '0.8rem' }}>
              <span>🟢 Verde:</span>
              <div style={{ marginLeft: '1rem' }}>
                <p>Total: {totalVerde}</p>
                <p style={{ color: '#68d391' }}>Correctas: {correctasVerde}</p>
                <p style={{ color: '#f56565' }}>Incorrectas: {incorrectasVerde}</p>
              </div>
            </div>
            <div style={{ marginBottom: '0.8rem' }}>
              <span>🔴 Rojo:</span>
              <div style={{ marginLeft: '1rem' }}>
                <p>Total: {totalRojo}</p>
                <p style={{ color: '#68d391' }}>Correctas: {correctasRojo}</p>
                <p style={{ color: '#f56565' }}>Incorrectas: {incorrectasRojo}</p>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'left', fontSize: '1.1rem' }}>
            <div style={{ marginBottom: '0.8rem' }}>
              <span>🟡 Amarillo:</span>
              <div style={{ marginLeft: '1rem' }}>
                <p>Total: {totalAmarillo}</p>
                <p style={{ color: '#68d391' }}>Correctas: {correctasAmarillo}</p>
                <p style={{ color: '#f56565' }}>Incorrectas: {incorrectasAmarillo}</p>
              </div>
            </div>
            <div style={{ marginBottom: '0.8rem' }}>
              <span>🔵 Azul:</span>
              <div style={{ marginLeft: '1rem' }}>
                <p>Total: {totalAzul}</p>
                <p style={{ color: '#68d391' }}>Correctas: {correctasAzul}</p>
                <p style={{ color: '#f56565' }}>Incorrectas: {incorrectasAzul}</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', borderTop: '1px solid #48bb78', paddingTop: '1rem', position: 'relative', zIndex: 2 }}>
          <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>📊 Total General: {totalGeneral} preguntas</p>
          <p style={{ color: '#68d391', fontWeight: 'bold' }}>✔️ Correctas: {correctasGeneral}</p>
          <p style={{ color: '#f56565', fontWeight: 'bold' }}>❌ Incorrectas: {incorrectasGeneral}</p>
        </div>

        <p style={{ marginTop: '1.5rem', color: '#68d391', fontStyle: 'italic', fontSize: '1.1rem', position: 'relative', zIndex: 2 }}>
          🎉 ¡Orgulloso Marcianito del Saber!
        </p>
      </div>

      {/* ✅ Botones fuera del contenido a capturar */}
      <div style={{ position: 'relative', zIndex: 3, marginTop: '2rem', display: 'flex', gap: '10px', justifyContent: 'center' }}>
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