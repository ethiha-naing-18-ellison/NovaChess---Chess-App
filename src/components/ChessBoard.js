// NovaChess - Chess Board Component
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { PIECE_SYMBOLS } from '../constants/chessConstants.js';
import { getSquareStyle } from '../styles/chessStyles.js';

export const ChessBoard = ({ 
  board, 
  selectedSquare, 
  possibleMoves, 
  onSquarePress, 
  isInCheck,
  kingPosition,
  boardTheme,
  pieceStyle,
  pieceType,
  boardSize,
  playerColor = 'white'
}) => {
  const renderSquare = (row, col) => {
    // Flip coordinates if player is black
    const actualRow = playerColor === 'black' ? 7 - row : row;
    const actualCol = playerColor === 'black' ? 7 - col : col;
    
    const piece = board[actualRow][actualCol];
    const isSelected = selectedSquare && selectedSquare.row === actualRow && selectedSquare.col === actualCol;
    const isPossibleMove = possibleMoves.some(move => move.row === actualRow && move.col === actualCol);
    const isKingInCheck = isInCheck && kingPosition && kingPosition.row === actualRow && kingPosition.col === actualCol;
    
    // Use customization settings for colors and size
    const isLight = (row + col) % 2 === 0;
    const squareSize = boardSize?.size || 50;
    
    const squareStyle = {
      width: squareSize,
      height: squareSize,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 0.5,
      borderColor: '#2a2a3a',
      backgroundColor: isLight ? boardTheme?.lightSquare : boardTheme?.darkSquare,
    };
    
    // Override colors for special states
    if (isKingInCheck) {
      squareStyle.backgroundColor = '#dc2626';
    } else if (isSelected) {
      squareStyle.backgroundColor = '#3b82f6';
    } else if (isPossibleMove) {
      squareStyle.backgroundColor = '#6b46c1';
      squareStyle.opacity = 0.7;
    }
    
    return (
      <TouchableOpacity
        key={`${row}-${col}`}
        style={squareStyle}
        onPress={() => onSquarePress(actualRow, actualCol)}
        activeOpacity={0.7}
      >
        {piece && (
          <Text style={{ 
            fontSize: squareSize * 0.7, 
            textAlign: 'center',
            color: piece === piece.toUpperCase() ? pieceStyle?.whiteColor : pieceStyle?.blackColor,
            textShadowColor: piece === piece.toUpperCase() ? '#000000' : '#ffffff',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 1,
          }}>
            {pieceType?.symbols[piece] || PIECE_SYMBOLS[piece]}
          </Text>
        )}
        {isPossibleMove && !piece && (
          <View
            style={{
              width: squareSize * 0.3,
              height: squareSize * 0.3,
              borderRadius: squareSize * 0.15,
              backgroundColor: '#6b46c1',
              opacity: 0.8,
            }}
          />
        )}
      </TouchableOpacity>
    );
  };

  const renderBoard = () => {
    const squares = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        squares.push(renderSquare(row, col));
      }
    }
    return squares;
  };

  const squareSize = boardSize?.size || 50;
  const boardSizeTotal = squareSize * 8;

  return (
    <View style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: boardSizeTotal,
      height: boardSizeTotal,
    }}>
      {renderBoard()}
    </View>
  );
};
