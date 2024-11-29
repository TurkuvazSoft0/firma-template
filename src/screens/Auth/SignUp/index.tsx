import React, { memo } from 'react';
import { Alert, Image } from 'react-native';
import { TopNavigation, Button, Input, StyleService, useStyleSheet } from '@ui-kitten/components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Text, CustomLayout as Layout, Container, NavigationAction, CustomLayout, ButtonPickCountry } from 'components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Images } from 'assets/images';
import { AuthStackParamList, MainStackParamList } from 'types/navigation-types';
import * as DocumentPicker from 'expo-document-picker';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'reduxs/store';
import { firmaUserAdd } from 'reduxs/reducers/UserRegister';
import {CountryItem} from 'types/component-types';

type FormikForm = {
  firmaName: string;
  firmaVergiDairesi: string;
  firmaVergiNumarasi: string;
  firmaTelefon: string;
  firmaMail: string;
  firmaPassword: string;
  firmaVergiLevhası: any;
  country:CountryItem
};

// Form doğrulama şeması
const validationSchema = Yup.object().shape({
  firmaName: Yup.string().required('Firma adı zorunludur'),
  firmaVergiDairesi: Yup.string().required('Vergi dairesi zorunludur'),
  firmaVergiNumarasi: Yup.string().required('Vergi numarası zorunludur').matches(/^[0-9]+$/, 'Sadece sayılar girin'),
  firmaTelefon: Yup.string().required('Telefon numarası zorunludur').matches(/^[0-9]+$/, 'Sadece sayılar girin'),
  firmaMail: Yup.string().required('E-posta adresi zorunludur').matches(/@/, 'E-posta adresinde "@" işareti bulunmalıdır'),
  firmaPassword: Yup.string().required('Şifre zorunludur').min(6, 'Şifre en az 6 karakter olmalıdır'),
});

