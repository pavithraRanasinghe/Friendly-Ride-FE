import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './index.styles';

interface RideDetailsProps {
  rideDetails: RideDetails;
}

interface RideDetails {
  driverName: string;
  nic: string;
  contact: string;
  rating: number;
  carName: string;
  vehicleNumber: string;
  color: string;
  registration: string;
  price: string;
  date: string;
  passengerCount: string;
  startLocation: string;
  destination: string;
  startTime: string;
  endTime: string;
  carImage: string;
}

const RideDetails: React.FC<RideDetailsProps> = ({rideDetails}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ride Details</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Driver Details</Text>
        <Text style={styles.detailText}>Name - {rideDetails.driverName}</Text>
        <Text style={styles.detailText}>NIC - {rideDetails.nic}</Text>
        <Text style={styles.detailText}>Contact - {rideDetails.contact}</Text>
        <View style={styles.rating}>
          <Text style={styles.detailText}>Rate - </Text>
          {Array.from({length: rideDetails.rating}, (_, index) => (
            <Icon key={index} name="star" size={20} color="#FFD700" />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vehicle Details</Text>
        <Text style={styles.detailText}>Name - {rideDetails.carName}</Text>
        <Text style={styles.detailText}>
          Vehicle Number - {rideDetails.vehicleNumber}
        </Text>
        <Text style={styles.detailText}>Color - {rideDetails.color}</Text>
        <Text style={styles.detailText}>
          Registration - {rideDetails.registration}
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.rowSection}>
          <Text style={styles.sectionTitle}>Ride Details</Text>
          <Text style={styles.sectionTitle}>LKR {rideDetails.price}</Text>
        </View>
        <Text style={styles.detailText}>Date - {rideDetails.date}</Text>
        <Text style={styles.detailText}>
          Start Location - {rideDetails.startLocation}
        </Text>
        <Text style={styles.detailText}>
          Start Time - {rideDetails.startTime}
        </Text>

        <Text style={styles.detailText}>
          Passenger Count - {rideDetails.passengerCount}
        </Text>
        <Text style={styles.detailText}>
          Destination - {rideDetails.destination}
        </Text>
        <Text style={styles.detailText}>End Time - {rideDetails.endTime}</Text>
      </View>
    </View>
  );
};

export default RideDetails;
