import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Maps from '../Maps'; // Assuming you already have a Maps component for location selection
import apiClient from '../../config/ApiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

const AddRoute = () => {
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [endTime, setEndTime] = useState(new Date());
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [startLocation, setStartLocation] = useState<any>(null);
  const [endLocation, setEndLocation] = useState<any>(null);
  const [maxPassengers, setMaxPassengers] = useState('');

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

  const handleSubmit = async () => {
    const now = new Date();

    // Validate fields are filled
    if (
      !startDate ||
      !startTime ||
      !endTime ||
      !startLocation ||
      !endLocation ||
      !maxPassengers
    ) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    // Validate start date is not in the past
    if (startDate < new Date(now.toDateString())) {
      Alert.alert('Error', 'Start date cannot be in the past');
      return;
    }

    // Validate start time is not in the past for today
    if (startDate.toDateString() === now.toDateString() && startTime < now) {
      Alert.alert('Error', 'Start time cannot be in the past');
      return;
    }

    // Validate end time is after start time
    if (endTime <= startTime) {
      Alert.alert('Error', 'End time must be after start time');
      return;
    }

    // Validate max passengers is a positive integer
    const parsedPassengers = parseInt(maxPassengers, 10);
    if (isNaN(parsedPassengers) || parsedPassengers <= 0) {
      Alert.alert('Error', 'Max passengers must be a positive number');
      return;
    }

    const userId = await getUserID();

    const payload = {
      startDate: startDate.toISOString().split('T')[0],
      startTime: startTime.toISOString().split('T')[1].split('.')[0],
      endTime: endTime.toISOString().split('T')[1].split('.')[0],
      startLatitude: startLocation.latitude,
      startLongitude: startLocation.longitude,
      endLatitude: endLocation.latitude,
      endLongitude: endLocation.longitude,
      maxPassengers: parsedPassengers,
      driverId: parseInt(userId!, 10),
    };

    try {
      const response = await apiClient.post('/route', payload);

      if (response.data) {
        Alert.alert('Success', 'Route added successfully');
      } else {
        const errorData = await response.data;
        Alert.alert('Error', errorData.message || 'Failed to add route');
      }
    } catch (error) {
      console.error('Error adding route:', error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{name: 'Landing' as never}],
          })
        }
        style={styles.backContainer}>
        <Image
          style={styles.image}
          source={require('../../assets/arrow_back.png')}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Add Route</Text>

      {/* Date Picker */}
      <View style={styles.field}>
        <Text style={styles.label}>Start Date:</Text>
        <Button
          color={'#6854a4'}
          title={startDate.toDateString()}
          onPress={() => setShowStartDatePicker(true)}
        />
        {showStartDatePicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            minimumDate={new Date()}
            onChange={(event, date) => {
              setShowStartDatePicker(false);
              if (date) {
                setStartDate(date);
              }
            }}
          />
        )}
      </View>

      {/* Time Pickers */}
      <View style={styles.field}>
        <Text style={styles.label}>Start Time:</Text>
        <Button
          color={'#6854a4'}
          title={startTime.toTimeString().split(' ')[0]}
          onPress={() => setShowStartTimePicker(true)}
        />
        {showStartTimePicker && (
          <DateTimePicker
            value={startTime}
            mode="time"
            display="default"
            minimumDate={
              startDate.toDateString() === new Date().toDateString()
                ? new Date() // Disable past times for today
                : undefined
            }
            onChange={(event, time) => {
              setShowStartTimePicker(false);
              if (time) {
                setStartTime(time);
              }
            }}
          />
        )}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>End Time:</Text>
        <Button
          color={'#6854a4'}
          title={endTime.toTimeString().split(' ')[0]}
          onPress={() => setShowEndTimePicker(true)}
        />
        {showEndTimePicker && (
          <DateTimePicker
            value={endTime}
            mode="time"
            display="default"
            minimumDate={startTime}
            onChange={(event, time) => {
              setShowEndTimePicker(false);
              if (time) {
                setEndTime(time);
              }
            }}
          />
        )}
      </View>

      {/* Location Pickers */}
      <Text style={styles.label}>Set Route:</Text>
      <Maps
        isAutoSelection={true}
        setOrigin={setStartLocation}
        setDestination={setEndLocation}
      />

      {/* Max Passengers */}
      <View style={styles.field}>
        <Text style={styles.label}>Max Passengers:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter max passengers"
          value={maxPassengers}
          onChangeText={setMaxPassengers}
        />
      </View>

      {/* Submit Button */}
      <Button color={'#6854a4'} title="Submit Route" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },
  button: {
    width: '100%',
    backgroundColor: '#6854a4',
    marginVertical: 10,
    paddingVertical: 2,
  },
  backContainer: {
    position: 'absolute',
    top: 10,
    left: 0,
  },
  image: {
    width: 24,
    height: 24,
  },
});

export default AddRoute;
