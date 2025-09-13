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
  const [timeControl, setTimeControl] = useState('10+0'); // 10 minutes + 0 increment
  const [difficulty, setDifficulty] = useState('medium');

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

  const handleStartGame = () => {
    const gameConfig = {
      playerColor: selectedColor,
      gameMode: gameMode,
      timerEnabled: timerEnabled && timeControl !== 'none',
      timeControl: timeControl,
      difficulty: gameMode === 'ai' ? difficulty : null, // Only include difficulty for AI games
    };

    onStartGame(gameConfig);
  };

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

  const renderColorSelector = () => (
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

  const renderTimerSelector = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Timer Settings</Text>
      <View style={styles.timerToggle}>
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
            {timerEnabled ? 'Timer ON' : 'Timer OFF'}
          </Text>
        </TouchableOpacity>
      </View>

      {timerEnabled && (
        <View style={styles.timeControlSelector}>
          <Text style={styles.subsectionTitle}>Time Control</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.timeControlOptions}>
              {timeControls.map((control) => (
                <TouchableOpacity
                  key={control.value}
                  style={[
                    styles.timeControlOption,
                    timeControl === control.value && styles.selectedTimeControl,
                  ]}
                  onPress={() => setTimeControl(control.value)}
                >
                  <Text style={[
                    styles.timeControlText,
                    timeControl === control.value && styles.selectedTimeControlText,
                  ]}>
                    {control.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
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
              {timerEnabled && timeControl !== 'none' ? timeControls.find(tc => tc.value === timeControl)?.label : 'No Timer'}
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
  timerToggle: {
    alignItems: 'center',
    marginBottom: 15,
  },
  toggleButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#666666',
  },
  toggleButtonActive: {
    backgroundColor: '#6b46c1',
    borderColor: '#6b46c1',
  },
  toggleButtonText: {
    color: '#cccccc',
    fontSize: 16,
    fontWeight: '600',
  },
  toggleButtonTextActive: {
    color: '#ffffff',
  },
  timeControlSelector: {
    marginTop: 15,
  },
  timeControlOptions: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  timeControlOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#666666',
  },
  selectedTimeControl: {
    backgroundColor: '#6b46c1',
    borderColor: '#6b46c1',
  },
  timeControlText: {
    color: '#cccccc',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedTimeControlText: {
    color: '#ffffff',
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
});

export default GameSetupScreen;
