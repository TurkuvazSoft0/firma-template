import React from 'react';
// ----------------------------- UI kitten -----------------------------------
import { TopNavigation, StyleService, useStyleSheet, useTheme, Avatar, Button } from '@ui-kitten/components';
// ----------------------------- Navigation -----------------------------------
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
// ----------------------------- Hooks ---------------------------------------
import {useLayout} from 'hooks';
// ----------------------------- Assets ---------------------------------------
import {Images} from 'assets/images';
// ----------------------------- Components && Elements -----------------------
import Lottie from 'lottie-react-native';
import { Container, Content, CustomLayout, IDivider, NavigationAction, Text } from 'components';
// ----------------------------- Types ---------------------------------------
import {MainStackParamList} from 'types/navigation-types';

const AppointmentFinish = React.memo(() => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const {goBack, navigate} =
    useNavigation<NavigationProp<MainStackParamList>>();
  const {height, width, top, bottom} = useLayout();
  const size = 140 * (width / 375);
  const doctor =
    useRoute<RouteProp<MainStackParamList, 'AppointmentFinish'>>().params
      .doctor;
  const _onHome = () => {
    //@ts-ignore
    navigate('BottomTabNavigator', {screen: 'Home'});
  };
  const _onReview = () => {
    navigate('WriteReviewScreen',{doctor:doctor})
  };
  return (
    <Container style={styles.container} level="1">
      {/* @ts-ignore */}
      <TopNavigation accessoryLeft={<NavigationAction />} />
      <Content contentContainerStyle={styles.content}>
        <Lottie
          source={Images.lottie.success}
          resizeMode="contain"
          style={{
            width: size,
            height: size,
            alignSelf: 'center',
          }}
          autoPlay
          loop={false}
        />
        <Text center>The consultation session has ended.</Text>
        <Text center category="subhead" marginBottom={24}>
          Recordings have been save in activity
        </Text>
        <IDivider marginBottom={12} />
        <Avatar
          source={doctor.avatar}
          style={{width: size, height: size, alignSelf: 'center'}}
        />
        <Text category="t5" center>
          {doctor.name}
        </Text>
        <Text category="body" fontWeight={'400'} center>
          {doctor.specialty}
        </Text>
        <Text category="subhead" center>
          {doctor.hospital}
        </Text>
        <IDivider marginVertical={12} />
      </Content>
      <CustomLayout horizontal gap={16} ph={24}>
        <Button
          children={'Back to Home'}
          style={styles.button}
          status="primary-transparent"
          onPress={_onHome}
        />
        <Button
          children={'Leave a Review'}
          style={styles.button}
          onPress={_onReview}
        />
      </CustomLayout>
    </Container>
  );
});

export default AppointmentFinish;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    gap: 12,
    paddingHorizontal: 24,
  },
  button: {
    flex: 1,
  },
});
