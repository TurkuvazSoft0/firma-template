import axios from 'react-native-axios';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import { navigate } from '../../navigation/root-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Axios instance oluşturma
const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.92:3000',
});

// Interceptor ile token ve Content-Type ayarlama
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      // Token alma
      const token = await SecureStore.getItemAsync('userToken');
      console.log("Bu Token Gönderilecek:", token);

      // Authorization token ekle
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      } else {
        Alert.alert("Bilgi", "Lütfen Giriş Yapınız");
        navigate("Login");
      }

      // Content-Type ayarla
      if (!config.headers['Content-Type']) {
        if (config.data instanceof FormData) {
          config.headers['Content-Type'] = 'multipart/form-data';
        } else {
          config.headers['Content-Type'] = 'application/json';
        }
      }
    } catch (error) {
      console.error("Token alma hatası:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
