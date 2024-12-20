import React, {useEffect, useState} from 'react';
import {ScrollView, View, Alert} from 'react-native';
import Maps from '../Maps';
import {styles} from './index.style';
import Button from '../../components/Button/button';
import Header from '../../components/Header';
import BackButton from '../../components/Button/backButton';
import RideDetail from '../../components/RideDetail';
import apiClient from '../../config/ApiClient';

const OnGoingRide = () => {
  const [rideDetails, setRideDetails] = useState<any[]>([]); // Store the list of ongoing rides
  const passengerId = 1; // Replace with the actual logged-in passenger ID
  const [selectedRide, setSelectedRide] = useState<any>(null);

  const fetchOngoingRides = async () => {
    try {
      const response = await apiClient.get(`/route/passenger/${passengerId}`);
      const data = response.data;
      setRideDetails(data);
      if (data.length > 0) {
        setSelectedRide(data[0]); // Default to the first ride
      }
    } catch (error) {
      console.error('Error fetching ongoing rides:', error);
      Alert.alert('Error', 'Failed to fetch ongoing rides');
    }
  };

  const cancelRide = () => {
    Alert.alert('Cancel Ride', 'Are you sure you want to cancel this ride?', [
      {text: 'No', style: 'cancel'},
      {
        text: 'Yes',
        onPress: () => {
          console.log('Ride cancelled:', selectedRide);
          // Add cancellation API call if needed
        },
      },
    ]);
  };

  useEffect(() => {
    fetchOngoingRides();
  }, []);

  if (!selectedRide) {
    return (
      <ScrollView>
        <BackButton />
        <View style={styles.container}>
          <Header>No Ongoing Ride</Header>
        </View>
      </ScrollView>
    );
  }

  const markers = rideDetails.map(ride => ({
    start: {
      latitude: ride.startLatitude,
      longitude: ride.startLongitude,
    },
    end: {
      latitude: ride.endLatitude,
      longitude: ride.endLongitude,
    },
  }));
  console.log('Markers:', markers);
  return (
    <ScrollView>
      <BackButton />
      <View style={styles.container}>
        <Header>Ongoing Ride</Header>
        <View style={styles.mapContainer}>
          <Maps
            isAutoSelection={false}
            markers={markers} // Pass markers to the Maps component
          />
        </View>
      </View>
      {selectedRide && (
        <RideDetail
          rideDetails={{
            driverName: `${selectedRide.driverResponse.firstName} ${selectedRide.driverResponse.lastName}`,
            nic: selectedRide.driverResponse.nic,
            contact: selectedRide.driverResponse.contact,
            rating: 5, // Replace with actual rating if available
            carName: selectedRide.driverResponse.vehicle.name,
            vehicleNumber: selectedRide.driverResponse.vehicle.plateNumber,
            color: selectedRide.driverResponse.vehicle.colour,
            registration: 'Valid', // Example value, replace with actual data
            price: '1500.00', // Replace with actual price if available
            date: selectedRide.date,
            passengerCount: 'N/A', // Replace with actual data if available
            startLocation: `${selectedRide.startLatitude}, ${selectedRide.startLongitude}`,
            destination: `${selectedRide.endLatitude}, ${selectedRide.endLongitude}`,
            startTime: selectedRide.startTime,
            endTime: selectedRide.expectedEndTime,
            carImage: 'https://path/to/car/image.png', // Replace with actual car image if available
          }}
        />
      )}
      <Button mode="outlined" onPress={cancelRide} style={styles.rideButton}>
        Cancel
      </Button>
    </ScrollView>
  );
};

export default OnGoingRide;
