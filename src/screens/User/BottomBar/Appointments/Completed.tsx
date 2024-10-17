import React from 'react';
import {FlatList} from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import {StyleService, useStyleSheet} from '@ui-kitten/components';
// ----------------------------- Fake_data ---------------------------------------
import {DOCTORS_DATA} from 'constants/data';
// ----------------------------- Components && Elements -----------------------
import {CustomLayout} from 'components';
import CancelAppointment from 'elements/CancelAppointment';
// ----------------------------- Types ---------------------------------------
import {AppointmentItemProps, AppointmentType} from 'types/element-types';
// ----------------------------- Utils ---------------------------------------
import keyExtractoUtil from 'utils/keyExtractorUtil';
import CompletedAppointment from 'elements/CompletedAppointment';

const Completed = React.memo(() => {
  const styles = useStyleSheet(themedStyles);
  return (
    <CustomLayout style={styles.container}>
      <FlatList
        keyExtractor={keyExtractoUtil}
        data={DATA_COMPLETE}
        contentContainerStyle={styles.content}
        renderItem={({item}) => {
          return <CompletedAppointment data={item} />;
        }}
      />
    </CustomLayout>
  );
});

export default Completed;

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
const DATA_COMPLETE: AppointmentItemProps[] = [
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
