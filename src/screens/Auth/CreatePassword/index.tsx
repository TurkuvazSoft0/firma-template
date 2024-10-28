import React, {memo, useState} from 'react';
// ----------------------------- UI kitten -----------------------------------
import {Input, Button, StyleService, useStyleSheet} from '@ui-kitten/components';
// ----------------------------- Hook -----------------------------------------
import { useToggle} from 'hooks';
// ----------------------------- Navigation -----------------------------------
import { AuthStackParamList } from 'types/navigation-types';
import {NavigationProp, RouteProp, useNavigation, useRoute} from '@react-navigation/native';
// ----------------------------- Components & Elements ------------------------
import {Container, Content, Text, CustomLayout as Layout} from 'components';
import { useRouteParamList } from 'types/route-types';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "reduxs/store";
import { VerifyPasswordResetCode } from 'reduxs/reducers/forgetPassword';
import { navigate } from 'navigation/root-navigation';

const CreatePassword = memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const [password, setPassword] = useState<string>('');
  const [passwordAgain, setPasswordAgain] = useState<string>('');
  const { navigate: authNavigate } = useNavigation<NavigationProp<AuthStackParamList>>();




  const styles = useStyleSheet(themedStyles);
   const email  = useSelector((state: RootState) => state.passwordReset.emailAdress);
   const code  = useSelector((state: RootState) => state.passwordReset.codeNumber);

   const handleSubmit = () => 
    { 
      const formData = new FormData();
      console.log(code,"code");
      formData.append("email",email);
      formData.append("code",code);
      formData.append("new_password",password);
      dispatch(VerifyPasswordResetCode(formData));
      authNavigate("Login");

    }
   

    
  
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
          <Text category="t2">Şifre Oluştur</Text>
          <Text category="subhead" opacity={0.7}>
            Hesabınızı güvence altına almanız gerekiyor.
          </Text>
        </Layout>
        <Layout gap={4}>
          <Text category="subhead"  opacity={0.7}>
            Şifre
          </Text>
          <Input
          onChangeText={(e) => setPassword(e)}
            placeholder="Şifre"
            secureTextEntry={show}
            style={styles.input}
            accessoryRight={() => (
              <Text status="primary" category='c1' marginRight={4}>{show ? 'Gizle' : 'Göster'}</Text>
            )}
          />
          <Input onChangeText={(e) => setPasswordAgain(e)} placeholder="Şifreyi Yeniden Gir" secureTextEntry={show} />
          <Layout
            horizontal
            justify="flex-start"
            style={{alignItems: 'flex-start'}}
            gap={4}>
            <Text category="subhead" status="placeholder">
              8 karakterden uzun olmalı ve en az bir büyük harf, bir sayı ve bir özel karakter içermelidir.
            </Text>
          </Layout>
        </Layout>
        <Button children={'Devam Et'} onPress={handleSubmit}/>
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
