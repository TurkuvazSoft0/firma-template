import React, { memo, useEffect } from 'react';
import { Alert, Image } from 'react-native';
import { TopNavigation, Button, Input, StyleService, useStyleSheet } from '@ui-kitten/components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Text, CustomLayout as Layout, Container, NavigationAction } from 'components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import { Images } from 'assets/images';
import { AuthStackParamList } from 'types/navigation-types';
import * as DocumentPicker from 'expo-document-picker';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'reduxs/store';
import { firmaUserAdd } from 'reduxs/reducers/UserRegister';
import { useStatusControl } from 'hooks/useStatus';

type FormikForm = {
  firmaName: string;
  firmaVergiDairesi: string;
  firmaVergiNumarasi: string;
  firmaTelefon: string;
  firmaMail: string;
  firmaPassword: string;
  firmaVergiLevhası: any;
};


const SignUp = memo(() => {
  const user_control = useStatusControl();
 
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const dispatch = useDispatch<AppDispatch>();

  const initValues: FormikForm = {
    firmaName: '',
    firmaVergiDairesi: '',
    firmaVergiNumarasi: '',
    firmaTelefon: '',
    firmaMail: '',
    firmaPassword: '',
    firmaVergiLevhası: null,
  };

  // Dosya seçimi için DocumentPicker'ı kullanıyoruz
  const pickDocument = async (setFieldValue: any) => {
    try {
      let result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
      if (result?.type === 'success') {
        // Seçilen dosya Formik'e ekleniyor
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

      // Dosya eklenmişse FormData'ya ekleyin
      if (values.firmaVergiLevhası) {
        formData.append('firma_vergilevhasi', {
          uri: values.firmaVergiLevhası.uri,
          name: values.firmaVergiLevhası.name,
          type: values.firmaVergiLevhası.mimeType,
        });
      }

      // Redux ile formu gönderiyoruz
      dispatch(firmaUserAdd(formData));
    } catch (error) {
      console.error('Form gönderim hatası', error);
    }
  };

  return (
    <Formik
      initialValues={initValues}
      onSubmit={handleFormSubmit}>
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => (
        <Container style={styles.container} level='1'>
          <TopNavigation style={styles.topNavigation} accessoryLeft={() => <NavigationAction />} />
          <KeyboardAwareScrollView enableOnAndroid extraHeight={40} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
            <Image source={Images.logo} style={{ width: 120, height: 120, alignSelf: 'center' }} />
            <Layout itemsCenter>
              <Text category="t3" marginBottom={8}>
                Firma Kayıt
              </Text>
            </Layout>
            {/* Firma Adı */}
            <Input
              label={'Firma Adı'}
              placeholder={'Firma adını girin'}
              style={styles.input}
              onChangeText={handleChange('firmaName')}
              onBlur={handleBlur('firmaName')}
              value={values.firmaName}
            />
            {/* Vergi Dairesi */}
            <Input
              label={'Vergi Dairesi'}
              placeholder={'Vergi dairesini girin'}
              style={styles.input}
              onChangeText={handleChange('firmaVergiDairesi')}
              onBlur={handleBlur('firmaVergiDairesi')}
              value={values.firmaVergiDairesi}
            />
            {/* Vergi Numarası */}
            <Input
              label={'Vergi Numarası'}
              placeholder={'Vergi numarasını girin'}
              keyboardType="numeric"
              style={styles.input}
              onChangeText={handleChange('firmaVergiNumarasi')}
              onBlur={handleBlur('firmaVergiNumarasi')}
              value={values.firmaVergiNumarasi}
            />
            {/* Telefon Numarası */}
            <Input
              label={'Telefon Numarası'}
              placeholder={'Telefon numarasını girin'}
              keyboardType="phone-pad"
              style={styles.input}
              onChangeText={handleChange('firmaTelefon')}
              onBlur={handleBlur('firmaTelefon')}
              value={values.firmaTelefon}
            />
            {/* Vergi Levhası Yükleme */}
            <Button
              style={styles.uploadButton}
              onPress={() => pickDocument(setFieldValue)}>
              Vergi Levhası Yükle
            </Button>
            {values.firmaVergiLevhası && <Text style={styles.uploadedFileName}>{values.firmaVergiLevhası.name}</Text>}
            {/* E-posta */}
            <Input
              label={'E-posta Adresi'}
              placeholder={'E-posta adresinizi girin'}
              keyboardType="email-address"
              style={styles.input}
              onChangeText={handleChange('firmaMail')}
              onBlur={handleBlur('firmaMail')}
              value={values.firmaMail}
            />
            {/* Şifre */}
            <Input
              label={'Şifre'}
              placeholder={'Şifre'}
              secureTextEntry
              style={styles.input}
              onChangeText={handleChange('firmaPassword')}
              onBlur={handleBlur('firmaPassword')}
              value={values.firmaPassword}
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
