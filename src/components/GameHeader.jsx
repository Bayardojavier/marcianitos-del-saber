// src/components/GameHeader.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalStatsModal from './GlobalStatsModal'; // ✅ Importar el nuevo modal
import '../styles/hud.css';

export default function GameHeader({ nombre, avatar, score, record, nuevoRecord }) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [mostrarGlobalStats, setMostrarGlobalStats] = useState(false); // ✅ Estado para el modal global
  const navigate = useNavigate();

  const handleNuevoJuego = () => {
    localStorage.removeItem('jugador');
    localStorage.removeItem('posicionAvatar'); // ✅ Limpiar posición también
    setMenuAbierto(false);
    navigate('/');
  };

  const handleCompartirResultados = () => {
    setMenuAbierto(false);
    setMostrarGlobalStats(true); // ✅ Abrir el nuevo modal
  };

  // ✅ Función corregida: Genera la imagen temporalmente
  const handleShareImage = async () => {
    try {
      const { toPng } = await import('html-to-image');

      // Crear un contenedor temporal con el contenido de la imagen
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.width = '400px';
      tempContainer.style.padding = '30px';
      tempContainer.style.background = 'linear-gradient(135deg, #0b0b2a, #00001a)';
      tempContainer.style.color = 'white';
      tempContainer.style.fontFamily = 'Arial, sans-serif';
      tempContainer.style.textAlign = 'center';
      tempContainer.style.borderRadius = '20px';
      tempContainer.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
      tempContainer.style.border = '2px solid #48bb78';
      tempContainer.style.boxSizing = 'border-box';

      tempContainer.innerHTML = `
        <h2 style="color: #68d391; font-size: 24px; margin: 0 0 20px;">🏆 RESULTADOS ACUMULADOS</h2>
        <p style="font-size: 18px; margin: 10px 0;"><strong>Jugador:</strong> ${nombre}</p>
        <p style="font-size: 18px; margin: 10px 0;"><strong>Puntaje Actual:</strong> ⭐ ${score}</p>
        <p style="font-size: 18px; margin: 10px 0;"><strong>Récord Personal:</strong> ⭐ ${record.score} por ${record.nombre || 'Nadie'}</p>
        <p style="font-size: 16px; color: #fbbf24; margin: 20px 0 10px;">🎉 ¡Orgulloso Marcianito del Saber!</p>
        <p style="font-size: 14px; color: #cbd5e0; margin: 0;">Instituto Técnico La Inmaculada</p>
      `;

      document.body.appendChild(tempContainer);

      // Generar imagen
      const dataUrl = await toPng(tempContainer, { cacheBust: true });

      // Remover el contenedor temporal
      document.body.removeChild(tempContainer);

      // Crear enlace para descargar
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `resultados_acumulados_${nombre.replace(/\s+/g, '_').toLowerCase()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Opcional: intentar compartir con Web Share API
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Mis logros en Marcianitos del Saber',
            text: `¡Mira mis resultados acumulados! Soy ${nombre}, he conseguido un récord de ⭐${record.score} puntos.`,
            url: dataUrl, // Puede no funcionar con imágenes en algunos navegadores
          });
        } catch (err) {
          console.log('Compartido vía Web Share API fallido o cancelado:', err);
          // La imagen ya se descargó
          alert("Imagen descargada. Ábrela desde tu galería o archivos y compártela donde quieras.");
        }
      } else {
        // Si Web Share no está disponible, solo mostrar alerta
        alert("Imagen descargada. Ábrela desde tu galería o archivos y compártela donde quieras.");
      }

    } catch (error) {
      console.error('Error al generar o compartir la imagen:', error);
      alert("Hubo un error al generar la imagen para compartir.");
    }
  };

  return (
    <>
      <header className="juego-hud">
        <div className="hud-jugador">
          <span className="hud-avatar">{avatar}</span>
          <span className="hud-nombre">{nombre}</span>
        </div>
        <div className="hud-herramientas">
          <div className="hud-score">⭐ {score}</div>
          <div className={`hud-record ${nuevoRecord ? 'nuevo-record' : ''}`}>
            🏆 Récord: ⭐ {record.score} por {record.nombre || 'Nadie'}
          </div>
          <button
            className="hud-btn-config"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label="Configuración"
          >
            ⚙️
          </button>
        </div>

        {menuAbierto && (
          <div className="hud-menu">
            <button className="hud-menu-item" onClick={handleNuevoJuego}>
              🔄 Nuevo Juego
            </button>
            {/* ✅ Nuevo botón en el menú */}
            <button className="hud-menu-item" onClick={handleCompartirResultados}>
              📤 Compartir resultados acumulados
            </button>
            <button className="hud-menu-item" onClick={() => setMenuAbierto(false)}>
              ✖️ Cerrar
            </button>
          </div>
        )}
      </header>

      {/* ✅ Modal de estadísticas globales */}
      {mostrarGlobalStats && (
        <GlobalStatsModal
          jugador={{ nombre }}
          record={record}
          onClose={() => setMostrarGlobalStats(false)}
          onShare={handleShareImage} // ✅ Pasar la función corregida
        />
      )}
    </>
  );
}