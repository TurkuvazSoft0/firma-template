import * as React from 'react';
import {StatusBar, View} from 'react-native';
// ------------------------------- Navigation -------------------------------
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from './root-navigation';
import {RootStackParamList} from 'types/navigation-types';
// -------------------------------- Themes UI Kitten --------------------------------
import * as eva from '@eva-design/eva';
import {ApplicationProvider, useTheme} from '@ui-kitten/components';
import {default as darkTheme} from 'constants/themes/dark.json';
import {default as lightTheme} from 'constants/themes/light.json';
import {default as customTheme} from 'constants/themes/app-themes.json';
import {default as customMapping} from 'constants/themes/mapping.json';
// -------------------------------- Reduxs --------------------------------
import {useAppSelector} from 'reduxs/store';
import {appSelector, ThemeMode} from 'reduxs/reducers/app-reducer';
// -------------------------------- App Message --------------------------------
import {AppMessage} from 'components';
// -------------------------------- Screens --------------------------------

import {AuthNavigator} from './AuthStackNavigator';
import AnimationLoading from 'components/Lottie';
import { MainStackNavigator } from './MainStackNavigator';
import Anasayfa from 'screens';
// import * as BootSplash from "react-native-bootsplash";
enableScreens();

const Stack = createNativeStackNavigator<RootStackParamList>();
const AppContainer = () => {
  const themes = useTheme();
  const app = useAppSelector(appSelector);
  const theme = app.theme;
  const loading = app.appLoading;

  const isDarkMode = theme === ThemeMode.DARK;
  return (
    <ApplicationProvider
      {...eva}
      theme={
        isDarkMode
          ? {...eva.dark, ...customTheme, ...darkTheme}
          : {...eva.light, ...customTheme, ...lightTheme}
      }
      customMapping={{...eva.mapping, ...customMapping}}>
      <View
        style={{
          backgroundColor: themes['background-basic-color-1'],
          flex: 1,
        }}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          translucent={true}
          backgroundColor={'#00000000'}
        />
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            initialRouteName={'AuthStack'}
            screenOptions={{
              headerShown: false,
            }}>
          
            <Stack.Screen name="AuthStack" component={AuthNavigator} />
            <Stack.Screen name="MainStack" component={MainStackNavigator} />
      
          </Stack.Navigator>
        </NavigationContainer>
        <AppMessage />
        {loading && <AnimationLoading />}
      </View>
    </ApplicationProvider>
  );
};

export default AppContainer;
