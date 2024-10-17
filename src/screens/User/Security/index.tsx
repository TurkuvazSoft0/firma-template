import React from 'react';
// ----------------------------- UI kitten -----------------------------------
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  useTheme,
  Button,
} from '@ui-kitten/components';
// ----------------------------- Navigation -----------------------------------
import {NavigationProp, useNavigation} from '@react-navigation/native';
// ----------------------------- Components && Elements -----------------------
import {Formik} from 'formik';
import {Container, Content, NavigationAction} from 'components';
import SettingToggle from '../Settings/SettingToggle';
// ----------------------------- Types -----------------------------------
import {
  AuthStackParamList,
  MainStackParamList,
  RootStackParamList,
} from 'types/navigation-types';

type FormikType = {
  remember_me: boolean;
  face_id: boolean;
  biometric: boolean;
};

const SecurityScreen = React.memo(() => {
  const styles = useStyleSheet(themedStyles);
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  const initValues: FormikType = {
    remember_me: true,
    face_id: false,
    biometric: true,
  };
  const _onChangePassword = () => {
    //@ts-ignore
    navigate('AuthStack',{screen:'ChangePassword'});
  };
  return (
    <Formik initialValues={initValues} onSubmit={values => console.log({})}>
      {({handleChange, handleBlur, handleSubmit, setFieldValue, values}) => {
        return (
          <Container style={styles.container} level="1">
            <TopNavigation
              title={'Security'}
              accessoryLeft={() => <NavigationAction marginRight={12} />}
            />
            <Content contentContainerStyle={styles.content}>
              <SettingToggle
                title="Remember me"
                value={values.remember_me}
                onChange={() =>
                  setFieldValue('remember_me', !values.remember_me)
                }
              />
              <SettingToggle
                title="Face ID"
                value={values.face_id}
                onChange={() => setFieldValue('face_id', !values.face_id)}
              />
              <SettingToggle
                title="Biometric ID"
                value={values.biometric}
                onChange={() => setFieldValue('biometric', !values.biometric)}
              />
              <Button status="primary-transparent" children={'Change PIN'} />
              <Button
                status="primary-transparent"
                children={'Change Password'}
                onPress={_onChangePassword}
              />
            </Content>
          </Container>
        );
      }}
    </Formik>
  );
});

export default SecurityScreen;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    gap: 24,
    padding: 24,
  },
});
