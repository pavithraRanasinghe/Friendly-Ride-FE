import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Button from '../Button/button';
import {theme} from '../../core/theme';

interface TripDetailModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  tripDetails: TripDetails | null; // Can handle null in case of no trip selected
}

// interface RouteDetails {
//   driverName: string;
//   carModel: string;
//   color: string;
//   maxPassengers: string;
//   rideStart: string;
//   rideEnd: string;
//   date: string;
//   startTime: string;
//   endTime: string;
// }

interface TripDetails {
  firstRoute: any;
  secondRoute?: any; // Optional second route for multi-route trips
  price: string;
}

const TripDetailModal: React.FC<TripDetailModalProps> = ({
  isVisible,
  onClose,
  onConfirm,
  tripDetails,
}) => {
  if (!tripDetails) {
    return null;
  }

  const renderRouteDetails = (route: any, title: string) => {
    return (
      <>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.detailSection}>
          <Text style={styles.label}>Driver:</Text>
          <Text style={styles.value}>{route.driverName}</Text>
        </View>
        <View style={styles.detailSection}>
          <Text style={styles.label}>Car:</Text>
          <Text style={styles.value}>
            {route.carModel} ({route.color})
          </Text>
        </View>
        <View style={styles.detailSection}>
          <Text style={styles.label}>Max Passengers:</Text>
          <Text style={styles.value}>{route.maxPassengers}</Text>
        </View>
        <View style={styles.detailSection}>
          <Text style={styles.label}>Start:</Text>
          <Text style={styles.value}>{route.startTime}</Text>
        </View>
        <View style={styles.detailSection}>
          <Text style={styles.label}>End:</Text>
          <Text style={styles.value}>{route.expectedEndTime}</Text>
        </View>
        <View style={styles.detailSection}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{route.date}</Text>
        </View>
      </>
    );
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView>
            <Text style={styles.title}>Trip Details</Text>
            {renderRouteDetails(tripDetails.firstRoute, 'First Route')}
            {tripDetails.secondRoute &&
              renderRouteDetails(tripDetails.secondRoute, 'Second Route')}
            <View style={styles.detailSection}>
              <Text style={styles.label}>Total Price:</Text>
              <Text style={styles.value}>LKR {tripDetails.price}</Text>
            </View>
          </ScrollView>
          <View style={styles.actions}>
            <Button mode="contained" onPress={onConfirm}>
              Confirm
            </Button>
          </View>
          <View>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    color: theme.colors.primary,
  },
  detailSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    color: theme.colors.secondary,
  },
  value: {
    fontSize: 16,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  actions: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancel: {
    marginTop: 16,
    fontSize: 16,
    color: theme.colors.secondary,
    textAlign: 'center',
  },
});

export default TripDetailModal;
