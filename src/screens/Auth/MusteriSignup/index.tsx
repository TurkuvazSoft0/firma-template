import React, { memo } from 'react';
import { Alert, Image } from 'react-native';
import { TopNavigation, Button, Input, StyleService, useStyleSheet } from '@ui-kitten/components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Text, CustomLayout as Layout, Container, NavigationAction, CustomLayout, ButtonPickCountry } from 'components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import { FlipInYLeft } from 'react-native-reanimated';
import { Images } from 'assets/images';
import { AuthStackParamList } from 'types/navigation-types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'reduxs/store';
import {CountryItem} from 'types/component-types';
import * as Yup from 'yup';  // Yup kütüphanesini import ediyoruz

import { firmaUserAdd } from 'reduxs/reducers/UserRegister';

type FormikForm = {
  name: string;
  email: string;
  password: string;
  phone: string;
  country: CountryItem;
};

// Yup ile validasyon şeması oluşturuyoruz
const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Ad zorunludur'),
  email: Yup.string().required("Email Alanı Zorunludur").matches(/@/, 'E-posta adresinde "@" işareti bulunmalıdır'),  
  password: Yup.string().required('Şifre zorunludur'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Sadece rakamlar kullanılabilir")
    .max(10, 'Telefon numarası en fazla 10 haneli olabilir').min(10,"Telefon Numarası en az 10 haneli olmalıdır")
    .required('Telefon numarası zorunludur')
    
    ,
});

const MusteriSignup = memo(() => {
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const dispatch = useDispatch<AppDispatch>();

  const initValues: FormikForm = {
    name: '',
    email: '',
    password: '',
    country: _country,
    phone: '',
  };

  const handleFormSubmit = async (values: FormikForm) => {
    try {
      const formData = new FormData();
      formData.append('status', 'musteri');
      formData.append('name', values.name);
      formData.append('mail', values.email.toLowerCase()); // E-posta küçük harfe çevriliyor
      formData.append('password', values.password);
      formData.append('phone', values.phone);

      // Redux ile formu gönderiyoruz
      dispatch(firmaUserAdd(formData));
    } catch (error) {
      console.error('Form gönderim hatası', error);
    }
  };

  return (
    <Formik
      initialValues={initValues}
      validationSchema={SignupSchema} // Validasyon şemasını ekliyoruz
      onSubmit={handleFormSubmit}>
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
        <Container style={styles.container} level='1'>
          <TopNavigation style={styles.topNavigation} accessoryLeft={() => <NavigationAction />} />
          <KeyboardAwareScrollView enableOnAndroid extraHeight={40} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
            <Image source={Images.logo} style={{ width: 120, height: 120, alignSelf: 'center' }} />
            <Layout itemsCenter>
              <Text category="t3" marginBottom={8}>
                Müşteri Kayıt
              </Text>
            </Layout>

            {/* İsim */}
            <Input
              label={'Adınız'}
              placeholder={'Lütfen adınızı giriniz'}
              style={styles.input}
              onChangeText={(text) => {
                const formattedText = text
                  .split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                  .join(' ');
                handleChange('name')(formattedText);
              }}
              onBlur={handleBlur('name')}
              value={values.name}
              status={touched.name && errors.name ? 'danger' : 'basic'}
              caption={touched.name && errors.name ? errors.name : ''}
            />

            {/* Telefon Numarası */}
            <CustomLayout horizontal gap={8}>
              <ButtonPickCountry
                country={values.country}
                onSave={e => setFieldValue('country', e)} // Ülke seçimi sonrası setFieldValue ile country alanını güncelliyoruz
              />
              <Input
                placeholder={'Telefon Numarası'}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
                style={{width:"80%"}}
                keyboardType='numeric'
                status={touched.phone && errors.phone ? 'danger' : 'basic'}
                caption={touched.phone && errors.phone ? errors.phone : ''}
                accessoryLeft={({style}) => {
                  return (
                    values.country?.dial_code && (
                      <CustomLayout horizontal itemsCenter gap={8}>
                        <Text>{values.country.dial_code}</Text>
                      </CustomLayout>
                    )
                  );
                }}
              />
            </CustomLayout>

            {/* E-posta */}
            <Input
              label={'E-posta Adresi'}
              placeholder={'E-posta adresinizi girin'}
              keyboardType="email-address"
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email.toLocaleLowerCase()}
              status={touched.email && errors.email ? 'danger' : 'basic'}
              caption={touched.email && errors.email ? errors.email : ''}
            />

            {/* Şifre */}
            <Input
              label={'Şifre'}
              placeholder={'Şifre'}
              secureTextEntry
              style={styles.input}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              status={touched.password && errors.password ? 'danger' : 'basic'}
              caption={touched.password && errors.password ? errors.password : ''}
            />
          </KeyboardAwareScrollView>

          <Layout mh={24} mb={12} gap={16}>
            <Button
              children="Hesap Oluştur"
              onPress={() => {
                handleSubmit();
              }}
            />
            <Layout horizontal gap={8} alignSelfCenter>
              <Text center>Zaten bir hesabınız var mı?</Text>
              <Text center status="primary" onPress={() => navigate('Walkthough')}>
                Giriş Yap    
              </Text>
            </Layout>
          </Layout>
        </Container>
      )}
    </Formik>
  );
});

export default MusteriSignup;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  topNavigation: {
    paddingHorizontal: 12,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 12,
    gap: 16,
    paddingBottom: 80,
  },
  input: {
    marginBottom: 16,
  },
});
const _country = {
    code: 'AF',
    dial_code: '+90',
    flag: '🇹🇷',
    name: {
      bg: 'Афганистан',
      by: 'Афганістан',
      cn: '阿富汗',
      cz: 'Afghánistán',
      de: 'Afghanistan',
      ee: 'Afganistan',
      en: 'Afghanistan',
      es: 'Afganistán',
      fr: "L'Afghanistan",
      he: 'אפגניסטן',
      it: 'Afghanistan',
      jp: 'アフガニスタン',
      nl: 'Afghanistan',
      pl: 'Afganistan',
      pt: 'Afeganistão',
      ro: 'Afganistan',
      ru: 'Афганистан',
      ua: 'Афганістан',
      zh: '阿富汗',
    },
};
