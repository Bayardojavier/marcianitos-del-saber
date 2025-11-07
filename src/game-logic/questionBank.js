// src/game-logic/questionBank.js

// Función para barajar
const shuffle = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// 🟢 Verde: sumas y restas
export const GREEN_QUESTIONS = [
  { q: '23 + 17', a: 40 }, { q: '45 + 36', a: 81 }, { q: '68 + 22', a: 90 },
  { q: '15 + 49', a: 64 }, { q: '34 + 28', a: 62 }, { q: '56 + 33', a: 89 },
  { q: '72 + 19', a: 91 }, { q: '27 + 44', a: 71 }, { q: '38 + 57', a: 95 },
  { q: '63 + 29', a: 92 }, { q: '84 - 37', a: 47 }, { q: '75 - 28', a: 47 },
  { q: '92 - 45', a: 47 }, { q: '61 - 24', a: 37 }, { q: '53 - 16', a: 37 },
  { q: '88 - 29', a: 59 }, { q: '74 - 35', a: 39 }, { q: '67 - 28', a: 39 },
  { q: '95 - 47', a: 48 }, { q: '82 - 34', a: 48 }, { q: '50 + 25', a: 75 },
  { q: '60 + 30', a: 90 }, { q: '40 + 40', a: 80 }, { q: '70 - 20', a: 50 },
  { q: '99 - 49', a: 50 }, { q: '25 + 35', a: 60 }, { q: '48 + 12', a: 60 },
  { q: '66 - 16', a: 50 }, { q: '77 - 27', a: 50 }, { q: '88 + 11', a: 99 }
];

// 🟡 Amarillo: multiplicaciones fáciles
export const YELLOW_QUESTIONS = [
  { q: '6 × 7', a: 42 }, { q: '8 × 9', a: 72 }, { q: '5 × 6', a: 30 },
  { q: '7 × 8', a: 56 }, { q: '9 × 4', a: 36 }, { q: '3 × 9', a: 27 },
  { q: '4 × 7', a: 28 }, { q: '6 × 8', a: 48 }, { q: '5 × 9', a: 45 },
  { q: '7 × 6', a: 42 }, { q: '2 × 10', a: 20 }, { q: '4 × 5', a: 20 },
  { q: '3 × 8', a: 24 }, { q: '9 × 3', a: 27 }, { q: '6 × 6', a: 36 },
  { q: '7 × 7', a: 49 }, { q: '8 × 5', a: 40 }, { q: '9 × 6', a: 54 },
  { q: '4 × 9', a: 36 }, { q: '5 × 7', a: 35 }, { q: '8 × 4', a: 32 },
  { q: '3 × 7', a: 21 }, { q: '6 × 9', a: 54 }, { q: '2 × 9', a: 18 },
  { q: '4 × 6', a: 24 }, { q: '5 × 5', a: 25 }, { q: '7 × 5', a: 35 },
  { q: '8 × 6', a: 48 }, { q: '9 × 7', a: 63 }, { q: '10 × 8', a: 80 }
];

// 🔴 Rojo: multiplicaciones de dos cifras
export const RED_QUESTIONS = [
  { q: '23 × 4', a: 92, options: [82, 92, 102] },
  { q: '17 × 5', a: 85, options: [75, 85, 95] },
  { q: '36 × 2', a: 72, options: [62, 72, 82] },
  { q: '45 × 3', a: 135, options: [125, 135, 145] },
  { q: '28 × 4', a: 112, options: [102, 112, 122] },
  { q: '19 × 6', a: 114, options: [104, 114, 124] },
  { q: '33 × 3', a: 99, options: [89, 99, 109] },
  { q: '24 × 5', a: 120, options: [110, 120, 130] },
  { q: '41 × 2', a: 82, options: [72, 82, 92] },
  { q: '27 × 4', a: 108, options: [98, 108, 118] },
  { q: '39 × 2', a: 78, options: [68, 78, 88] },
  { q: '22 × 6', a: 132, options: [122, 132, 142] },
  { q: '31 × 3', a: 93, options: [83, 93, 103] },
  { q: '18 × 5', a: 90, options: [80, 90, 100] },
  { q: '26 × 3', a: 78, options: [68, 78, 88] },
  { q: '43 × 2', a: 86, options: [76, 86, 96] },
  { q: '29 × 3', a: 87, options: [77, 87, 97] },
  { q: '34 × 2', a: 68, options: [58, 68, 78] },
  { q: '25 × 4', a: 100, options: [90, 100, 110] },
  { q: '37 × 2', a: 74, options: [64, 74, 84] }
];

// 🔵 Azul: divisiones
export const BLUE_QUESTIONS = [
  { q: '84 ÷ 4', a: 21, options: [18, 21, 24] },
  { q: '96 ÷ 3', a: 32, options: [28, 32, 36] },
  { q: '72 ÷ 6', a: 12, options: [10, 12, 14] },
  { q: '144 ÷ 6', a: 24, options: [20, 24, 28] },
  { q: '100 ÷ 5', a: 20, options: [18, 20, 22] },
  { q: '126 ÷ 7', a: 18, options: [16, 18, 20] },
  { q: '162 ÷ 9', a: 18, options: [16, 18, 20] },
  { q: '180 ÷ 6', a: 30, options: [28, 30, 32] },
  { q: '200 ÷ 4', a: 50, options: [45, 50, 55] },
  { q: '108 ÷ 9', a: 12, options: [10, 12, 14] },
  { q: '132 ÷ 4', a: 33, options: [30, 33, 36] },
  { q: '150 ÷ 5', a: 30, options: [28, 30, 32] },
  { q: '196 ÷ 7', a: 28, options: [26, 28, 30] },
  { q: '225 ÷ 5', a: 45, options: [42, 45, 48] },
  { q: '1000 ÷ 5', a: 200, options: [180, 200, 220] },
  { q: '900 ÷ 9', a: 100, options: [90, 100, 110] },
  { q: '168 ÷ 8', a: 21, options: [19, 21, 23] },
  { q: '147 ÷ 7', a: 21, options: [19, 21, 23] },
  { q: '112 ÷ 4', a: 28, options: [26, 28, 30] },
  { q: '175 ÷ 5', a: 35, options: [32, 35, 38] }
];

// 🔑 Colores por posición (¡sin solapamientos!)
export const getPositionColor = (position) => {
  const green = [1, 3, 5, 7, 11, 17, 22, 25, 31, 35, 38, 41, 45, 48, 52, 56, 59, 64];
  const yellow = [2, 4, 6, 8, 12, 15, 18, 20, 23, 28, 30, 33, 37, 40, 44, 46, 51, 55, 58, 61];
  const red = [10, 13, 24, 29, 36, 42, 47, 53, 62];
  const blue = [9, 16, 21, 26, 32, 39, , 43,49, 54, 63];

  if (green.includes(position)) return 'green';
  if (yellow.includes(position)) return 'yellow';
  if (red.includes(position)) return 'red';
  if (blue.includes(position)) return 'blue';
  return 'neutral'; // 0, 14, 19, 27, 34, 50, 57, 60, 65
};

// Obtén pregunta aleatoria
export const getRandomQuestion = (color) => {
  let pool = [];
  switch (color) {
    case 'green': pool = GREEN_QUESTIONS; break;
    case 'yellow': pool = YELLOW_QUESTIONS; break;
    case 'red': pool = RED_QUESTIONS; break;
    case 'blue': pool = BLUE_QUESTIONS; break;
    default: throw new Error('Color no válido');
  }
  const randomIndex = Math.floor(Math.random() * pool.length);
  return { ...pool[randomIndex], color };
};