// src/components/StatsModal.jsx
import React from 'react';

export default function StatsModal({ estadisticas, onClose }) {
  // ✅ Verificación de seguridad: si estadisticas es undefined, usar un objeto vacío con estructura predeterminada
  const stats = estadisticas || {
    verde: { total: 0, correctas: 0, incorrectas: 0 },
    amarillo: { total: 0, correctas: 0, incorrectas: 0 },
    rojo: { total: 0, correctas: 0, incorrectas: 0 },
    azul: { total: 0, correctas: 0, incorrectas: 0 },
    total: { total: 0, correctas: 0, incorrectas: 0 }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 300,
      }}
    >
      <div
        style={{
          background: 'rgba(10,5,30,0.95)',
          backdropFilter: 'blur(10px)',
          padding: '1.5rem',
          borderRadius: '16px',
          color: 'white',
          maxWidth: '90vw',
          width: '400px',
          border: '1px solid #48bb78',
        }}
      >
        <h3 style={{ color: '#68d391', textAlign: 'center', marginBottom: '1rem' }}>📊 Estadísticas</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr>
              <th style={{ padding: '0.4rem', borderBottom: '1px solid #48bb78' }}>Color</th>
              <th style={{ padding: '0.4rem', borderBottom: '1px solid #48bb78' }}>Total</th>
              <th style={{ padding: '0.4rem', borderBottom: '1px solid #48bb78' }}>Correctas</th>
              <th style={{ padding: '0.4rem', borderBottom: '1px solid #48bb78' }}>Incorrectas</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '0.4rem', textAlign: 'center' }}>🟢 Verde</td>
              <td style={{ padding: '0.4rem', textAlign: 'center' }}>{stats.verde.total}</td>
              <td style={{ padding: '0.4rem', textAlign: 'center', color: '#68d391' }}>{stats.verde.correctas}</td>
              <td style={{ padding: '0.4rem', textAlign: 'center', color: '#f56565' }}>{stats.verde.incorrectas}</td>
            </tr>
            <tr>
              <td style={{ padding: '0.4rem', textAlign: 'center' }}>🟡 Amarillo</td>
              <td style={{ padding: '0.4rem', textAlign: 'center' }}>{stats.amarillo.total}</td>
              <td style={{ padding: '0.4rem', textAlign: 'center', color: '#68d391' }}>{stats.amarillo.correctas}</td>
              <td style={{ padding: '0.4rem', textAlign: 'center', color: '#f56565' }}>{stats.amarillo.incorrectas}</td>
            </tr>
            <tr>
              <td style={{ padding: '0.4rem', textAlign: 'center' }}>🔴 Rojo</td>
              <td style={{ padding: '0.4rem', textAlign: 'center' }}>{stats.rojo.total}</td>
              <td style={{ padding: '0.4rem', textAlign: 'center', color: '#68d391' }}>{stats.rojo.correctas}</td>
              <td style={{ padding: '0.4rem', textAlign: 'center', color: '#f56565' }}>{stats.rojo.incorrectas}</td>
            </tr>
            <tr>
              <td style={{ padding: '0.4rem', textAlign: 'center' }}>🔵 Azul</td>
              <td style={{ padding: '0.4rem', textAlign: 'center' }}>{stats.azul.total}</td>
              <td style={{ padding: '0.4rem', textAlign: 'center', color: '#68d391' }}>{stats.azul.correctas}</td>
              <td style={{ padding: '0.4rem', textAlign: 'center', color: '#f56565' }}>{stats.azul.incorrectas}</td>
            </tr>
            <tr style={{ borderTop: '2px solid #48bb78', fontWeight: 'bold' }}>
              <td style={{ padding: '0.4rem', textAlign: 'center' }}>Total</td>
              <td style={{ padding: '0.4rem', textAlign: 'center' }}>{stats.total.total}</td>
              <td style={{ padding: '0.4rem', textAlign: 'center', color: '#68d391' }}>{stats.total.correctas}</td>
              <td style={{ padding: '0.4rem', textAlign: 'center', color: '#f56565' }}>{stats.total.incorrectas}</td>
            </tr>
          </tbody>
        </table>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button
            onClick={onClose}
            style={{
              background: '#68d391',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 20px',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            ✅ Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}