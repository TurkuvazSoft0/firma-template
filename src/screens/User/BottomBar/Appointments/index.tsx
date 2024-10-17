import React from 'react';
import {Image} from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  useTheme,
  ViewPager,
} from '@ui-kitten/components';
// ----------------------------- Navigation -----------------------------------
import {useNavigation} from '@react-navigation/native';
// ----------------------------- Hooks ---------------------------------------
import {useLayout} from 'hooks';

// ----------------------------- Assets ---------------------------------------
import {Images} from 'assets/images';

// ----------------------------- Components && Elements -----------------------
import {Container, NavigationAction, TabBar} from 'components';
import UpComing from './UpComing';
import Completed from './Completed';
import Cancelled from './Cancelled';

// ----------------------------- styles ---------------------------------------
import {globalStyle} from 'styles/globalStyle';

// ----------------------------- Types ---------------------------------------
import EvaIcons from 'types/eva-icon-enum';
import { appSelector, ThemeMode } from 'reduxs/reducers/app-reducer';
import { useAppSelector } from 'reduxs/store';

const AppointmentsPage = React.memo(() => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const {goBack} = useNavigation();
  const {height, width, top, bottom} = useLayout();

  const app = useAppSelector(appSelector);
  const themeMode = app.theme;
  const isDarkMode = themeMode === ThemeMode.DARK;

  const [selectedTab, setSelectedTab] = React.useState(0);
  return (
    <Container style={styles.container} useSafeArea={false}>
      {/* @ts-ignore */}
      <TopNavigation
        style={[styles.topNavigation, {paddingTop: top + 8}]}
        title={'My Appointments'}
        //@ts-ignore
        accessoryLeft={<Image source={isDarkMode?Images.dark_logo:Images.logo} style={styles.logo} />}
        accessoryRight={<NavigationAction icon={EvaIcons.Search} />}
      />
      <TabBar
        style={styles.tabBar}
        tabs={['Upcoming', 'Completed', 'Cancelled']}
        tabActive={selectedTab}
        onChangeTab={setSelectedTab}
      />
      <ViewPager
        style={styles.content}
        swipeEnabled={false}
        selectedIndex={selectedTab}
        onSelect={setSelectedTab}>
        <UpComing />
        <Completed />
        <Cancelled />
      </ViewPager>
    </Container>
  );
});

export default AppointmentsPage;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  topNavigation: {
    paddingBottom: 12,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 24,
  },
  tabBar: {
    marginTop: 16,
    marginHorizontal: 24,
    paddingTop: 4,
    marginBottom: 4,
    ...globalStyle.shadow,
  },
  content: {
    flex: 1,
  },
});
