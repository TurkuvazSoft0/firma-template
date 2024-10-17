import React from 'react';
import {View, Image, StyleSheet, Alert, Touchable} from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  useTheme,
  Input,
  Datepicker,
  Select,
  SelectItem,
  IndexPath,
  Button,
} from '@ui-kitten/components';
import { useDispatch } from 'react-redux';

// ----------------------------- Navigation -----------------------------------
import {NavigationProp, useNavigation} from '@react-navigation/native';
// ----------------------------- Hooks ---------------------------------------
import {useLayout} from 'hooks';
// ----------------------------- Assets ---------------------------------------
import {Images} from 'assets/images';
// ----------------------------- Components && Elements -----------------------
import { AppDispatch, RootState } from "reduxs/store";

import {
  AppIcon,
  ButtonPickCountry,
  Container,
  Content,
  CustomLayout,
  NavigationAction,
  Text,
} from 'components';
import {Formik} from 'formik';
import {CountryItem} from 'types/component-types';
import EvaIcons from 'types/eva-icon-enum';
import {faker} from '@faker-js/faker';
import { useSelector } from 'react-redux';
import { useStatusControl } from 'hooks/useStatus';
import { fetchSirketGuncelle } from 'reduxs/reducers/adminSlice';
import { resetStatusType } from 'reduxs/reducers/UserRegister';
import { TouchableOpacity } from 'react-native-gesture-handler';

type FormikForm = {
  full_name: string;
  dob: Date;
  country: CountryItem;
  email: string;
  address_1: string;
  address_2: string;
  phone_number: string;
  gender: string;
};

const ProfilDüzenle = React.memo(() => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const {goBack} = useNavigation();
  const {height, width, top, bottom} = useLayout();
  const registers = useSelector((state:RootState) => state.register);
  console.log(registers,"registers");
  const initValues: FormikForm = {
    full_name: registers.username.toString(),
    dob: new Date('1995-09-09'),
    country: _country,
    email: registers.email.toString(),
    address_1: registers.firma_verginumarasi.toString(),
    address_2: registers.firma_vergidairesi.toString(),
    phone_number: registers.firma_telefon.toString(),
   
  };
  const dispatch = useDispatch<AppDispatch>();

  const user_control = useStatusControl();
  const handleSave = () => {
  
  };
  const sirketler  = useSelector((state: RootState) => state.sirketler.sirketler);
  const [selectedIndex, setSelectedIndex] = React.useState<IndexPath>(
    new IndexPath(0),
  );

  const handlesSubmit = (values: FormikForm) => {
    const formData = new FormData();
    formData.append('status', user_control);
    formData.append('id', registers.id);
    formData.append('mail', "ewefwf"); // Güncel form değerlerini kullan
    formData.append('name', "ffwefwf"); // Güncel form değerlerini kullan
    formData.append('phone', values.phone_number); // Güncel form değerlerini kullan
    formData.append('firma_vergidairesi', values.address_2); // Güncel form değerlerini kullan
    formData.append('firma_verginumarasi', values.address_1); // Güncel form değerlerini kullan
    
    console.log("Güncellenecek formData:", formData);
    dispatch(fetchSirketGuncelle(formData));
    Alert.alert("Bilgi", "Lütfen Tekrardan Giriş Yapınız Bilgileriniz Değişti");
    dispatch(resetStatusType());
  };
  
  return (
    <Formik
      initialValues={initValues}
      onSubmit={values =>
     {
   

    }
      }>
      {({handleChange, handleBlur, handleSubmit, setFieldValue, values}) => {
        return (
          <Container style={styles.container} level="1">
            <TopNavigation
              title={'Edit Profile'}
              accessoryLeft={() => <NavigationAction marginRight={12} />}
            />
            <Content contentContainerStyle={styles.content}>
              <Input
                placeholder={'Kullanıcı Adı'}
                style={styles.input}
                onChangeText={handleChange('full_name')}
                onBlur={handleBlur('full_name')}
                value={values.full_name}
                //@ts-ignore
                accessoryLeft={({style}) => {
                  return (
                    <CustomLayout horizontal itemsCenter gap={8}>
                      <AppIcon
                        fill={style.tintColor}
                        name={EvaIcons.Person}
                      />
                    </CustomLayout>
                  );
                }}
              />
              <Input
                placeholder={'Email Adresi'}
                style={styles.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                //@ts-ignore
                accessoryLeft={({style}) => {
                  return (
                    <CustomLayout horizontal itemsCenter gap={8}>
                      <AppIcon
                        fill={style.tintColor}
                        name={EvaIcons.EmailOutline}
                      />
                    </CustomLayout>
                  );
                }}
              />
           
              <Input
                placeholder={'Firma Vergi Numarası'}
                style={styles.input}
                maxLength={11}
                onChangeText={handleChange('address_1')}
                onBlur={handleBlur('address_1')}
                value={values.address_1}
                //@ts-ignore
                accessoryLeft={({style}) => {
                  return (
                    <CustomLayout horizontal itemsCenter gap={8}>
                      <AppIcon
                        fill={style.tintColor}
                        name={EvaIcons.PersonDone}
                      />
                    </CustomLayout>
                  );
                }}
              />
              <Input
                placeholder={'Firma Vergi Dairesi'}
                style={styles.input}
                onChangeText={handleChange('address_2')}
                onBlur={handleBlur('address_2')}
                value={values.address_2}
                //@ts-ignore
                accessoryLeft={({style}) => {
                  return (
                    <CustomLayout horizontal itemsCenter gap={8}>
                      <AppIcon
                        fill={style.tintColor}
                        name={EvaIcons.PersonAdd}
                      />
                    </CustomLayout>
                  );
                }}
              />
              <CustomLayout gap={4}>
                <Text category="c1" status="placeholder">
                 Telefon Numarası
                </Text>
                <CustomLayout horizontal gap={8}>
                  <ButtonPickCountry
                    country={values.country}
                    onSave={e => setFieldValue('country', e)}
                  />
                  <Input
                    placeholder={'Telefon Numarası'}
                    style={styles.input}
                    onChangeText={handleChange('phone_number')}
                    onBlur={handleBlur('phone_number')}
                    value={values.phone_number}
                    //@ts-ignore
                    accessoryLeft={({style}) => {
                      return (
                        values.country.dial_code && (
                          <CustomLayout horizontal itemsCenter gap={8}>
                            <Text>{values.country.dial_code}</Text>
                          </CustomLayout>
                        )
                      );
                    }}
                  />
                </CustomLayout>
              </CustomLayout>
            
            </Content>
      
            <Button onPress={handlesSubmit} children={'Güncelle'} style={styles.button} />
          </Container>
        );
      }}
    </Formik>
  );
});

export default ProfilDüzenle;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 24,
    paddingHorizontal: 24,
    gap: 16,
  },
  input: {
    flex: 1,
  },
  button: {
    marginHorizontal: 24,
  },
});
const _country = {
  code: 'AF',
  dial_code: '+93',
  flag: '🇦🇫',
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
