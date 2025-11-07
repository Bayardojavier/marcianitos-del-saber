// src/components/BoardScreen.jsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import GameHeader from './GameHeader';
import GameBoard from './GameBoard';
import DiceRoller from './DiceRoller';
import PreQuestionModal from './PreQuestionModal';
import QuestionModal from './QuestionModal';
import StatsModal from './StatsModal'; // Modal flotante de estadísticas actuales
import GlobalStatsModal from './GlobalStatsModal'; // Nuevo modal para compartir
import { getSpecialTile, requiresQuestion } from '../game-logic/specialTiles';
import { getRandomQuestion, getPositionColor } from '../game-logic/questionBank';
import '../styles/game-header.css';
import '../styles/game-board.css';
import '../styles/dice-roller.css';

// Función auxiliar para leer posición guardada
const getInitialPosition = () => {
  const saved = localStorage.getItem('posicionAvatar');
  return saved !== null ? parseInt(saved, 10) : 0;
};

// Función auxiliar para cargar estadísticas globales
const loadGlobalStats = () => {
  const saved = localStorage.getItem('globalStats');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Error al parsear estadísticas globales:', e);
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

export default function BoardScreen() {
  const navigate = useNavigate();
  const gameBoardRef = useRef(null);

  const [jugador, setJugador] = useState({ nombre: 'Cargando...', avatar: '👽', score: 0 });
  const [posicionAvatar, setPosicionAvatar] = useState(getInitialPosition);
  const [haGanado, setHaGanado] = useState(false);
  const [mensajeSobrepasa, setMensajeSobrepasa] = useState(false);
  const [faseTurno, setFaseTurno] = useState('inicio');
  const [diceValue, setDiceValue] = useState(null);
  const [destinoPendiente, setDestinoPendiente] = useState(null);
  const [preguntaEnPosicion, setPreguntaEnPosicion] = useState(null);
  const [tileColorPendiente, setTileColorPendiente] = useState(null);
  const [specialTilePendiente, setSpecialTilePendiente] = useState(null);
  const [preguntaActual, setPreguntaActual] = useState(null);
  const [mensajeResultado, setMensajeResultado] = useState(null);
  const [tiempoRespuesta, setTiempoRespuesta] = useState(60);

  // ✅ Nuevo estado para estadísticas locales (partida actual)
  const [estadisticas, setEstadisticas] = useState({
    verde: { total: 0, correctas: 0, incorrectas: 0 },
    amarillo: { total: 0, correctas: 0, incorrectas: 0 },
    rojo: { total: 0, correctas: 0, incorrectas: 0 },
    azul: { total: 0, correctas: 0, incorrectas: 0 },
    total: { total: 0, correctas: 0, incorrectas: 0 }
  });

  // ✅ Nuevo estado para récord
  const [record, setRecord] = useState({ score: 0, nombre: '' });
  const [nuevoRecord, setNuevoRecord] = useState(false);

  // ✅ Nuevo estado para mostrar estadísticas locales
  const [mostrarEstadisticas, setMostrarEstadisticas] = useState(false);

  // ✅ Nuevo estado para mostrar estadísticas globales (compartir)
  const [mostrarGlobalStats, setMostrarGlobalStats] = useState(false);

  // ✅ Cargar jugador, posición y récord al iniciar
  useEffect(() => {
    const datos = localStorage.getItem('jugador');
    if (datos) {
      setJugador({ ...JSON.parse(datos), score: 0 });
    } else {
      navigate('/game');
    }

    const savedPos = localStorage.getItem('posicionAvatar');
    if (savedPos !== null) {
      setPosicionAvatar(parseInt(savedPos, 10));
    }

    // ✅ Cargar récord
    const savedRecord = localStorage.getItem('record');
    if (savedRecord) {
      const r = JSON.parse(savedRecord);
      setRecord(r);
    }
  }, [navigate]);

  // ✅ Guardar posición cada vez que cambia
  useEffect(() => {
    // Solo guardar si no es el estado inicial (0) o si ya se ha restaurado
    if (posicionAvatar !== 0 || localStorage.getItem('posicionAvatar') !== null) {
      localStorage.setItem('posicionAvatar', posicionAvatar.toString());
    }
  }, [posicionAvatar]);

  // ✅ Función para actualizar récord
  const actualizarRecord = () => {
    if (jugador.score > record.score) {
      const nuevoRecordData = { score: jugador.score, nombre: jugador.nombre };
      setRecord(nuevoRecordData);
      localStorage.setItem('record', JSON.stringify(nuevoRecordData));
      setNuevoRecord(true);
      // ✅ Desactivar mensaje después de un tiempo
      setTimeout(() => setNuevoRecord(false), 3000);
      return true;
    }
    return false;
  };

  const handleDiceRoll = (numero) => {
    if (faseTurno !== 'inicio' || posicionAvatar >= 65 || haGanado) return;

    const destino = posicionAvatar + numero;
    if (destino > 65) {
      setDiceValue(numero);
      setMensajeSobrepasa(true);
      return;
    }

    const specialTile = getSpecialTile(destino);
    let posicionParaPregunta = destino;

    // Aplicar efectos inmediatos de casillas neutras
    if (specialTile?.type === 'step_back') {
      // Retrocede inmediatamente
      posicionParaPregunta = Math.max(0, destino - specialTile.steps);
    }

    const colorDestino = getPositionColor(destino);
    const colorPregunta = getPositionColor(posicionParaPregunta);

    // Casillas neutras que no requieren pregunta
    if (colorDestino === 'neutral') {
      if (specialTile?.type === 'roll_again') {
        setPosicionAvatar(destino);
        setTimeout(() => {
          if (gameBoardRef.current) gameBoardRef.current.centerOnAvatar();
        }, 300);
        return;
      }
      if (specialTile?.type === 'finish') {
        setPosicionAvatar(destino);
        setTimeout(() => setHaGanado(true), 1000);
        return;
      }
      if (specialTile?.type === 'step_back') {
        // Continuar para mostrar pregunta en la casilla tras retroceder
      } else {
        // Otra neutra → mover y terminar
        setPosicionAvatar(destino);
        setTimeout(() => {
          if (gameBoardRef.current) gameBoardRef.current.centerOnAvatar();
        }, 300);
        return;
      }
    }

    // Si la casilla para pregunta es neutra (no debería pasar), mover y terminar
    if (colorPregunta === 'neutral') {
      setPosicionAvatar(destino);
      setTimeout(() => {
        if (gameBoardRef.current) gameBoardRef.current.centerOnAvatar();
      }, 300);
      return;
    }

    // Mostrar pregunta
    setDiceValue(numero);
    setDestinoPendiente(destino);
    setPreguntaEnPosicion(posicionParaPregunta);
    setTileColorPendiente(colorPregunta);
    setSpecialTilePendiente(specialTile);
    setFaseTurno('pregunta');
  };

  const handleConfirmarPregunta = () => {
    const pregunta = getRandomQuestion(tileColorPendiente);
    setPreguntaActual(pregunta);
    setFaseTurno('pregunta_activa');
  };

  const manejarRespuesta = (esCorrecta, timeLeft) => {
    setTiempoRespuesta(timeLeft);

    let puntos = 0;
    if (esCorrecta) {
      if (timeLeft >= 50) {
        puntos = timeLeft + 10; // bono
      } else {
        puntos = timeLeft;
      }

      let multiplicador = 1;
      if (tileColorPendiente === 'yellow') multiplicador = 2;
      else if (tileColorPendiente === 'red') multiplicador = 3;
      else if (tileColorPendiente === 'blue') multiplicador = 4;

      puntos *= multiplicador;

      setJugador(prev => ({ ...prev, score: prev.score + puntos }));
    }

    // Contar pregunta en estadísticas LOCALES (de la partida actual)
    let colorKey = '';
    if (tileColorPendiente === 'green') colorKey = 'verde';
    else if (tileColorPendiente === 'yellow') colorKey = 'amarillo';
    else if (tileColorPendiente === 'red') colorKey = 'rojo';
    else if (tileColorPendiente === 'blue') colorKey = 'azul';

    if (colorKey) {
      setEstadisticas(prev => {
        const nuevas = { ...prev };
        nuevas[colorKey].total += 1;
        nuevas[colorKey][esCorrecta ? 'correctas' : 'incorrectas'] += 1;
        nuevas.total.total += 1;
        nuevas.total[esCorrecta ? 'correctas' : 'incorrectas'] += 1;
        return nuevas;
      });
    }

    // Contar pregunta en estadísticas GLOBALES (acumuladas)
    setEstadisticasGlobales(prev => {
      const nuevas = { ...prev };
      nuevas[colorKey].total += 1;
      nuevas[colorKey][esCorrecta ? 'correctas' : 'incorrectas'] += 1;
      nuevas.total.total += 1;
      nuevas.total[esCorrecta ? 'correctas' : 'incorrectas'] += 1;
      return nuevas;
    });

    const specialTile = specialTilePendiente;
    let destinoFinal = posicionAvatar; // Inicialmente no se mueve
    let mensajeEspecial = null;

    if (specialTile?.type === 'bridge_reward' && esCorrecta) {
      destinoFinal = specialTile.target;
      mensajeEspecial = 'bridge_reward';
    } else if (specialTile?.type === 'bridge_penalty' && !esCorrecta) {
      destinoFinal = specialTile.target;
      mensajeEspecial = 'bridge_penalty';
    } else if (specialTile?.type === 'step_back') {
      destinoFinal = preguntaEnPosicion; // El avatar se queda en la casilla tras retroceder
    } else if (esCorrecta) {
      destinoFinal = destinoPendiente; // Si no es especial, se mueve a destinoPendiente
    }
    // Si falla y no es especial, no se mueve (queda en posicionAvatar)

    const esVictoria = destinoFinal === 65;

    setFaseTurno('resultado');
    setMensajeResultado({
      tipo: esCorrecta,
      destinoFinal: Math.max(0, Math.min(65, destinoFinal)),
      esVictoria,
      specialTile,
      mensajeEspecial,
      esStepBack: specialTile?.type === 'step_back',
      puntosGanados: puntos
    });
  };

  // ✅ Efecto que maneja el movimiento y la limpieza
  useEffect(() => {
    if (faseTurno === 'resultado' && mensajeResultado) {
      const destinoFinal = mensajeResultado.destinoFinal;
      const inicio = posicionAvatar;
      const fin = typeof destinoFinal === 'number' ? destinoFinal : inicio;
      const delta = fin - inicio;
      const pasosTotales = Math.abs(delta);
      const direccion = delta > 0 ? 1 : -1;

      const timer = setTimeout(() => {
        if (pasosTotales === 0) {
          if (mensajeResultado.esVictoria) setHaGanado(true);
          setFaseTurno('inicio');
          setMensajeResultado(null); // ✅ Asegurar limpieza
          return;
        }

        let pasos = 0;
        const mover = () => {
          if (pasos < pasosTotales) {
            pasos++;
            setPosicionAvatar(prev => prev + direccion);
            setTimeout(() => {
              if (gameBoardRef.current) gameBoardRef.current.centerOnAvatar();
            }, 100);
            setTimeout(mover, 400);
          } else {
            if (mensajeResultado.esVictoria) {
              setTimeout(() => setHaGanado(true), 800);
            }
            setFaseTurno('inicio');
            setMensajeResultado(null); // ✅ Asegurar limpieza
          }
        };
        mover();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [faseTurno, mensajeResultado, posicionAvatar]);

  const reiniciarJuego = () => {
    setPosicionAvatar(0);
    localStorage.removeItem('posicionAvatar');
    setHaGanado(false);
    setMensajeSobrepasa(false);
    setFaseTurno('inicio');
    setDiceValue(null);
    setDestinoPendiente(null);
    setPreguntaEnPosicion(null);
    setTileColorPendiente(null);
    setSpecialTilePendiente(null);
    setPreguntaActual(null);
    setMensajeResultado(null);
    setEstadisticas({
      verde: { total: 0, correctas: 0, incorrectas: 0 },
      amarillo: { total: 0, correctas: 0, incorrectas: 0 },
      rojo: { total: 0, correctas: 0, incorrectas: 0 },
      azul: { total: 0, correctas: 0, incorrectas: 0 },
      total: { total: 0, correctas: 0, incorrectas: 0 }
    }); // ✅ Reiniciar estadísticas locales
    localStorage.removeItem('jugador');
    navigate('/');
  };

  const jugarDeNuevo = () => {
    setPosicionAvatar(0);
    localStorage.removeItem('posicionAvatar');
    setHaGanado(false);
    setMensajeSobrepasa(false);
    setFaseTurno('inicio');
    setDiceValue(null);
    setDestinoPendiente(null);
    setPreguntaEnPosicion(null);
    setTileColorPendiente(null);
    setSpecialTilePendiente(null);
    setPreguntaActual(null);
    setMensajeResultado(null);
    setEstadisticas({
      verde: { total: 0, correctas: 0, incorrectas: 0 },
      amarillo: { total: 0, correctas: 0, incorrectas: 0 },
      rojo: { total: 0, correctas: 0, incorrectas: 0 },
      azul: { total: 0, correctas: 0, incorrectas: 0 },
      total: { total: 0, correctas: 0, incorrectas: 0 }
    }); // ✅ Reiniciar estadísticas locales
  };

  // ✅ Nuevo estado para estadísticas globales
  const [estadisticasGlobales, setEstadisticasGlobales] = useState(loadGlobalStats());

  // ✅ Guardar estadísticas globales cada vez que cambian
  useEffect(() => {
    localStorage.setItem('globalStats', JSON.stringify(estadisticasGlobales));
  }, [estadisticasGlobales]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: 'radial-gradient(circle at center, #0b0b2a 0%, #00001a 70%, #000 100%)',
      }}
    >
      <GameHeader
        nombre={jugador.nombre}
        avatar={jugador.avatar}
        score={jugador.score}
        record={record}
        nuevoRecord={nuevoRecord}
        estadisticas={estadisticas} // ✅ Pasar estadísticas locales al HUD (opcional)
      />

      {faseTurno === 'inicio' && !haGanado && !mensajeSobrepasa && (
        <div
          style={{
            position: 'absolute',
            bottom: '100px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 30,
          }}
        >
          <DiceRoller onRoll={handleDiceRoll} />
        </div>
      )}

      {/* ✅ Botón de estadísticas locales (flotante en el tablero) */}
      {faseTurno === 'inicio' && !haGanado && !mensajeSobrepasa && (
        <button
          onClick={() => setMostrarEstadisticas(true)}
          style={{
            position: 'absolute',
            top: '100px', // Debajo del HUD
            right: '20px', // Esquina superior derecha del tablero
            zIndex: 30,
            background: 'rgba(72, 187, 120, 0.9)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            fontSize: '1.5rem',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          }}
        >
          📊
        </button>
      )}

      <GameBoard
        ref={gameBoardRef}
        avatar={jugador.avatar}
        posicion={posicionAvatar}
      />

      {faseTurno === 'pregunta' && (
        <PreQuestionModal
          diceValue={diceValue}
          tileColor={tileColorPendiente}
          specialTile={specialTilePendiente}
          onConfirm={handleConfirmarPregunta}
        />
      )}

      {faseTurno === 'pregunta_activa' && preguntaActual && (
        <QuestionModal
          question={preguntaActual}
          onAnswer={manejarRespuesta}
        />
      )}

      {mensajeResultado && (
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
            zIndex: 200,
          }}
        >
          <div
            style={{
              background: 'rgba(10,5,30,0.95)',
              padding: '2rem',
              borderRadius: '20px',
              textAlign: 'center',
              color: 'white',
              maxWidth: '350px',
              border: mensajeResultado.tipo
                ? '2px solid #48bb78'
                : '2px solid #f56565',
            }}
          >
            {mensajeResultado.tipo ? (
              <>
                <h2 style={{ color: '#48bb78', fontSize: '1.8rem' }}>¡Correcto! 🎉</h2>
                {mensajeResultado.mensajeEspecial === 'bridge_reward' && (
                  <p>¡Puente Premio! Saltas a la casilla {mensajeResultado.destinoFinal}.</p>
                )}
                {!mensajeResultado.mensajeEspecial && (
                  <p>Avanzas {diceValue} casillas.</p>
                )}
                {mensajeResultado.puntosGanados > 0 && (
                  <p style={{ marginTop: '0.5rem', color: '#fbbf24' }}>
                    🌟 +{mensajeResultado.puntosGanados} puntos
                  </p>
                )}
              </>
            ) : (
              <>
                <h2 style={{ color: '#f56565', fontSize: '1.8rem' }}>¡Lo siento! ❌</h2>
                {mensajeResultado.mensajeEspecial === 'bridge_penalty' && (
                  <p>¡Puente Castigo! Retrocedes a la casilla {mensajeResultado.destinoFinal}.</p>
                )}
                {mensajeResultado.esStepBack && (
                  <p>¡Regresas {getSpecialTile(destinoPendiente)?.steps || 2} casillas!</p>
                )}
                {!mensajeResultado.mensajeEspecial && !mensajeResultado.esStepBack && (
                  <p>Te quedas en el mismo lugar.</p>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Modal: Sobrepasó la meta */}
           {/* Modal: Sobrepasó la meta (actualizado con info específica) */}
      {mensajeSobrepasa && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
          }}
        >
          <div
            style={{
              background: 'rgba(10,5,30,0.95)',
              backdropFilter: 'blur(8px)',
              padding: '1.5rem',
              borderRadius: '16px',
              textAlign: 'center',
              color: 'white',
              maxWidth: '320px',
              border: '1px solid #fbbf24',
              boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
            }}
          >
            <h3 style={{ color: '#fbbf24', margin: '0 0 1rem' }}>¡Casi lo logras!</h3>
            <p style={{ fontSize: '1.1rem', margin: '0 0 0.8rem' }}>
              Tiraste un <strong>{diceValue}</strong>, pero te sobraron <strong>{(posicionAvatar + diceValue) - 65}</strong> casillas.
            </p>
            <p style={{ fontSize: '1.1rem', margin: '0 0 1.2rem' }}>
              Necesitas tirar exactamente <strong>{65 - posicionAvatar}</strong> para ganar.
            </p>
            <button
              onClick={() => setMensajeSobrepasa(false)}
              style={{
                background: '#68d391',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              🎲 Tirar de nuevo
            </button>
          </div>
        </div>
      )}
      
      {/* Modal de victoria */}
      {haGanado && (
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
            zIndex: 100,
          }}
        >
          <div
            style={{
              background: 'rgba(10,5,30,0.95)',
              backdropFilter: 'blur(10px)',
              padding: '2rem',
              borderRadius: '20px',
              textAlign: 'center',
              color: 'white',
              maxWidth: '320px',
              border: '1px solid #48bb78',
            }}
          >
            <h2 style={{ color: '#68d391', marginBottom: '1rem' }}>¡Felicidades! 🎉</h2>
            <p>
              <strong>{jugador.nombre}</strong> ha llegado a la meta.
            </p>
            <p style={{ fontSize: '1.2rem', color: '#fbbf24', margin: '0.5rem 0' }}>
              Puntaje: ⭐ {jugador.score || 0}
            </p>
            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={jugarDeNuevo}
                style={{
                  padding: '10px',
                  background: '#48bb78',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                }}
              >
                🔄 Jugar de nuevo
              </button>
              <button
                onClick={reiniciarJuego}
                style={{
                  padding: '10px',
                  background: '#4299e1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                }}
              >
                👽 Cambiar personaje
              </button>
              <button
                onClick={() => navigate('/')}
                style={{
                  padding: '10px',
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
        </div>
      )}

      {/* ✅ Modal de estadísticas locales (partida actual) */}
      {mostrarEstadisticas && (
        <StatsModal
          estadisticas={estadisticas}
          onClose={() => setMostrarEstadisticas(false)}
        />
      )}

      {/* ✅ Modal de estadísticas globales (compartir) */}
      {mostrarGlobalStats && (
        <GlobalStatsModal
          estadisticas={estadisticasGlobales}
          jugador={jugador}
          record={record}
          onClose={() => setMostrarGlobalStats(false)}
        />
      )}
    </div>
  );
}