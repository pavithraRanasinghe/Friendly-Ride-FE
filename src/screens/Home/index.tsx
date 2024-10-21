import React from 'react';
import {View} from 'react-native';
import Header from '../../components/Header';
import {Text} from 'react-native-paper';
import {styles} from './index.styles';
import LottieView from 'lottie-react-native';
import Button from '../../components/Button/button';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header>HOME</Header>
      <View style={styles.section}>
        <Text style={styles.header}>Welcome Back!</Text>
        <Text style={styles.headerName}>Pavithra,</Text>
      </View>
      <LottieView
        style={styles.animation}
        source={require('../../assets/animations/dashboard.json')}
        autoPlay
        loop
      />
      <View style={styles.rideSection}>
        <Text style={styles.text}>Looking for a ride??</Text>
        <Button
          mode="contained"
          style={styles.rideButton}
          onPress={() => navigation.navigate('Trip' as never)}>
          Find a Ride
        </Button>
      </View>
      <Button
        mode="contained"
        style={styles.rideButton}
        onPress={() => navigation.navigate('OnGoingRide' as never)}>
        Current Ride
      </Button>
    </View>
  );
};
export default Home;
