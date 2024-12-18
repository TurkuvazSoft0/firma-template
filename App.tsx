import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, AppState } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import AppContainer from 'navigation/AppContainer';
import AssetsIconsPack from 'assets/AssetsIconsPack';
import { Provider } from 'react-redux';
import store, { persistor } from 'reduxs/store';
import { PersistGate } from 'redux-persist/integration/react';
import * as SecureStore from 'expo-secure-store';

export default function App() {
 
  useEffect(() => {
    const handleAppStateChange = async (nextAppState) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        // Uygulama arka plana geçtiğinde veya kapandığında token'ı sil
        await SecureStore.deleteItemAsync('userToken');
        console.log('Token silindi');
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);


  return (
    <Provider store={store}>
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaProvider>
          <PersistGate persistor={persistor}>
            <IconRegistry icons={[EvaIconsPack, AssetsIconsPack]} />
            <AppContainer />
          </PersistGate>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noConnectionBanner: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
    backgroundColor: 'red',
    alignItems: 'center',
  },
  noConnectionText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
