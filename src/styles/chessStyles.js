// NovaChess - Chess Game Styles
import { StyleSheet } from 'react-native';
import { COLORS, SQUARE_SIZE } from '../constants/chessConstants.js';

export const chessStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a', // Dark black-purple background
  },
  
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50, // For status bar
    backgroundColor: '#1a1a2e', // Dark purple-black header
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a3a',
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e2e8f0', // Light text for dark background
    textAlign: 'center',
  },
  
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a3a', // Dark purple-black
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  
  playerText: {
    color: '#e2e8f0',
    fontSize: 16,
    fontWeight: '600',
  },
  
  boardContainer: {
    backgroundColor: '#1a1a2e', // Dark purple-black
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignSelf: 'center',
  },
  
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: SQUARE_SIZE * 8,
    height: SQUARE_SIZE * 8,
  },
  
  square: {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#2a2a3a', // Dark purple border
  },
  
  lightSquare: {
    backgroundColor: COLORS.LIGHT_SQUARE,
  },
  
  darkSquare: {
    backgroundColor: COLORS.DARK_SQUARE,
  },
  
  selectedSquare: {
    backgroundColor: COLORS.SELECTED,
  },
  
  possibleMove: {
    backgroundColor: COLORS.HIGHLIGHT,
    opacity: 0.7,
  },
  
  checkSquare: {
    backgroundColor: COLORS.CHECK,
  },
  
  piece: {
    fontSize: 36, // Increased to match larger squares
    textAlign: 'center',
  },
  
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#1a1a2e', // Dark purple-black
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a3a',
  },
  
  button: {
    backgroundColor: '#3b82f6', // Dark blue accent
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  
  buttonText: {
    color: '#e2e8f0',
    fontSize: 16,
    fontWeight: '600',
  },
  
  gameStatus: {
    backgroundColor: '#dc2626', // Red for game status
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginVertical: 10,
  },
  
  gameStatusText: {
    color: '#e2e8f0',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  moveHistory: {
    backgroundColor: '#1a1a2e', // Dark purple-black
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    maxHeight: 120,
  },
  
  moveHistoryTitle: {
    color: '#e2e8f0',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  
  moveItem: {
    color: '#94a3b8', // Muted text
    fontSize: 14,
    marginBottom: 2,
  },
  
  timer: {
    backgroundColor: '#2a2a3a', // Dark purple-black
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  
  timerText: {
    color: '#e2e8f0',
    fontSize: 16,
    fontWeight: '600',
  },
  
  settingsButton: {
    backgroundColor: '#4a5568', // Muted dark color
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  
  settingsButtonText: {
    color: '#e2e8f0',
    fontSize: 14,
    fontWeight: '600',
  },
});

export const getSquareStyle = (row, col, isSelected, isPossibleMove, isInCheck) => {
  const baseStyle = {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#2a2a3a', // Dark purple border
  };
  
  // Base square color
  const isLight = (row + col) % 2 === 0;
  baseStyle.backgroundColor = isLight ? COLORS.LIGHT_SQUARE : COLORS.DARK_SQUARE;
  
  // Override colors for special states
  if (isInCheck) {
    baseStyle.backgroundColor = COLORS.CHECK;
  } else if (isSelected) {
    baseStyle.backgroundColor = COLORS.SELECTED;
  } else if (isPossibleMove) {
    baseStyle.backgroundColor = COLORS.HIGHLIGHT;
    baseStyle.opacity = 0.7;
  }
  
  return baseStyle;
};
