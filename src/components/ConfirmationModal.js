import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const ConfirmationModal = ({ 
  visible, 
  title, 
  message, 
  confirmText = 'Confirm', 
  cancelText = 'Cancel',
  onConfirm, 
  onCancel,
  confirmButtonStyle = 'destructive' // 'destructive' or 'primary'
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onCancel}
              >
                <Text style={styles.cancelButtonText}>{cancelText}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.confirmButton,
                  confirmButtonStyle === 'destructive' ? styles.destructiveButton : styles.primaryButton
                ]}
                onPress={onConfirm}
              >
                <Text style={[
                  styles.confirmButtonText,
                  confirmButtonStyle === 'destructive' ? styles.destructiveButtonText : styles.primaryButtonText
                ]}>
                  {confirmText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.85,
    maxWidth: 400,
  },
  modalContent: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#4CAF50',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  message: {
    color: '#cccccc',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#3a3a3a',
    borderWidth: 1,
    borderColor: '#666666',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#cccccc',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  destructiveButton: {
    backgroundColor: '#f44336',
    borderWidth: 1,
    borderColor: '#f44336',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  destructiveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ConfirmationModal;
