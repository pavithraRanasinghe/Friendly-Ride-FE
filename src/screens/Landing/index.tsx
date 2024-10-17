import React from 'react';
import Background from '../../components/Background/background';
import {Image} from 'react-native';
import {Text} from 'react-native-paper';
import Button from '../../components/Button/button';
import {useNavigation} from '@react-navigation/native';
import {styles} from './index.style';

const LandingScreen: React.FC = () => {
  const navigation = useNavigation();
  return (
    <Background>
      <Image source={require('../../assets/logo.png')} style={styles.image} />
      <Text style={styles.header}>FRIENDLY RIDE LOGIN</Text>
      <Text style={styles.text}>Welcome back to FRIENDLY RIDE</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Login' as never)}>
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('Register' as never)}>
        Sign Up
      </Button>
    </Background>
  );
};

export default LandingScreen;
