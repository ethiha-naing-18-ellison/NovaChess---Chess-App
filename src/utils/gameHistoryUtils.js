import AsyncStorage from '@react-native-async-storage/async-storage';

const GAME_HISTORY_KEY = 'chess_game_history';
const MAX_HISTORY_ITEMS = 50; // Keep last 50 games

export const GameResult = {
  WIN: 'win',
  LOSS: 'loss',
  DRAW: 'draw',
  ABANDONED: 'abandoned', // When user leaves game
};

export const GameMode = {
  VS_AI: 'vs_ai',
  VS_HUMAN: 'vs_human',
  PUZZLE: 'puzzle',
};

// Save a game to history
export const saveGameToHistory = async (gameData) => {
  try {
    const existingHistory = await getGameHistory();
    const newGame = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...gameData,
    };
    
    // Add new game to the beginning of the array
    const updatedHistory = [newGame, ...existingHistory].slice(0, MAX_HISTORY_ITEMS);
    
    await AsyncStorage.setItem(GAME_HISTORY_KEY, JSON.stringify(updatedHistory));
    console.log('Game saved to history:', newGame);
    return newGame;
  } catch (error) {
    console.error('Error saving game to history:', error);
    return null;
  }
};

// Get game history
export const getGameHistory = async () => {
  try {
    const historyJson = await AsyncStorage.getItem(GAME_HISTORY_KEY);
    return historyJson ? JSON.parse(historyJson) : [];
  } catch (error) {
    console.error('Error getting game history:', error);
    return [];
  }
};

// Clear game history
export const clearGameHistory = async () => {
  try {
    await AsyncStorage.removeItem(GAME_HISTORY_KEY);
    console.log('Game history cleared');
  } catch (error) {
    console.error('Error clearing game history:', error);
  }
};

// Get game statistics
export const getGameStatistics = async () => {
  try {
    const history = await getGameHistory();
    const stats = {
      totalGames: history.length,
      wins: history.filter(game => game.result === GameResult.WIN).length,
      losses: history.filter(game => game.result === GameResult.LOSS).length,
      draws: history.filter(game => game.result === GameResult.DRAW).length,
      abandoned: history.filter(game => game.result === GameResult.ABANDONED).length,
    };
    
    stats.winRate = stats.totalGames > 0 ? (stats.wins / stats.totalGames * 100).toFixed(1) : 0;
    
    return stats;
  } catch (error) {
    console.error('Error getting game statistics:', error);
    return {
      totalGames: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      abandoned: 0,
      winRate: 0,
    };
  }
};

// Format game duration
export const formatGameDuration = (startTime, endTime) => {
  const duration = new Date(endTime) - new Date(startTime);
  const minutes = Math.floor(duration / 60000);
  const seconds = Math.floor((duration % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// Format game result for display
export const formatGameResult = (result) => {
  switch (result) {
    case GameResult.WIN:
      return 'Win';
    case GameResult.LOSS:
      return 'Loss';
    case GameResult.DRAW:
      return 'Draw';
    case GameResult.ABANDONED:
      return 'Abandoned';
    default:
      return 'Unknown';
  }
};

// Format game mode for display
export const formatGameMode = (mode) => {
  switch (mode) {
    case GameMode.VS_AI:
      return 'vs AI';
    case GameMode.VS_HUMAN:
      return 'vs Human';
    case GameMode.PUZZLE:
      return 'Puzzle';
    default:
      return 'Unknown';
  }
};
