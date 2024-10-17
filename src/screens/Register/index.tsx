import React, {useState} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import Background from '../../components/Background/background';
import BackButton from '../../components/Button/backButton';
import Header from '../../components/Header';
import TextInput from '../../components/Input/input';
import Button from '../../components/Button/button';
import {Text} from 'react-native-paper';
import {styles} from './index.style';
import {useNavigation} from '@react-navigation/native';

const Register: React.FC = () => {
  const navigation = useNavigation();

  const [name, setName] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});

  const onSignUpPressed = () => {
    console.log('REGISTER');
  };

  return (
    <Background>
      <BackButton />
      <Image source={require('../../assets/logo.png')} style={styles.image} />
      <Header>Create New Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({value: text, error: ''})}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
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
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        // eslint-disable-next-line react-native/no-inline-styles
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
