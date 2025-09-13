// NovaChess - Chess Game Engine
import { PIECE_TYPES, PIECE_COLORS, BOARD_SIZE, GAME_STATES } from '../constants/chessConstants.js';
import { ChessUtils } from './chessUtils.js';

export class ChessEngine {
  constructor() {
    this.board = this.initializeBoard();
    this.currentPlayer = PIECE_COLORS.WHITE;
    this.gameState = GAME_STATES.PLAYING;
    this.moveHistory = [];
    this.selectedSquare = null;
    this.possibleMoves = [];
    this.isInCheck = false;
    this.isInCheckmate = false;
    this.isInStalemate = false;
  }

  initializeBoard() {
    return [
      ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
      ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
      ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
    ];
  }

  selectSquare(row, col) {
    const piece = this.board[row][col];
    
    // If clicking on own piece, select it
    if (piece && ChessUtils.isOwnPiece(piece, this.currentPlayer)) {
      this.selectedSquare = { row, col };
      this.possibleMoves = this.getPossibleMoves(row, col);
      return { selected: true, moves: this.possibleMoves };
    }
    
    // If clicking on empty square or opponent piece with a piece selected
    if (this.selectedSquare) {
      const isValidMove = this.possibleMoves.some(move => 
        move.row === row && move.col === col
      );
      
      if (isValidMove) {
        return this.makeMove(this.selectedSquare, { row, col });
      } else {
        this.selectedSquare = null;
        this.possibleMoves = [];
        return { selected: false, moves: [] };
      }
    }
    
    return { selected: false, moves: [] };
  }

  makeMove(from, to) {
    const piece = this.board[from.row][from.col];
    const capturedPiece = this.board[to.row][to.col];
    
    // Make the move
    this.board[to.row][to.col] = piece;
    this.board[from.row][from.col] = null;
    
    // Record the move
    this.moveHistory.push({
      from,
      to,
      piece,
      capturedPiece,
      notation: ChessUtils.generateMoveNotation(from, to, piece, capturedPiece)
    });
    
    // Clear selection
    this.selectedSquare = null;
    this.possibleMoves = [];
    
    // Switch players
    this.currentPlayer = this.currentPlayer === PIECE_COLORS.WHITE 
      ? PIECE_COLORS.BLACK 
      : PIECE_COLORS.WHITE;
    
    // Check game state
    this.updateGameState();
    
    return {
      success: true,
      captured: capturedPiece,
      gameState: this.gameState,
      isInCheck: this.isInCheck
    };
  }

  getPossibleMoves(row, col) {
    const piece = this.board[row][col];
    if (!piece) return [];
    
    const pieceType = ChessUtils.getPieceType(piece);
    const moves = [];
    
    switch (pieceType) {
      case PIECE_TYPES.PAWN:
        return this.getPawnMoves(row, col);
      case PIECE_TYPES.ROOK:
        return this.getRookMoves(row, col);
      case PIECE_TYPES.KNIGHT:
        return this.getKnightMoves(row, col);
      case PIECE_TYPES.BISHOP:
        return this.getBishopMoves(row, col);
      case PIECE_TYPES.QUEEN:
        return this.getQueenMoves(row, col);
      case PIECE_TYPES.KING:
        return this.getKingMoves(row, col);
      default:
        return [];
    }
  }

  getPawnMoves(row, col) {
    const moves = [];
    const piece = this.board[row][col];
    const isWhite = ChessUtils.getPieceColor(piece) === PIECE_COLORS.WHITE;
    const direction = isWhite ? -1 : 1;
    const startRow = isWhite ? 6 : 1;
    
    // Forward move
    const newRow = row + direction;
    if (ChessUtils.isValidPosition(newRow, col) && !this.board[newRow][col]) {
      moves.push({ row: newRow, col });
      
      // Double move from starting position
      if (row === startRow) {
        const doubleRow = row + 2 * direction;
        if (ChessUtils.isValidPosition(doubleRow, col) && !this.board[doubleRow][col]) {
          moves.push({ row: doubleRow, col });
        }
      }
    }
    
    // Diagonal captures
    [-1, 1].forEach(dc => {
      const newCol = col + dc;
      if (ChessUtils.isValidPosition(newRow, newCol)) {
        const targetPiece = this.board[newRow][newCol];
        if (targetPiece && ChessUtils.isOpponentPiece(targetPiece, this.currentPlayer)) {
          moves.push({ row: newRow, col: newCol });
        }
      }
    });
    
    return moves;
  }

