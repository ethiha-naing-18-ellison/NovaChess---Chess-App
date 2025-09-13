// NovaChess - Enhanced Customize Screen Component
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { HeaderNav } from './HeaderNav';
import { FooterNav } from './FooterNav';
import { CustomizeIcon, GameIcon, TargetIcon, ZapIcon, CheckIcon } from './icons/SvgIcons';
import { 
  BOARD_THEMES, 
  PIECE_STYLES, 
  PIECE_TYPES,
  saveCustomization,
  loadCustomization,
  resetCustomization,
  DEFAULT_CUSTOMIZATION
} from '../utils/customizationUtils';

export const CustomizeScreen = ({ activeTab, onTabPress, onProfilePress, onNotificationPress, onBack, onCustomizationUpdate }) => {
  const [customization, setCustomization] = useState(DEFAULT_CUSTOMIZATION);
  const [hasChanges, setHasChanges] = useState(false);

  // Ensure customization has all required properties
  const safeCustomization = {
    boardTheme: customization.boardTheme || DEFAULT_CUSTOMIZATION.boardTheme,
    pieceStyle: customization.pieceStyle || DEFAULT_CUSTOMIZATION.pieceStyle,
    pieceType: customization.pieceType || DEFAULT_CUSTOMIZATION.pieceType,
    soundEnabled: customization.soundEnabled !== undefined ? customization.soundEnabled : DEFAULT_CUSTOMIZATION.soundEnabled,
    animationsEnabled: customization.animationsEnabled !== undefined ? customization.animationsEnabled : DEFAULT_CUSTOMIZATION.animationsEnabled,
  };

  useEffect(() => {
    loadCustomizationSettings();
  }, []);

  const loadCustomizationSettings = async () => {
    const saved = await loadCustomization();
    console.log('CustomizeScreen - Loaded customizations:', saved);
    setCustomization(saved);
  };

  const updateCustomization = (key, value) => {
    const newCustomization = { ...safeCustomization, [key]: value };
    setCustomization(newCustomization);
    setHasChanges(true);
  };

  const handleSave = async () => {
    console.log('CustomizeScreen - Saving customizations:', safeCustomization);
    const success = await saveCustomization(safeCustomization);
    if (success) {
      setHasChanges(false);
      // Notify parent component to reload customizations
      if (onCustomizationUpdate) {
        onCustomizationUpdate();
      }
      Alert.alert('Success', 'Your customizations have been saved!');
    } else {
      Alert.alert('Error', 'Failed to save customizations. Please try again.');
    }
  };

  const handleReset = () => {
    Alert.alert(
      'Reset Customizations',
      'Are you sure you want to reset all customizations to default?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive',
          onPress: async () => {
            const defaultSettings = await resetCustomization();
            setCustomization(defaultSettings);
            setHasChanges(false);
            // Notify parent component to reload customizations
            if (onCustomizationUpdate) {
              onCustomizationUpdate();
            }
            Alert.alert('Success', 'Customizations have been reset to default.');
          }
        }
      ]
    );
  };

  const renderPieceTypeSelector = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Piece Type</Text>
      <View style={styles.themeGrid}>
        {Object.values(PIECE_TYPES).map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[
              styles.themeCard,
              safeCustomization.pieceType === type.id && styles.selectedThemeCard,
            ]}
            onPress={() => updateCustomization('pieceType', type.id)}
          >
            <View style={styles.pieceTypePreview}>
              <Text style={[styles.pieceTypeSymbol, { color: '#ffffff' }]}>
                {type.symbols?.['K'] || '♔'}
              </Text>
              <Text style={[styles.pieceTypeSymbol, { color: '#000000' }]}>
                {type.symbols?.['k'] || '♚'}
              </Text>
              <Text style={[styles.pieceTypeSymbol, { color: '#ffffff' }]}>
                {type.symbols?.['Q'] || '♕'}
              </Text>
              <Text style={[styles.pieceTypeSymbol, { color: '#000000' }]}>
                {type.symbols?.['q'] || '♛'}
              </Text>
            </View>
            <Text style={[
              styles.themeName,
              safeCustomization.pieceType === type.id && styles.selectedThemeName,
            ]}>
              {type.name}
            </Text>
            <Text style={styles.themeDescription}>{type.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderThemeSelector = (title, themes, selectedId, onSelect, type) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.themeGrid}>
        {Object.values(themes).map((theme) => (
          <TouchableOpacity
            key={theme.id}
            style={[
              styles.themeCard,
              selectedId === theme.id && styles.selectedThemeCard,
            ]}
            onPress={() => onSelect(theme.id)}
          >
            {type === 'board' && (
              <View style={styles.themePreview}>
                <View style={[styles.themeSquare, { backgroundColor: theme.lightSquare }]} />
                <View style={[styles.themeSquare, { backgroundColor: theme.darkSquare }]} />
                <View style={[styles.themeSquare, { backgroundColor: theme.lightSquare }]} />
                <View style={[styles.themeSquare, { backgroundColor: theme.darkSquare }]} />
              </View>
            )}
            {type === 'piece' && (
              <View style={styles.piecePreview}>
                <Text style={[styles.pieceSymbol, { color: theme.whiteColor }]}>♔</Text>
                <Text style={[styles.pieceSymbol, { color: theme.blackColor }]}>♚</Text>
              </View>
            )}
            {type === 'ui' && (
              <View style={[styles.uiPreview, { backgroundColor: theme.backgroundColor }]}>
                <View style={[styles.uiCard, { backgroundColor: theme.cardColor }]} />
                <View style={[styles.uiAccent, { backgroundColor: theme.accentColor }]} />
              </View>
            )}
            <Text style={[
              styles.themeName,
              selectedId === theme.id && styles.selectedThemeName,
            ]}>
              {theme.name}
            </Text>
            <Text style={styles.themeDescription}>{theme.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );


  const renderToggleSetting = (title, description, value, onToggle, icon) => (
    <View style={styles.settingCard}>
      <View style={styles.settingInfo}>
        {icon}
        <View style={styles.settingText}>
          <Text style={styles.settingName}>{title}</Text>
          <Text style={styles.settingDescription}>{description}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.toggleButton,
          value && styles.toggleButtonActive,
        ]}
        onPress={onToggle}
      >
        <View style={[
          styles.toggleSlider,
          value && styles.toggleSliderActive,
        ]} />
      </TouchableOpacity>
    </View>
  );

  const renderPreview = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Live Preview</Text>
      <View style={styles.previewCard}>
        <View style={styles.previewBoard}>
          {Array.from({ length: 8 }, (_, row) =>
            Array.from({ length: 8 }, (_, col) => {
              const isLight = (row + col) % 2 === 0;
              const boardTheme = BOARD_THEMES[safeCustomization.boardTheme?.toUpperCase()] || BOARD_THEMES.CLASSIC;
              const pieceStyle = PIECE_STYLES[safeCustomization.pieceStyle?.toUpperCase()] || PIECE_STYLES.CLASSIC;
              const pieceType = PIECE_TYPES[safeCustomization.pieceType?.toUpperCase()] || PIECE_TYPES.STAUNTON;
              
              return (
                <View
                  key={`${row}-${col}`}
                  style={[
                    styles.previewSquare,
                    { 
                      backgroundColor: isLight ? boardTheme.lightSquare : boardTheme.darkSquare,
                      width: 40, // Fixed small size for preview
                      height: 40, // Fixed small size for preview
                    }
                  ]}
                >
                  {(row === 0 || row === 7) && (
                    <Text style={[
                      styles.previewPiece,
                      { 
                        color: row === 0 ? pieceStyle.blackColor : pieceStyle.whiteColor,
                        fontSize: 24 // Fixed font size for preview
                      }
                    ]}>
                      {row === 0 ? (pieceType.symbols?.['r'] || '♜') : (pieceType.symbols?.['R'] || '♖')}
                    </Text>
                  )}
                </View>
              );
            })
          )}
        </View>
        <Text style={styles.previewText}>
          Your customizations will be applied to all games
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <HeaderNav
        title="Customize"
        onProfilePress={onProfilePress}
        onNotificationPress={onNotificationPress}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Board Theme Section */}
        {renderThemeSelector(
          'Board Theme',
          BOARD_THEMES,
          safeCustomization.boardTheme,
          (id) => updateCustomization('boardTheme', id),
          'board'
        )}

        {/* Piece Style Section */}
        {renderThemeSelector(
          'Piece Style',
          PIECE_STYLES,
          safeCustomization.pieceStyle,
          (id) => updateCustomization('pieceStyle', id),
          'piece'
        )}

        {/* Piece Type Section */}
        {renderPieceTypeSelector()}


        {/* Game Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Game Settings</Text>
          
          {renderToggleSetting(
            'Sound Effects',
            'Enable move sounds and notifications',
            safeCustomization.soundEnabled,
            () => updateCustomization('soundEnabled', !safeCustomization.soundEnabled),
            <ZapIcon size={24} color="#e2e8f0" />
          )}

          {renderToggleSetting(
            'Animations',
            'Enable smooth move animations',
            safeCustomization.animationsEnabled,
            () => updateCustomization('animationsEnabled', !safeCustomization.animationsEnabled),
            <TargetIcon size={24} color="#e2e8f0" />
          )}
        </View>

        {/* Live Preview Section */}
        {renderPreview()}

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.saveButton]}
            onPress={handleSave}
            disabled={!hasChanges}
          >
            <CheckIcon size={20} color="#ffffff" />
            <Text style={styles.saveButtonText}>
              {hasChanges ? 'Save Changes' : 'Saved'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.resetButton]}
            onPress={handleReset}
          >
            <CustomizeIcon size={20} color="#e2e8f0" />
            <Text style={styles.resetButtonText}>Reset to Default</Text>
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
  themeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  themeCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a3a',
    minWidth: 100,
    flex: 1,
    maxWidth: '30%',
  },
  selectedThemeCard: {
    borderColor: '#6b46c1',
    backgroundColor: '#1a1a2e',
  },
  themePreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  piecePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  uiPreview: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginBottom: 8,
    padding: 4,
    justifyContent: 'space-between',
  },
  uiCard: {
    width: '100%',
    height: '60%',
    borderRadius: 4,
  },
  uiAccent: {
    width: '100%',
    height: '30%',
    borderRadius: 2,
  },
  themeSquare: {
    width: 20,
    height: 20,
  },
  pieceSymbol: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  pieceTypePreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    gap: 4,
  },
  pieceTypeSymbol: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  themeName: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '600',
    marginBottom: 2,
  },
  selectedThemeName: {
    color: '#6b46c1',
  },
  themeDescription: {
    fontSize: 10,
    color: '#64748b',
    textAlign: 'center',
  },
  settingCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2a2a3a',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 12,
    flex: 1,
  },
  settingName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e2e8f0',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#94a3b8',
  },
  toggleButton: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#2a2a3a',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleButtonActive: {
    backgroundColor: '#6b46c1',
  },
  toggleSlider: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#94a3b8',
  },
  toggleSliderActive: {
    backgroundColor: '#e2e8f0',
    alignSelf: 'flex-end',
  },
  previewCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a3a',
  },
  previewBoard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 15,
  },
  previewSquare: {
    borderWidth: 0.5,
    borderColor: '#2a2a3a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewPiece: {
    fontWeight: 'bold',
  },
  previewText: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    gap: 8,
  },
  saveButton: {
    backgroundColor: '#6b46c1',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#1a1a2e',
    borderWidth: 1,
    borderColor: '#2a2a3a',
  },
  resetButtonText: {
    color: '#e2e8f0',
    fontSize: 16,
    fontWeight: '600',
  },
});