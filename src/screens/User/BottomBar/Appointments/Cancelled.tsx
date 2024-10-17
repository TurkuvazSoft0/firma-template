import React from 'react';
import {View, Image, FlatList} from 'react-native';
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

import {Container, Content, CustomLayout, Text} from 'components';
import {DOCTORS_DATA} from 'constants/data';
import UpcomingAppointment from 'elements/UpcomingAppointment';
import {AppointmentItemProps, AppointmentType} from 'types/element-types';
import keyExtractoUtil from 'utils/keyExtractorUtil';
import CancelAppointment from 'elements/CancelAppointment';

const Cancelled = React.memo(() => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const {goBack} = useNavigation();
  const {height, width, top, bottom} = useLayout();

  return (
    <CustomLayout style={styles.container}>
      <FlatList
        keyExtractor={keyExtractoUtil}
        data={DATA_CANCEL}
        contentContainerStyle={styles.content}
        renderItem={({item}) => {
          return <CancelAppointment data={item} />;
        }}
      />
    </CustomLayout>
  );
});

export default Cancelled;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    gap: 12,
    paddingTop: 24,
    paddingBottom: 140,
  },
});
const DATA_CANCEL: AppointmentItemProps[] = [
  {
    id: '1',
    doctor: DOCTORS_DATA[0],
    type: AppointmentType.Message,
    time: '2022-02-15T08:15:00Z',
    problem:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    package: {
      id: '1',
      title: 'Messaging',
      describe: 'Chat message with doctor',
      price: 20,
    },
  },
  {
    id: '2',
    doctor: DOCTORS_DATA[1],
    type: AppointmentType.VoiceCall,
    time: '2022-02-15T08:15:00Z',
    problem:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    package: {
      id: '1',
      title: 'Voice Call',
      describe: 'Voice call with doctor',
      price: 40,
    },
  },
  {
    id: '3',
    doctor: DOCTORS_DATA[2],
    type: AppointmentType.VideoCall,
    time: '2022-02-15T08:15:00Z',
    problem:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    package: {
      id: '1',
      title: 'Video Call',
      describe: 'Video call with doctor',
      price: 60,
    },
  },
  {
    id: '4',
    doctor: DOCTORS_DATA[3],
    type: AppointmentType.VideoCall,
    time: '2022-02-15T08:15:00Z',
    problem:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    package: {
      id: '1',
      title: 'Voice Call',
      describe: 'Voice call with doctor',
      price: 40,
    },
  },
  {
    id: '5',
    doctor: DOCTORS_DATA[4],
    type: AppointmentType.VoiceCall,
    time: '2022-02-15T08:15:00Z',
    problem:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    package: {
      id: '1',
      title: 'Voice Call',
      describe: 'Voice call with doctor',
      price: 40,
    },
  },
  {
    id: '6',
    doctor: DOCTORS_DATA[5],
    type: AppointmentType.Message,
    time: '2022-02-15T08:15:00Z',
    problem:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    package: {
      id: '1',
      title: 'Video Call',
      describe: 'Video call with doctor',
      price: 60,
    },
  },
];
