import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'http://192.168.8.129:8080/fr/v1',
  timeout: 10000, // Timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get the token from AsyncStorage
const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('jwtToken');
    return token;
  } catch (error) {
    console.error('Error retrieving JWT token from AsyncStorage:', error);
    return null;
  }
};

// Add a request interceptor to include the JWT token in headers
apiClient.interceptors.request.use(
  async config => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Log request details
apiClient.interceptors.request.use(
  config => {
    console.log('Request:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data,
    });
    return config;
  },
  error => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  },
);

// Add a response interceptor to handle errors globally
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.error('Unauthorized - Redirect to login or refresh token');
      // Handle unauthorized access - e.g., redirect to login screen
    } else if (error.response?.status === 403) {
      console.error('Forbidden - Access denied');
      // Handle forbidden access - e.g., show an alert
    }
    return Promise.reject(error);
  },
);

export default apiClient;
