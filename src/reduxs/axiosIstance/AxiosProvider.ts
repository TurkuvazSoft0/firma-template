import React, { createContext, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'reduxs/store';
import axiosInstance from '.';
import { AxiosRequestConfig } from 'react-native-axios';
import { Alert } from 'react-native';
const AxiosContext = createContext(axiosInstance);

export const AxiosProvider = ({ children }: { children: React.ReactNode }) => {
  const token = useSelector((state: RootState) => state.register.token);
  
  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        if (token) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          };
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          Alert.alert('Yetkisiz', 'Erişim izni yok, lütfen giriş yapın.');
        }
        return Promise.reject(error);
      }
    );

    // Interceptor'ları kaldırma
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [token]);

  return <AxiosContext.Provider value={axiosInstance}>{children}</AxiosContext.Provider>;
};

export const useAxios = () => {
  return useContext(AxiosContext);
};
