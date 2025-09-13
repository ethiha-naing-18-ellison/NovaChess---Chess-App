// NovaChess - Analysis Screen Component
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
import { AnalysisIcon, GameIcon, TargetIcon } from './icons/SvgIcons';

const { width } = Dimensions.get('window');

export const AnalysisScreen = ({ activeTab, onTabPress, onProfilePress, onNotificationPress, onBack }) => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [recentGames] = useState([
    {
      id: 1,
      opponent: 'AI (Medium)',
      result: 'Win',
      date: '2 hours ago',
      moves: 42,
      time: '15:32',
    },
    {
      id: 2,
      opponent: 'AI (Hard)',
      result: 'Loss',
      date: '1 day ago',
      moves: 28,
      time: '8:45',
    },
    {
      id: 3,
      opponent: 'Friend',
      result: 'Draw',
      date: '3 days ago',
      moves: 56,
      time: '22:15',
    },
  ]);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
    console.log(`Analyzing game: ${game.opponent}`);
  };

  const handleAnalyzePosition = () => {
    console.log('Analyzing current position...');
  };

  return (
    <View style={styles.container}>
      <HeaderNav
        title="Game Analysis"
        onProfilePress={onProfilePress}
        onNotificationPress={onNotificationPress}
      />
      
      {/* Back Button */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back to Stats</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Quick Analysis */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Analysis</Text>
          <TouchableOpacity style={styles.quickAnalysisCard} onPress={handleAnalyzePosition}>
            <View style={styles.analysisHeader}>
              <AnalysisIcon size={28} color="#3b82f6" />
              <Text style={styles.analysisTitle}>Analyze Current Position</Text>
            </View>
            <Text style={styles.analysisDescription}>
              Get instant analysis of any chess position
            </Text>
          </TouchableOpacity>
        </View>

        {/* Recent Games for Analysis */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Analyze Recent Games</Text>
          {recentGames.map((game) => (
            <TouchableOpacity
              key={game.id}
              style={[
                styles.gameCard,
                selectedGame?.id === game.id && styles.selectedGameCard,
              ]}
              onPress={() => handleGameSelect(game)}
            >
              <View style={styles.gameHeader}>
                <GameIcon size={24} color="#e2e8f0" />
                <Text style={styles.gameOpponent}>{game.opponent}</Text>
                <View style={[
                  styles.resultBadge,
                  game.result === 'Win' && styles.winBadge,
                  game.result === 'Loss' && styles.lossBadge,
                  game.result === 'Draw' && styles.drawBadge,
                ]}>
                  <Text style={styles.resultText}>{game.result}</Text>
                </View>
              </View>
              <View style={styles.gameDetails}>
                <Text style={styles.gameDate}>{game.date}</Text>
                <Text style={styles.gameStats}>{game.moves} moves • {game.time}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Analysis Tools */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Analysis Tools</Text>
          <View style={styles.toolsGrid}>
            <TouchableOpacity style={styles.toolCard}>
              <TargetIcon size={32} color="#e2e8f0" />
              <Text style={styles.toolTitle}>Opening Explorer</Text>
              <Text style={styles.toolDescription}>Explore opening theory</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.toolCard}>
              <AnalysisIcon size={32} color="#e2e8f0" />
              <Text style={styles.toolTitle}>Endgame Trainer</Text>
              <Text style={styles.toolDescription}>Practice endgames</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Analysis Results */}
        {selectedGame && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Analysis Results</Text>
            <View style={styles.analysisResults}>
              <View style={styles.resultItem}>
                <Text style={styles.resultLabel}>Best Move:</Text>
                <Text style={styles.resultValue}>Nf3</Text>
              </View>
              <View style={styles.resultItem}>
                <Text style={styles.resultLabel}>Evaluation:</Text>
                <Text style={styles.resultValue}>+0.3</Text>
              </View>
              <View style={styles.resultItem}>
                <Text style={styles.resultLabel}>Depth:</Text>
                <Text style={styles.resultValue}>15</Text>
              </View>
            </View>
          </View>
        )}
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
  quickAnalysisCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2a2a3a',
  },
  analysisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  analysisTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e2e8f0',
    marginLeft: 12,
  },
  analysisDescription: {
    fontSize: 14,
    color: '#94a3b8',
  },
  gameCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2a2a3a',
  },
  selectedGameCard: {
    borderColor: '#6b46c1',
    backgroundColor: '#1a1a2e',
  },
  gameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  gameOpponent: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e2e8f0',
    marginLeft: 12,
    flex: 1,
  },
  resultBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  winBadge: {
    backgroundColor: '#10b981',
  },
  lossBadge: {
    backgroundColor: '#ef4444',
  },
  drawBadge: {
    backgroundColor: '#6b7280',
  },
  resultText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#e2e8f0',
  },
  gameDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gameDate: {
    fontSize: 14,
    color: '#94a3b8',
  },
  gameStats: {
    fontSize: 14,
    color: '#3b82f6',
  },
  toolsGrid: {
    flexDirection: 'row',
    gap: 15,
  },
  toolCard: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a3a',
  },
  toolTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e2e8f0',
    marginTop: 8,
    textAlign: 'center',
  },
  toolDescription: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 4,
  },
  analysisResults: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#2a2a3a',
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  resultLabel: {
    fontSize: 14,
    color: '#94a3b8',
  },
  resultValue: {
    fontSize: 14,
    color: '#e2e8f0',
    fontWeight: 'bold',
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
