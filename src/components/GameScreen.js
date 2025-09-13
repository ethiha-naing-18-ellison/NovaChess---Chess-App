// NovaChess - Game Screen Component
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { HeaderNav } from './HeaderNav';
import { FooterNav } from './FooterNav';
import { ChessBoard } from './ChessBoard';
import { GameIcon, TargetIcon, ZapIcon, CheckIcon } from './icons/SvgIcons';
import { getBoardColors, getPieceColors, getUITheme, getBoardSize, getPieceType } from '../utils/customizationUtils';

export const GameScreen = ({ 
  activeTab, 
  onTabPress, 
  onProfilePress, 
  onNotificationPress,
  // Game props
  board,
  selectedSquare,
  possibleMoves,
  onSquarePress,
  isInCheck,
  kingPosition,
  currentPlayer,
  gameState,
  whiteTime,
  blackTime,
  moveHistory,
  onNewGame,
  onUndo,
  onSettings,
  customization,
  gameConfig
}) => {
  const [showMoveHistory, setShowMoveHistory] = useState(false);

  const handleToggleMoveHistory = () => {
    setShowMoveHistory(!showMoveHistory);
  };

  // Get customization settings
  const boardTheme = getBoardColors(customization.boardTheme);
  const pieceStyle = getPieceColors(customization.pieceStyle);
  const pieceType = getPieceType(customization.pieceType);
  const uiTheme = getUITheme(customization.uiTheme);
  const boardSize = getBoardSize(customization.boardSize);

  // Debug log to check if customizations are being received
  console.log('GameScreen - Received customization:', customization);
  console.log('GameScreen - Board theme:', boardTheme);
  console.log('GameScreen - Piece style:', pieceStyle);
  console.log('GameScreen - Piece type:', pieceType);
  console.log('GameScreen - UI theme:', uiTheme);
  console.log('GameScreen - Board size:', boardSize);

  // Create dynamic styles based on customization
  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: uiTheme.backgroundColor,
    },
    statusBar: {
      backgroundColor: uiTheme.cardColor,
      borderRadius: 12,
      padding: 15,
      marginVertical: 15,
      borderWidth: 1,
      borderColor: '#2a2a3a',
    },
    playerText: {
      fontSize: 16,
      fontWeight: '600',
      color: uiTheme.textColor,
    },
    gameStatus: {
      backgroundColor: uiTheme.accentColor,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
    },
    gameStatusText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: uiTheme.textColor,
    },
    timer: {
      backgroundColor: '#2a2a3a',
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderRadius: 8,
      alignItems: 'center',
      minWidth: 80,
    },
    timerLabel: {
      fontSize: 12,
      color: '#94a3b8',
      marginBottom: 2,
    },
    timerText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: uiTheme.textColor,
    },
    boardContainer: {
      backgroundColor: uiTheme.cardColor,
      padding: 15,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#2a2a3a',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    controlButton: {
      flex: 1,
      backgroundColor: uiTheme.cardColor,
      borderRadius: 12,
      padding: 15,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#2a2a3a',
    },
    activeControlButton: {
      backgroundColor: uiTheme.accentColor,
      borderColor: uiTheme.accentColor,
    },
    controlButtonText: {
      fontSize: 12,
      color: uiTheme.textColor,
      fontWeight: '600',
      marginTop: 6,
      textAlign: 'center',
    },
    activeControlButtonText: {
      color: uiTheme.textColor,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: uiTheme.textColor,
      marginBottom: 15,
      marginLeft: 5,
    },
    moveHistoryContainer: {
      backgroundColor: uiTheme.cardColor,
      borderRadius: 12,
      padding: 15,
      borderWidth: 1,
      borderColor: '#2a2a3a',
      maxHeight: 200,
    },
    moveText: {
      fontSize: 14,
      color: uiTheme.textColor,
      flex: 1,
    },
    noMovesText: {
      fontSize: 14,
      color: '#94a3b8',
      textAlign: 'center',
      fontStyle: 'italic',
    },
  });

  return (
    <View style={dynamicStyles.container}>
      {/* Header Navigation */}
      <HeaderNav
        title="Chess Game"
        onProfilePress={onProfilePress}
        onNotificationPress={onNotificationPress}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Game Status Bar */}
        <View style={dynamicStyles.statusBar}>
          <View style={styles.playerInfo}>
            <View style={styles.playerIndicator}>
              <View style={[
                styles.playerDot,
                { backgroundColor: currentPlayer === 'white' ? uiTheme.textColor : '#2a2a3a' }
              ]} />
              <Text style={dynamicStyles.playerText}>
                {currentPlayer === 'white' ? 'White' : 'Black'} to move
              </Text>
            </View>
            <View style={dynamicStyles.gameStatus}>
              <Text style={dynamicStyles.gameStatusText}>
                {gameState === 'playing' ? 'Playing' : 
                 gameState === 'check' ? 'Check!' :
                 gameState === 'checkmate' ? 'Checkmate!' :
                 gameState === 'stalemate' ? 'Stalemate' : 'Game Over'}
              </Text>
            </View>
          </View>
          
          {/* Timer Display - Only show if timer is enabled */}
          {gameConfig?.timerEnabled && gameConfig?.timeControl !== 'none' && (
            <View style={styles.timerContainer}>
              <View style={dynamicStyles.timer}>
                <Text style={dynamicStyles.timerLabel}>White</Text>
                <Text style={dynamicStyles.timerText}>{whiteTime}</Text>
              </View>
              <View style={dynamicStyles.timer}>
                <Text style={dynamicStyles.timerLabel}>Black</Text>
                <Text style={dynamicStyles.timerText}>{blackTime}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Chess Board */}
        <View style={styles.boardSection}>
          <View style={dynamicStyles.boardContainer}>
            <ChessBoard
              board={board}
              selectedSquare={selectedSquare}
              possibleMoves={possibleMoves}
              onSquarePress={onSquarePress}
              isInCheck={isInCheck}
              kingPosition={kingPosition}
              boardTheme={boardTheme}
              pieceStyle={pieceStyle}
              pieceType={pieceType}
              boardSize={boardSize}
              playerColor={gameConfig?.playerColor}
            />
          </View>
        </View>

        {/* Game Controls */}
        <View style={styles.controlsSection}>
          <View style={styles.controlsGrid}>
            <TouchableOpacity style={dynamicStyles.controlButton} onPress={onNewGame}>
              <GameIcon size={20} color={uiTheme.textColor} />
              <Text style={dynamicStyles.controlButtonText}>New Game</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={dynamicStyles.controlButton} onPress={onUndo}>
              <ZapIcon size={20} color={uiTheme.textColor} />
              <Text style={dynamicStyles.controlButtonText}>Undo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={dynamicStyles.controlButton} onPress={onSettings}>
              <TargetIcon size={20} color={uiTheme.textColor} />
              <Text style={dynamicStyles.controlButtonText}>Settings</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[dynamicStyles.controlButton, showMoveHistory && dynamicStyles.activeControlButton]} 
              onPress={handleToggleMoveHistory}
            >
              <CheckIcon size={20} color={showMoveHistory ? uiTheme.accentColor : uiTheme.textColor} />
              <Text style={[
                dynamicStyles.controlButtonText,
                showMoveHistory && dynamicStyles.activeControlButtonText
              ]}>Moves</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Move History */}
        {showMoveHistory && (
          <View style={styles.moveHistorySection}>
            <Text style={dynamicStyles.sectionTitle}>Move History</Text>
            <View style={dynamicStyles.moveHistoryContainer}>
              {moveHistory.length > 0 ? (
                moveHistory.map((move, index) => (
                  <View key={index} style={styles.moveItem}>
                    <Text style={styles.moveNumber}>{index + 1}.</Text>
                    <Text style={dynamicStyles.moveText}>{move}</Text>
                  </View>
                ))
              ) : (
                <Text style={dynamicStyles.noMovesText}>No moves yet</Text>
              )}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Footer Navigation */}
      <FooterNav
        activeTab={activeTab}
        onTabPress={onTabPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  statusBar: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 15,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#2a2a3a',
  },
  playerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  playerIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#2a2a3a',
  },
  playerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e2e8f0',
  },
  gameStatus: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  gameStatusText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e2e8f0',
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timer: {
    backgroundColor: '#2a2a3a',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 80,
  },
  timerLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 2,
  },
  timerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e2e8f0',
  },
  boardSection: {
    alignItems: 'center',
    marginVertical: 15,
  },
  boardContainer: {
    backgroundColor: '#1a1a2e',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2a2a3a',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  controlsSection: {
    marginVertical: 15,
  },
  controlsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  controlButton: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a3a',
  },
  activeControlButton: {
    backgroundColor: '#6b46c1',
    borderColor: '#6b46c1',
  },
  controlButtonText: {
    fontSize: 12,
    color: '#e2e8f0',
    fontWeight: '600',
    marginTop: 6,
    textAlign: 'center',
  },
  activeControlButtonText: {
    color: '#e2e8f0',
  },
  moveHistorySection: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e2e8f0',
    marginBottom: 15,
    marginLeft: 5,
  },
  moveHistoryContainer: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#2a2a3a',
    maxHeight: 200,
  },
  moveItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  moveNumber: {
    fontSize: 14,
    color: '#94a3b8',
    width: 30,
  },
  moveText: {
    fontSize: 14,
    color: '#e2e8f0',
    flex: 1,
  },
  noMovesText: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
