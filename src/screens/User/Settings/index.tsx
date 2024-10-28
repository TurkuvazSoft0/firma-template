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
import {Container, Content, NavigationAction, Text} from 'components';
import SettingToggle from './SettingToggle';
import {Formik} from 'formik';

type FormikForm = {
  notification: boolean;
  sounds: boolean;
  vibrate: boolean;
  special_offers: boolean;
  promo_discount: boolean;
  payment: boolean;
  cashback: boolean;
  new_tips: boolean;
  new_services: boolean;
};

const SettingsScreen = React.memo(() => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const {goBack} = useNavigation();
  const {height, width, top, bottom} = useLayout();

  const initValues: FormikForm = {
    notification: false,
    sounds: false,
    vibrate: false,
    special_offers: true,
    promo_discount: false,
    payment: true,
    cashback: false,
    new_tips: true,
    new_services: true,
  };

  return (
    <Formik initialValues={initValues} onSubmit={values => console.log({})}>
      {({handleChange, handleBlur, handleSubmit, setFieldValue, values}) => {
        return (
          <Container style={styles.container} level="1">
            <TopNavigation
              title="Bildirimler"
              accessoryLeft={() => <NavigationAction marginRight={12} />}
            />
            <Content contentContainerStyle={styles.content}>
              <SettingToggle
                title="General Notifications"
                value={values.notification}
                onChange={() =>
                  setFieldValue('notification', !values.notification)
                }
              />
              <SettingToggle
                title="Sound"
                value={values.sounds}
                onChange={() => setFieldValue('sounds', !values.sounds)}
              />
              <SettingToggle
                title="Vibrate"
                value={values.vibrate}
                onChange={() => setFieldValue('vibrate', !values.vibrate)}
              />
              <SettingToggle
                title="Special Offers"
                value={values.special_offers}
                onChange={() =>
                  setFieldValue('special_offers', !values.special_offers)
                }
              />
              <SettingToggle
                title="Promo & Discount"
                value={values.promo_discount}
                onChange={() =>
                  setFieldValue('promo_discount', !values.promo_discount)
                }
              />
              <SettingToggle
                title="Payments"
                value={values.payment}
                onChange={() => setFieldValue('payment', !values.payment)}
              />
              <SettingToggle
                title="Cashback"
                value={values.cashback}
                onChange={() => setFieldValue('cashback', !values.cashback)}
              />
              <SettingToggle
                title="New Tips"
                value={values.new_tips}
                onChange={() => setFieldValue('new_tips', !values.new_tips)}
              />
              <SettingToggle
                title="New Services"
                value={values.new_services}
                onChange={() =>
                  setFieldValue('new_services', !values.new_services)
                }
              />
            </Content>
          </Container>
        );
      }}
    </Formik>
  );
});

export default SettingsScreen;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    gap: 32,
    paddingTop: 40,
  },
});
