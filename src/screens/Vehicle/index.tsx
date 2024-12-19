import React, {useEffect, useState} from 'react';
import {View, Text, Alert, StyleSheet} from 'react-native';
import TextInput from '../../components/Input/input';
import Button from '../../components/Button/button';
import {useNavigation} from '@react-navigation/native';
import apiClient from '../../config/ApiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VehicleRegistration: React.FC = () => {
  const navigation = useNavigation();

  const [name, setName] = useState({value: '', error: ''});
  const [model, setModel] = useState({value: '', error: ''});
  const [plateNumber, setPlateNumber] = useState({value: '', error: ''});
  const [colour, setColour] = useState({value: '', error: ''});

  // Function to get the token from AsyncStorage
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

  const validateInputs = () => {
    if (name.value.trim() === '') {
      setName({value: name.value, error: 'Vehicle name is required'});
      return false;
    }
    if (model.value.trim() === '') {
      setModel({value: model.value, error: 'Vehicle model is required'});
      return false;
    }
    if (plateNumber.value.trim() === '') {
      setPlateNumber({
        value: plateNumber.value,
        error: 'Plate number is required',
      });
      return false;
    }
    if (colour.value.trim() === '') {
      setColour({value: colour.value, error: 'Vehicle colour is required'});
      return false;
    }
    return true;
  };

  useEffect(() => {}, []);

  const onRegisterVehicle = async () => {
    if (!validateInputs()) return;
    const driverId = await getUserID();

    const payload = {
      name: name.value,
      model: model.value,
      plateNumber: plateNumber.value,
      colour: colour.value,
      driverId, // Use the logged-in driver's ID
    };

    try {
      const response = await apiClient.post('/vehicle', payload);
      if (response.status === 200) {
        Alert.alert('Success', 'Vehicle registered successfully');
        navigation.reset({
          index: 0,
          routes: [{name: 'Login' as never}], // Navigate to the Home screen
        });
      } else {
        Alert.alert('Error', 'Failed to register vehicle');
      }
    } catch (error: any) {
      console.error('Error registering vehicle:', error);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Something went wrong',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vehicle Registration</Text>

      <TextInput
        label="Vehicle Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({value: text, error: ''})}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Model"
        returnKeyType="next"
        value={model.value}
        onChangeText={text => setModel({value: text, error: ''})}
        error={!!model.error}
        errorText={model.error}
      />
      <TextInput
        label="Plate Number"
        returnKeyType="next"
        value={plateNumber.value}
        onChangeText={text => setPlateNumber({value: text, error: ''})}
        error={!!plateNumber.error}
        errorText={plateNumber.error}
      />
      <TextInput
        label="Colour"
        returnKeyType="next"
        value={colour.value}
        onChangeText={text => setColour({value: text, error: ''})}
        error={!!colour.error}
        errorText={colour.error}
      />

      <Button
        mode="contained"
        onPress={onRegisterVehicle}
        style={{marginTop: 24}}>
        Register Vehicle
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default VehicleRegistration;
