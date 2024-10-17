import React from 'react';
import Background from '../../components/Background/background';
import {Image, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {theme} from '../../core/theme';
import Button from '../../components/Button/button';
import {useNavigation} from '@react-navigation/native';

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

// type RootStackParamList = {
//   Landing: undefined;
//   Login: undefined;
//   RegisterScreen: undefined;
// };

// type StartScreenProps = NativeStackScreenProps<RootStackParamList, 'Landing'>;

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
      <Button mode="outlined" onPress={() => console.log('SIGN UP')}>
        Sign Up
      </Button>
    </Background>
  );
};

export default LandingScreen;
