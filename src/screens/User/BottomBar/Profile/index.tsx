import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  useTheme,
  Avatar,
} from '@ui-kitten/components';
// ----------------------------- Navigation -----------------------------------
import {NavigationProp, useNavigation} from '@react-navigation/native';
// ----------------------------- Hooks ---------------------------------------
import {useLayout} from 'hooks';
// ----------------------------- Assets ---------------------------------------
import {Images} from 'assets/images';
// ----------------------------- Components && Elements -----------------------

import {
  AppIcon,
  Container,
  Content,
  CustomLayout,
  IDivider,
  NavigationAction,
  Text,
} from 'components';
import {globalStyle} from 'styles/globalStyle';
import EvaIcons from 'types/eva-icon-enum';
import {faker} from '@faker-js/faker';
import Option from './Option';
import {useAppDispatch, useAppSelector} from 'reduxs/store';
import {ThemeMode, appSelector, setAppLoading, switchTheme} from 'reduxs/reducers/app-reducer';
import { MainStackParamList } from 'types/navigation-types';
import { waitUtil } from 'utils/waitUtil';

const ProfilePage = React.memo(() => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const {navigate} = useNavigation<NavigationProp<MainStackParamList>>();
  const {height, width, top, bottom} = useLayout();

  const app = useAppSelector(appSelector);
  const dispatch = useAppDispatch();
  const themeMode = app.theme;
  const isDarkMode = themeMode === ThemeMode.DARK;

  const OPTIONS = [
    {title: 'Edit Profile', icon: EvaIcons.PersonOutline,onPress: () =>navigate('EditProfile')},
    {title: 'Settings', icon: EvaIcons.Settings2Outline,onPress:()=>navigate('SettingsScreen')},
    {title: 'Payment', icon: EvaIcons.CreditCardOutline,onPress: () =>navigate('PaymentsScreen')},
    {title: 'Security', icon: EvaIcons.ShieldOutline,onPress: () =>navigate('SecurityScreen')},
    {title: 'Language', icon: EvaIcons.GlobeOutline,onPress: () =>navigate('LanguageScreen')},
    {
      title: 'Change Theme',
      icon: isDarkMode ? EvaIcons.MoonOutline : EvaIcons.SunOutline,
      onPress: () => {
        dispatch(setAppLoading(true));
        waitUtil(1200).then(() => {
          dispatch(setAppLoading(false));
        });
        dispatch(switchTheme());
      },
    },
    {title: 'Help Center', icon: EvaIcons.AlertTriangleOutline,onPress:()=>navigate('HelpCenter')},
    {title: 'Invite Friends', icon: EvaIcons.PeopleOutline ,onPress:()=>navigate('InviteFriends')},
    {title: 'Logout', icon: EvaIcons.LogOut, fill: theme['text-danger-color']},
  ];

  return (
    <Container style={styles.container}>
      <TopNavigation
        style={[globalStyle.topNavigation, {paddingTop: top + 8}]}
        title={'Profile'}
        // @ts-ignore
        accessoryLeft={() => <Image source={isDarkMode?Images.dark_logo:Images.logo} style={styles.logo} />}
        accessoryRight={() => (
          <NavigationAction icon={EvaIcons.MoreHorizontalOutline} />
        )}
      />
      <Content contentContainerStyle={styles.content}>
        <CustomLayout itemsCenter alignSelfCenter mb={12}>
          {/* @ts-ignore */}
          <Avatar source={{uri: faker.image.avatar()}} style={styles.avatar} />
          <CustomLayout style={styles.buttonAvatar}>
            <AppIcon
              name={EvaIcons.Edit}
              fill={theme['text-white-color']}
              size={20}
            />
          </CustomLayout>
        </CustomLayout>
        <CustomLayout gap={8}>
          <Text category="t5" center>
            {faker.name.fullName()}
          </Text>
          <Text category="subhead" center>
            {faker.phone.number()}
          </Text>
        </CustomLayout>
        <IDivider marginVertical={24} />
        <CustomLayout>
          {OPTIONS.map((option, index) => {
            return <Option option={option} key={index} />;
          })}
        </CustomLayout>
      </Content>
    </Container>
  );
});

export default ProfilePage;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 24,
  },
  content: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 80,
  },
  avatar: {
    width: 120,
    height: 120,
  },
  buttonAvatar: {
    borderRadius: 4,
    backgroundColor: 'color-primary-default',
    padding: 4,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  layoutIcon: {
    borderRadius: 8,
    padding: 12,
    backgroundColor: 'color-primary-default',
  },
  option: {
    borderRadius: 16,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
});
