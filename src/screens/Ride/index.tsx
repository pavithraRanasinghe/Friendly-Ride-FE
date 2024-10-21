import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import Maps from '../Maps';
import {styles} from './index.style';
import Button from '../../components/Button/button';
import Header from '../../components/Header';
import DriverCard from '../../components/DriverCard';
import RideDetailsModal from '../../components/RideDetailsModal';

const Ride = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDriverListVisible, setIsDriverListVisible] = useState(false);
  const driverDetails = [
    {
      name: 'Mr. Pavithra Ransinghe',
      rating: 5,
      carModel: 'Honda Civic ES1',
      color: 'Red',
      maxPassengers: '2/4',
      rideStart: 'Galle',
      rideEnd: 'Colombo',
      date: '2024-12-21',
      startTime: '12:00 PM',
      endTime: '4:00 PM',
      carImage:
        'https://marketplace.canva.com/EAFzmMYZgLE/1/0/1600w/canva-yellow-and-black-illustrative-automotive-luxury-car-logo-XjE5WZ2IyjU.jpg',
      price: '5682.12',
    },
    {
      name: 'Mr. Pavithra Ransinghe',
      rating: 5,
      carModel: 'Honda Civic ES1',
      color: 'Red',
      maxPassengers: '2/4',
      rideStart: 'Galle',
      rideEnd: 'Colombo',
      date: '2024-12-21',
      startTime: '12:00 PM',
      endTime: '4:00 PM',
      carImage:
        'https://marketplace.canva.com/EAFzmMYZgLE/1/0/1600w/canva-yellow-and-black-illustrative-automotive-luxury-car-logo-XjE5WZ2IyjU.jpg',
      price: '5682.12',
    },
    // Add more driver objects as needed
  ];

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
  };

  const onConfirm = () => {
    setIsModalVisible(false);
  };

  return (
    <View>
      <View style={styles.container}>
        <Header>Find Your Ride</Header>
        <View style={styles.mapContainer}>
          <Maps isAutoSelection={true} />
        </View>
        <View>
          <Button
            mode="contained"
            onPress={() => setIsDriverListVisible(!isDriverListVisible)}
            style={styles.rideButton}>
            {isDriverListVisible ? 'Reset' : 'Search Ride'}
          </Button>
        </View>
      </View>
      {isDriverListVisible && (
        <ScrollView>
          {driverDetails.map((driver, index) => (
            <DriverCard
              key={index}
              driver={driver}
              onPress={() => setIsModalVisible(true)}
            />
          ))}
        </ScrollView>
      )}
      <RideDetailsModal
        isVisible={isModalVisible}
        onConfirm={onConfirm}
        onClose={() => setIsModalVisible(false)}
        rideDetails={rideDetails}
      />
    </View>
  );
};

export default Ride;
