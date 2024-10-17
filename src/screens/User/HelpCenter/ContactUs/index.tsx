import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
// ----------------------------- Navigation -----------------------------------
import {NavigationProp, useNavigation} from '@react-navigation/native';
// ----------------------------- Hooks ---------------------------------------
import {useLayout} from 'hooks';
// ----------------------------- Assets ---------------------------------------
import {Images} from 'assets/images';
// ----------------------------- Components && Elements -----------------------

import {AppIcon, Container, Content, CustomLayout, Text} from 'components';
import EvaIcons from 'types/eva-icon-enum';

const ContactUs = React.memo(() => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const {goBack} = useNavigation();
  const {height, width, top, bottom} = useLayout();

  return (
    <CustomLayout style={styles.container}>
      {LIST.map((item, index) => {
        return (
          <CustomLayout key={index} level="1" horizontal style={styles.item}>
            <AppIcon name={item.icon} fill={theme['text-primary-color']} />
            <Text>{item.title}</Text>
          </CustomLayout>
        );
      })}
    </CustomLayout>
  );
});

export default ContactUs;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    marginTop: 12,
  },
  item: {
    gap: 16,
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 16,
    padding: 16,
  },
});

const LIST = [
  {title: 'Customer Service', icon: EvaIcons.HeadphonesOutline},
  {title: 'Twitter', icon: EvaIcons.Twitter},
  {title: 'WhatsApp', icon: EvaIcons.MessageCircleOutline},
  {title: 'Facebook', icon: EvaIcons.Facebook},
  {title: 'Website', icon: EvaIcons.Globe2},
];
