// NovaChess - Recent Games Screen Component
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
import { GameIcon, CheckIcon, XIcon, TargetIcon } from './icons/SvgIcons';

const { width } = Dimensions.get('window');

export const RecentGamesScreen = ({ activeTab, onTabPress, onProfilePress, onNotificationPress, onBack }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [recentGames] = useState([
    {
      id: 1,
      opponent: 'AI (Medium)',
      result: 'Win',
      date: '2 hours ago',
      moves: 42,
      time: '15:32',
      timeControl: '10+0',
      rating: 1250,
    },
    {
      id: 2,
      opponent: 'AI (Hard)',
      result: 'Loss',
      date: '1 day ago',
      moves: 28,
      time: '8:45',
      timeControl: '5+0',
      rating: 1240,
    },
    {
      id: 3,
      opponent: 'Friend',
      result: 'Draw',
      date: '3 days ago',
      moves: 56,
      time: '22:15',
      timeControl: '15+10',
      rating: 1250,
    },
    {
      id: 4,
      opponent: 'AI (Easy)',
      result: 'Win',
      date: '1 week ago',
      moves: 35,
      time: '12:20',
      timeControl: '10+0',
      rating: 1230,
    },
    {
      id: 5,
      opponent: 'AI (Medium)',
      result: 'Loss',
      date: '1 week ago',
      moves: 31,
      time: '18:45',
      timeControl: '10+0',
      rating: 1220,
    },
  ]);

  const filters = ['all', 'wins', 'losses', 'draws'];

  const handleGamePress = (game) => {
    console.log(`Viewing game: ${game.opponent}`);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const getFilteredGames = () => {
    if (selectedFilter === 'all') return recentGames;
    return recentGames.filter(game => 
      game.result.toLowerCase() === selectedFilter.slice(0, -1) // Remove 's' from wins/losses
    );
  };

  const getResultIcon = (result) => {
    switch (result) {
      case 'Win':
        return <CheckIcon size={16} color="#10b981" />;
      case 'Loss':
        return <XIcon size={16} color="#ef4444" />;
      case 'Draw':
        return <TargetIcon size={16} color="#6b7280" />;
      default:
        return null;
    }
  };

  const getResultColor = (result) => {
    switch (result) {
      case 'Win':
        return '#10b981';
      case 'Loss':
        return '#ef4444';
      case 'Draw':
        return '#6b7280';
      default:
        return '#94a3b8';
    }
  };

  return (
    <View style={styles.container}>
      <HeaderNav
        title="Recent Games"
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
        {/* Filter Buttons */}
        <View style={styles.section}>
          <View style={styles.filterContainer}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  selectedFilter === filter && styles.selectedFilter,
                ]}
                onPress={() => handleFilterChange(filter)}
              >
                <Text style={[
                  styles.filterText,
                  selectedFilter === filter && styles.selectedFilterText,
                ]}>
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Games List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {selectedFilter === 'all' ? 'All Games' : `${selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)}`}
          </Text>
          {getFilteredGames().map((game) => (
            <TouchableOpacity
              key={game.id}
              style={styles.gameCard}
              onPress={() => handleGamePress(game)}
            >
              <View style={styles.gameHeader}>
                <View style={styles.gameIcon}>
                  <GameIcon size={20} color="#e2e8f0" />
                </View>
                <View style={styles.gameInfo}>
                  <Text style={styles.gameOpponent}>{game.opponent}</Text>
                  <Text style={styles.gameDate}>{game.date}</Text>
                </View>
                <View style={styles.gameResult}>
                  {getResultIcon(game.result)}
                  <Text style={[styles.resultText, { color: getResultColor(game.result) }]}>
                    {game.result}
                  </Text>
                </View>
              </View>
              
              <View style={styles.gameDetails}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Moves:</Text>
                  <Text style={styles.detailValue}>{game.moves}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Time:</Text>
                  <Text style={styles.detailValue}>{game.time}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Control:</Text>
                  <Text style={styles.detailValue}>{game.timeControl}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Rating:</Text>
                  <Text style={styles.detailValue}>{game.rating}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Statistics Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{recentGames.length}</Text>
              <Text style={styles.statLabel}>Total Games</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: '#10b981' }]}>
                {recentGames.filter(g => g.result === 'Win').length}
              </Text>
              <Text style={styles.statLabel}>Wins</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: '#ef4444' }]}>
                {recentGames.filter(g => g.result === 'Loss').length}
              </Text>
              <Text style={styles.statLabel}>Losses</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: '#6b7280' }]}>
                {recentGames.filter(g => g.result === 'Draw').length}
              </Text>
              <Text style={styles.statLabel}>Draws</Text>
            </View>
          </View>
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
  filterContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  filterButton: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a3a',
  },
  selectedFilter: {
    backgroundColor: '#6b46c1',
    borderColor: '#6b46c1',
  },
  filterText: {
    color: '#94a3b8',
    fontWeight: '600',
  },
  selectedFilterText: {
    color: '#e2e8f0',
  },
  gameCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2a2a3a',
  },
  gameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  gameIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2a2a3a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  gameInfo: {
    flex: 1,
  },
  gameOpponent: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e2e8f0',
    marginBottom: 2,
  },
  gameDate: {
    fontSize: 14,
    color: '#94a3b8',
  },
  gameResult: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  gameDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    color: '#e2e8f0',
    fontWeight: '600',
  },
  statsCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#2a2a3a',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#94a3b8',
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
