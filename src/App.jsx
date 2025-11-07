// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import GameScreen from './components/GameScreen';
import BoardScreen from './components/BoardScreen'; // Nueva pantalla



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/game" element={<GameScreen />} />
        <Route path="/tablero" element={<BoardScreen />} />
      </Routes>
    </Router>
  );
}

export default App;