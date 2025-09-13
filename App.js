// NovaChess - Chess Game Application
import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert } from 'react-native';
import { ChessEngine } from './src/utils/chessEngine.js';
import { ChessUtils } from './src/utils/chessUtils.js';
import { PIECE_COLORS, GAME_STATES } from './src/constants/chessConstants.js';
import { chessStyles } from './src/styles/chessStyles.js';
import { ChessBoard } from './src/components/ChessBoard.js';
import { LoadingScreen } from './src/components/LoadingScreen.js';
import { IntroductionScreen } from './src/components/IntroductionScreen.js';
import { AuthScreen } from './src/components/AuthScreen.js';
import { HomePage } from './src/components/HomePage.js';
import { ProfilePage } from './src/components/ProfilePage.js';
import { PuzzlesScreen } from './src/components/PuzzlesScreen.js';
import { AnalysisScreen } from './src/components/AnalysisScreen.js';
import { LessonsScreen } from './src/components/LessonsScreen.js';
import { RecentGamesScreen } from './src/components/RecentGamesScreen.js';
import { CustomizeScreen } from './src/components/CustomizeScreen.js';
import { GameScreen } from './src/components/GameScreen.js';
import GameSetupScreen from './src/components/GameSetupScreen.js';
import ConfirmationModal from './src/components/ConfirmationModal.js';
import { SCREENS, NavigationManager } from './src/utils/navigationUtils.js';
import { loadCustomization, DEFAULT_CUSTOMIZATION } from './src/utils/customizationUtils.js';
import { saveGameToHistory, GameResult, GameMode } from './src/utils/gameHistoryUtils.js';

