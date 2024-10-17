import React, {memo} from 'react';
import {TouchableOpacity} from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import { TopNavigation, StyleService, useStyleSheet, Button } from '@ui-kitten/components';
// ----------------------------- @Types ---------------------------------------
import {AuthStackParamList} from 'types/navigation-types';
// ----------------------------- Navigation -----------------------------------
import {NavigationProp, useNavigation} from '@react-navigation/native';
// ----------------------------- Utils -----------------------------------
import useCountDownUtil from 'utils/useCountDownUtil';
// ----------------------------- Components & Elements ------------------------
import { NavigationAction, Container, Content, Text, CustomLayout as Layout } from 'components';
import InputCodeOtp from '../elements/InputCodeOtp';

const VerifySignup = memo(() => {
  const {navigate} = useNavigation<NavigationProp<AuthStackParamList>>();
  const styles = useStyleSheet(themedStyles);

  const [time, reset] = useCountDownUtil(60);
  const [code, setCode] = React.useState('');
  return (
    <Container style={styles.container}>
      <TopNavigation accessoryLeft={()=><NavigationAction />} />
      <Content contentContainerStyle={styles.content}>
        <Layout gap={8}>
          <Text category="t4">Verify your Phone Number</Text>
          <Layout>
            <Text category="subhead" opacity={0.7}>
              A 6 digit OTP code has been sent to{' '}
            </Text>
            <Layout horizontal gap={4}>
              <Text status="primary" category="subhead">
                +2348065650633
              </Text>
              <Text category="subhead" opacity={0.7}>
                {' '}
                and{' '}
              </Text>
              <Text status="primary" category="subhead">
                usmanndako@gmail.com
              </Text>
            </Layout>
            <Text category="subhead" opacity={0.7}>
              enter the code to continue.
            </Text>
          </Layout>
        </Layout>
        <Layout gap={4}>
          <Text category="subhead" opacity={0.7} marginLeft={16}>
            Enter OTP
          </Text>
          <InputCodeOtp
            style={styles.enterCode}
            {...{code, setCode}}
            codeLength={5}
            autoFocus
          />
        </Layout>
        <Layout horizontal gap={4} itemsCenter justify="center">
          <Text category="subhead" opacity={0.7}>
            Resend code in:
          </Text>
          <Text category="body">{time} secs</Text>
        </Layout>
        <TouchableOpacity disabled={Number(time) > 0} onPress={reset}>
          <Text status={Number(time) ? 'placeholder' : 'primary'} center>
            Reset
          </Text>
        </TouchableOpacity>
        <Button
          children={'Verify'}
          onPress={() => navigate('CreatePassword')}
        />
      </Content>
    </Container>
  );
});

export default VerifySignup;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 40,
    paddingHorizontal: 16,
    gap: 24,
  },
  enterCode: {},
});
