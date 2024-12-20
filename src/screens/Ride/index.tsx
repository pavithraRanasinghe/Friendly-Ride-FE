import React, {useEffect, useState} from 'react';
import {ScrollView, View, Alert} from 'react-native';
import Maps from '../Maps';
import {styles} from './index.style';
import Button from '../../components/Button/button';
import Header from '../../components/Header';
import DriverCard from '../../components/DriverCard';
import apiClient from '../../config/ApiClient';
import TripDetailModal from '../../components/RideDetailsModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
// import RideDetailsModal from '../../components/RideDetailsModal';

const Ride = () => {
  const navigation = useNavigation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<any>(null); // Store selected trip details

  const [isDriverListVisible, setIsDriverListVisible] = useState(false);
  const [driverList, setDriverList] = useState([]); // Store the list of rides
  const [origin, setOrigin] = useState<any>(null); // Origin location
  const [destination, setDestination] = useState<any>(null); // Destination location
  const [clearMapTrigger, setClearMapTrigger] = useState(false);

  const getUserID = async (): Promise<string | null> => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      console.log('UserID L ', userId);
      return userId;
    } catch (error) {
      console.error('Error retrieving JWT token from AsyncStorage:', error);
      return null;
    }
  };

  const fetchDrivers = async () => {
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
      const data = await response.data;
      setDriverList(data);
      setIsDriverListVisible(true);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      clear();
    });

    return unsubscribe;
  }, [navigation]);

  const clear = () => {
    setDriverList([]);
    setOrigin(null);
    setDestination(null);
    setIsDriverListVisible(false);
    setClearMapTrigger(prev => !prev);
  };

  const handleCardPress = (ride: any) => {
    const tripDetails = {
      firstRoute: {
        id: ride.firstRoute.id,
        driverName: `${ride.firstRoute.driverResponse.firstName} ${ride.firstRoute.driverResponse.lastName}`,
        carModel: ride.firstRoute.driverResponse.vehicle.name,
        color: ride.firstRoute.driverResponse.vehicle.colour,
        maxPassengers: ride.firstRoute.maxPassengers,
        rideStart: `${ride.firstRoute.startLatitude}, ${ride.firstRoute.startLongitude}`,
        rideEnd: `${ride.firstRoute.endLatitude}, ${ride.firstRoute.endLongitude}`,
        date: ride.firstRoute.date,
        startTime: ride.firstRoute.startTime,
        endTime: ride.firstRoute.expectedEndTime,
      },
      secondRoute: ride.secondRoute
        ? {
            id: ride.secondRoute.id,
            driverName: `${ride.secondRoute.driverResponse.firstName} ${ride.secondRoute.driverResponse.lastName}`,
            carModel: ride.secondRoute.driverResponse.vehicle.name,
            color: ride.secondRoute.driverResponse.vehicle.colour,
            maxPassengers: ride.secondRoute.maxPassengers,
            rideStart: `${ride.secondRoute.startLatitude}, ${ride.secondRoute.startLongitude}`,
            rideEnd: `${ride.secondRoute.endLatitude}, ${ride.secondRoute.endLongitude}`,
            date: ride.secondRoute.date,
            startTime: ride.secondRoute.startTime,
            endTime: ride.secondRoute.expectedEndTime,
          }
        : null,
      price: ride.price,
    };

    setSelectedTrip(tripDetails);
    setIsModalVisible(true);
  };

  const handleConfirm = async () => {
    if (!selectedTrip) {
      console.error('No trip selected');
      return;
    }

    const passengerId = await getUserID();
    const routeIds = [];
    console.log('Selected Trip:', selectedTrip);
    if (selectedTrip.firstRoute) {
      routeIds.push(selectedTrip.firstRoute.id);
    }

    if (selectedTrip.secondRoute) {
      routeIds.push(selectedTrip.secondRoute.id);
    }

    const payload = {
      passengerId,
      routeIds,
    };

    try {
      const response = await apiClient.put('/route', payload);

      if (response.status === 200) {
        Alert.alert('Success', 'Trip booked successfully');
        setIsModalVisible(false);
        setSelectedTrip(null);

        navigation.reset({
          index: 0,
          routes: [{name: 'Ride' as never}],
        });
      } else {
        console.error('Failed to book trip', response);
        Alert.alert('Error', 'Failed to book the trip');
      }
    } catch (error) {
      console.error('Error booking trip:', error);
      Alert.alert('Error', 'Something went wrong while booking the trip');
    }
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
            clearTrigger={clearMapTrigger}
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
            const {firstRoute, secondRoute, price} = ride;
            // Single-driver card (no second route)
            if (!secondRoute) {
              return (
                <DriverCard
                  key={index}
                  driver={{
                    name: `${firstRoute.driverResponse.firstName} ${firstRoute.driverResponse.lastName}`,
                    rating: 5,
                    carModel: firstRoute.driverResponse.vehicle.name,
                    color: firstRoute.driverResponse.contact,
                    maxPassengers: firstRoute.maxPassengers,
                    rideStart: `${firstRoute.startLatitude}, ${firstRoute.startLongitude}`,
                    rideEnd: `${firstRoute.endLatitude}, ${firstRoute.endLongitude}`,
                    date: firstRoute.date,
                    startTime: firstRoute.startTime,
                    endTime: firstRoute.expectedEndTime,
                    carImage: '',
                    price: price,
                  }}
                  onPress={() => handleCardPress(ride)}
                />
              );
            }

            // Multi-driver card (both routes available)
            return (
              <DriverCard
                key={index}
                driver={{
                  name: `${firstRoute.driverResponse.firstName} & ${secondRoute.driverResponse.firstName}`,
                  rating: 5,
                  carModel: `${firstRoute.driverResponse.vehicle.name} & ${secondRoute.driverResponse.vehicle.name}`,
                  color: `${firstRoute.driverResponse.vehicle.colour} & ${secondRoute.driverResponse.vehicle.colour}`,
                  maxPassengers: `${firstRoute.maxPassengers} & ${secondRoute.maxPassengers}`,
                  rideStart: `${firstRoute.startLatitude}, ${firstRoute.startLongitude}`,
                  rideEnd: `${secondRoute.endLatitude}, ${secondRoute.endLongitude}`,
                  date: firstRoute.date,
                  startTime: firstRoute.startTime,
                  endTime: secondRoute.expectedEndTime,
                  carImage: '',
                  price: price,
                }}
                onPress={() => handleCardPress(ride)}
              />
            );
          })}
        </ScrollView>
      )}
      <TripDetailModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onConfirm={handleConfirm}
        tripDetails={selectedTrip!}
      />
    </View>
  );
};

export default Ride;
