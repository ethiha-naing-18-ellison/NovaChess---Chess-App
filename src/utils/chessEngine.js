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
    this.enPassantTarget = null; // For en passant moves
    this.castlingRights = {
      white: { kingside: true, queenside: true },
      black: { kingside: true, queenside: true }
    };
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
    
    // Check if this move would put own king in check
    if (this.wouldMovePutKingInCheck(from, to)) {
      return {
        success: false,
        error: 'Cannot move - would put own king in check'
      };
    }
    
    // Handle special moves
    const moveResult = this.handleSpecialMoves(from, to, piece);
    
    // Handle pawn promotion
    if (ChessUtils.getPieceType(piece) === PIECE_TYPES.PAWN) {
      const isWhite = ChessUtils.getPieceColor(piece) === PIECE_COLORS.WHITE;
      const promotionRow = isWhite ? 0 : 7;
      
      if (to.row === promotionRow) {
        // For now, automatically promote to queen
        // In a full implementation, you'd show a promotion dialog
        const promotedPiece = isWhite ? 'Q' : 'q';
        this.board[to.row][to.col] = promotedPiece;
        this.board[from.row][from.col] = null;
      } else {
        // Make the move
        this.board[to.row][to.col] = piece;
        this.board[from.row][from.col] = null;
      }
    } else {
      // Make the move
      this.board[to.row][to.col] = piece;
      this.board[from.row][from.col] = null;
    }
    
    // Handle en passant capture
    if (moveResult.enPassantCapture) {
      this.board[moveResult.enPassantCapture.row][moveResult.enPassantCapture.col] = null;
    }
    
    // Update castling rights
    this.updateCastlingRights(from, to, piece);
    
    // Set en passant target for next move
    this.enPassantTarget = moveResult.enPassantTarget;
    
    // Record the move
    this.moveHistory.push({
      from,
      to,
      piece,
      capturedPiece: capturedPiece || moveResult.enPassantCapture ? this.board[to.row][to.col] : null,
      notation: ChessUtils.generateMoveNotation(from, to, piece, capturedPiece),
      specialMove: moveResult.specialMove
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
    let moves = [];
    
    switch (pieceType) {
      case PIECE_TYPES.PAWN:
        moves = this.getPawnMoves(row, col);
        break;
      case PIECE_TYPES.ROOK:
        moves = this.getRookMoves(row, col);
        break;
      case PIECE_TYPES.KNIGHT:
        moves = this.getKnightMoves(row, col);
        break;
      case PIECE_TYPES.BISHOP:
        moves = this.getBishopMoves(row, col);
        break;
      case PIECE_TYPES.QUEEN:
        moves = this.getQueenMoves(row, col);
        break;
      case PIECE_TYPES.KING:
        moves = this.getKingMoves(row, col);
        break;
      default:
        return [];
    }
    
    // Filter out moves that would put own king in check
    return moves.filter(move => !this.wouldMovePutKingInCheck({ row, col }, move));
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
    
    // En passant capture
    if (this.enPassantTarget && 
        this.enPassantTarget.row === newRow && 
        Math.abs(this.enPassantTarget.col - col) === 1) {
      moves.push({ 
        row: newRow, 
        col: this.enPassantTarget.col,
        enPassant: true 
      });
    }
    
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
    const piece = this.board[row][col];
    const isWhite = ChessUtils.getPieceColor(piece) === PIECE_COLORS.WHITE;
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1], [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];
    
    // Regular king moves
    directions.forEach(([dr, dc]) => {
      const newRow = row + dr;
      const newCol = col + dc;
      
      if (ChessUtils.isValidPosition(newRow, newCol)) {
        const targetPiece = this.board[newRow][newCol];
        if (!targetPiece || ChessUtils.isOpponentPiece(targetPiece, this.currentPlayer)) {
          moves.push({ row: newRow, col: newCol });
        }
      }
    });
    
    // Castling moves - check without calling isKingInCheck to avoid circular dependency
    const rights = this.castlingRights[isWhite ? 'white' : 'black'];
    
    // Kingside castling
    if (rights.kingside && this.canCastleKingside(row, col, isWhite)) {
      moves.push({ row, col: col + 2, castling: 'kingside' });
    }
    
    // Queenside castling
    if (rights.queenside && this.canCastleQueenside(row, col, isWhite)) {
      moves.push({ row, col: col - 2, castling: 'queenside' });
    }
    
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
    
    // Temporarily set current player to opponent to get correct moves
    const originalPlayer = this.currentPlayer;
    this.currentPlayer = opponent;
    
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        const piece = this.board[row][col];
        if (piece && ChessUtils.getPieceColor(piece) === opponent) {
          const moves = this.getRawPossibleMoves(row, col);
          if (moves.some(move => move.row === kingPos.row && move.col === kingPos.col)) {
            this.currentPlayer = originalPlayer;
            return true;
          }
        }
      }
    }
    
    this.currentPlayer = originalPlayer;
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
    this.enPassantTarget = null;
    this.castlingRights = {
      white: { kingside: true, queenside: true },
      black: { kingside: true, queenside: true }
    };
  }

  // Check if a move would put the current player's king in check
  wouldMovePutKingInCheck(from, to) {
    const piece = this.board[from.row][from.col];
    const capturedPiece = this.board[to.row][to.col];
    
    // Make a temporary move
    this.board[to.row][to.col] = piece;
    this.board[from.row][from.col] = null;
    
    // Check if king is in check after the move
    const kingInCheck = this.isKingInCheck(this.currentPlayer);
    
    // Restore the board
    this.board[from.row][from.col] = piece;
    this.board[to.row][to.col] = capturedPiece;
    
    return kingInCheck;
  }

  // Handle special moves (castling, en passant, pawn promotion)
  handleSpecialMoves(from, to, piece) {
    const result = {
      enPassantTarget: null,
      enPassantCapture: null,
      specialMove: null
    };

    const pieceType = ChessUtils.getPieceType(piece);
    const isWhite = ChessUtils.getPieceColor(piece) === PIECE_COLORS.WHITE;

    // Handle pawn double move (set en passant target)
    if (pieceType === PIECE_TYPES.PAWN) {
      const startRow = isWhite ? 6 : 1;
      if (from.row === startRow && Math.abs(to.row - from.row) === 2) {
        result.enPassantTarget = { row: (from.row + to.row) / 2, col: from.col };
      }
    }

    // Handle en passant capture
    if (to.enPassant) {
      const capturedRow = isWhite ? to.row + 1 : to.row - 1;
      result.enPassantCapture = { row: capturedRow, col: to.col };
    }

    // Handle castling
    if (to.castling) {
      result.specialMove = 'castling';
      this.performCastling(from, to, isWhite);
    }

    return result;
  }

  // Perform castling move
  performCastling(from, to, isWhite) {
    const row = from.row;
    
    if (to.castling === 'kingside') {
      // Move rook
      this.board[row][5] = isWhite ? 'R' : 'r';
      this.board[row][7] = null;
    } else if (to.castling === 'queenside') {
      // Move rook
      this.board[row][3] = isWhite ? 'R' : 'r';
      this.board[row][0] = null;
    }
  }

  // Check if kingside castling is possible
  canCastleKingside(row, col, isWhite) {
    // Check if squares between king and rook are empty
    if (this.board[row][col + 1] || this.board[row][col + 2]) {
      return false;
    }
    
    // Check if king would pass through or end up in check
    if (this.isSquareAttackedByOpponent(row, col + 1, isWhite) || 
        this.isSquareAttackedByOpponent(row, col + 2, isWhite)) {
      return false;
    }
    
    return true;
  }

  // Check if queenside castling is possible
  canCastleQueenside(row, col, isWhite) {
    // Check if squares between king and rook are empty
    if (this.board[row][col - 1] || this.board[row][col - 2] || this.board[row][col - 3]) {
      return false;
    }
    
    // Check if king would pass through or end up in check
    if (this.isSquareAttackedByOpponent(row, col - 1, isWhite) || 
        this.isSquareAttackedByOpponent(row, col - 2, isWhite)) {
      return false;
    }
    
    return true;
  }

  // Check if a square is attacked by the opponent (for castling)
  isSquareAttackedByOpponent(row, col, isWhite) {
    const attackerColor = isWhite ? PIECE_COLORS.BLACK : PIECE_COLORS.WHITE;
    
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        const piece = this.board[r][c];
        if (piece && ChessUtils.getPieceColor(piece) === attackerColor) {
          // Use direct piece movement logic to avoid circular dependency
          if (this.canPieceAttackSquare(r, c, row, col, piece)) {
            return true;
          }
        }
      }
    }
    
    return false;
  }

  // Check if a square is attacked by the opponent
  isSquareAttacked(row, col, byWhite) {
    const attackerColor = byWhite ? PIECE_COLORS.WHITE : PIECE_COLORS.BLACK;
    
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        const piece = this.board[r][c];
        if (piece && ChessUtils.getPieceColor(piece) === attackerColor) {
          // Use direct piece movement logic to avoid circular dependency
          if (this.canPieceAttackSquare(r, c, row, col, piece)) {
            return true;
          }
        }
      }
    }
    
    return false;
  }

  // Check if a piece can attack a specific square (without circular dependency)
  canPieceAttackSquare(fromRow, fromCol, toRow, toCol, piece) {
    const pieceType = ChessUtils.getPieceType(piece);
    const isWhite = ChessUtils.getPieceColor(piece) === PIECE_COLORS.WHITE;
    
    switch (pieceType) {
      case PIECE_TYPES.PAWN:
        return this.canPawnAttack(fromRow, fromCol, toRow, toCol, isWhite);
      case PIECE_TYPES.ROOK:
        return this.canRookAttack(fromRow, fromCol, toRow, toCol);
      case PIECE_TYPES.KNIGHT:
        return this.canKnightAttack(fromRow, fromCol, toRow, toCol);
      case PIECE_TYPES.BISHOP:
        return this.canBishopAttack(fromRow, fromCol, toRow, toCol);
      case PIECE_TYPES.QUEEN:
        return this.canRookAttack(fromRow, fromCol, toRow, toCol) || 
               this.canBishopAttack(fromRow, fromCol, toRow, toCol);
      case PIECE_TYPES.KING:
        return this.canKingAttack(fromRow, fromCol, toRow, toCol);
      default:
        return false;
    }
  }

  // Individual piece attack methods
  canPawnAttack(fromRow, fromCol, toRow, toCol, isWhite) {
    const direction = isWhite ? -1 : 1;
    const newRow = fromRow + direction;
    return newRow === toRow && Math.abs(toCol - fromCol) === 1;
  }

  canRookAttack(fromRow, fromCol, toRow, toCol) {
    if (fromRow !== toRow && fromCol !== toCol) return false;
    
    const rowStep = fromRow === toRow ? 0 : (toRow > fromRow ? 1 : -1);
    const colStep = fromCol === toCol ? 0 : (toCol > fromCol ? 1 : -1);
    
    let currentRow = fromRow + rowStep;
    let currentCol = fromCol + colStep;
    
    while (currentRow !== toRow || currentCol !== toCol) {
      if (this.board[currentRow][currentCol]) return false;
      currentRow += rowStep;
      currentCol += colStep;
    }
    
    return true;
  }

  canKnightAttack(fromRow, fromCol, toRow, toCol) {
    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);
    return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
  }

  canBishopAttack(fromRow, fromCol, toRow, toCol) {
    if (Math.abs(toRow - fromRow) !== Math.abs(toCol - fromCol)) return false;
    
    const rowStep = toRow > fromRow ? 1 : -1;
    const colStep = toCol > fromCol ? 1 : -1;
    
    let currentRow = fromRow + rowStep;
    let currentCol = fromCol + colStep;
    
    while (currentRow !== toRow || currentCol !== toCol) {
      if (this.board[currentRow][currentCol]) return false;
      currentRow += rowStep;
      currentCol += colStep;
    }
    
    return true;
  }

  canKingAttack(fromRow, fromCol, toRow, toCol) {
    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);
    return rowDiff <= 1 && colDiff <= 1 && (rowDiff > 0 || colDiff > 0);
  }

  // Get raw possible moves without filtering for check (used for attack detection)
  getRawPossibleMoves(row, col) {
    const piece = this.board[row][col];
    if (!piece) return [];
    
    const pieceType = ChessUtils.getPieceType(piece);
    
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

  // Update castling rights after a move
  updateCastlingRights(from, to, piece) {
    const pieceType = ChessUtils.getPieceType(piece);
    const isWhite = ChessUtils.getPieceColor(piece) === PIECE_COLORS.WHITE;
    const color = isWhite ? 'white' : 'black';
    
    // If king moves, lose all castling rights
    if (pieceType === PIECE_TYPES.KING) {
      this.castlingRights[color].kingside = false;
      this.castlingRights[color].queenside = false;
    }
    
    // If rook moves, lose corresponding castling right
    if (pieceType === PIECE_TYPES.ROOK) {
      if (from.col === 0) { // Queenside rook
        this.castlingRights[color].queenside = false;
      } else if (from.col === 7) { // Kingside rook
        this.castlingRights[color].kingside = false;
      }
    }
    
    // If opponent's rook is captured, lose corresponding castling right
    const capturedPiece = this.board[to.row][to.col];
    if (capturedPiece && ChessUtils.getPieceType(capturedPiece) === PIECE_TYPES.ROOK) {
      const capturedIsWhite = ChessUtils.getPieceColor(capturedPiece) === PIECE_COLORS.WHITE;
      const capturedColor = capturedIsWhite ? 'white' : 'black';
      
      if (to.col === 0) { // Queenside rook
        this.castlingRights[capturedColor].queenside = false;
      } else if (to.col === 7) { // Kingside rook
        this.castlingRights[capturedColor].kingside = false;
      }
    }
  }
}
