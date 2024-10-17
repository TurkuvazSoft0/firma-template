import React from 'react';
// ----------------------------- UI kitten -----------------------------------
import { TopNavigation, StyleService, useStyleSheet, Input, Radio, Button } from '@ui-kitten/components';
// ----------------------------- Navigation -----------------------------------
import {NavigationProp, useNavigation} from '@react-navigation/native';
// ----------------------------- Components && Elements -----------------------
import { Container, Content, CustomLayout, ModalMessage, NavigationAction, Text } from 'components';
// ----------------------------- Types ---------------------------------------
import {MainStackParamList} from 'types/navigation-types';

const CancelAppoiment = React.memo(() => {
  const {navigate} = useNavigation<NavigationProp<MainStackParamList>>();
  const styles = useStyleSheet(themedStyles);

  const [modal, setModal] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [selected, setSelected] = React.useState('');

  const onSubmit = () => {
    setModal(true);
  };
  const _onViewAppointment = () => {
    navigate('BottomTabNavigator');
  };
  const _onHomePage = () => {
    //@ts-ignore
    navigate('BottomTabNavigator', {screen: 'Home'});
  };
  return (
    <Container style={styles.container} level="1">
      <TopNavigation
        title="Cancel Appoiment"
        // @ts-ignore
        accessoryLeft={<NavigationAction marginRight={12} />}
      />
      <Content contentContainerStyle={styles.content}>
        <CustomLayout gap={12}>
          <Text category="t5">Select reason for Schedule change</Text>
          {OPTIONS.map((opt, index) => {
            const isActive = selected === opt;
            return (
              <CustomLayout
                key={index}
                horizontal
                gap={12}
                pv={8}
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
      </Content>
      <Button children="Submit" style={styles.button} onPress={onSubmit} />
      <ModalMessage
        title="Cancel Appointment Success!"
        describe="Appointment successfully remove. You will receive a notification and the doctor will contact you."
        type="success"
        first_button={{title: 'View Appointment', onPress: _onViewAppointment}}
        second_button={{title: 'Home', onPress: _onHomePage}}
        visible={modal}
        setVisible={setModal}
        onBackdropPress={_onViewAppointment}
      />
    </Container>
  );
});

export default CancelAppoiment;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  input: {
    flex: 1,
  },
  button: {
    marginHorizontal: 16,
  },
});
const OPTIONS = [
  'I want to change to an other doctor',
  'I want to change to an other package',
  `I don't want to consult`,
  'I have recovered from the disease',
  'I have found a suitable medicine',
  'I just want to cancel it',
  "I don't want to tell",
  'Other',
];
