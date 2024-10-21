import React, {useState} from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import {Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Background from '../../components/Background/background';
import Header from '../../components/Header';
import TextInput from '../../components/Input/input';
import Button from '../../components/Button/button';
import {styles} from './index.style';
import BackButton from '../../components/Button/backButton';

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

  const onLoginPressed = () => {
    console.log('EMAIL : ', email);
    console.log('Password : ', password);
    navigation.reset({
      index: 0,
      routes: [{name: 'Ride' as never}],
    });
  };

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
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.reset('Landing' as never)}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

export default LoginScreen;
