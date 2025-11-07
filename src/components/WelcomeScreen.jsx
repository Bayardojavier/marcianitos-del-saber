// src/components/WelcomeScreen.jsx
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function WelcomeScreen() {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate('/game');
  };

  return (
    <div className="welcome-screen">
      {/* Contenedor del logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        className="logo-container"
      >
        <div className="logo-circle">
          <img
            src="/logo-inmaculada.jpg"
            alt="Logo del Instituto Técnico La Inmaculada"
            className="logo-image"
          />
        </div>
      </motion.div>

      {/* Mensaje de bienvenida */}
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="title"
      >
        ¡Bienvenidos, pequeños héroes del espacio!
      </motion.h1>

      {/* Nombre del colegio */}
      <motion.p
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="subtitle"
      >
        Instituto Técnico La Inmaculada
        <br />
        <span className="grade">Tercer Grado</span>
      </motion.p>

      {/* Botón de Entrar */}
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: '#10b981' }}
        whileTap={{ scale: 0.95 }}
        onClick={handleEnter}
        className="btn-enter"
      >
        ¡Entrar al Juego!
      </motion.button>

      {/* ✅ Crédito del creador */}
      <p
        style={{
          position: 'fixed', // Fijo en la pantalla
          bottom: '20px',
          right: '20px',
          fontSize: '0.8rem', // Tamaño pequeño
          color: 'rgba(255, 255, 255, 0.6)', // Color semi-transparente
          margin: 0,
          padding: 0,
          zIndex: 10, // Asegura que esté por encima de otros elementos si es necesario
          fontFamily: 'Arial, sans-serif',
          textAlign: 'right',
        }}
      >
        Creado por Papa de Amy Davila
      </p>
    </div>
  );
}