import React from 'react';
import Background from '../../components/Background/background';
import {Image, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {theme} from '../../core/theme';
import Button from '../../components/Button/button';

// Define the navigation prop types
// type RootStackParamList = {
//   LoginScreen: undefined;
//   RegisterScreen: undefined;
// };

// type StartScreenProps = NativeStackScreenProps<
//   RootStackParamList,
//   'StartScreen'
// >;
const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },
  header: {
    fontSize: 21,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 12,
  },
});

const LandingScreen: React.FC = () => {
  return (
    <Background>
      <Image source={require('../../assets/logo.png')} style={styles.image} />
      <Text style={styles.header}>Login Template</Text>
      <Text style={styles.text}>
        The easiest way to start with your amazing application.
      </Text>
      <Button mode="contained" onPress={() => console.log('LOGIN')}>
        Login
      </Button>
      <Button mode="outlined" onPress={() => console.log('SIGN UP')}>
        Sign Up
      </Button>
    </Background>
  );
};

export default LandingScreen;
