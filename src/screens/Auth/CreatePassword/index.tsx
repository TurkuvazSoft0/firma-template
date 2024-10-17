import React, {memo} from 'react';
// ----------------------------- UI kitten -----------------------------------
import {Input, Button, StyleService, useStyleSheet} from '@ui-kitten/components';
// ----------------------------- Hook -----------------------------------------
import { useToggle} from 'hooks';
// ----------------------------- Navigation -----------------------------------
import { AuthStackParamList } from 'types/navigation-types';
import {NavigationProp, useNavigation} from '@react-navigation/native';
// ----------------------------- Components & Elements ------------------------
import {Container, Content, Text, CustomLayout as Layout} from 'components';

const CreatePassword = memo(() => {
  const {navigate} = useNavigation<NavigationProp<AuthStackParamList>>();
  const styles = useStyleSheet(themedStyles);

  const [show, toggle] = useToggle(true);
  return (
    <Container style={styles.container}>
      {/* <HeaderAuth
        accessoryRight={
          <Text status="primary" category="subhead">
            Need Help?
          </Text>
        }
      /> */}
      <Content contentContainerStyle={styles.content}>
        <Layout gap={8}>
          <Text category="t2">Create Password</Text>
          <Text category="subhead" opacity={0.7}>
            You need to secure your account.
          </Text>
        </Layout>
        <Layout gap={4}>
          <Text category="subhead" opacity={0.7}>
            Password
          </Text>
          <Input
            placeholder="Password"
            secureTextEntry={show}
            style={styles.input}
            accessoryRight={() => (
              <Text status="primary" category='c1' marginRight={4}>{show ? 'Hide' : 'Show'}</Text>
            )}
          />
          <Input placeholder="Re-Password" secureTextEntry={show} />
          <Layout
            horizontal
            justify="flex-start"
            style={{alignItems: 'flex-start'}}
            gap={4}>
            <Text category="subhead" status="placeholder">
              Must be more than 8 characters and contain at least one capital
              letter, one number and one special character
            </Text>
          </Layout>
        </Layout>
        <Button children={'Continue'} onPress={()=>{navigate('CreatePin')}}/>
      </Content>
    </Container>
  );
});

export default CreatePassword;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    gap: 24,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  input: {
    marginBottom: 24,
  },
});
