import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, Alert} from 'react-native';
import Background from '../../components/Background/background';
import BackButton from '../../components/Button/backButton';
import Header from '../../components/Header';
import TextInput from '../../components/Input/input';
import Button from '../../components/Button/button';
import {Text} from 'react-native-paper';
import {styles} from './index.style';
import {useNavigation} from '@react-navigation/native';
import apiClient from '../../config/ApiClient';
import {
  clearToken,
  clearUserDetail,
  saveUserDetial,
} from '../../config/TokenManger';

const Register: React.FC = () => {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState({value: '', error: ''});
  const [lastName, setLastName] = useState({value: '', error: ''});
  const [username, setUsername] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [contact, setContact] = useState({value: '', error: ''});
  const [userType, setUserType] = useState<'DRIVER' | 'PASSENGER'>('PASSENGER');

  const validateInputs = () => {
    if (firstName.value.trim() === '') {
      setFirstName({value: firstName.value, error: 'First name is required'});
      return false;
    }
    if (lastName.value.trim() === '') {
      setLastName({value: lastName.value, error: 'Last name is required'});
      return false;
    }
    if (username.value.trim() === '') {
      setUsername({value: username.value, error: 'Email is required'});
      return false;
    }
    if (password.value.trim() === '') {
      setPassword({value: password.value, error: 'Password is required'});
      return false;
    }
    if (contact.value.trim() === '') {
      setContact({value: contact.value, error: 'Contact number is required'});
      return false;
    }
    return true;
  };
  useEffect(() => {
    clearToken();
    clearUserDetail();
  }, []);

  const onSignUpPressed = async () => {
    if (!validateInputs()) return;

    const payload = {
      firstName: firstName.value,
      lastName: lastName.value,
      username: username.value,
      password: password.value,
      contact: contact.value,
      userType,
    };

    try {
      const response = await apiClient.post('/app-user', payload);
      if (response.status === 201) {
        console.log('Registration response:', response.data);
        const {id} = response.data;
        await saveUserDetial(id);
        Alert.alert('Success', 'Account created successfully');
        if (userType === 'DRIVER') {
          navigation.reset({
            index: 0,
            routes: [{name: 'Vehicle' as never}],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{name: 'Login' as never}],
          });
        }
      } else {
        Alert.alert('Error', 'Failed to create account');
      }
    } catch (error: any) {
      console.error('Error during registration:', error);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Something went wrong',
      );
    }
  };

  return (
    <Background>
      <BackButton />
      <Image source={require('../../assets/logo.png')} style={styles.image} />
      <Header>Create New Account</Header>

      <TextInput
        label="First Name"
        returnKeyType="next"
        value={firstName.value}
        onChangeText={text => setFirstName({value: text, error: ''})}
        error={!!firstName.error}
        errorText={firstName.error}
      />
      <TextInput
        label="Last Name"
        returnKeyType="next"
        value={lastName.value}
        onChangeText={text => setLastName({value: text, error: ''})}
        error={!!lastName.error}
        errorText={lastName.error}
      />
      <TextInput
        label="Email (Username)"
        returnKeyType="next"
        value={username.value}
        onChangeText={text => setUsername({value: text, error: ''})}
        error={!!username.error}
        errorText={username.error}
        autoCapitalize="none"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TextInput
        label="Contact Number"
        returnKeyType="next"
        value={contact.value}
        onChangeText={text => setContact({value: text, error: ''})}
        error={!!contact.error}
        errorText={contact.error}
        keyboardType="phone-pad"
      />

      <View style={styles.row}>
        <Text>User Type: </Text>
        <TouchableOpacity
          style={[
            styles.userTypeButton,
            userType === 'DRIVER' && styles.userTypeButtonSelected,
          ]}
          onPress={() => setUserType('DRIVER')}>
          <Text
            style={
              userType === 'DRIVER'
                ? styles.userTypeTextSelected
                : styles.userTypeText
            }>
            Driver
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.userTypeButton,
            userType === 'PASSENGER' && styles.userTypeButtonSelected,
          ]}
          onPress={() => setUserType('PASSENGER')}>
          <Text
            style={
              userType === 'PASSENGER'
                ? styles.userTypeTextSelected
                : styles.userTypeText
            }>
            Passenger
          </Text>
        </TouchableOpacity>
      </View>

      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{marginTop: 24}}>
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

export default Register;