  getRookMoves(row, col) {
    const moves = [];
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    directions.forEach(([dr, dc]) => {
      for (let i = 1; i < BOARD_SIZE; i++) {
        const newRow = row + dr * i;
        const newCol = col + dc * i;
        
        if (!ChessUtils.isValidPosition(newRow, newCol)) break;
        
        const piece = this.board[newRow][newCol];
        if (!piece) {
          moves.push({ row: newRow, col: newCol });
        } else {
          if (ChessUtils.isOpponentPiece(piece, this.currentPlayer)) {
            moves.push({ row: newRow, col: newCol });
          }
          break;
        }
      }
    });
    
    return moves;
  }

  getKnightMoves(row, col) {
    const moves = [];
    const knightMoves = [
      [-2, -1], [-2, 1], [-1, -2], [-1, 2],
      [1, -2], [1, 2], [2, -1], [2, 1]
    ];
    
    knightMoves.forEach(([dr, dc]) => {
      const newRow = row + dr;
      const newCol = col + dc;
      
      if (ChessUtils.isValidPosition(newRow, newCol)) {
        const piece = this.board[newRow][newCol];
        if (!piece || ChessUtils.isOpponentPiece(piece, this.currentPlayer)) {
          moves.push({ row: newRow, col: newCol });
        }
      }
    });
    
    return moves;
  }

  getBishopMoves(row, col) {
    const moves = [];
    const directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
    
    directions.forEach(([dr, dc]) => {
      for (let i = 1; i < BOARD_SIZE; i++) {
        const newRow = row + dr * i;
        const newCol = col + dc * i;
        
        if (!ChessUtils.isValidPosition(newRow, newCol)) break;
        
        const piece = this.board[newRow][newCol];
        if (!piece) {
          moves.push({ row: newRow, col: newCol });
        } else {
          if (ChessUtils.isOpponentPiece(piece, this.currentPlayer)) {
            moves.push({ row: newRow, col: newCol });
          }
          break;
        }
      }
    });
    
    return moves;
  }

  getQueenMoves(row, col) {
    return [...this.getRookMoves(row, col), ...this.getBishopMoves(row, col)];
  }

  getKingMoves(row, col) {
    const moves = [];
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1], [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];
    
    directions.forEach(([dr, dc]) => {
      const newRow = row + dr;
      const newCol = col + dc;
      
      if (ChessUtils.isValidPosition(newRow, newCol)) {
        const piece = this.board[newRow][newCol];
        if (!piece || ChessUtils.isOpponentPiece(piece, this.currentPlayer)) {
          moves.push({ row: newRow, col: newCol });
        }
      }
    });
    
    return moves;
  }

  updateGameState() {
    // Check for check, checkmate, stalemate
    this.isInCheck = this.isKingInCheck(this.currentPlayer);
    this.isInCheckmate = this.isInCheck && this.hasNoValidMoves();
    this.isInStalemate = !this.isInCheck && this.hasNoValidMoves();
    
    if (this.isInCheckmate) {
      this.gameState = GAME_STATES.CHECKMATE;
    } else if (this.isInStalemate) {
      this.gameState = GAME_STATES.STALEMATE;
    } else if (this.isInCheck) {
      this.gameState = GAME_STATES.CHECK;
    } else {
      this.gameState = GAME_STATES.PLAYING;
    }
  }

  isKingInCheck(player) {
    // Find king position
    const kingPos = this.findKing(player);
    if (!kingPos) return false;
    
    // Check if any opponent piece can attack the king
    const opponent = player === PIECE_COLORS.WHITE ? PIECE_COLORS.BLACK : PIECE_COLORS.WHITE;
    
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        const piece = this.board[row][col];
        if (piece && ChessUtils.getPieceColor(piece) === opponent) {
          const moves = this.getPossibleMoves(row, col);
          if (moves.some(move => move.row === kingPos.row && move.col === kingPos.col)) {
            return true;
          }
        }
      }
    }
    
    return false;
  }

  findKing(player) {
    const kingSymbol = player === PIECE_COLORS.WHITE ? 'K' : 'k';
    
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (this.board[row][col] === kingSymbol) {
          return { row, col };
        }
      }
    }
    
    return null;
  }

  hasNoValidMoves() {
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        const piece = this.board[row][col];
        if (piece && ChessUtils.getPieceColor(piece) === this.currentPlayer) {
          const moves = this.getPossibleMoves(row, col);
          if (moves.length > 0) {
            return false;
          }
        }
      }
    }
    return true;
  }

  resetGame() {
    this.board = this.initializeBoard();
    this.currentPlayer = PIECE_COLORS.WHITE;
    this.gameState = GAME_STATES.PLAYING;
    this.moveHistory = [];
    this.selectedSquare = null;
    this.possibleMoves = [];
    this.isInCheck = false;
    this.isInCheckmate = false;
    this.isInStalemate = false;
  }
}
