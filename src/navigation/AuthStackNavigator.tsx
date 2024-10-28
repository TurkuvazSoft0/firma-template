import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthStackParamList} from 'types/navigation-types';
import Login from 'screens/Auth/Login';
import Walkthough from 'screens/Auth/Walkthough';
import SignUp from 'screens/Auth/SignUp';
import Onboarding from 'screens/Auth/Onboarding';
import FillProfile from 'screens/Auth/FillProfile';
import CreatePin from 'screens/Auth/CreatePin';

import {useAppSelector} from 'reduxs/store';
import {appSelector} from 'reduxs/reducers/app-reducer';
import ChangePassword from 'screens/Auth/ChangePassword';
import MusteriLogin from 'screens/Auth/Musteri';
import MusteriSignup from 'screens/Auth/MusteriSignup';
import CreatePassword from 'screens/Auth/CreatePassword';

const Stack = createStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
  const appIntro = useAppSelector(appSelector).intro;
  return (
    <Stack.Navigator
      // initialRouteName={appIntro ? 'Onboarding' : 'Walkthough'}
      initialRouteName={'Walkthough'}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Walkthough" component={Walkthough} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="MusteriLogin" component={MusteriLogin} />

      <Stack.Screen name="Signup" component={SignUp} />
      <Stack.Screen name="MusteriSignup" component={MusteriSignup} />

      <Stack.Screen name="FillProfile" component={FillProfile} />
      <Stack.Screen name="CreatePin"  component={CreatePin} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="CreatePassword" component={CreatePassword} />

    </Stack.Navigator>
  );
}
