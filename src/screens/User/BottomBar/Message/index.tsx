import React from 'react';
import {Image} from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
// ----------------------------- Navigation -----------------------------------
import {useNavigation} from '@react-navigation/native';
// ----------------------------- Hooks ---------------------------------------
import {useLayout} from 'hooks';
// ----------------------------- Assets ---------------------------------------
import {Images} from 'assets/images';
// ----------------------------- Components && Elements -----------------------

import {Container, NavigationAction} from 'components';
import EvaIcons from 'types/eva-icon-enum';
import MessageList from './MessageList';
import {DOCTORS_DATA} from 'constants/data';
import { appSelector, ThemeMode } from 'reduxs/reducers/app-reducer';
import { useAppSelector } from 'reduxs/store';

const MessagePage = React.memo(() => {
  const styles = useStyleSheet(themedStyles);
  const {top} = useLayout();
  const {goBack} = useNavigation();

  const app = useAppSelector(appSelector);
  const themeMode = app.theme;
  const isDarkMode = themeMode === ThemeMode.DARK;

  return (
    <Container style={styles.container} useSafeArea={false}>
      <TopNavigation
        style={[styles.topNavigation, {paddingTop: top + 8}]}
        title={'Messages'}
        // @ts-ignore
        accessoryLeft={() => <Image source={isDarkMode?Images.dark_logo:Images.logo} style={styles.logo} />}
        accessoryRight={() => <NavigationAction icon={EvaIcons.Search} />}
      />
      <MessageList data={Example_message} />
    </Container>
  );
});

export default MessagePage;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  topNavigation: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingBottom: 12,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 24,
  },
  tabBar: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  viewPager: {
    flex: 1,
  },
});

const Example_message = [
  {
    id: '1',
    isOnline: true,
    isReaded: false,
    createAt: '2023-04-27T08:02:17-05:00',
    user: DOCTORS_DATA[0],
    message:
      "In the meantime, please take care of yourself and follow the prescribed medication regimen. Please let us know if you have any questions or concerns in the meantime. We're here for you.",
  },
  {
    id: '2',
    isOnline: false,
    isReaded: false,
    createAt: '2023-04-27T08:02:17-05:00',
    user: DOCTORS_DATA[1],
    message:
      'Based on the test results we received, it looks like there were some concerns that need to be addressed.',
  },
  {
    id: '3',
    isOnline: true,
    isReaded: false,
    createAt: '2023-04-26T08:02:17-05:00',
    user: DOCTORS_DATA[2],
    message: 'Hello, good afternoon!',
  },
  {
    id: '4',
    isOnline: false,
    isReaded: true,
    createAt: '2023-04-12T08:02:17-05:00',
    user: DOCTORS_DATA[3],
    message:
      'Can you tell me the problem you having ? So that i can identify it',
  },
  {
    id: '5',
    isOnline: false,
    isReaded: true,
    createAt: '2023-04-14T08:02:17-05:00',
    user: DOCTORS_DATA[4],
    message: 'Hello, good afternoon!',
  },
  {
    id: '1',
    isOnline: true,
    isReaded: false,
    createAt: '2023-04-27T08:02:17-05:00',
    user: DOCTORS_DATA[5],
    message:
      "In the meantime, please take care of yourself and follow the prescribed medication regimen. Please let us know if you have any questions or concerns in the meantime. We're here for you.",
  },
  {
    id: '2',
    isOnline: false,
    isReaded: false,
    createAt: '2023-04-27T08:02:17-05:00',
    user: DOCTORS_DATA[2],
    message:
      'Based on the test results we received, it looks like there were some concerns that need to be addressed.',
  },
  {
    id: '1',
    isOnline: true,
    isReaded: false,
    createAt: '2023-04-27T08:02:17-05:00',
    user: DOCTORS_DATA[3],
    message:
      "In the meantime, please take care of yourself and follow the prescribed medication regimen. Please let us know if you have any questions or concerns in the meantime. We're here for you.",
  },
  {
    id: '2',
    isOnline: false,
    isReaded: false,
    createAt: '2023-04-27T08:02:17-05:00',
    user: DOCTORS_DATA[1],
    message:
      'Based on the test results we received, it looks like there were some concerns that need to be addressed.',
  },
];
