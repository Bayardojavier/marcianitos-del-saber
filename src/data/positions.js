// src/data/positions.js
// 👇 Solo edita los valores de 'x' e 'y' según tu imagen (1300x700 px)
// La coordenada (0,0) es la esquina superior izquierda de la imagen.

export const BOARD_POSITIONS = {
  // === Casilla de inicio (0) ===
  0: { x: 100, y: 250 },

  // === Casillas regulares y especiales (1 a 65) ===
  1: { x: 175, y: 190 },
  2: { x: 222, y: 152 },
  3: { x: 277, y: 113 },
  4: { x: 328, y: 83 },
  5: { x: 396, y: 52 },
  6: { x: 451, y: 110 },
  7: { x: 478, y: 152 },
  8: { x: 513, y: 208 },
  9: { x: 444, y: 226 },   // 🔵 Puente Premio → salta a 21
  10: { x: 388, y: 179 },  // 🔴 Rojo
  11: { x: 351, y: 221 },  // 🟢 Verde
  12: { x: 307, y: 244 },  // 🟡 Amarillo
  13: { x: 259, y: 274 },  // 🔴 Rojo
  14: { x: 208, y: 304 },  // ⚪ Regresa 2 pasos
  15: { x: 178, y: 367 },  // 🟡 Amarillo
  16: { x: 241, y: 385 },  // 🔵 Azul
  17: { x: 297, y: 410 },  // 🟢 Verde
  18: { x: 364, y: 427 }, // 🟡 Amarillo
  19: { x: 438, y: 431 }, // ⚪ Tira de nuevo
  20: { x: 493, y: 382 }, // 🟡 Amarillo
  21: { x: 549, y: 319 }, // 🔵 Azul (destino del Puente Premio)
  22: { x: 619, y: 307 }, // 🟢 Verde
  23: { x: 684, y: 322 }, // 🟡 Amarillo
  24: { x: 665, y: 389 }, // 🔴 Rojo
  25: { x: 639, y: 431 },  // 🟢 Verde
  26: { x: 606, y: 469 },  // 🔵 Azul
  27: { x: 577, y: 526 },  // ⚪ Tira de nuevo
  28: { x: 505, y: 544 },  // 🟡 Amarillo
  29: { x: 454, y: 580 },  // 🔴 Rojo
  30: { x: 493, y: 640 },  // 🟡 Amarillo
  31: { x: 547, y: 650 },  // 🟢 Verde
  32: { x: 591, y: 592 },  // 🔵 Azul
  33: { x: 651, y: 595 },  // 🟡 Amarillo
  34: { x: 684, y: 538 },  // ⚪ Regresa 2 pasos
  35: { x: 741, y: 517 },  // 🟢 Verde
  36: { x: 789, y: 491 },  // 🔴 Rojo
  37: { x: 832, y: 464 },  // 🟡 Amarillo
  38: { x: 882, y: 445 },  // 🟢 Verde
  39: { x: 925, y: 407 },  // 🔵 Azul
  40: { x: 909, y: 358 },  // 🟡 Amarillo
  41: { x: 888, y: 313 },  // 🟢 Verde
  42: { x: 861, y: 262 },  // 🔴 Rojo
  43: { x: 834, y: 206 },   // 🔵 Puente Castigo → retrocede a 23
  44: { x: 774, y: 173 },  // 🟡 Amarillo
  45: { x: 729, y: 149 },  // 🟢 Verde
  46: { x: 700, y: 83 },  // 🟡 Amarillo
  47: { x: 766, y: 47 },  // 🔴 Rojo
  48: { x: 822, y: 59 },  // 🟢 Verde
  49: { x: 873, y: 68 },  // 🔵 Azul
  50: { x: 933, y: 71 },  // ⚪ Tira de nuevo
  51: { x: 1000, y: 43 },  // 🟡 Amarillo
  52: { x: 1044, y: 73 },  // 🟢 Verde
  53: { x: 1087, y: 112 },  // 🔴 Rojo
  54: { x: 1123, y: 155 },  // 🔵 Azul
  55: { x: 1155, y: 206 },  // 🟡 Amarillo
  56: { x: 1174, y: 254 },  // 🟢 Verde
  57: { x: 1191, y: 310 },  // ⚪ Regresa 2 pasos
  58: { x: 1165, y: 377 },  // 🟡 Amarillo
  59: { x: 1152, y: 428 },  // 🟢 Verde
  60: { x: 1132, y: 487 },  // ⚪ Tira de nuevo
  61: { x: 1084, y: 526 },  // 🟡 Amarillo
  62: { x: 1033, y: 559 }, // 🔴 Rojo
  63: { x: 1000, y: 610 }, // 🔵 Azul
  64: { x: 1066, y: 623 }, // 🟢 Verde
  65: { x: 1150, y: 613 }  // 🏆 Meta
};