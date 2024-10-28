import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainStackParamList } from 'types/navigation-types';
import NotificationScreen from 'screens/User/Notificaiton';
import SearchScreen from 'screens/User/SearchScreen';
// --------------------------------  Message/Call ----------------------------------------
import DetailsDoctor from 'screens/User/DetailsDoctor';
import FavoriteDoctor from 'screens/User/FavoriteDotor';
// --------------------------------  Message/Call ----------------------------------------
import ChatScreen from 'screens/User/ChatScreen';
import HistoryChatScreen from 'screens/User/ChatScreen/HistoryChatScreen';
// --------------------------------  Appointments ----------------------------------------
import AppointmentDetails from 'screens/User/Appoiments/AppointmentDetails';
import CancelAppoiment from 'screens/User/Appoiments/CancelAppoiment';
import RescheduleAppointment from 'screens/User/Appoiments/RescheduleAppointment';
import VoiceCallScreen from 'screens/User/ChatScreen/VoiceCallScreen';
import VideoCallScreen from 'screens/User/ChatScreen/VideoCallScreen';
import AppointmentFinish from 'screens/User/ChatScreen/AppointmentFinish';
import WriteReviewScreen from 'screens/User/ChatScreen/WriteReviewScreen';
// --------------------------------  Articles ----------------------------------------
import ArticlesDetails from 'screens/User/ArticlesDetails';
import ArticlesScreen from 'screens/User/ArticlesScreen';
import ArticlesBookmark from 'screens/User/ArticlesBookmark';
// --------------------------------  User ----------------------------------------
import EditProfile from 'screens/User/EditProfile';
import SettingsScreen from 'screens/User/Settings';
import PaymentsScreen from 'screens/User/Payments';
import SecurityScreen from 'screens/User/Security';
import LanguageScreen from 'screens/User/Language';
import HelpCenter from 'screens/User/HelpCenter';
import InviteFriends from 'screens/User/InviteFriend';
// --------------------------------  Navigation ----------------------------------------
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@ui-kitten/components';
import CompanyScreen from 'screens/User/SirketEkle';
import { useStatusControl } from 'hooks/useStatus';

const Stack = createStackNavigator<MainStackParamList>();
const Tab = createBottomTabNavigator();

// Tab iconlarını render etmek için basit bir fonksiyon
const TabIcon = ({ name, color, size }: { name: string; color: string; size: number }) => {
  return <Icon name={name} fill={color} style={{ width: size, height: size }} />;
};

// TabNavigator: Alt gezinme çubuğunda gösterilecek ana ekranlar
function TabNavigator() {
  const user_control = useStatusControl();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Şirket Ara') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Profil') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Bildirimler') {
            iconName = focused ? 'bell' : 'bell-outline';
          } else if (route.name === 'Profil') {
            iconName = focused ? 'message-circle' : 'message-circle-outline';
          }
          else if (route.name === 'Şirket Ekle' && user_control == "firma") {
            iconName = focused ? 'plus-circle' : 'plus-circle-outline';
          }

          return <TabIcon name={iconName} color={color} size={size} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >

      <Tab.Screen name="Şirket Ara" component={SearchScreen} />
      <Tab.Screen name="Bildirimler" component={NotificationScreen} />

      {
        user_control == "firma" &&
      <Tab.Screen name="Şirket Ekle" component={CompanyScreen} />
      }
      <Tab.Screen name="Profil" component={EditProfile} />

 
    </Tab.Navigator>
  );
}

// MainStackNavigator: Diğer ekranlar ve TabNavigator
export function MainStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={'TabNavigator'} // Başlangıç noktası TabNavigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Tab Navigator */}
      <Stack.Screen name="TabNavigator" component={TabNavigator} />

      {/* Doctor Screens */}
      <Stack.Screen name="FavoriteDoctor" component={FavoriteDoctor} />
      <Stack.Screen name="DetailsDoctor" component={DetailsDoctor} />
      <Stack.Screen name='Şirket Ekle' component={CompanyScreen}/>
      {/* Messages */}
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="VoiceCallScreen" component={VoiceCallScreen} />
      <Stack.Screen name="VideoCallScreen" component={VideoCallScreen} />
      <Stack.Screen name="AppointmentFinish" component={AppointmentFinish} />
      <Stack.Screen name="HistoryChatScreen" component={HistoryChatScreen} />
      <Stack.Screen name="WriteReviewScreen" component={WriteReviewScreen} />

      {/* Articles */}
      <Stack.Screen name="ArticlesScreen" component={ArticlesScreen} />
      <Stack.Screen name="ArticlesBookmark" component={ArticlesBookmark} />
      <Stack.Screen name="ArticlesDetails" component={ArticlesDetails} />

      {/* Appointments */}
      <Stack.Screen name="CancelAppoiment" component={CancelAppoiment} />
      <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} />
      <Stack.Screen name="RescheduleAppointment" component={RescheduleAppointment} />

      {/* Notifications */}
      <Stack.Screen name="Bildirimler" component={NotificationScreen} />

      {/* User Settings */}
      <Stack.Screen name="SecurityScreen" component={SecurityScreen} />
      <Stack.Screen name="PaymentsScreen" component={PaymentsScreen} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="LanguageScreen" component={LanguageScreen} />
      <Stack.Screen name="HelpCenter" component={HelpCenter} />
      <Stack.Screen name="InviteFriends" component={InviteFriends} />



    </Stack.Navigator>
  );
}
