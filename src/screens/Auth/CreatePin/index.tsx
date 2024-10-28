import React, {memo} from 'react';
import {Image} from 'react-native'
// ----------------------------- UI kitten -----------------------------------
import { StyleService, useStyleSheet, Button, TopNavigation } from '@ui-kitten/components';
// ----------------------------- @Types -----------------------------------
import { AuthStackParamList, RootStackParamList } from 'types/navigation-types';
// ----------------------------- Navigation -----------------------------------
import {NavigationProp, useNavigation} from '@react-navigation/native';
// ----------------------------- Components -----------------------------------
import { Container, Content, Text, CustomLayout as Layout, NavigationAction } from 'components';
import InputCodeOtp from '../elements/InputCodeOtp';
import { Images } from 'assets/images';
import { useAppDispatch, useAppSelector } from 'reduxs/store';
import { ThemeMode, appSelector, setAppLoading } from 'reduxs/reducers/app-reducer';
import { waitUtil } from 'utils/waitUtil';
import { setCodes } from 'reduxs/reducers/forgetPassword';

const CreatePin = memo(() => {
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();

  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const dispatch=useAppDispatch()
  
  const app = useAppSelector(appSelector);
  const themeMode = app.theme;
  const isDarkMode = themeMode === ThemeMode.DARK;

  const [code, setCode] = React.useState('');
  const _onFinish=()=>{
    dispatch(setCodes(code));
    dispatch(setAppLoading(true))
    waitUtil(1200).then(()=>{
      navigation.navigate("CreatePassword");
      dispatch(setAppLoading(false));
    })
  }
  return (
    <Container style={styles.container} level='1'>
      <TopNavigation alignment='center' title='Doğrulama Sayfası' accessoryLeft={()=>(<NavigationAction/>)}/>
      <Content contentContainerStyle={styles.content}>
        <Layout gap={4}>
          <Image source={isDarkMode?Images.dark_logo:Images.logo} style={{width:180,height:180,alignSelf:'center'}}/>
        </Layout>
        <Layout gap={4}>
          <InputCodeOtp
            style={styles.enterCode}
            {...{code, setCode}}
            codeLength={6}
            autoFocus
          />
        </Layout>
        <Text category="subhead" status="placeholder" marginBottom={40}>
          Lütfen Mailinize Gelen 5 haneli kodu giriniz
        </Text>
        <Button children='Kaydet' onPress={_onFinish}/>
      </Content>
    </Container>
  );
});

export default CreatePin;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 32,
    paddingHorizontal: 24,
    gap: 24,
  },
  enterCode: {
    justifyContent: 'flex-start',
    width: '100%',
  },
});
