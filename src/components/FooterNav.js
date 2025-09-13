// NovaChess - Footer Navigation Component
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { HomeIcon, PlayIcon, LearnIcon, CustomizeIcon, ProfileIcon } from './icons/SvgIcons';

export const FooterNav = ({ activeTab, onTabPress }) => {
  const tabs = [
    {
      id: 'home',
      label: 'Home',
      icon: HomeIcon,
    },
    {
      id: 'play',
      label: 'Play',
      icon: PlayIcon,
    },
    {
      id: 'learn',
      label: 'Learn',
      icon: LearnIcon,
    },
    {
      id: 'customize',
      label: 'Customize',
      icon: CustomizeIcon,
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: ProfileIcon,
    },
  ];

  return (
    <View style={styles.footerContainer}>
      <View style={styles.footerContent}>
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tabButton,
                activeTab === tab.id && styles.activeTabButton,
              ]}
              onPress={() => onTabPress(tab.id)}
            >
              <IconComponent 
                size={20} 
                active={activeTab === tab.id}
              />
              <Text style={[
                styles.tabLabel,
                activeTab === tab.id && styles.activeTabLabel,
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: '#1a1a2e', // Dark purple-black
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#2a2a3a', // Dark purple border
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabButton: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    minWidth: 60,
  },
  activeTabButton: {
    backgroundColor: 'rgba(107, 70, 193, 0.2)', // Dark purple with transparency
  },
  tabLabel: {
    fontSize: 12,
    color: '#94a3b8', // Muted light text
    fontWeight: '500',
  },
  activeTabLabel: {
    color: '#6b46c1', // Dark purple accent
    fontWeight: '600',
  },
});
