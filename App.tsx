import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import AppContainer from 'navigation/AppContainer';
import AssetsIconsPack from 'assets/AssetsIconsPack';
import { Provider } from 'react-redux';
import store, { persistor } from 'reduxs/store';
import { PersistGate } from 'redux-persist/integration/react';
import useCachedResources from './src/hooks/useCacheResource';
import * as Network from 'expo-network';

export default function App() {


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
