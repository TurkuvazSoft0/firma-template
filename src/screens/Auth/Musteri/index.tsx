import React, { memo, useEffect } from 'react';
import { Alert, Image } from 'react-native';
import { Formik } from 'formik';
import { Input, Button, StyleService, useStyleSheet, TopNavigation } from '@ui-kitten/components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Text, CustomLayout as Layout, Container, Content, NavigationAction, AppIcon } from 'components';
import { Images } from 'assets/images';
import { AuthStackParamList, RootStackParamList } from 'types/navigation-types';
import { useAppSelector } from 'reduxs/store';
import axios from 'react-native-axios';
import EvaIcons from 'types/eva-icon-enum';
import { useLayout } from 'hooks';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from "reduxs/store";
import { firmaUserControl, loginUser } from 'reduxs/reducers/UserRegister';
import { useStatusControl } from 'hooks/useStatus';
type FormikForm = {
  account: string;
  country: string;
  password: string;
};

const MusteriLogin = memo(() => {

const user_control = useStatusControl();


  const dispatch = useDispatch<AppDispatch>();

  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const { width } = useLayout();

  const initValues: FormikForm = {
    account: ''.toLocaleLowerCase(),
    country: '',
    password: '',
  };


  const onSignup = () => {
    navigate('Onboarding');
  };
  navigation.navigate("MainStack");
  // Email doğrulama için düzenli ifade.
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
  const formData = new FormData();

  // Backend'e gönderilecek form verileri
  const handleLogin = async (values: FormikForm) => {
    formData.append("mail", values.account);
    formData.append("status","musteri");
    formData.append("password", values.password);
    console.log(formData,"wefwe")
    console.log(formData);
    dispatch(loginUser(formData));
  
  
  };

  return (
    <Formik
      initialValues={initValues}
      onSubmit={handleLogin}>
      {({ handleChange, handleBlur, handleSubmit, values }) => {
        return (
          <Container style={styles.container} level='1'>
            <TopNavigation accessoryLeft={() => <NavigationAction />} />
            <Content contentContainerStyle={styles.content}>
              <Image
                source={Images.logo}
                style={{
                  width: width / 2,
                  height: width / 2,
                  alignSelf: 'center',
                }}
              />
              <Text category="t3" center>
                Hesabınıza Giriş Yapın
              </Text>
              <Layout gap={4}>
                <Input
                  placeholder={'E-posta Adresiniz'}
                  style={styles.input}
                  onChangeText={handleChange('account')}
                  onBlur={handleBlur('account')}
                  value={values.account.toLocaleLowerCase()}
                />
                <Input
                  placeholder={'Şifre'}
                  style={styles.input}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                />
              </Layout>
              <Layout padding={16} gap={16}>
                <Button children={'Giriş Yap'} onPress={
               handleSubmit} />
                <Layout gap={4} mt={8} horizontal justify="center">
                  <Text center status="placeholder">
                    Hesabınız yok mu?
                  </Text>
                  <Text status="primary" onPress={onSignup}>
                    Kayıt Ol
                  </Text>
                </Layout>
              </Layout>
            </Content>
          </Container>
        );
      }}
    </Formik>
  );
});

export default MusteriLogin;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 12,
    gap: 24,
  },
  input: {
    marginVertical: 8,
  },
});
