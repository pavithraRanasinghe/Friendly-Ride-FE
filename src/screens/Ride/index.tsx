import React, {useState} from 'react';
import {ScrollView, View, Alert} from 'react-native';
import Maps from '../Maps';
import {styles} from './index.style';
import Button from '../../components/Button/button';
import Header from '../../components/Header';
import DriverCard from '../../components/DriverCard';
import apiClient from '../../config/ApiClient';
// import RideDetailsModal from '../../components/RideDetailsModal';

const Ride = () => {
  const [_, setIsModalVisible] = useState(false);
  const [isDriverListVisible, setIsDriverListVisible] = useState(false);
  const [driverList, setDriverList] = useState([]); // Store the list of rides
  const [origin, setOrigin] = useState<any>(null); // Origin location
  const [destination, setDestination] = useState<any>(null); // Destination location

  const fetchDrivers = async () => {
    console.log('Fetching drivers...');
    if (isDriverListVisible) {
      clear();
      return;
    }
    if (!origin || !destination) {
      Alert.alert('Error', 'Please select origin and destination');
      return;
    }

    const startLatitude = origin.latitude;
    const startLongitude = origin.longitude;
    const endLatitude = destination.latitude;
    const endLongitude = destination.longitude;
    const startTime = '05:30:00'; // Example, replace with user input or current time

    try {
      const response = await apiClient.get(
        `/route/search?startLongitude=${startLongitude}&startLatitude=${startLatitude}&endLongitude=${endLongitude}&endLatitude=${endLatitude}&startTime=${startTime}`,
      );
      console.log('Driver response : ', response);
      const data = await response.data;
      setDriverList(data); // Update the driver list state
      setIsDriverListVisible(true);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  const clear = () => {
    setDriverList([]);
    setOrigin(null);
    setDestination(null);
    setIsDriverListVisible(false);
  };

  return (
    <View>
      <View style={styles.container}>
        <Header>Find Your Ride</Header>
        <View style={styles.mapContainer}>
          <Maps
            isAutoSelection={true}
            setOrigin={setOrigin}
            setDestination={setDestination}
          />
        </View>
        <View>
          <Button
            mode="contained"
            onPress={fetchDrivers} // Fetch drivers when Search Ride button is pressed
            style={styles.rideButton}>
            {isDriverListVisible ? 'Reset' : 'Search Ride'}
          </Button>
        </View>
      </View>
      {isDriverListVisible && (
        <ScrollView>
          {driverList.map((ride: any, index) => {
            const {firstRoute, secondRoute} = ride;
            // Single-driver card (no second route)
            if (!secondRoute) {
              return (
                <DriverCard
                  key={index}
                  driver={{
                    name: `${firstRoute.driverResponse.firstName} ${firstRoute.driverResponse.lastName}`,
                    rating: 5,
                    carModel: `${firstRoute.driverResponse.contact}`,
                    color: `${firstRoute.driverResponse.contact}`,
                    maxPassengers: 'Varies',
                    rideStart: `${firstRoute.startLatitude}, ${firstRoute.startLongitude}`,
                    rideEnd: `${firstRoute.endLatitude}, ${firstRoute.endLongitude}`,
                    date: 'Varies',
                    startTime: firstRoute.startTime,
                    endTime: firstRoute.expectedEndTime,
                    carImage: '',
                    price: 'Price',
                  }}
                  onPress={() => setIsModalVisible(true)}
                />
              );
            }

            // Multi-driver card (both routes available)
            return (
              <DriverCard
                key={index}
                driver={{
                  name: `${firstRoute.driverResponse.firstName} & ${secondRoute.driverResponse.firstName}`,
                  rating: 5, // Placeholder, replace with actual data if available
                  carModel: 'Multiple Vehicles',
                  color: 'Varies',
                  maxPassengers: 'Varies',
                  rideStart: `${firstRoute.startLatitude}, ${firstRoute.startLongitude}`,
                  rideEnd: `${secondRoute.endLatitude}, ${secondRoute.endLongitude}`,
                  date: 'Varies', // Update with actual date if available
                  startTime: firstRoute.startTime,
                  endTime: secondRoute.expectedEndTime,
                  carImage: '', // Placeholder, replace with actual car image if available
                  price: 'Combined Price', // Replace with calculated price
                }}
                onPress={() => setIsModalVisible(true)}
              />
            );
          })}
        </ScrollView>
      )}
      {/* <RideDetailsModal
        isVisible={isModalVisible}
        onConfirm={onConfirm}
        onClose={() => setIsModalVisible(false)}
        rideDetails={{}} // Pass ride details dynamically
      /> */}
    </View>
  );
};

export default Ride;
