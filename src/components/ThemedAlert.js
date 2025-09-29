// NovaChess - Themed Alert Component
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { getUITheme } from '../utils/customizationUtils';

const { width } = Dimensions.get('window');

export const ThemedAlert = ({
  visible,
  title,
  message,
  confirmText = 'OK',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  confirmButtonStyle = 'primary',
  showCancel = false,
  customization = {}
}) => {
  const uiTheme = getUITheme(customization.uiTheme);

  const dynamicStyles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      backgroundColor: uiTheme.cardColor,
      borderRadius: 16,
      padding: 24,
      marginHorizontal: 20,
      maxWidth: width * 0.9,
      borderWidth: 1,
      borderColor: '#2a2a3a',
      elevation: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: uiTheme.textColor,
      textAlign: 'center',
      marginBottom: 12,
    },
    message: {
      fontSize: 16,
      color: uiTheme.textColor,
      textAlign: 'center',
      marginBottom: 24,
      lineHeight: 22,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 12,
    },
    button: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
      borderWidth: 1,
    },
    confirmButton: {
      backgroundColor: uiTheme.accentColor,
      borderColor: uiTheme.accentColor,
    },
    cancelButton: {
      backgroundColor: 'transparent',
      borderColor: '#6b7280',
    },
    destructiveButton: {
      backgroundColor: '#dc2626',
      borderColor: '#dc2626',
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '600',
    },
    confirmButtonText: {
      color: uiTheme.textColor,
    },
    cancelButtonText: {
      color: '#6b7280',
    },
    destructiveButtonText: {
      color: '#ffffff',
    },
  });

  const getButtonStyle = () => {
    switch (confirmButtonStyle) {
      case 'destructive':
        return dynamicStyles.destructiveButton;
      default:
        return dynamicStyles.confirmButton;
    }
  };

  const getButtonTextStyle = () => {
    switch (confirmButtonStyle) {
      case 'destructive':
        return dynamicStyles.destructiveButtonText;
      default:
        return dynamicStyles.confirmButtonText;
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={dynamicStyles.overlay}>
        <View style={dynamicStyles.container}>
          <Text style={dynamicStyles.title}>{title}</Text>
          <Text style={dynamicStyles.message}>{message}</Text>
          
          <View style={dynamicStyles.buttonContainer}>
            {showCancel && (
              <TouchableOpacity
                style={[dynamicStyles.button, dynamicStyles.cancelButton]}
                onPress={onCancel}
              >
                <Text style={[dynamicStyles.buttonText, dynamicStyles.cancelButtonText]}>
                  {cancelText}
                </Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity
              style={[dynamicStyles.button, getButtonStyle()]}
              onPress={onConfirm}
            >
              <Text style={[dynamicStyles.buttonText, getButtonTextStyle()]}>
                {confirmText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
