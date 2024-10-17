import React from 'react';
import {TouchableOpacity} from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import { TopNavigation, StyleService, useStyleSheet, Radio, Input, Button, ViewPager, Calendar } from '@ui-kitten/components';
// ----------------------------- Navigation -----------------------------------
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
// ----------------------------- Hooks ---------------------------------------
import {useLayout} from 'hooks';
// ----------------------------- Components && Elements -----------------------
import { Container, Content, CustomLayout, ModalMessage, NavigationAction, Text } from 'components';
// ----------------------------- Types ---------------------------------------
import { MainStackParamList, RescheduleAppointmentNavigationProp } from 'types/navigation-types';
// ----------------------------- Style ---------------------------------------
import {globalStyle} from 'styles/globalStyle';

const RescheduleAppointment = React.memo(() => {
  const styles = useStyleSheet(themedStyles);
  const {navigate,goBack} = useNavigation<NavigationProp<MainStackParamList>>();
  const {width} = useLayout();

  const today = new Date();
  const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

  const [selectedTab, setSelectedTab] = React.useState(0);
  const [modal, setModal] = React.useState(false);

  const [date, setDate] = React.useState(tomorrow);
  const [selected, setSelected] = React.useState('');
  const [input, setInput] = React.useState('');
  const [selectedHour, setSelectedHour] = React.useState('');
  const data =
    useRoute<RescheduleAppointmentNavigationProp>().params.appointment;

  const _onSubmit = () => {
    switch (selectedTab) {
      case 0:
        return setSelectedTab(1);
      case 1:
        return setModal(true);
      default:
        break;
    }
  };

  const filter = (date:Date): boolean => date.getDay() !== 0 && date.getDay() !== 6
  

  const _selectedHour = (opt: string) => () => {
    setSelectedHour(opt);
  };
  const _onDetailAppointment = () => {
    navigate('AppointmentDetails', {appointment: data});
  };
  const _onViewAppointment = () => {
    navigate('BottomTabNavigator');
  };
  return (
    <Container style={styles.container} level="1">
      <TopNavigation
        style={globalStyle.topNavigation}
        title={'Reschedule Appointment'}
        //@ts-ignore
        accessoryLeft={<NavigationAction marginRight={8} onPress={()=>{
          selectedTab===0?goBack():setSelectedTab(0)
        }}/>}
      />
      <Content contentContainerStyle={styles.content}>
        <ViewPager
          selectedIndex={selectedTab}
          onSelect={setSelectedTab}
          style={styles.viewPager}
          swipeEnabled={false}>
          <CustomLayout gap={16} style={styles.page}>
            <Text category="t5">Select reason for Schedule change</Text>
            {OPTIONS.map((opt, index) => {
              const isActive = selected === opt;
              return (
                <CustomLayout
                  key={index}
                  horizontal
                  gap={12}
                  onPress={() => {
                    setSelected(opt);
                  }}>
                  <Radio
                    checked={isActive}
                    onChange={() => {
                      setSelected(opt);
                    }}
                  />
                  <Text>{opt}</Text>
                </CustomLayout>
              );
            })}
            <Input
              value={input}
              onChangeText={setInput}
              placeholder="Tell us more about it"
              multiline
              disabled={selected !== 'Other'}
              style={styles.input}
            />
          </CustomLayout>
          <CustomLayout style={styles.page} gap={16}>
            <Text category="t5">Select New Date</Text>
            <Calendar filter={filter} min={tomorrow} style={styles.calendar} 
            initialVisibleDate={tomorrow} date={date} onSelect={setDate} />
            <Text category="t5" marginTop={12}>
              Select Hour
            </Text>
            <CustomLayout gap={16} wrap horizontal>
              {OPTION_HOUR.map((item, index) => {
                const isActive = selectedHour === item;
                const disable=date === new Date()
                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    disabled={disable}
                    key={index}
                    style={[
                      styles.optHour,
                      disable && styles.disable,
                      isActive && styles.selectedOptHour,
                      {width: (width - 68) / 3},
                    ]}
                    onPress={_selectedHour(item)}>
                    <Text
                      status={
                        isActive ? 'white': disable ? 'placeholder' : 'primary'
                      }
                      category={!isActive ? 'subhead' : 'body'}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </CustomLayout>
          </CustomLayout>
        </ViewPager>
      </Content>
      <Button
        children={selectedTab === 0 ? 'Next' : 'Submit'}
        style={styles.buttonSubmit}
        onPress={_onSubmit}
      />
      <ModalMessage
        title="Rescheduling Success!"
        describe="Appointment successfully changed. You will receive a notification and the doctor will contact you."
        type="success"
        first_button={{title: 'View Appointment', onPress: _onViewAppointment}}
        second_button={{title: 'Details', onPress: _onDetailAppointment}}
        visible={modal}
        setVisible={setModal}
        onBackdropPress={_onDetailAppointment}
      />
    </Container>
  );
});

export default RescheduleAppointment;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  topNavigation: {
    paddingBottom: 12,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  content: {
    gap: 16,
    paddingTop: 16,
    paddingBottom: 60,
  },
  input: {
    height: 240,
    marginTop: 12,
  },
  page: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 24,
  },
  viewPager: {
    flex: 1,
  },
  buttonSubmit: {
    marginHorizontal: 16,
  },
  calendar: {
    width: '100%',
    borderRadius: 16,
    borderColor: 'text-primary-color',
  },
  optHour: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: 'text-primary-color',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 2,
  },
  selectedOptHour: {
    borderRadius: 16,
    borderColor: 'text-primary-color',
    backgroundColor: 'text-primary-color',
  },
  disable: {
    borderColor: 'text-placeholder-color',
  },
});

const OPTIONS = [
  'I have a schedule clash',
  `I'm not available on schedule`,
  "I have activity that can't be left behide",
  "I don't want to tell",
  'Other',
];


const OPTION_HOUR = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '01:00 PM',
  '01:30 PM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
  '04:30 PM',
  '05:00 PM',
  '05:30 PM',
];
