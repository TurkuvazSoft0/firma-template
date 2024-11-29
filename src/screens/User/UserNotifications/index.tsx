import React, { useEffect } from 'react';
import {Alert, FlatList} from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
// ----------------------------- Components && Elements -----------------------
import {Container, NavigationAction} from 'components';
import NotificationItem, {INotificationItemProps} from './UserNotificationsItem';
// ----------------------------- Ultils ---------------------------------------
import keyExtractoUtil from 'utils/keyExtractorUtil';

// ----------------------------- Types -----------------------------------
import EvaIcons from 'types/eva-icon-enum';
import { AppDispatch, RootState } from "reduxs/store";
import { useDispatch,useSelector } from 'react-redux';
import { GetFullMail, GetMailUsers, SetMailUpdate } from 'reduxs/reducers/teklifSlice';
import UserNotificationsItem from './UserNotificationsItem';
const UserNotificationScreen = React.memo(() => {
  const styles = useStyleSheet(themedStyles);
  const dispatch = useDispatch<AppDispatch>();
  const mail  = useSelector((state: RootState) => state.register.email);
  const mail_icerik  = useSelector((state: RootState) => state.teklif.musterimaileri);
  console.log(mail_icerik,"mail iceriği");
  useEffect(() => {
    const formData = new FormData();
    formData.append("mail_adresi", mail);

    const fetchData = () => {
      dispatch(GetMailUsers(formData));
    };

    fetchData(); // İlk veri çekme işlemi

    const intervalId = setInterval(fetchData, 3000); // Her 3 saniyede bir veri çek

    return () => clearInterval(intervalId); // Bileşen unmount olduğunda interval'i temizle
  }, [mail, dispatch]);
    const handleSubmit = (durum : any, id : number) => {
      const forms = new FormData();
      forms.append("mail_id", id);
      forms.append("mail_durum", durum);

      dispatch(SetMailUpdate(forms)).then(() => {
        Alert.alert("Güncelleme İşlemi Basarılı");
          const formData = new FormData();
         
          formData.append("mail", mail);
          dispatch(GetFullMail(formData));
      });
  };
   const renderItem = ({
    item,
    index,
  }: {
    item: INotificationItemProps;
    index: number;
  }) => {
    return (
      <UserNotificationsItem onPress={handleSubmit} mail_id={item.mail_id} data={item} lastItem={index === DATA.length - 1} />
    );
  };

  return (
    <Container style={styles.container} level="1">
      <TopNavigation
        title="Kullanıcı Bildirimleri"
        accessoryLeft={() => <NavigationAction marginRight={12} />}
        accessoryRight={() => (
          <NavigationAction icon={EvaIcons.MoreHorizontal} />
        )}
      />
      <FlatList
        data={mail_icerik}
        renderItem={renderItem}
        keyExtractor={keyExtractoUtil}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </Container>
  );
});

export default UserNotificationScreen;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  contentContainerStyle: {
    paddingTop: 24,
    paddingBottom: 80,
  },
  text: {
    color: '#FFFFFF',
  },
});

const DATA: INotificationItemProps[] = [
  {
    type: 'success',
    title: 'Appointment Confirmed',
    createAt: '2022-02-01T09:00:00Z',
    readed: true,
    describe:
      'Your appointment with Dr. John Doe has been confirmed for tomorrow at 10:00 AM.',
  },
  {
    type: 'warning',
    title: 'Appointment Reminder',
    createAt: '2022-02-05T12:30:00Z',
    readed: true,
    describe:
      'You have an appointment with Dr. Jane Smith in one hour. Please make sure to arrive on time.',
  },
  {
    type: 'danger',
    title: 'Appointment Cancellation',
    createAt: '2022-02-10T15:45:00Z',
    readed: true,
    describe:
      'We regret to inform you that your appointment with Dr. Mike Johnson has been cancelled due to unforeseen circumstances. We apologize for any inconvenience.',
  },
  {
    type: 'primary',
    title: 'Health Checkup Reminder',
    createAt: '2022-02-15T08:15:00Z',
    readed: false,
    describe:
      'It has been six months since your last health checkup. Please schedule an appointment with your doctor as soon as possible.',
  },
  {
    type: 'warning',
    title: 'Prescription Refill Needed',
    createAt: '2022-02-18T11:00:00Z',
    readed: false,
    describe:
      'You are running low on your medication. Please contact your pharmacy to refill your prescription.',
  },
  {
    type: 'success',
    title: 'Lab Results Ready',
    createAt: '2022-02-22T14:20:00Z',
    readed: false,
    describe:
      'Your lab results are ready. Please log in to your patient portal to view them.',
  },
  {
    type: 'danger',
    title: 'Missed Appointment',
    createAt: '2022-02-25T16:30:00Z',
    readed: false,
    describe:
      'You missed your appointment with Dr. John Doe. Please contact our office to reschedule.',
  },
  {
    type: 'primary',
    title: 'Annual Physical Reminder',
    createAt: '2022-03-01T09:00:00Z',
    readed: false,
    describe:
      'It is time for your annual physical. Please schedule an appointment with your doctor as soon as possible.',
  },
  {
    type: 'warning',
    title: 'Insurance Update Needed',
    createAt: '2022-03-07T13:45:00Z',
    readed: false,
    describe:
      'Your insurance information is out of date. Please update it in your patient portal or provide us with a copy during your next visit.',
  },
  {
    type: 'success',
    title: 'Flu Shot Available',
    createAt: '2022-03-10T11:15:00Z',
    readed: false,
    describe:
      'Flu shots are now available at our office. Please schedule an appointment or walk in during our office hours.',
  },
];
