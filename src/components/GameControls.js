// NovaChess - Game Controls Component
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { chessStyles } from '../styles/chessStyles.js';

export const GameControls = ({ 
  onNewGame, 
  onUndo, 
  onSettings, 
  gameState, 
  currentPlayer,
  whiteTime,
  blackTime,
  moveHistory 
}) => {
  const getGameStatusText = () => {
    switch (gameState) {
      case 'checkmate':
        return `Checkmate! ${currentPlayer === 'white' ? 'Black' : 'White'} wins!`;
      case 'stalemate':
        return 'Stalemate! Game is a draw.';
      case 'check':
        return `${currentPlayer === 'white' ? 'White' : 'Black'} is in check!`;
      default:
        return `${currentPlayer === 'white' ? 'White' : 'Black'} to move`;
    }
  };

  const getGameStatusStyle = () => {
    switch (gameState) {
      case 'checkmate':
      case 'stalemate':
        return { backgroundColor: '#e74c3c' };
      case 'check':
        return { backgroundColor: '#f39c12' };
      default:
        return { backgroundColor: '#27ae60' };
    }
  };

  return (
    <View style={chessStyles.controls}>
      <TouchableOpacity style={chessStyles.button} onPress={onNewGame}>
        <Text style={chessStyles.buttonText}>New Game</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={chessStyles.button} onPress={onUndo}>
        <Text style={chessStyles.buttonText}>Undo</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={chessStyles.settingsButton} onPress={onSettings}>
        <Text style={chessStyles.settingsButtonText}>Settings</Text>
      </TouchableOpacity>
      
      <View style={[chessStyles.gameStatus, getGameStatusStyle()]}>
        <Text style={chessStyles.gameStatusText}>
          {getGameStatusText()}
        </Text>
      </View>
      
      <View style={chessStyles.timer}>
        <Text style={chessStyles.timerText}>
          W: {whiteTime}
        </Text>
      </View>
      
      <View style={chessStyles.timer}>
        <Text style={chessStyles.timerText}>
          B: {blackTime}
        </Text>
      </View>
    </View>
  );
};
