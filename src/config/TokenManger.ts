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

export const saveUserDetial = async (id: number): Promise<void> => {
  try {
    await AsyncStorage.setItem('userId', id.toString());
  } catch (error) {
    console.error('Error saving User ID to AsyncStorage:', error);
  }
};

// Clear JWT token from AsyncStorage
export const clearUserDetail = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('userId');
  } catch (error) {
    console.error('Error removing User ID from AsyncStorage:', error);
  }
};
