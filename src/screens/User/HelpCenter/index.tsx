import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  useTheme,
  ViewPager,
} from '@ui-kitten/components';
// ----------------------------- Navigation -----------------------------------
import {NavigationProp, useNavigation} from '@react-navigation/native';
// ----------------------------- Hooks ---------------------------------------
import {useLayout} from 'hooks';
// ----------------------------- Assets ---------------------------------------
import {Images} from 'assets/images';
// ----------------------------- Components && Elements -----------------------

import {Container, Content, NavigationAction, TabBar, Text} from 'components';
import {globalStyle} from 'styles/globalStyle';
import EvaIcons from 'types/eva-icon-enum';
import ContactUs from './ContactUs';
import FaqScreen from './FaqScreen';

const HelpCenter = React.memo(() => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const {goBack} = useNavigation();
  const {height, width, top, bottom} = useLayout();

  const [selected, setSelected] = React.useState(0);
  return (
    <Container style={styles.container} useSafeArea={false}>
      <TopNavigation
        style={[globalStyle.topNavigation, {paddingTop: top + 8}]}
        title="Help Center"
        accessoryLeft={() => <NavigationAction marginRight={12} />}
        accessoryRight={() => (
          <NavigationAction icon={EvaIcons.MoreHorizontal} />
        )}
      />
      <Content contentContainerStyle={styles.content}>
        <TabBar
          tabs={['FAQ', 'Contact Us']}
          tabActive={selected}
          onChangeTab={setSelected}
          style={styles.tabBarStyle}
        />
        <ViewPager
          style={styles.viewpager}
          selectedIndex={selected}
          onSelect={setSelected}>
          <FaqScreen />
          <ContactUs />
        </ViewPager>
      </Content>
    </Container>
  );
});

export default HelpCenter;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 12,
  },
  tabBarStyle: {
    marginHorizontal: 24,
    borderWidth: 0.5,
    borderColor: 'background-basic-color-5',
  },
  viewpager: {
    flex: 1,
    paddingTop: 12,
  },
});
