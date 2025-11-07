// src/game-logic/specialTiles.js
export const SPECIAL_TILES = {
  9: { type: 'bridge_reward', target: 21 },
  43: { type: 'bridge_penalty', target: 23 },
  14: { type: 'step_back', steps: 2 },
  34: { type: 'step_back', steps: 2 },
  57: { type: 'step_back', steps: 2 },
  19: { type: 'roll_again' },
  27: { type: 'roll_again' },
  50: { type: 'roll_again' },
  60: { type: 'roll_again' },
  65: { type: 'finish' }
};

export const getSpecialTile = (position) => {
  return SPECIAL_TILES[position] || null;
};

export const requiresQuestion = (position) => {
  const color = getPositionColor(position);
  return color !== 'neutral';
};

// Importado desde questionBank.js
import { getPositionColor } from './questionBank';