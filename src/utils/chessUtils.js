// NovaChess - Chess Game Utilities
import { PIECE_TYPES, PIECE_COLORS, BOARD_SIZE } from '../constants/chessConstants.js';

export class ChessUtils {
  static getPieceColor(piece) {
    if (!piece) return null;
    return piece === piece.toUpperCase() ? PIECE_COLORS.WHITE : PIECE_COLORS.BLACK;
  }

  static getPieceType(piece) {
    if (!piece) return null;
    const lowerPiece = piece.toLowerCase();
    switch (lowerPiece) {
      case 'k': return PIECE_TYPES.KING;
      case 'q': return PIECE_TYPES.QUEEN;
      case 'r': return PIECE_TYPES.ROOK;
      case 'b': return PIECE_TYPES.BISHOP;
      case 'n': return PIECE_TYPES.KNIGHT;
      case 'p': return PIECE_TYPES.PAWN;
      default: return null;
    }
  }

  static isValidPosition(row, col) {
    return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
  }

  static getSquareColor(row, col) {
    return (row + col) % 2 === 0 ? 'light' : 'dark';
  }

  static getPositionFromIndex(index) {
    return {
      row: Math.floor(index / BOARD_SIZE),
      col: index % BOARD_SIZE
    };
  }

  static getIndexFromPosition(row, col) {
    return row * BOARD_SIZE + col;
  }

  static deepCopyBoard(board) {
    return board.map(row => [...row]);
  }

  static isOpponentPiece(piece, currentPlayer) {
    if (!piece) return false;
    const pieceColor = this.getPieceColor(piece);
    return pieceColor !== currentPlayer;
  }

  static isOwnPiece(piece, currentPlayer) {
    if (!piece) return false;
    const pieceColor = this.getPieceColor(piece);
    return pieceColor === currentPlayer;
  }

  static formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  static generateMoveNotation(from, to, piece, capturedPiece = null) {
    const fromSquare = this.positionToSquare(from);
    const toSquare = this.positionToSquare(to);
    const capture = capturedPiece ? 'x' : '';
    return `${piece}${fromSquare}${capture}${toSquare}`;
  }

  static positionToSquare(position) {
    const col = String.fromCharCode(97 + position.col); // a-h
    const row = (8 - position.row).toString(); // 1-8
    return col + row;
  }
}
