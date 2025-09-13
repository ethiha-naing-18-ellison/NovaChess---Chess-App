// NovaChess - Profile Page Component
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
  EditIcon, 
  TrophyIcon, 
  TargetIcon, 
  ZapIcon, 
  LockIcon, 
  HelpIcon, 
  InfoIcon,
  ProfileIcon,
  GameIcon,
  NotificationIcon,
  CheckIcon,
  LockedIcon
} from './icons/SvgIcons';

const { width } = Dimensions.get('window');

export const ProfilePage = ({ activeTab, onTabPress, onProfilePress, onNotificationPress, onAction }) => {
  const handleSettingPress = (setting) => {
    console.log(`Setting: ${setting}`);
    // Handle settings navigation here
    if (onAction) {
      onAction(setting);
    }
  };

  const handleStatPress = (stat) => {
    console.log(`Stat: ${stat}`);
    // Handle stat navigation here
    if (onAction) {
      onAction(stat);
    }
  };

  const handleLogout = () => {
    console.log('Logout pressed');
    if (onAction) {
      onAction('logout');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Navigation */}
      <HeaderNav 
        title="Profile"
        onProfilePress={onProfilePress}
        onNotificationPress={onNotificationPress}
      />

      {/* Main Content */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image 
              source={require('../../assets/images/user/user1.png')} 
              style={styles.profileImage}
              resizeMode="cover"
            />
            <TouchableOpacity style={styles.editButton}>
              <EditIcon size={14} color="#e2e8f0" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.profileName}>Chess Master</Text>
          <Text style={styles.profileEmail}>player@novachess.com</Text>
          <Text style={styles.profileRating}>Rating: 1,250</Text>
        </View>

        {/* Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.statsGrid}>
            <TouchableOpacity 
              style={styles.statCard}
              onPress={() => handleStatPress('games-played')}
            >
              <Text style={styles.statNumber}>48</Text>
              <Text style={styles.statLabel}>Games Played</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.statCard}
              onPress={() => handleStatPress('games-won')}
            >
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Games Won</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.statCard}
              onPress={() => handleStatPress('win-rate')}
            >
              <Text style={styles.statNumber}>50%</Text>
              <Text style={styles.statLabel}>Win Rate</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.statCard}
              onPress={() => handleStatPress('puzzles-solved')}
            >
              <Text style={styles.statNumber}>156</Text>
              <Text style={styles.statLabel}>Puzzles Solved</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsContainer}>
            <View style={styles.achievementCard}>
              <TrophyIcon size={24} color="#e2e8f0" />
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>First Victory</Text>
                <Text style={styles.achievementDescription}>Win your first game</Text>
              </View>
              <View style={styles.achievementStatus}>
                <CheckIcon size={20} color="#10b981" />
              </View>
            </View>

            <View style={styles.achievementCard}>
              <TargetIcon size={24} color="#e2e8f0" />
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>Puzzle Master</Text>
                <Text style={styles.achievementDescription}>Solve 100 puzzles</Text>
              </View>
              <View style={styles.achievementStatus}>
                <CheckIcon size={20} color="#10b981" />
              </View>
            </View>

            <View style={styles.achievementCard}>
              <ZapIcon size={24} color="#e2e8f0" />
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>Speed Demon</Text>
                <Text style={styles.achievementDescription}>Win a game in under 5 minutes</Text>
              </View>
              <View style={styles.achievementStatus}>
                <LockedIcon size={20} color="#6b7280" />
              </View>
            </View>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsContainer}>
            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => handleSettingPress('account')}
            >
              <View style={styles.settingLeft}>
                <ProfileIcon size={20} color="#e2e8f0" />
                <Text style={styles.settingText}>Account Settings</Text>
              </View>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => handleSettingPress('game')}
            >
              <View style={styles.settingLeft}>
                <GameIcon size={20} color="#e2e8f0" />
                <Text style={styles.settingText}>Game Settings</Text>
              </View>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => handleSettingPress('notifications')}
            >
              <View style={styles.settingLeft}>
                <NotificationIcon size={20} color="#e2e8f0" />
                <Text style={styles.settingText}>Notifications</Text>
              </View>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => handleSettingPress('privacy')}
            >
              <View style={styles.settingLeft}>
                <LockIcon size={20} color="#e2e8f0" />
                <Text style={styles.settingText}>Privacy & Security</Text>
              </View>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => handleSettingPress('help')}
            >
              <View style={styles.settingLeft}>
                <HelpIcon size={20} color="#e2e8f0" />
                <Text style={styles.settingText}>Help & Support</Text>
              </View>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => handleSettingPress('about')}
            >
              <View style={styles.settingLeft}>
                <InfoIcon size={20} color="#e2e8f0" />
                <Text style={styles.settingText}>About NovaChess</Text>
              </View>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
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
  profileHeader: {
    alignItems: 'center',
    padding: 30,
    paddingTop: 40,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#6b46c1', // Dark purple accent
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3b82f6', // Dark blue accent
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0f0f1a', // Dark background
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e2e8f0',
    marginBottom: 8,
  },
  profileEmail: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 8,
  },
  profileRating: {
    fontSize: 18,
    color: '#6b46c1', // Dark purple accent
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e2e8f0',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 60) / 2,
    backgroundColor: '#1a1a2e', // Dark purple-black
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
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
  achievementsContainer: {
    gap: 12,
  },
  achievementCard: {
    backgroundColor: '#1a1a2e', // Dark purple-black
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a3a', // Dark purple border
  },
  achievementInfo: {
    flex: 1,
    marginLeft: 16,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e2e8f0',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#94a3b8',
  },
  achievementStatus: {
    marginLeft: 16,
  },
  settingsContainer: {
    backgroundColor: '#1a1a2e', // Dark purple-black
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2a2a3a', // Dark purple border
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a3a', // Dark purple border
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    color: '#e2e8f0',
    fontWeight: '500',
    marginLeft: 16,
  },
  settingArrow: {
    fontSize: 20,
    color: '#94a3b8',
  },
  logoutButton: {
    backgroundColor: '#dc2626', // Red for logout
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e2e8f0',
  },
});
