// NovaChess - Home Page Component
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { HeaderNav } from './HeaderNav';
import { FooterNav } from './FooterNav';
import { 
  GameIcon, 
  PuzzleIcon, 
  AnalysisIcon, 
  LessonsIcon, 
  RobotIcon, 
  UsersIcon,
  CheckIcon,
  XIcon
} from './icons/SvgIcons';

const { width, height } = Dimensions.get('window');

export const HomePage = ({ activeTab, onTabPress, onProfilePress, onNotificationPress, onAction }) => {
  const handleQuickAction = (action) => {
    console.log(`Quick action: ${action}`);
    if (onAction) {
      onAction(action);
    }
  };

  const handleGameMode = (mode) => {
    console.log(`Game mode: ${mode}`);
    if (onAction) {
      onAction(mode);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Navigation */}
      <HeaderNav 
        title="NovaChess"
        onProfilePress={onProfilePress}
        onNotificationPress={onNotificationPress}
      />

      {/* Main Content */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome back, Player!</Text>
          <Text style={styles.welcomeSubtitle}>Ready for your next chess challenge?</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => handleQuickAction('new-game')}
            >
              <GameIcon size={32} color="#e2e8f0" />
              <Text style={styles.quickActionText}>New Game</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => handleQuickAction('puzzles')}
            >
              <PuzzleIcon size={32} color="#e2e8f0" />
              <Text style={styles.quickActionText}>Puzzles</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => handleQuickAction('analysis')}
            >
              <AnalysisIcon size={32} color="#e2e8f0" />
              <Text style={styles.quickActionText}>Analysis</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => handleQuickAction('lessons')}
            >
              <LessonsIcon size={32} color="#e2e8f0" />
              <Text style={styles.quickActionText}>Lessons</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Game Modes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Game Modes</Text>
          <View style={styles.gameModesContainer}>
            <TouchableOpacity 
              style={styles.gameModeCard}
              onPress={() => handleGameMode('vs-ai')}
            >
              <View style={styles.gameModeHeader}>
                <RobotIcon size={24} color="#e2e8f0" />
                <Text style={styles.gameModeTitle}>vs AI</Text>
              </View>
              <Text style={styles.gameModeDescription}>
                Challenge our intelligent chess engine
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.gameModeCard}
              onPress={() => handleGameMode('vs-friend')}
            >
              <View style={styles.gameModeHeader}>
                <UsersIcon size={24} color="#e2e8f0" />
                <Text style={styles.gameModeTitle}>vs Friend</Text>
              </View>
              <Text style={styles.gameModeDescription}>
                Play against friends online
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Games */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Games</Text>
            <TouchableOpacity onPress={() => handleQuickAction('recent-games')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.recentGamesContainer}>
            <View style={styles.recentGameCard}>
              <View style={styles.gameInfo}>
                <View style={styles.gameResultContainer}>
                  <CheckIcon size={16} color="#10b981" />
                  <Text style={[styles.gameResult, { color: '#10b981' }]}>Victory</Text>
                </View>
                <Text style={styles.gameOpponent}>vs AI (Medium)</Text>
                <Text style={styles.gameDate}>2 hours ago</Text>
              </View>
              <View style={styles.gameStats}>
                <Text style={styles.gameTime}>15:32</Text>
                <Text style={styles.gameMoves}>42 moves</Text>
              </View>
            </View>

            <View style={styles.recentGameCard}>
              <View style={styles.gameInfo}>
                <View style={styles.gameResultContainer}>
                  <XIcon size={16} color="#ef4444" />
                  <Text style={[styles.gameResult, { color: '#ef4444' }]}>Defeat</Text>
                </View>
                <Text style={styles.gameOpponent}>vs AI (Hard)</Text>
                <Text style={styles.gameDate}>1 day ago</Text>
              </View>
              <View style={styles.gameStats}>
                <Text style={styles.gameTime}>8:45</Text>
                <Text style={styles.gameMoves}>28 moves</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Statistics Preview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Stats</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Games Won</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>1,250</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>156</Text>
              <Text style={styles.statLabel}>Puzzles Solved</Text>
            </View>
          </View>
        </View>
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
    backgroundColor: '#0f0f1a', // Dark black-purple background
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  welcomeSection: {
    padding: 20,
    paddingTop: 30,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e2e8f0',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#94a3b8',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e2e8f0',
    marginBottom: 15,
  },
  seeAllText: {
    fontSize: 14,
    color: '#6b46c1',
    fontWeight: '600',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - 60) / 2,
    backgroundColor: '#1a1a2e', // Dark purple-black
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#2a2a3a', // Dark purple border
  },
  quickActionText: {
    fontSize: 14,
    color: '#e2e8f0',
    fontWeight: '600',
    textAlign: 'center',
  },
  gameModesContainer: {
    gap: 15,
  },
  gameModeCard: {
    backgroundColor: '#1a1a2e', // Dark purple-black
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2a2a3a', // Dark purple border
  },
  gameModeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  gameModeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e2e8f0',
    marginLeft: 12,
  },
  gameModeDescription: {
    fontSize: 14,
    color: '#94a3b8',
  },
  recentGamesContainer: {
    gap: 12,
  },
  recentGameCard: {
    backgroundColor: '#1a1a2e', // Dark purple-black
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a3a', // Dark purple border
  },
  gameInfo: {
    flex: 1,
  },
  gameResultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  gameResult: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  gameOpponent: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 2,
  },
  gameDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  gameStats: {
    alignItems: 'flex-end',
  },
  gameTime: {
    fontSize: 14,
    color: '#e2e8f0',
    fontWeight: '600',
    marginBottom: 2,
  },
  gameMoves: {
    fontSize: 12,
    color: '#94a3b8',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#1a1a2e', // Dark purple-black
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#2a2a3a', // Dark purple border
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6b46c1', // Dark purple accent
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
  },
});
