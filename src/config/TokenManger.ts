import AsyncStorage from '@react-native-async-storage/async-storage';

// Save JWT token to AsyncStorage
export const saveToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('jwtToken', token);
  } catch (error) {
    console.error('Error saving JWT token to AsyncStorage:', error);
  }
};

// Clear JWT token from AsyncStorage
export const clearToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('jwtToken');
  } catch (error) {
    console.error('Error removing JWT token from AsyncStorage:', error);
  }
};