export default function App() {
  // Navigation state
  const [currentScreen, setCurrentScreen] = useState(SCREENS.LOADING);
  const [activeTab, setActiveTab] = useState('home');
  
  // Customization state
  const [customization, setCustomization] = useState(DEFAULT_CUSTOMIZATION);
  
  // Game configuration state
  const [gameConfig, setGameConfig] = useState({
    playerColor: 'white',
    gameMode: 'ai',
    timerEnabled: true,
    timeControl: '10+0',
    difficulty: 'medium',
  });
  
  // Game state
  const [chessEngine] = useState(() => new ChessEngine());
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [gameState, setGameState] = useState(GAME_STATES.PLAYING);
  const [currentPlayer, setCurrentPlayer] = useState(PIECE_COLORS.WHITE);
  const [isInCheck, setIsInCheck] = useState(false);
  const [moveHistory, setMoveHistory] = useState([]);
  
  // Timer state
  const [whiteTime, setWhiteTime] = useState(600); // 10 minutes
  const [blackTime, setBlackTime] = useState(600); // 10 minutes
  const timerRef = useRef(null);
  
  // Confirmation modal state
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationConfig, setConfirmationConfig] = useState({});
  
  // Game tracking state
  const [gameStartTime, setGameStartTime] = useState(null);
  const [gameMoveCount, setGameMoveCount] = useState(0);
  const [gameAbandoned, setGameAbandoned] = useState(false);

  // Navigation handlers
  const handleLoadingComplete = async () => {
    // Load customization settings
    const savedCustomization = await loadCustomization();
    setCustomization(savedCustomization);
    setCurrentScreen(SCREENS.INTRODUCTION);
  };

  const handleIntroductionComplete = () => {
    setCurrentScreen(SCREENS.AUTH);
  };

  const handleAuthSuccess = () => {
    setCurrentScreen(SCREENS.HOME);
  };

  // Function to reload customizations
  const reloadCustomizations = async () => {
    const savedCustomization = await loadCustomization();
    console.log('App.js - Reloaded customizations:', savedCustomization);
    setCustomization(savedCustomization);
  };

  // Navigation handlers for tabs
  const handleTabPress = async (tabId) => {
    // Check if user is currently in a game and trying to leave
    if (currentScreen === SCREENS.GAME && tabId !== 'play') {
      setConfirmationConfig({
        title: 'Leave Game?',
        message: 'Are you sure you want to leave the current game? Your progress will be lost and recorded as abandoned.',
        confirmText: 'Leave Game',
        cancelText: 'Cancel',
        confirmButtonStyle: 'destructive',
        onConfirm: async () => {
          setShowConfirmationModal(false);
          let targetScreen = SCREENS.HOME;
          switch (tabId) {
            case 'home':
              targetScreen = SCREENS.HOME;
              break;
            case 'learn':
              targetScreen = SCREENS.LESSONS;
              break;
            case 'customize':
              targetScreen = SCREENS.CUSTOMIZE;
              break;
            case 'profile':
              targetScreen = SCREENS.PROFILE;
              break;
            default:
              targetScreen = SCREENS.HOME;
              break;
          }
          await handleGameAbandonment(targetScreen, tabId);
        },
        onCancel: () => {
          setShowConfirmationModal(false);
        }
      });
      setShowConfirmationModal(true);
      return;
    }

    setActiveTab(tabId);
    switch (tabId) {
      case 'home':
        setCurrentScreen(SCREENS.HOME);
        break;
      case 'play':
        // Reload customizations before going to play page
        await reloadCustomizations();
        setCurrentScreen(SCREENS.GAME_SETUP);
        break;
      case 'learn':
        // Default to lessons when learn tab is pressed
        setCurrentScreen(SCREENS.LESSONS);
        break;
      case 'customize':
        // Navigate to customize screen when customize tab is pressed
        setCurrentScreen(SCREENS.CUSTOMIZE);
        break;
      case 'profile':
        setCurrentScreen(SCREENS.PROFILE);
        break;
      default:
        setCurrentScreen(SCREENS.HOME);
        break;
    }
  };

  // Navigation handlers for home page actions
  const handleHomeAction = async (action) => {
    switch (action) {
      case 'new-game':
        // Reload customizations before starting new game
        await reloadCustomizations();
        setCurrentScreen(SCREENS.GAME_SETUP);
        break;
      case 'puzzles':
        setCurrentScreen(SCREENS.PUZZLES);
        break;
      case 'analysis':
        setCurrentScreen(SCREENS.ANALYSIS);
        break;
      case 'lessons':
        setCurrentScreen(SCREENS.LESSONS);
        break;
      case 'recent-games':
        setCurrentScreen(SCREENS.RECENT_GAMES);
        break;
      case 'customize':
        setCurrentScreen(SCREENS.CUSTOMIZE);
        break;
      default:
        break;
    }
  };

  const handleProfilePress = () => {
    // Check if user is currently in a game
    if (currentScreen === SCREENS.GAME) {
      setConfirmationConfig({
        title: 'Leave Game?',
        message: 'Are you sure you want to leave the current game? Your progress will be lost and recorded as abandoned.',
        confirmText: 'Leave Game',
        cancelText: 'Cancel',
        confirmButtonStyle: 'destructive',
        onConfirm: async () => {
          setShowConfirmationModal(false);
          await handleGameAbandonment(SCREENS.PROFILE);
        },
        onCancel: () => {
          setShowConfirmationModal(false);
        }
      });
      setShowConfirmationModal(true);
      return;
    }
    setCurrentScreen(SCREENS.PROFILE);
  };

  const handleNotificationPress = () => {
    // Check if user is currently in a game
    if (currentScreen === SCREENS.GAME) {
      setConfirmationConfig({
        title: 'Leave Game?',
        message: 'Are you sure you want to leave the current game? Your progress will be lost and recorded as abandoned.',
        confirmText: 'Leave Game',
        cancelText: 'Cancel',
        confirmButtonStyle: 'destructive',
        onConfirm: async () => {
          setShowConfirmationModal(false);
          await handleGameAbandonment(SCREENS.HOME);
          Alert.alert('Notifications', 'No new notifications');
        },
        onCancel: () => {
          setShowConfirmationModal(false);
        }
      });
      setShowConfirmationModal(true);
      return;
    }
    Alert.alert('Notifications', 'No new notifications');
  };

  // Game setup handlers
  const handleGameSetupStart = (config) => {
    setGameConfig(config);
    setCurrentScreen(SCREENS.GAME);
    
    // Initialize game tracking
    setGameStartTime(new Date().toISOString());
    setGameMoveCount(0);
    setGameAbandoned(false);
    
    // Initialize timer based on configuration
    if (config.timerEnabled && config.timeControl !== 'none') {
      const [minutes, increment] = config.timeControl.split('+').map(Number);
      const totalSeconds = minutes * 60;
      setWhiteTime(totalSeconds);
      setBlackTime(totalSeconds);
      startTimer();
    } else {
      // No timer - set to a large number to disable timer display
      setWhiteTime(999999);
      setBlackTime(999999);
    }
  };

  const handleGameSetupBack = () => {
    setCurrentScreen(SCREENS.HOME);
  };

  // Handle game abandonment
  const handleGameAbandonment = async (targetScreen, targetTab = null) => {
    if (gameStartTime && !gameAbandoned) {
      setGameAbandoned(true); // Prevent multiple saves
      // Record the abandoned game
      await saveGameToHistory({
        result: GameResult.ABANDONED,
        mode: gameConfig.gameMode === 'ai' ? GameMode.VS_AI : GameMode.VS_HUMAN,
        playerColor: gameConfig.playerColor,
        difficulty: gameConfig.difficulty,
        timerEnabled: gameConfig.timerEnabled,
        timeControl: gameConfig.timeControl,
        moveCount: gameMoveCount,
        duration: new Date().toISOString(),
        startTime: gameStartTime,
        endTime: new Date().toISOString(),
        reason: 'User left game',
      });
    }
    
    // Reset game state
    chessEngine.resetGame();
    setSelectedSquare(null);
    setPossibleMoves([]);
    setGameState(GAME_STATES.PLAYING);
    setCurrentPlayer(PIECE_COLORS.WHITE);
    setIsInCheck(false);
    setMoveHistory([]);
    setGameStartTime(null);
    setGameMoveCount(0);
    setGameAbandoned(false);
    
    // Clear timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Navigate to target
    if (targetTab) {
      setActiveTab(targetTab);
    }
    setCurrentScreen(targetScreen);
  };

  // Navigation handlers for profile page actions
  const handleProfileAction = (action) => {
    switch (action) {
      case 'logout':
        // Reset to auth screen
        setCurrentScreen(SCREENS.AUTH);
        setActiveTab('home');
        break;
      case 'account':
      case 'game':
      case 'notifications':
      case 'privacy':
      case 'help':
      case 'about':
        // For now, just log - these would navigate to settings screens
        console.log(`Profile action: ${action}`);
        break;
      default:
        console.log(`Profile action: ${action}`);
        break;
    }
  };

  // Update active tab based on current screen
  useEffect(() => {
    switch (currentScreen) {
      case SCREENS.HOME:
        setActiveTab('home');
        break;
      case SCREENS.GAME:
        setActiveTab('play');
        break;
      case SCREENS.LESSONS:
      case SCREENS.PUZZLES:
        setActiveTab('learn');
        break;
      case SCREENS.ANALYSIS:
      case SCREENS.RECENT_GAMES:
        setActiveTab('customize');
        break;
      case SCREENS.CUSTOMIZE:
        setActiveTab('customize');
        break;
      case SCREENS.PROFILE:
        setActiveTab('profile');
        break;
      default:
        setActiveTab('home');
        break;
    }
  }, [currentScreen]);

  // Initialize game timer only when in game screen
  useEffect(() => {
    if (currentScreen === SCREENS.GAME) {
      startTimer();
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [currentPlayer, currentScreen]);

  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Only start timer if it's enabled in game config
    if (!gameConfig.timerEnabled || gameConfig.timeControl === 'none') {
      return;
    }

    timerRef.current = setInterval(() => {
      if (currentPlayer === PIECE_COLORS.WHITE) {
        setWhiteTime(prev => {
          if (prev <= 1) {
            handleTimeUp(PIECE_COLORS.WHITE);
            return 0;
          }
          return prev - 1;
        });
      } else {
        setBlackTime(prev => {
          if (prev <= 1) {
            handleTimeUp(PIECE_COLORS.BLACK);
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);
  };

  const handleTimeUp = (player) => {
    Alert.alert(
      'Time Up!',
      `${player === PIECE_COLORS.WHITE ? 'Black' : 'White'} wins by time!`,
      [{ text: 'New Game', onPress: handleNewGame }]
    );
  };

  const handleSquarePress = (row, col) => {
    const result = chessEngine.selectSquare(row, col);
    
    if (result.selected) {
      setSelectedSquare({ row, col });
      setPossibleMoves(result.moves);
    } else if (result.success) {
      // Move was made successfully
      setSelectedSquare(null);
      setPossibleMoves([]);
      setCurrentPlayer(chessEngine.currentPlayer);
      setGameState(chessEngine.gameState);
      setIsInCheck(chessEngine.isInCheck);
      setMoveHistory([...chessEngine.moveHistory]);
      setGameMoveCount(prev => prev + 1);
      
      // Check for game end conditions
      if (chessEngine.gameState === GAME_STATES.CHECKMATE) {
        Alert.alert(
          'Checkmate!',
          `${chessEngine.currentPlayer === PIECE_COLORS.WHITE ? 'Black' : 'White'} wins!`,
          [{ text: 'New Game', onPress: handleNewGame }]
        );
      } else if (chessEngine.gameState === GAME_STATES.STALEMATE) {
        Alert.alert(
          'Stalemate!',
          'The game is a draw!',
          [{ text: 'New Game', onPress: handleNewGame }]
        );
      }
    } else {
      // Deselected
      setSelectedSquare(null);
      setPossibleMoves([]);
    }
  };

  const handleNewGame = () => {
    chessEngine.resetGame();
    setSelectedSquare(null);
    setPossibleMoves([]);
    setGameState(GAME_STATES.PLAYING);
    setCurrentPlayer(PIECE_COLORS.WHITE);
    setIsInCheck(false);
    setMoveHistory([]);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Go back to game setup instead of starting a new game immediately
    setCurrentScreen(SCREENS.GAME_SETUP);
  };

  const handleUndo = () => {
    if (chessEngine.moveHistory.length > 0) {
      // Simple undo - just reset the game for now
      // In a full implementation, you'd implement proper move undo
      Alert.alert(
        'Undo Move',
        'Undo functionality will be implemented in the next version.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleSettings = () => {
    Alert.alert(
      'Settings',
      'Game settings will be available in the next version.',
      [{ text: 'OK' }]
    );
  };

  const getKingPosition = () => {
    return chessEngine.findKing(currentPlayer);
  };

  // Render different screens based on current screen state
  const renderScreen = () => {
    switch (currentScreen) {
      case SCREENS.LOADING:
        return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
      
      case SCREENS.INTRODUCTION:
        return <IntroductionScreen onComplete={handleIntroductionComplete} />;
      
      case SCREENS.AUTH:
        return <AuthScreen onLoginSuccess={handleAuthSuccess} />;
      
      case SCREENS.HOME:
        return (
          <HomePage 
            activeTab={activeTab}
            onTabPress={handleTabPress}
            onProfilePress={handleProfilePress}
            onNotificationPress={handleNotificationPress}
            onAction={handleHomeAction}
          />
        );
      
      case SCREENS.PROFILE:
        return (
          <ProfilePage 
            activeTab={activeTab}
            onTabPress={handleTabPress}
            onProfilePress={handleProfilePress}
            onNotificationPress={handleNotificationPress}
            onAction={handleProfileAction}
          />
        );
      
      case SCREENS.PUZZLES:
        return (
          <PuzzlesScreen 
            activeTab={activeTab}
            onTabPress={handleTabPress}
            onProfilePress={handleProfilePress}
            onNotificationPress={handleNotificationPress}
            onBack={() => setCurrentScreen(SCREENS.LESSONS)}
          />
        );
      
      case SCREENS.ANALYSIS:
        return (
          <AnalysisScreen 
            activeTab={activeTab}
            onTabPress={handleTabPress}
            onProfilePress={handleProfilePress}
            onNotificationPress={handleNotificationPress}
            onBack={() => setCurrentScreen(SCREENS.RECENT_GAMES)}
          />
        );
      
      case SCREENS.LESSONS:
        return (
          <LessonsScreen 
            activeTab={activeTab}
            onTabPress={handleTabPress}
            onProfilePress={handleProfilePress}
            onNotificationPress={handleNotificationPress}
            onBack={() => setCurrentScreen(SCREENS.HOME)}
            onAction={handleHomeAction}
          />
        );
      
      case SCREENS.RECENT_GAMES:
        return (
          <RecentGamesScreen 
            activeTab={activeTab}
            onTabPress={handleTabPress}
            onProfilePress={handleProfilePress}
            onNotificationPress={handleNotificationPress}
            onBack={() => setCurrentScreen(SCREENS.HOME)}
          />
        );
      
      case SCREENS.CUSTOMIZE:
        return (
          <CustomizeScreen 
            activeTab={activeTab}
            onTabPress={handleTabPress}
            onProfilePress={handleProfilePress}
            onNotificationPress={handleNotificationPress}
            onBack={() => setCurrentScreen(SCREENS.HOME)}
            onCustomizationUpdate={reloadCustomizations}
          />
        );
      
      case SCREENS.GAME_SETUP:
        return (
          <GameSetupScreen
            onStartGame={handleGameSetupStart}
            onBack={handleGameSetupBack}
          />
        );
      
      case SCREENS.GAME:
        return (
          <GameScreen
            activeTab={activeTab}
            onTabPress={handleTabPress}
            onProfilePress={handleProfilePress}
            onNotificationPress={handleNotificationPress}
            board={chessEngine.board}
            selectedSquare={selectedSquare}
            possibleMoves={possibleMoves}
            onSquarePress={handleSquarePress}
            isInCheck={isInCheck}
            kingPosition={getKingPosition()}
            currentPlayer={currentPlayer}
            gameState={gameState}
            whiteTime={gameConfig.timerEnabled && gameConfig.timeControl !== 'none' ? ChessUtils.formatTime(whiteTime) : null}
            blackTime={gameConfig.timerEnabled && gameConfig.timeControl !== 'none' ? ChessUtils.formatTime(blackTime) : null}
            moveHistory={moveHistory}
            onNewGame={handleNewGame}
            onUndo={handleUndo}
            onSettings={handleSettings}
            customization={customization}
            gameConfig={gameConfig}
          />
        );
      
      default:
        return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
    }
  };

  return (
    <>
      {renderScreen()}
      <ConfirmationModal
        visible={showConfirmationModal}
        title={confirmationConfig.title}
        message={confirmationConfig.message}
        confirmText={confirmationConfig.confirmText}
        cancelText={confirmationConfig.cancelText}
        confirmButtonStyle={confirmationConfig.confirmButtonStyle}
        onConfirm={confirmationConfig.onConfirm}
        onCancel={confirmationConfig.onCancel}
      />
    </>
  );
}
