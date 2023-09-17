import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';

interface NotificationsModalProps {
  notifications: string[];
  isVisible: boolean;
  onClose: () => void;
  title: string;
}

const TOP_MARGIN = 0; // Adjust this value as needed

const NotificationsModal: React.FC<NotificationsModalProps> = ({
  notifications,
  isVisible,
  onClose,
  title,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      {/* <StatusBar translucent backgroundColor="transparent" /> */}
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { marginTop: TOP_MARGIN }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Notifications</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.notificationList}>
            {notifications.map((notification, index) => (
              <Text key={index} style={styles.notificationItem}>
                {notification}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    marginTop: 50
  },
  modalContent: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f9f9f9',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    // borderBottomWidth: 1,
    // borderColor: '#ccc',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  notificationList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  notificationItem: {
    fontSize: 16,
    marginVertical: 5,
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold'
  },
});

export default NotificationsModal;
