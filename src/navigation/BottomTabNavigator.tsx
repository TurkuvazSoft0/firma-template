import React, {memo} from 'react';
import {TouchableOpacity, View} from 'react-native';
// ------------------------------ Ui Kitten ----------------------------------
import {useStyleSheet, StyleService, useTheme} from '@ui-kitten/components';
// ------------------------------ Hooks ----------------------------------
import {useLayout} from 'hooks';
// ------------------------------ Type ----------------------------------
import EvaIcons from 'types/eva-icon-enum';
// ------------------------------ Components ----------------------------------
import {AppIcon, CustomLayout} from 'components';
// ------------------------------ CustomBottomBar ----------------------------------
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';
//--------------------------------- Reduxs -----------------------------------------
import {appSelector} from 'reduxs/reducers/app-reducer';
import {useAppSelector} from 'reduxs/store';
// ------------------------------ Pages --------------------------------------------
import HomePage from 'screens/User/BottomBar/Home';
import AppointmentsPage from 'screens/User/BottomBar/Appointments';
import MessagePage from 'screens/User/BottomBar/Message';
import ArticlesPage from 'screens/User/BottomBar/Articles';
import ProfilePage from 'screens/User/BottomBar/Profile';
import {RouteProp, useRoute} from '@react-navigation/native';
import {MainStackParamList} from 'types/navigation-types';

export const BottomTabNavigator = memo(() => {
  const styles = useStyleSheet(themedStyles);
  const {bottom} = useLayout();
  const theme = useTheme();
  const router =
    useRoute<RouteProp<MainStackParamList, 'BottomTabNavigator'>>();
  const _renderIcon = (routeName: string, selectedTab: string) => {
    let icon = EvaIcons.Activity;
    const activeTab = selectedTab === routeName;

    switch (routeName) {
      case 'Appointments':
        icon = activeTab ? EvaIcons.Calendar : EvaIcons.CalendarOutline;
        break;
      case 'Message':
        icon = activeTab
          ? EvaIcons.MessageSquare
          : EvaIcons.MessageSquareOutline;
        break;
      case 'Home':
        icon = activeTab ? EvaIcons.Home : EvaIcons.HomeOutline;
        break;
      case 'Articles':
        icon = activeTab ? EvaIcons.Pantone : EvaIcons.PantoneOutline;
        break;
      case 'Profile':
        icon = activeTab ? EvaIcons.Person : EvaIcons.PersonOutline;
        break;
    }

    return (
      <>
        <AppIcon
          name={icon}
          size={28}
          buttonStyle={{
            backgroundColor: activeTab ? theme['color-primary-400'] : undefined,
            padding: 10,
            borderRadius: 12,
          }}
          fill={
            activeTab ? theme['text-white-color'] : theme['text-platinum-color']
          }
        />
      </>
    );
  };
  const renderTabBar = ({routeName, selectedTab, navigate}: any) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
        }}>
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };
  return (
    <>
      <CurvedBottomBar.Navigator
        type="DOWN"
        height={70}
        circleWidth={60}
        bgColor={theme['background-basic-color-1']}
        screenOptions={{
          headerShown: false,
          tabBarStyle: {},
        }}
        shadowStyle={{
          shadowColor: theme['background-basic-color-11'],
          shadowOffset: {
            width: 4,
            height: 4,
          },
          shadowOpacity: 0.4,
          shadowRadius: 8.65,
          elevation: 8,
        }}
        //@ts-ignore
        initialRouteName={router?.params?.screen || 'Home'}
        borderTopLeftRight
        renderCircle={({navigate, routeName, selectedTab}) => {
          const acitve = routeName === selectedTab;
          return (
            <View
              style={[
                styles.btnCircle,
                styles.shadow,
                acitve && {backgroundColor: theme['color-primary-400']},
              ]}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                }}
                onPress={() => {
                  navigate(routeName);
                }}>
                <AppIcon
                  name={EvaIcons.Home}
                  fill={
                    acitve
                      ? theme['text-white-color']
                      : theme['text-platinum-color']
                  }
                />
              </TouchableOpacity>
            </View>
          );
        }}
        tabBar={renderTabBar}>
        <CurvedBottomBar.Screen
          options={{headerShown: false}}
          name="Message"
          key={'Message'}
          component={() => <MessagePage />}
          position="LEFT"
        />
        <CurvedBottomBar.Screen
          options={{headerShown: false}}
          name="Articles"
          key="Articles"
          component={() => <ArticlesPage />}
          position="RIGHT"
        />
        <CurvedBottomBar.Screen
          options={{headerShown: false}}
          name="Home"
          key="Home"
          position="CENTER"
          component={() => <HomePage />}
        />

        <CurvedBottomBar.Screen
          options={{headerShown: false}}
          name="Appointments"
          key={'Appointments'}
          position="LEFT"
          component={() => <AppointmentsPage />}
        />
        <CurvedBottomBar.Screen
          options={{headerShown: false}}
          name="Profile"
          key="Profile"
          component={() => <ProfilePage />}
          position="RIGHT"
        />
      </CurvedBottomBar.Navigator>
      <CustomLayout style={{height: bottom / 2}} level="1" />
    </>
  );
});
const themedStyles = StyleService.create({
  bottomBar: {},
  btnCircle: {
    width: 60,
    height: 60,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'background-basic-color-1',
    padding: 10,
    bottom: 30,
  },
  shadow: {
    shadowColor: 'background-basic-color-10',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
});
