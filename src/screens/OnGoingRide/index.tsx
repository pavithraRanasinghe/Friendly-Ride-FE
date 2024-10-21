import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import Maps from '../Maps';
import {styles} from './index.style';
import Button from '../../components/Button/button';
import Header from '../../components/Header';
import BackButton from '../../components/Button/backButton';
import RideDetail from '../../components/RideDetail';

const OnGoingRide = () => {
  const [isDriverListVisible, setIsDriverListVisible] = useState(false);
  const rideDetails = {
    driverName: 'Pavithra Ransinghe',
    nic: '1923890412',
    contact: '0771234567',
    rating: 5,
    carName: 'Honda Civic Es',
    vehicleNumber: 'CAA - 1821',
    color: 'RED',
    registration: 'Valid',
    price: '1500.00',
    date: '2024-12-30',
    passengerCount: '2/4',
    startLocation: 'Galle',
    destination: 'Colombo',
    startTime: '06:00 PM',
    endTime: '11:00 PM',
    carImage: 'https://path/to/car/image.png',
  };
  return (
    <ScrollView>
      <BackButton />
      <View style={styles.container}>
        <Header>Ongoing Ride</Header>
        <View style={styles.mapContainer}>
          <Maps isAutoSelection={false} />
        </View>
      </View>
      <RideDetail rideDetails={rideDetails} />
      <Button
        mode="outlined"
        onPress={() => setIsDriverListVisible(!isDriverListVisible)}
        style={styles.rideButton}>
        Cancel
      </Button>
    </ScrollView>
  );
};

export default OnGoingRide;
