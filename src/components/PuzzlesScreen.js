// NovaChess - Puzzles Screen Component
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { HeaderNav } from './HeaderNav';
import { FooterNav } from './FooterNav';
import { PuzzleIcon, TargetIcon, ZapIcon } from './icons/SvgIcons';

const { width } = Dimensions.get('window');

export const PuzzlesScreen = ({ activeTab, onTabPress, onProfilePress, onNotificationPress, onBack }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const [puzzles] = useState([
    {
      id: 1,
      title: 'Mate in 1',
      difficulty: 'easy',
      rating: 800,
      solved: true,
    },
    {
      id: 2,
      title: 'Fork Attack',
      difficulty: 'medium',
      rating: 1200,
      solved: false,
    },
    {
      id: 3,
      title: 'Pin Combination',
      difficulty: 'hard',
      rating: 1600,
      solved: false,
    },
  ]);

  const handlePuzzlePress = (puzzle) => {
    // Navigate to puzzle game
    console.log(`Starting puzzle: ${puzzle.title}`);
  };

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  return (
    <View style={styles.container}>
      <HeaderNav
        title="Chess Puzzles"
        onProfilePress={onProfilePress}
        onNotificationPress={onNotificationPress}
      />
      
      {/* Back Button */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back to Learn</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Difficulty Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Difficulty</Text>
          <View style={styles.difficultyContainer}>
            {['easy', 'medium', 'hard'].map((difficulty) => (
              <TouchableOpacity
                key={difficulty}
                style={[
                  styles.difficultyButton,
                  selectedDifficulty === difficulty && styles.selectedDifficulty,
                ]}
                onPress={() => handleDifficultyChange(difficulty)}
              >
                <Text style={[
                  styles.difficultyText,
                  selectedDifficulty === difficulty && styles.selectedDifficultyText,
                ]}>
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Puzzles List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Puzzles</Text>
          {puzzles
            .filter(puzzle => puzzle.difficulty === selectedDifficulty)
            .map((puzzle) => (
              <TouchableOpacity
                key={puzzle.id}
                style={styles.puzzleCard}
                onPress={() => handlePuzzlePress(puzzle)}
              >
                <View style={styles.puzzleHeader}>
                  <PuzzleIcon size={24} color="#e2e8f0" />
                  <Text style={styles.puzzleTitle}>{puzzle.title}</Text>
                  {puzzle.solved && <TargetIcon size={20} color="#10b981" />}
                </View>
                <View style={styles.puzzleInfo}>
                  <Text style={styles.puzzleRating}>Rating: {puzzle.rating}</Text>
                  <Text style={styles.puzzleDifficulty}>
                    {puzzle.difficulty.charAt(0).toUpperCase() + puzzle.difficulty.slice(1)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
        </View>

        {/* Daily Challenge */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Challenge</Text>
          <TouchableOpacity style={styles.dailyChallengeCard}>
            <View style={styles.challengeHeader}>
              <ZapIcon size={28} color="#f59e0b" />
              <Text style={styles.challengeTitle}>Mate in 3</Text>
            </View>
            <Text style={styles.challengeDescription}>
              Solve this puzzle to earn bonus points!
            </Text>
            <Text style={styles.challengeReward}>Reward: +50 XP</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e2e8f0',
    marginBottom: 15,
    marginLeft: 5,
  },
  difficultyContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  difficultyButton: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a3a',
  },
  selectedDifficulty: {
    backgroundColor: '#6b46c1',
    borderColor: '#6b46c1',
  },
  difficultyText: {
    color: '#94a3b8',
    fontWeight: '600',
  },
  selectedDifficultyText: {
    color: '#e2e8f0',
  },
  puzzleCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2a2a3a',
  },
  puzzleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  puzzleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e2e8f0',
    marginLeft: 12,
    flex: 1,
  },
  puzzleInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  puzzleRating: {
    fontSize: 14,
    color: '#94a3b8',
  },
  puzzleDifficulty: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '600',
  },
  dailyChallengeCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: '#f59e0b',
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e2e8f0',
    marginLeft: 12,
  },
  challengeDescription: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 8,
  },
  challengeReward: {
    fontSize: 14,
    color: '#f59e0b',
    fontWeight: '600',
  },
  backButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#0f0f1a',
  },
  backButton: {
    backgroundColor: '#1a1a2e',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#2a2a3a',
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#6b46c1',
    fontSize: 14,
    fontWeight: '600',
  },
});
