// src/components/ImagePreviewModal.jsx
import React from 'react';

export default function ImagePreviewModal({ imageDataUrl, onClose, onDownload }) {
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
        zIndex: 300,
      }}
    >
      <div
        style={{
          background: 'rgba(10,5,30,0.95)',
          borderRadius: '20px',
          padding: '2rem',
          maxWidth: '90vw',
          width: '400px',
          textAlign: 'center',
          color: 'white',
          border: '2px solid #48bb78',
        }}
      >
        <h3 style={{ color: '#68d391', marginBottom: '1rem' }}>🖼️ Vista previa</h3>
        <div
          style={{
            width: '100%',
            maxHeight: '60vh',
            overflow: 'auto',
            marginBottom: '1.5rem',
            border: '1px solid #48bb78',
            borderRadius: '10px',
            padding: '10px',
            background: 'black',
          }}
        >
          <img
            src={imageDataUrl}
            alt="Vista previa de resultados"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              background: '#718096',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            ✖️ Cerrar
          </button>
          <button
            onClick={onDownload}
            style={{
              padding: '10px 20px',
              background: '#48bb78',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            💾 Descargar
          </button>
        </div>
      </div>
    </div>
  );
}