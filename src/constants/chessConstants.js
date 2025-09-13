// NovaChess - Chess Game Constants
export const PIECE_TYPES = {
  KING: 'king',
  QUEEN: 'queen',
  ROOK: 'rook',
  BISHOP: 'bishop',
  KNIGHT: 'knight',
  PAWN: 'pawn'
};

export const PIECE_COLORS = {
  WHITE: 'white',
  BLACK: 'black'
};

export const BOARD_SIZE = 8;
export const SQUARE_SIZE = 50; // Increased for better visibility

export const INITIAL_BOARD = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
];

export const PIECE_SYMBOLS = {
  'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
  'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'
};

export const GAME_STATES = {
  PLAYING: 'playing',
  CHECK: 'check',
  CHECKMATE: 'checkmate',
  STALEMATE: 'stalemate',
  DRAW: 'draw'
};

export const COLORS = {
  LIGHT_SQUARE: '#f0d9b5',      // Light beige for light squares
  DARK_SQUARE: '#b58863',       // Dark brown for dark squares
  HIGHLIGHT: '#6b46c1',         // Purple for possible moves
  SELECTED: '#3b82f6',          // Blue for selected square
  CHECK: '#dc2626'              // Red for check
};
