import React from 'react';
import {FlatList} from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import {
  StyleService,
  useStyleSheet,
  useTheme,
  Button,
  Modal,
} from '@ui-kitten/components';
// ----------------------------- Navigation -----------------------------------
import {NavigationProp, useNavigation} from '@react-navigation/native';
// ----------------------------- Hooks ---------------------------------------
import {useLayout} from 'hooks';
// ----------------------------- Assets ---------------------------------------------
import {DOCTORS_DATA} from 'constants/data';

// ----------------------------- Components && Elements -----------------------
import {CustomLayout, IDivider, Text} from 'components';
import UpcomingAppointment from 'elements/UpcomingAppointment';

// ----------------------------- Types ---------------------------------------
import {AppointmentItemProps, AppointmentType} from 'types/element-types';
import {MainStackParamList} from 'types/navigation-types';

// ----------------------------- Types ---------------------------------------------
import keyExtractoUtil from 'utils/keyExtractorUtil';

const UpComing = React.memo(() => {
  const styles = useStyleSheet(themedStyles);
  const {navigate} = useNavigation<NavigationProp<MainStackParamList>>();
  const {width} = useLayout();

  const [visible, setVisible] = React.useState(false);
  const [selectedItem, setSelectedItem] =
    React.useState<AppointmentItemProps>();
  const showModal = () => {
    setVisible(true);
  };
  const closeModal = () => {
    setVisible(false);
  };
  const _onCancel = (item: AppointmentItemProps) => () => {
    showModal();
    setSelectedItem(item);
  };
  const handleCancel = () => {
    closeModal();
    selectedItem && navigate('CancelAppoiment', {appointment: selectedItem});
  };
  return (
    <CustomLayout style={styles.container}>
      <FlatList
        keyExtractor={keyExtractoUtil}
        data={DATA_UPCOMING}
        contentContainerStyle={styles.content}
        renderItem={({item}) => {
          return <UpcomingAppointment data={item} onCancel={_onCancel(item)} />;
        }}
      />
      <Modal visible={visible} backdropStyle={styles.backdrop}>
        <CustomLayout level="1" style={[styles.modal, {width: width - 40}]}>
          <Text category="t5" status="danger" center>
            Cancel Appointment
          </Text>
          <IDivider marginTop={12} marginBottom={16} />
          <Text center marginBottom={8}>
            Are you sure want cancel your appointment?
          </Text>
          <Text center>
            Only 50% of the funds will be returned to your account.
          </Text>
          <IDivider marginVertical={24} />
          <CustomLayout horizontal gap={16}>
            <Button
              children="Back"
              style={styles.buttonModal}
              status="primary-transparent"
              onPress={closeModal}
            />
            <Button
              children="Yes. Cancel"
              style={styles.buttonModal}
              status="danger"
              onPress={handleCancel}
            />
          </CustomLayout>
        </CustomLayout>
      </Modal>
    </CustomLayout>
  );
});

export default UpComing;

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
  backdrop: {
    backgroundColor: `#000000`,
    opacity: 0.6,
  },
  modal: {
    padding: 16,
    borderRadius: 16,
  },
  buttonModal: {
    flex: 1,
  },
});
const DATA_UPCOMING: AppointmentItemProps[] = [
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
