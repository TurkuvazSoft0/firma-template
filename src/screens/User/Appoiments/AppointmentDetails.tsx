import React from 'react';

// ----------------------------- UI kitten -----------------------------------
import { TopNavigation, StyleService, useStyleSheet, useTheme, Button, Avatar } from '@ui-kitten/components';

// ----------------------------- Navigation -----------------------------------
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';

// ----------------------------- Components && Elements -----------------------
import { AppIcon, Container, Content, CustomLayout, NavigationAction, ReadMoreText, Text } from 'components';

// ----------------------------- Hooks ---------------------------------------
import {useLayout} from 'hooks';

// ----------------------------- Style ---------------------------------------
import {globalStyle} from 'styles/globalStyle';

// ----------------------------- Types ---------------------------------------
import {MainStackParamList} from 'types/navigation-types';
import {AppointmentType} from 'types/element-types';
import EvaIcons from 'types/eva-icon-enum';
import dayjs from 'dayjs';

const AppointmentDetails = React.memo(() => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const {navigate} = useNavigation<NavigationProp<MainStackParamList>>();
  const {top} = useLayout();
  const data =
    useRoute<RouteProp<MainStackParamList, 'AppointmentDetails'>>().params
      .appointment;
  const doctor = data.doctor;

  const _onMessage = () => {
    navigate('ChatScreen', {user: doctor});
  };
  const _onVoiceCall = () => {
    navigate('VoiceCallScreen', {user: doctor});
  };
  const _onVideoCall = () => {
    navigate('VideoCallScreen', {user: doctor});
  };
  const renderButton = () => {
    switch (data.type) {
      case AppointmentType.Message:
        return (
          <Button
            accessoryLeft={
              <AppIcon
                fill={theme['text-white-color']}
                name={EvaIcons.MessageCircle}
              />
            }
            children={`Messages`}
            onPress={_onMessage}
          />
        );
      case AppointmentType.VideoCall:
        return (
          <Button
            accessoryLeft={
              <AppIcon fill={theme['text-white-color']} name={EvaIcons.Video} />
            }
            children={`Video Call`}
            onPress={_onVideoCall}
          />
        );
      case AppointmentType.VoiceCall:
        return (
          <Button
            accessoryLeft={
              <AppIcon
                fill={theme['text-white-color']}
                name={EvaIcons.PhoneCall}
              />
            }
            onPress={_onVoiceCall}
            children={`Voice Call`}
          />
        );

      default:
        break;
    }
  };
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={[globalStyle.topNavigation, {paddingTop: top + 8}]}
        title={`Appointment ${data.type}`}
        //@ts-ignore
        accessoryLeft={<NavigationAction marginRight={12} />}
      />
      <Content contentContainerStyle={styles.content}>
        <CustomLayout gap={24}>
          <CustomLayout style={styles.doctor} level="1" horizontal itemsCenter>
            <Avatar source={doctor.avatar} />
            <CustomLayout gap={4}>
              <Text category="t5">{doctor.name}</Text>
              <Text category="subhead" status="platinum">
                {doctor.specialty}
              </Text>
              <Text category="subhead" status="platinum">
                {doctor.hospital}
              </Text>
            </CustomLayout>
          </CustomLayout>
          <CustomLayout gap={8}>
            <Text category="t5">Scheduled Appointment</Text>
            <Text fontWeight={'400'}>
              Today, {dayjs(data.time).format('MMMM, DD, YYYY')}
            </Text>
            <Text fontWeight={'400'}>{dayjs(data.time).format('HH:mm A')}</Text>
          </CustomLayout>
          <CustomLayout gap={8}>
            <Text category="t5">Information</Text>
            <ReadMoreText text={data.problem} maxLength={120} />
          </CustomLayout>
          <CustomLayout>
            <Text category="t5">Your package</Text>
          </CustomLayout>
          <CustomLayout
            level="1"
            border={16}
            padding={16}
            horizontal
            itemsCenter
            justify="space-between">
            <CustomLayout horizontal itemsCenter gap={12}>
              <AppIcon
                name={EvaIcons.Cube}
                fill={theme['text-primary-color']}
                layoutIconStyle={styles.layout}
              />
              <CustomLayout gap={8}>
                <Text>{data.package.title}</Text>
                <Text category="subhead">{data.package.describe}</Text>
              </CustomLayout>
            </CustomLayout>
            <Text status="primary">$ {data.package.price}</Text>
          </CustomLayout>
        </CustomLayout>
      </Content>
      <CustomLayout pv={4} ph={24}>
        {renderButton()}
      </CustomLayout>
    </Container>
  );
});

export default AppointmentDetails;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  layout: {
    backgroundColor: `color-primary-transparent-200`,
    padding: 8,
    borderRadius: 8,
  },
  doctor: {
    gap: 12,
    borderRadius: 16,
    padding: 16,
  },
});