const SignUp = memo(() => {
  const { navigate: authNavigate } = useNavigation<NavigationProp<AuthStackParamList>>();
  const { goBack, navigate: mainNavigate } = useNavigation<NavigationProp<MainStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const dispatch = useDispatch<AppDispatch>();

  const initValues: FormikForm = {
    firmaName: '',
    firmaVergiDairesi: '',
    firmaVergiNumarasi: '',
    firmaTelefon: '',
    firmaMail: '',
    firmaPassword: '',
    country:_country,
    firmaVergiLevhası: null,
  };

  const pickDocument = async (setFieldValue: any) => {
    try {
      let result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
      if (result?.type === 'success') {
        setFieldValue('firmaVergiLevhası', result);
      }
    } catch (error) {
      console.log("Dosya seçme hatası", error);
    }
  };

  const handleFormSubmit = async (values: FormikForm) => {
    try {
      const formData = new FormData();
      formData.append('status', 'firma');
      formData.append('firma_ad', values.firmaName);
      formData.append('firma_vergidairesi', values.firmaVergiDairesi);
      formData.append('firma_verginumarasi', values.firmaVergiNumarasi);
      formData.append('mail', values.firmaMail);
      formData.append('password', values.firmaPassword);
      formData.append('firma_telefon', values.firmaTelefon);

      if (values.firmaVergiLevhası) {
        formData.append('firma_vergilevhasi', {
          uri: values.firmaVergiLevhası.uri,
          name: values.firmaVergiLevhası.name,
          type: values.firmaVergiLevhası.mimeType,
        });
      }

      dispatch(firmaUserAdd(formData));
    } catch (error) {
      console.error('Form gönderim hatası', error);
    }
  };

  return (
    <Formik
      initialValues={initValues}
      onSubmit={handleFormSubmit}
      validationSchema={validationSchema}>
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
        <Container style={styles.container} level='1'>
          <TopNavigation style={styles.topNavigation} accessoryLeft={() => <NavigationAction />} />
          <KeyboardAwareScrollView enableOnAndroid extraHeight={40} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
            <Image source={Images.logo} style={{ width: 120, height: 120, alignSelf: 'center' }} />
            <Layout itemsCenter>
              <Text category="t3" marginBottom={8}>
                Firma Kayıt
              </Text>
            </Layout>
            <Input
              label={'Firma Adı'}
              placeholder={'Firma adını girin'}
              style={styles.input}
              onChangeText={(text) => {
                const formattedText = text
                  .split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                  .join(' ');
                handleChange('firmaName')(formattedText);
              }}
              onBlur={handleBlur('firmaName')}
              value={values.firmaName}
              status={touched.firmaName && errors.firmaName ? 'danger' : 'basic'}
              caption={touched.firmaName && errors.firmaName ? errors.firmaName : ''}
            />
            <Input
              label={'Vergi Dairesi'}
              placeholder={'Vergi dairesini girin'}
              style={styles.input}
              onChangeText={handleChange('firmaVergiDairesi')}
              onBlur={handleBlur('firmaVergiDairesi')}
              value={values.firmaVergiDairesi}
              status={touched.firmaVergiDairesi && errors.firmaVergiDairesi ? 'danger' : 'basic'}
              caption={touched.firmaVergiDairesi && errors.firmaVergiDairesi ? errors.firmaVergiDairesi : ''}
            />
            <Input
              label={'Vergi Numarası'}
              placeholder={'Vergi numarasını girin'}
              keyboardType="numeric"
              style={styles.input}
              onChangeText={handleChange('firmaVergiNumarasi')}
              onBlur={handleBlur('firmaVergiNumarasi')}
              value={values.firmaVergiNumarasi}
              maxLength={11}
              status={touched.firmaVergiNumarasi && errors.firmaVergiNumarasi ? 'danger' : 'basic'}
              caption={touched.firmaVergiNumarasi && errors.firmaVergiNumarasi ? errors.firmaVergiNumarasi : ''}
              
            />

<CustomLayout horizontal gap={8}>
              <ButtonPickCountry
                country={values.country}
                onSave={e => setFieldValue('country', e)} 
                style={{alignSelf:"center"}}
              />
              <Input
                placeholder={'Telefon Numarası'}
                onChangeText={handleChange('firmaTelefon')}
                onBlur={handleBlur('firmaTelefon')}
                value={values.firmaTelefon}
                keyboardType='numeric'
                style={{width:"80%"}}
                status={touched.firmaTelefon && errors.firmaTelefon ? 'danger' : 'basic'}
                caption={touched.firmaTelefon && errors.firmaTelefon ? errors.firmaTelefon : ''}
                // Telefon numarasına ülke kodunu ekliyoruz
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

          
            <Button
              style={styles.uploadButton}
              onPress={() => pickDocument(setFieldValue)}>
              Vergi Levhası Yükle
            </Button>
            {values.firmaVergiLevhası && <Text style={styles.uploadedFileName}>{values.firmaVergiLevhası.name}</Text>}
            <Input
              label={'E-posta Adresi'}
              placeholder={'E-posta adresinizi girin'}
              keyboardType="email-address"
              style={styles.input}
              onChangeText={handleChange('firmaMail')}
              onBlur={handleBlur('firmaMail')}
              value={values.firmaMail.toLocaleLowerCase()}
              status={touched.firmaMail && errors.firmaMail ? 'danger' : 'basic'}
              caption={touched.firmaMail && errors.firmaMail ? errors.firmaMail : ''}
            />
            <Input
              label={'Şifre'}
              placeholder={'Şifre'}
              secureTextEntry
              style={styles.input}
              onChangeText={handleChange('firmaPassword')}
              onBlur={handleBlur('firmaPassword')}
              value={values.firmaPassword}
              status={touched.firmaPassword && errors.firmaPassword ? 'danger' : 'basic'}
              caption={touched.firmaPassword && errors.firmaPassword ? errors.firmaPassword : ''}
            />
          </KeyboardAwareScrollView>
          <Layout mh={24} mb={12} gap={16}>
            <Button
              children="Hesap Oluştur"
              onPress={() => handleSubmit()}
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

export default SignUp;

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
  uploadButton: {
    marginBottom: 16,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#00aeef',
  },
  uploadedFileName: {
    marginBottom: 16,
    color: '#333333',
    fontSize: 14,
    textAlign: 'center',
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
