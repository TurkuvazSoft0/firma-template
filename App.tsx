import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

// ------------------------------- UI Kitten -----------------------------------
import {IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

// ------------------------------- App Container -------------------------------
import AppContainer from 'navigation/AppContainer';

// ------------------------------- Assets Icon ---------------------------------
import AssetsIconsPack from 'assets/AssetsIconsPack';

// ------------------------------- Reduxs --------------------------------------
import {Provider} from 'react-redux';
import store, {persistor} from 'reduxs/store';
import {PersistGate} from 'redux-persist/integration/react';
import useCachedResources from './src/hooks/useCacheResource';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }
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
});