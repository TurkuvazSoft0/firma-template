import React from 'react';

// ----------------------------- UI kitten -----------------------------------
import { StyleService, useStyleSheet, useTheme, Avatar, Button } from '@ui-kitten/components';

// ----------------------------- Navigation -----------------------------------
import {NavigationProp, useNavigation} from '@react-navigation/native';

// ----------------------------- Components && Elements -----------------------
import {Text, CustomLayout, AppIcon, IDivider} from 'components';
import dayjs from 'dayjs';

// ----------------------------- Types ---------------------------------------
import EvaIcons from 'types/eva-icon-enum';
import {MainStackParamList} from 'types/navigation-types';
import { AppointmentItemProps, AppointmentType, StatusOnlineEnum } from 'types/element-types';
// ----------------------------- Style ---------------------------------------
import {globalStyle} from 'styles/globalStyle';

const CompletedAppointment = ({data}: {data: AppointmentItemProps}) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const {navigate} = useNavigation<NavigationProp<MainStackParamList>>();

  const doctor = data.doctor;

  const renderIcon = (type: AppointmentType) => {
    switch (type) {
      case AppointmentType.Message:
        return EvaIcons.MessageCircleOutline;
      case AppointmentType.VideoCall:
        return EvaIcons.VideoOutline;
      case AppointmentType.VoiceCall:
        return EvaIcons.PhoneCallOutline;
      default:
        return EvaIcons.MessageCircleOutline;
    }
  };
  const getColorStatus = (status: StatusOnlineEnum) => {
    switch (status) {
      case StatusOnlineEnum.Offline:
        return theme['background-basic-color-5'];
      case StatusOnlineEnum.Online:
        return theme['color-success-500'];
      case StatusOnlineEnum.JustLeave:
        return theme['color-primary-300'];
      default:
        break;
    }
  };

  const _onDetails = () => {
    navigate('AppointmentDetails', {appointment: data});
  };
  const _onDoctor = () => {
    navigate('DetailsDoctor', {doctor: doctor});
  };

  return (
    <CustomLayout level="1" style={styles.container}>
      <CustomLayout level="1" horizontal gap={12}>
        <CustomLayout onPress={_onDoctor}>
          <Avatar source={doctor.avatar} size="giant" />
          <CustomLayout
            style={[
              styles.status,
              {backgroundColor: getColorStatus(doctor.isOnline)},
            ]}
          />
        </CustomLayout>
        <CustomLayout style={{flex: 1}} justify="space-between">
          <Text>{doctor.name}</Text>
          <CustomLayout horizontal itemsCenter>
            <Text category="subhead">{data.type} - </Text>
            <CustomLayout style={styles.tag}>
              <Text category="c1" status="success">
                Completed
              </Text>
            </CustomLayout>
          </CustomLayout>
          <Text category="c1" status="placeholder">
            Today | {dayjs(data.time).format('HH:MM A')}
          </Text>
        </CustomLayout>
        <AppIcon
          onPress={_onDetails}
          name={renderIcon(data.type)}
          buttonStyle={styles.button}
          fill={theme['text-primary-color']}
        />
      </CustomLayout>
      <IDivider marginVertical={12} level="9" />
      <CustomLayout horizontal gap={16}>
        <Button
          style={styles.selectButton}
          children={'Book Again'}
          status="primary-transparent"
          size="tiny"
        />
        <Button
          style={styles.selectButton}
          children={'Leave A Review'}
          status="primary"
          size="tiny"
        />
      </CustomLayout>
    </CustomLayout>
  );
};

export default CompletedAppointment;

const themedStyles = StyleService.create({
  container: {
    padding: 16,
    borderRadius: 16,
    ...globalStyle.shadow,
  },
  button: {
    backgroundColor: `color-primary-100`,
    alignSelf: 'center',
    padding: 12,
    borderRadius: 12,
  },
  tag: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'text-success-color',
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  selectButton: {
    flex: 1,
    height: 32,
  },
  status: {
    width: 16,
    height: 16,
    backgroundColor: 'red',
    borderRadius: 99,
    position: 'absolute',
    zIndex: 100,
    bottom: 0,
    right: 4,
    borderWidth: 2,
    borderColor: 'background-basic-color-1',
  },
});
