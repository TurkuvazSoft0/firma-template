import React, { useEffect, useState } from 'react';
import {Alert, Image} from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import { TopNavigation, StyleService, useStyleSheet, useTheme, Input, Button } from '@ui-kitten/components';
// ----------------------------- Navigation -----------------------------------
import {useNavigation} from '@react-navigation/native';
// ----------------------------- Hooks ---------------------------------------
import {useLayout, useToggle} from 'hooks';
// ----------------------------- Assets ---------------------------------------
import {Images} from 'assets/images';
// ----------------------------- Components && Elements -----------------------
import {Formik} from 'formik';
import { AppIcon, Container, Content, CustomLayout, NavigationAction, Text } from 'components';
// ----------------------------- Types ---------------------------------------
import EvaIcons from 'types/eva-icon-enum';
// ----------------------------- Reduxs ---------------------------------------
import {appSelector, ThemeMode} from 'reduxs/reducers/app-reducer';
import {useAppSelector} from 'reduxs/store';
import { navigate } from 'navigation/root-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "reduxs/store";
import { SendPasswordResetEmail,setMail } from 'reduxs/reducers/forgetPassword';

type FormikType = {
email:string | null
};

const ChangePassword = React.memo(() => {
  const emailSend  = useSelector((state: RootState) => state.passwordReset.emailSent);
  const dispatch = useDispatch<AppDispatch>();

  const handlePress = (email : string | null ) => 
    {
      
      const formData = new FormData();
      formData.append("email",email);
      dispatch(SendPasswordResetEmail(formData));
      dispatch(setMail(email));
      if(emailSend)
      {
        navigate("CreatePin");
      }
    }
    useEffect(() => 
      { 
navigate("CreatePin");
      },[emailSend]);
  const styles = useStyleSheet(themedStyles);
  const {goBack} = useNavigation();
  const {height, width, top, bottom} = useLayout();

  const initValues: FormikType = {
    email: '',
  
  };
  const [show, togglePassword] = useToggle(false);
  const [showNewpass, toggleNewPass] = useToggle(false);

  const app = useAppSelector(appSelector);
  const themeMode = app.theme;
  const isDarkMode = themeMode === ThemeMode.DARK;

  return (
    <Formik initialValues={initValues} onSubmit={values => console.log({})}>
      {({handleChange, handleBlur, handleSubmit, setFieldValue, values}) => {
        return (
          <Container style={styles.container} level="1">
            <TopNavigation
              accessoryLeft={() => <NavigationAction marginRight={12} />}
            />
            <Content contentContainerStyle={styles.content}>
              <Image
                source={isDarkMode ? Images.dark_logo : Images.logo}
                style={{
                  width: width / 2,
                  height: width / 2,
                  alignSelf: 'center',
                }}
              />
              <Text category="t3" center marginBottom={32}>
               Şifrenimi Unuttun 
              </Text>
              <Input
                placeholder="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email?.toLocaleLowerCase()}
                
                //@ts-ignore
                accessoryLeft={({style}) => (
                  <CustomLayout itemsCenter ml={8} mr={4}>
                    <AppIcon
                      name={EvaIcons.EmailOutline}
                      size={20}
                      fill={style?.tintColor}
                    />
                  </CustomLayout>
                )}
                accessoryRight={() => (
                  <Text
                    status="primary"
                    category="c1"
                    marginRight={4}
                    onPress={togglePassword}>
                 
                  </Text>
                )}
              />
             
            </Content>
            <Button
              children={'Gönder'}
              style={styles.submit}
              onPress={(e) => handlePress(values.email)}
            />
          </Container>
        );
      }}
    </Formik>
  );
});

export default ChangePassword;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    gap: 24,
  },
  submit: {
    marginVertical: 8,
    marginHorizontal: 24,
  },
});
