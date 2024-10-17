import React from 'react';
import {Image} from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import {TopNavigation, StyleService, useStyleSheet, useTheme} from '@ui-kitten/components';
// ----------------------------- Hooks ---------------------------------------
import { useLayout } from 'hooks';
// ----------------------------- Assets ---------------------------------------
import {Images} from 'assets/images';
// ----------------------------- Components && Elements -----------------------
import {Container,Content,CustomLayout,NavigationAction,Text} from 'components';
import {globalStyle} from 'styles/globalStyle';

const PaymentsScreen = React.memo(() => {
  const styles = useStyleSheet(themedStyles);
  const {height, width, top, bottom} = useLayout();

  const getImg = (type: string) => {
    switch (type) {
      case 'mastercard':
        return Images.mastercard;
      case 'apple_pay':
        return Images.apple;
      case 'google_pay':
        return Images.google;
      case 'paypal_pay':
        return Images.paypal;
      default:
        break;
    }
  };
  const Example_data = [
    {type: 'paypal_pay', title: 'Paypal', connected: true},
    {type: 'apple_pay', title: 'Apple Pay', connected: true},
    {type: 'google_pay', title: 'Google Pay', connected: false},
    {
      type: 'mastercard',
      title: 'Mastercard',
      connected: true,
      last4number: '4678',
    },
    {
      type: 'mastercard',
      title: 'Mastercard',
      connected: true,
      last4number: '2353',
    },
    {
      type: 'mastercard',
      title: 'Mastercard',
      connected: true,
      last4number: '1234',
    },
    {
      type: 'mastercard',
      title: 'Mastercard',
      connected: true,
      last4number: '4233',
    },
    {
      type: 'mastercard',
      title: 'Mastercard',
      connected: true,
      last4number: '1234',
    },
  ];

  return (
    <Container style={styles.container} level="2" useSafeArea={false}>
      <TopNavigation
        style={[globalStyle.topNavigation, {paddingTop: top + 8}]}
        title={'Payment Method'}
        accessoryLeft={() => <NavigationAction marginRight={12} />}
      />
      <Content contentContainerStyle={styles.content}>
        {Example_data.map((item, index) => {
          return (
            <CustomLayout
              ph={16}
              border={16}
              mb={16}
              pv={16}
              mh={16}
              key={index}
              level="1"
              justify="space-between"
              horizontal
              itemsCenter>
              <CustomLayout horizontal itemsCenter gap={16}>
                <Image source={getImg(item.type)} />
                {item.last4number ? (
                  <Text category="c1">
                    {'**** **** ****'} {item.last4number}
                  </Text>
                ) : (
                  <Text>{item.title}</Text>
                )}
              </CustomLayout>
              {item.connected && <Text status="primary">{'Connected'}</Text>}
            </CustomLayout>
          );
        })}
      </Content>
    </Container>
  );
});

export default PaymentsScreen;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 80,
    paddingTop: 24,
  },
});

const DATA = [{title: 'Paypal', connected: true}];
