// NovaChess - Header Navigation Component
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { NotificationIcon } from './icons/SvgIcons';

export const HeaderNav = ({ title, onProfilePress, onNotificationPress }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        {/* Logo and Title */}
        <View style={styles.logoSection}>
          <Image 
            source={require('../../assets/applicationlogo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>{title}</Text>
        </View>

        {/* Right Actions */}
        <View style={styles.actionsSection}>
          {/* Notification Button */}
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={onNotificationPress}
          >
            <NotificationIcon size={18} color="#e2e8f0" />
          </TouchableOpacity>

          {/* Profile Picture */}
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={onProfilePress}
          >
            <Image 
              source={require('../../assets/images/user/user1.png')} 
              style={styles.profileImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#1a1a2e', // Dark purple-black
    paddingTop: 50, // Status bar height
    paddingBottom: 15,
    paddingHorizontal: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e2e8f0',
  },
  actionsSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2a2a3a', // Dark purple
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#6b46c1', // Dark purple accent
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
});
