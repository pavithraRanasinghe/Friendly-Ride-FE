import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';

const BackButton: React.FC = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/arrow_back.png')}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    left: 0,
  },
  image: {
    width: 24,
    height: 24,
  },
});

export default BackButton;
