import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Button, Icon, TopNavigation, useTheme} from '@ui-kitten/components';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useLayout} from 'hooks';

import {Container, Content, CustomLayout, IDivider, NavigationAction, Text} from 'components';
import {Images} from 'assets/images';
import {AuthStackParamList} from 'types/navigation-types';

import {appSelector, ThemeMode} from 'reduxs/reducers/app-reducer';
import {useAppSelector} from 'reduxs/store';

const OnBoarding = React.memo(() => {
  const theme = useTheme();
  const {navigate} = useNavigation<NavigationProp<AuthStackParamList>>();
  const {height, width, top, bottom} = useLayout();

  const app = useAppSelector(appSelector);
  const themeMode = app.theme;
  const isDarkMode = themeMode === ThemeMode.DARK;

  const _onLogin = () => {
    navigate('Signup');
  };
  const __onMusteriLogin = () => 
    { 
      navigate("MusteriSignup"); 
    }
    
  return (
    <Container level="1" style={styles.container}>
              <TopNavigation accessoryLeft={() => <NavigationAction />} />
      <Content contentContainerStyle={styles.content}>
        <Image
          source={isDarkMode ? Images.dark_logo : Images.logo}
          style={{width: width / 2, height: width / 2, alignSelf: 'center'}}
        />
        <CustomLayout gap={16}>
          <Text category="t1" center marginBottom={16}>
          Hoş Geldiniz 
          </Text>
          <Button
          
            status="dark"
            onPress={__onMusteriLogin}
            children={'Kullanıcı Kayıt '}
          />
          <Button
            status="danger"
            onPress={_onLogin}
            children={' Kurumsal Kayıt '}
          />
          
          <CustomLayout
            mv={16}
            horizontal
            justify="space-between"
            gap={24}
            itemsCenter>
          
          </CustomLayout>
        
        </CustomLayout>
      </Content>
    </Container>
  );
});

export default OnBoarding;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 14,
  display:"flex",
  marginVertical:"auto"
  
  },
  container: {
    flex: 1,
    
  },
});
