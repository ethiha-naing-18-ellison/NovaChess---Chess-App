import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

const GameSetupScreen = ({ onStartGame, onBack, initialGameMode = 'ai' }) => {
  const [selectedColor, setSelectedColor] = useState('white');
  const [gameMode, setGameMode] = useState(initialGameMode); // 'ai', 'online-friend', or 'local-friend'
  const [timerEnabled, setTimerEnabled] = useState(true);
  const [minutes, setMinutes] = useState(10);
  const [increment, setIncrement] = useState(0);
  const [difficulty, setDifficulty] = useState('medium');
  const [friendSelection, setFriendSelection] = useState('random'); // 'random' or 'select'
  const [showOpponentPopup, setShowOpponentPopup] = useState(false);
  const [showFriendListPopup, setShowFriendListPopup] = useState(false);
  const [challengeTimer, setChallengeTimer] = useState(60); // 60 seconds
  const [challengedFriendId, setChallengedFriendId] = useState(null); // Track which friend was challenged

  const timeControls = [
    { label: 'No Timer', value: 'none' },
    { label: '1+0 (1 min)', value: '1+0' },
    { label: '3+0 (3 min)', value: '3+0' },
    { label: '5+0 (5 min)', value: '5+0' },
    { label: '10+0 (10 min)', value: '10+0' },
    { label: '15+10 (15 min + 10s)', value: '15+10' },
    { label: '30+0 (30 min)', value: '30+0' },
  ];

  const difficulties = [
    { label: 'Easy', value: 'easy', description: 'Beginner friendly' },
    { label: 'Medium', value: 'medium', description: 'Balanced challenge' },
    { label: 'Hard', value: 'hard', description: 'Advanced level' },
    { label: 'Expert', value: 'expert', description: 'Master level' },
  ];

  // Mock data for online friends
  const mockOpponent = {
    name: 'ChessMaster2024',
    rating: 1850,
    country: '🇺🇸',
    status: 'online'
  };

  const mockFriends = [
    { id: 1, name: 'AlexChess', rating: 1650, country: '🇬🇧', status: 'online' },
    { id: 2, name: 'QueenBee', rating: 1920, country: '🇩🇪', status: 'online' },
    { id: 3, name: 'KnightRider', rating: 1780, country: '🇫🇷', status: 'away' },
    { id: 4, name: 'PawnMaster', rating: 1450, country: '🇮🇹', status: 'online' },
    { id: 5, name: 'KingSlayer', rating: 2100, country: '🇪🇸', status: 'online' },
  ];

  const userRating = 1750; // Mock user rating

  const handleStartGame = () => {
    if (gameMode === 'online-friend') {
      if (friendSelection === 'random') {
        // Show opponent matching popup
        setShowOpponentPopup(true);
      } else {
        // Show friend list popup
        setShowFriendListPopup(true);
      }
      return;
    }

    // For AI and local friend modes, start game directly
    const timeControlString = timerEnabled ? `${minutes}+${increment}` : 'none';
    const gameConfig = {
      playerColor: selectedColor,
      gameMode: gameMode,
      timerEnabled: timerEnabled,
      timeControl: timeControlString,
      difficulty: gameMode === 'ai' ? difficulty : null, // Only include difficulty for AI games
    };

    onStartGame(gameConfig);
  };

  const handleOpponentMatchAccept = () => {
    setShowOpponentPopup(false);
    // Randomly assign color for online games
    const randomColor = Math.random() < 0.5 ? 'white' : 'black';
    const timeControlString = timerEnabled ? `${minutes}+${increment}` : 'none';
    const gameConfig = {
      playerColor: randomColor,
      gameMode: gameMode,
      timerEnabled: timerEnabled,
      timeControl: timeControlString,
      opponent: mockOpponent,
    };
    onStartGame(gameConfig);
  };

  const handleOpponentMatchCancel = () => {
    setShowOpponentPopup(false);
  };

  const handleSendChallenge = (friend) => {
    setChallengedFriendId(friend.id);
    setChallengeTimer(60);
    
    // Start countdown timer
    const timer = setInterval(() => {
      setChallengeTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setChallengedFriendId(null);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleFriendListCancel = () => {
    setShowFriendListPopup(false);
    setChallengedFriendId(null);
    setChallengeTimer(60);
  };

  const renderOpponentMatchingPopup = () => (
    <View style={styles.popupOverlay}>
      <View style={styles.popupContainer}>
        <Text style={styles.popupTitle}>Opponent Found!</Text>
        
        <View style={styles.opponentInfo}>
          <Text style={styles.opponentName}>YOU vs {mockOpponent.name}</Text>
          <View style={styles.ratingContainer}>
            <View style={styles.ratingItem}>
              <Text style={styles.ratingLabel}>Your Rating</Text>
              <Text style={styles.ratingValue}>{userRating}</Text>
            </View>
            <View style={styles.ratingItem}>
              <Text style={styles.ratingLabel}>Opponent Rating</Text>
              <Text style={styles.ratingValue}>{mockOpponent.rating}</Text>
            </View>
          </View>
          <Text style={styles.opponentCountry}>{mockOpponent.country} {mockOpponent.name}</Text>
        </View>

        <View style={styles.popupButtons}>
          <TouchableOpacity
            style={styles.popupButtonCancel}
            onPress={handleOpponentMatchCancel}
          >
            <Text style={styles.popupButtonCancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.popupButtonConfirm}
            onPress={handleOpponentMatchAccept}
          >
            <Text style={styles.popupButtonConfirmText}>Okay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderFriendListPopup = () => (
    <View style={styles.popupOverlay}>
      <View style={styles.friendListPopupContainer}>
        <Text style={styles.popupTitle}>Select Friend</Text>
        
        <ScrollView style={styles.friendList}>
          {mockFriends.map((friend) => (
            <View key={friend.id} style={styles.friendItem}>
              <View style={styles.friendInfo}>
                <Text style={styles.friendName}>{friend.name}</Text>
                <Text style={styles.friendRating}>Rating: {friend.rating}</Text>
                <Text style={styles.friendCountry}>{friend.country}</Text>
                <View style={[
                  styles.statusIndicator,
                  { backgroundColor: friend.status === 'online' ? '#10b981' : '#f59e0b' }
                ]} />
              </View>
              <TouchableOpacity
                style={[
                  styles.challengeButton,
                  challengedFriendId && challengedFriendId !== friend.id && styles.challengeButtonDisabled
                ]}
                onPress={() => handleSendChallenge(friend)}
                disabled={challengedFriendId !== null}
              >
                <Text style={styles.challengeButtonText}>
                  {challengedFriendId === friend.id ? `${challengeTimer}s` : 'Send'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View style={styles.popupButtons}>
          <TouchableOpacity
            style={styles.popupButtonCancel}
            onPress={handleFriendListCancel}
          >
            <Text style={styles.popupButtonCancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderGameModeSelector = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Choose Game Mode</Text>
      <View style={styles.gameModeSelector}>
        <TouchableOpacity
          style={[
            styles.gameModeOption,
            gameMode === 'ai' && styles.selectedGameModeOption,
          ]}
          onPress={() => setGameMode('ai')}
        >
          <View style={styles.gameModeIcon}>
            <Text style={styles.gameModeEmoji}>🤖</Text>
          </View>
          <Text style={[
            styles.gameModeLabel,
            gameMode === 'ai' && styles.selectedGameModeLabel
          ]}>
            vs AI
          </Text>
          <Text style={styles.gameModeDescription}>Play against computer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.gameModeOption,
            gameMode === 'online-friend' && styles.selectedGameModeOption,
          ]}
          onPress={() => setGameMode('online-friend')}
        >
          <View style={styles.gameModeIcon}>
            <Text style={styles.gameModeEmoji}>🌐</Text>
          </View>
          <Text style={[
            styles.gameModeLabel,
            gameMode === 'online-friend' && styles.selectedGameModeLabel
          ]}>
            vs Online Friend
          </Text>
          <Text style={styles.gameModeDescription}>Play with friends online</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.gameModeOption,
            gameMode === 'local-friend' && styles.selectedGameModeOption,
          ]}
          onPress={() => setGameMode('local-friend')}
        >
          <View style={styles.gameModeIcon}>
            <Text style={styles.gameModeEmoji}>📱</Text>
          </View>
          <Text style={[
            styles.gameModeLabel,
            gameMode === 'local-friend' && styles.selectedGameModeLabel
          ]}>
            vs Local Friend
          </Text>
          <Text style={styles.gameModeDescription}>Play on same device</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderFriendSelector = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Choose Friend Option</Text>
      <View style={styles.friendSelector}>
        <TouchableOpacity
          style={[
            styles.friendOption,
            friendSelection === 'random' && styles.selectedFriend,
          ]}
          onPress={() => setFriendSelection('random')}
        >
          <Text style={styles.friendEmoji}>🎲</Text>
          <View style={styles.friendTextContainer}>
            <Text style={[
              styles.friendText,
              friendSelection === 'random' && styles.selectedFriendText,
            ]}>
              Random Friend
            </Text>
            <Text style={styles.friendDescription}>
              Play with a random online opponent
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.friendOption,
            friendSelection === 'select' && styles.selectedFriend,
          ]}
          onPress={() => setFriendSelection('select')}
        >
          <Text style={styles.friendEmoji}>👥</Text>
          <View style={styles.friendTextContainer}>
            <Text style={[
              styles.friendText,
              friendSelection === 'select' && styles.selectedFriendText,
            ]}>
              Select Friend
            </Text>
            <Text style={styles.friendDescription}>
              Choose from your friends list
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderColorSelector = () => {
    // Don't show color selector for online friend mode
    if (gameMode === 'online-friend') {
      return null;
    }

    return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Choose Your Color</Text>
      <View style={styles.colorSelector}>
        <TouchableOpacity
          style={[
            styles.colorOption,
            selectedColor === 'white' && styles.selectedColorOption,
          ]}
          onPress={() => setSelectedColor('white')}
        >
          <View style={[styles.colorPreview, { backgroundColor: '#f0d9b5' }]} />
          <Text style={[
            styles.colorLabel,
            selectedColor === 'white' && styles.selectedColorLabel
          ]}>
            White
          </Text>
          <Text style={styles.colorDescription}>Play as White (moves first)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.colorOption,
            selectedColor === 'black' && styles.selectedColorOption,
          ]}
          onPress={() => setSelectedColor('black')}
        >
          <View style={[styles.colorPreview, { backgroundColor: '#b58863' }]} />
          <Text style={[
            styles.colorLabel,
            selectedColor === 'black' && styles.selectedColorLabel
          ]}>
            Black
          </Text>
          <Text style={styles.colorDescription}>Play as Black (moves second)</Text>
        </TouchableOpacity>
      </View>
    </View>
    );
  };

  const renderTimerSelector = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Timer Settings</Text>
      <View style={styles.timerContainer}>
        <View style={styles.timerToggleRow}>
          <Text style={styles.timerLabel}>Timer:</Text>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              timerEnabled && styles.toggleButtonActive,
            ]}
            onPress={() => setTimerEnabled(!timerEnabled)}
          >
            <Text style={[
              styles.toggleButtonText,
              timerEnabled && styles.toggleButtonTextActive,
            ]}>
              {timerEnabled ? 'ON' : 'OFF'}
            </Text>
          </TouchableOpacity>
        </View>

        {timerEnabled && (
          <View style={styles.timeControlRow}>
            <View style={styles.timeControlItem}>
              <Text style={styles.timeControlLabel}>Time Limit:</Text>
              <View style={styles.timeControlButtons}>
                <TouchableOpacity
                  style={styles.timeButton}
                  onPress={() => setMinutes(Math.max(1, minutes - 1))}
                >
                  <Text style={styles.timeButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.timeValue}>{minutes}</Text>
                <TouchableOpacity
                  style={styles.timeButton}
                  onPress={() => setMinutes(Math.min(60, minutes + 1))}
                >
                  <Text style={styles.timeButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.timeControlItem}>
              <Text style={styles.timeControlLabel}>Increment:</Text>
              <View style={styles.timeControlButtons}>
                <TouchableOpacity
                  style={styles.timeButton}
                  onPress={() => setIncrement(Math.max(0, increment - 1))}
                >
                  <Text style={styles.timeButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.timeValue}>{increment}</Text>
                <TouchableOpacity
                  style={styles.timeButton}
                  onPress={() => setIncrement(Math.min(30, increment + 1))}
                >
                  <Text style={styles.timeButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );

  const renderDifficultySelector = () => {
    // Only show difficulty selector for AI games
    if (gameMode !== 'ai') {
      return null;
    }

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI Difficulty</Text>
      <View style={styles.difficultySelector}>
        {difficulties.map((diff) => (
          <TouchableOpacity
            key={diff.value}
            style={[
              styles.difficultyOption,
              difficulty === diff.value && styles.selectedDifficulty,
            ]}
            onPress={() => setDifficulty(diff.value)}
          >
            <Text style={[
              styles.difficultyLabel,
              difficulty === diff.value && styles.selectedDifficultyLabel,
            ]}>
              {diff.label}
            </Text>
            <Text style={[
              styles.difficultyDescription,
              difficulty === diff.value && styles.selectedDifficultyDescription,
            ]}>
              {diff.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Game Setup</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderGameModeSelector()}
        {gameMode === 'online-friend' && renderFriendSelector()}
        {renderColorSelector()}
        {renderTimerSelector()}
        {renderDifficultySelector()}

        <View style={styles.gamePreview}>
          <Text style={styles.sectionTitle}>Game Preview</Text>
          <View style={styles.previewCard}>
            <Text style={styles.previewText}>
              <Text style={styles.previewLabel}>Mode: </Text>
              {gameMode === 'ai' ? 'vs AI' : 
               gameMode === 'online-friend' ? 'vs Online Friend' : 
               'vs Local Friend'}
            </Text>
            <Text style={styles.previewText}>
              <Text style={styles.previewLabel}>Color: </Text>
              {selectedColor === 'white' ? 'White (First Move)' : 'Black (Second Move)'}
            </Text>
            <Text style={styles.previewText}>
              <Text style={styles.previewLabel}>Timer: </Text>
              {timerEnabled ? `${minutes}+${increment} (${minutes} min + ${increment}s)` : 'No Timer'}
            </Text>
            {gameMode === 'ai' && (
              <Text style={styles.previewText}>
                <Text style={styles.previewLabel}>Difficulty: </Text>
                {difficulties.find(d => d.value === difficulty)?.label}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.startButton} onPress={handleStartGame}>
          <Text style={styles.startButtonText}>Start Game</Text>
        </TouchableOpacity>
      </View>

      {/* Popups */}
      {showOpponentPopup && renderOpponentMatchingPopup()}
      {showFriendListPopup && renderFriendListPopup()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#2a2a2a',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: '#6b46c1',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 60,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 12,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subsectionTitle: {
    color: '#cccccc',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  colorSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  colorOption: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColorOption: {
    borderColor: '#6b46c1',
    backgroundColor: '#2d1b4e',
  },
  colorPreview: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginBottom: 6,
    borderWidth: 2,
    borderColor: '#666666',
  },
  colorLabel: {
    color: '#cccccc',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 3,
  },
  selectedColorLabel: {
    color: '#6b46c1',
  },
  colorDescription: {
    color: '#888888',
    fontSize: 10,
    textAlign: 'center',
  },
  gameModeSelector: {
    flexDirection: 'column',
    gap: 8,
  },
  gameModeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedGameModeOption: {
    borderColor: '#6b46c1',
    backgroundColor: '#2d1b4e',
  },
  gameModeIcon: {
    marginRight: 12,
  },
  gameModeEmoji: {
    fontSize: 20,
  },
  gameModeLabel: {
    color: '#cccccc',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  selectedGameModeLabel: {
    color: '#6b46c1',
  },
  gameModeDescription: {
    color: '#888888',
    fontSize: 10,
    textAlign: 'right',
  },
  timerContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 12,
  },
  timerToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  timerLabel: {
    color: '#cccccc',
    fontSize: 14,
    fontWeight: '600',
  },
  toggleButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#666666',
  },
  toggleButtonActive: {
    backgroundColor: '#6b46c1',
    borderColor: '#6b46c1',
  },
  toggleButtonText: {
    color: '#cccccc',
    fontSize: 12,
    fontWeight: '600',
  },
  toggleButtonTextActive: {
    color: '#ffffff',
  },
  timeControlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  timeControlItem: {
    flex: 1,
    alignItems: 'center',
  },
  timeControlLabel: {
    color: '#888888',
    fontSize: 12,
    marginBottom: 8,
  },
  timeControlButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeButton: {
    width: 32,
    height: 32,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#6b46c1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeButtonText: {
    color: '#6b46c1',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeValue: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    minWidth: 24,
    textAlign: 'center',
  },
  difficultySelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  difficultyOption: {
    width: '48%',
    padding: 10,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
  },
  selectedDifficulty: {
    borderColor: '#6b46c1',
    backgroundColor: '#2d1b4e',
  },
  difficultyLabel: {
    color: '#cccccc',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 3,
  },
  selectedDifficultyLabel: {
    color: '#6b46c1',
  },
  difficultyDescription: {
    color: '#888888',
    fontSize: 10,
    textAlign: 'center',
  },
  selectedDifficultyDescription: {
    color: '#aaaaaa',
  },
  gamePreview: {
    marginVertical: 20,
  },
  previewCard: {
    backgroundColor: '#2a2a2a',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6b46c1',
  },
  previewText: {
    color: '#cccccc',
    fontSize: 16,
    marginBottom: 8,
  },
  previewLabel: {
    color: '#6b46c1',
    fontWeight: '600',
  },
  footer: {
    padding: 20,
    backgroundColor: '#2a2a2a',
  },
  startButton: {
    backgroundColor: '#6b46c1',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Friend selector styles
  friendSelector: {
    flexDirection: 'column',
    gap: 12,
  },
  friendOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#444444',
  },
  selectedFriend: {
    borderColor: '#6b46c1',
    backgroundColor: '#2a1a3a',
  },
  friendEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  friendTextContainer: {
    flex: 1,
  },
  friendText: {
    color: '#cccccc',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  selectedFriendText: {
    color: '#ffffff',
  },
  friendDescription: {
    color: '#888888',
    fontSize: 12,
  },
  // Popup styles
  popupOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  popupContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 24,
    margin: 20,
    minWidth: 300,
    maxWidth: 400,
  },
  friendListPopupContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 24,
    margin: 20,
    minWidth: 350,
    maxWidth: 400,
    maxHeight: '80%',
  },
  popupTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  opponentInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  opponentName: {
    color: '#6b46c1',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 12,
  },
  ratingItem: {
    alignItems: 'center',
  },
  ratingLabel: {
    color: '#888888',
    fontSize: 12,
    marginBottom: 4,
  },
  ratingValue: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  opponentCountry: {
    color: '#cccccc',
    fontSize: 14,
  },
  popupButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  popupButtonCancel: {
    flex: 1,
    backgroundColor: '#444444',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  popupButtonCancelText: {
    color: '#cccccc',
    fontSize: 16,
    fontWeight: '600',
  },
  popupButtonConfirm: {
    flex: 1,
    backgroundColor: '#6b46c1',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  popupButtonConfirmText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  // Friend list styles
  friendList: {
    maxHeight: 300,
    marginBottom: 20,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1a1a2e',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  friendInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  friendName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  friendRating: {
    color: '#888888',
    fontSize: 12,
    marginRight: 8,
  },
  friendCountry: {
    color: '#cccccc',
    fontSize: 14,
    marginRight: 8,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  challengeButton: {
    backgroundColor: '#6b46c1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  challengeButtonDisabled: {
    backgroundColor: '#444444',
  },
  challengeButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default GameSetupScreen;
