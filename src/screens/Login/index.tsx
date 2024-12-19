import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import {Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Background from '../../components/Background/background';
import Header from '../../components/Header';
import TextInput from '../../components/Input/input';
import Button from '../../components/Button/button';
import {styles} from './index.style';
import BackButton from '../../components/Button/backButton';
import Toast from 'react-native-toast-message';
import {
  clearToken,
  clearUserDetail,
  saveToken,
  saveUserDetial,
} from '../../config/TokenManger'; // Token storage helper
import apiClient from '../../config/ApiClient';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState<{value: string; error: string}>({
    value: '',
    error: '',
  });
  const [password, setPassword] = useState<{value: string; error: string}>({
    value: '',
    error: '',
  });
  const [loading, setLoading] = useState(false);

  const onLoginPressed = async () => {
    if (email.value.trim() === '') {
      setEmail({value: email.value, error: 'Email is required'});
      return;
    }
    if (password.value.trim() === '') {
      setPassword({value: password.value, error: 'Password is required'});
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.post('/app-user/login', {
        username: email.value,
        password: password.value,
      });

      const {id, token, userType} = response.data;
      await saveToken(token);
      await saveUserDetial(id);
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
      });
      if (userType === 'DRIVER') {
        navigation.reset({
          index: 0,
          routes: [{name: 'AddRoute' as never}], // Navigate to AddRoute
        });
      } else if (userType === 'PASSENGER') {
        navigation.reset({
          index: 0,
          routes: [{name: 'Ride' as never}], // Navigate to Home
        });
      }
    } catch (error: any) {
      console.error('Login error:', error);
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: error.response?.data?.message || 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    clearToken();
    clearUserDetail();
  }, []);

  return (
    <Background>
      <BackButton />
      <Image source={require('../../assets/logo.png')} style={styles.image} />
      <Header>Welcome back.</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
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
      <View style={styles.forgotPassword}>
        <TouchableOpacity onPress={() => console.log()}>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed} loading={loading}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{name: 'Register' as never}],
            })
          }>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <Toast position="top" bottomOffset={20} />
    </Background>
  );
};

export default LoginScreen;
