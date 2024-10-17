import React from 'react';
import {Image, TouchableOpacity, Keyboard} from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import {
  TopNavigation,
  Button,
  Icon,
  Datepicker,
  Input,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
// ----------------------------- Assets ---------------------------------------
import {Images} from 'assets/images';
// ----------------------------- Components && Elements -----------------------
import {
  AppIcon,
  Container,
  CustomLayout,
  NavigationAction,
  Text,
} from 'components';
// ----------------------------- Keyboard ---------------------------------------
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import dayjs from 'dayjs';
// ----------------------------- Types -----------------------------------
import EvaIcons from 'types/eva-icon-enum';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from 'types/navigation-types';

type FormikForm = {
  first_name: string;
  last_name: string;
  dob: Date | undefined;
  gender: string;
};

const FillProfile = React.memo(() => {
  const {navigate}=useNavigation<NavigationProp<AuthStackParamList>>()
  const styles = useStyleSheet(themedStyles);
  const initValues: FormikForm = {
    first_name: '',
    last_name: '',
    dob: undefined,
    gender: '',
  };

  const _onContinue=()=>{
    navigate('CreatePin')
  }
  return (
    <Formik initialValues={initValues} onSubmit={values => console.log(values)}>
      {({handleChange, handleBlur, handleSubmit, setFieldValue, values}) => {
        return (
          <Container level='1' style={styles.container}>
            <TopNavigation
              accessoryLeft={() => <NavigationAction />}
              title={'Your Profile'}
              alignment="center"
              accessoryRight={() => <Text status="primary">Skip</Text>}
            />
            <KeyboardAwareScrollView
              enableOnAndroid
              enableAutomaticScroll
              contentContainerStyle={styles.content}>
              <TouchableOpacity>
                {/* @ts-ignore */}
                <Image source={Images.avatar} style={styles.avatar} />
              </TouchableOpacity>
              <Input
                placeholder={'Enter your first name'}
                style={styles.input}
                onChangeText={handleChange('first_name')}
                onBlur={handleBlur('first_name')}
                value={values.first_name}
                //@ts-ignore
                accessoryLeft={({style}) => (
                  <CustomLayout itemsCenter ml={8} mr={12}>
                    <AppIcon
                      name={EvaIcons.PersonOutline}
                      size={20}
                      fill={style.tintColor}
                    />
                  </CustomLayout>
                )}
              />
              <Input
                placeholder={'Enter your last name'}
                style={styles.input}
                onChangeText={handleChange('last_name')}
                onBlur={handleBlur('last_name')}
                value={values.last_name}
                //@ts-ignore
                accessoryLeft={({style}) => (
                  <CustomLayout itemsCenter ml={8} mr={12}>
                    <AppIcon
                      name={EvaIcons.PersonOutline}
                      size={20}
                      fill={style.tintColor}
                    />
                  </CustomLayout>
                )}
              />
              <Datepicker
                onFocus={() => {
                  Keyboard.dismiss();
                }}
                accessoryLeft={props => (
                  <CustomLayout itemsCenter horizontal ml={8} gap={20}>
                    <AppIcon
                      name={EvaIcons.CalendarOutline}
                      size={20}
                      // @ts-ignore
                      fill={props?.style?.tintColor}
                    />
                    <Text
                      category="subhead"
                      fontWeight="700"
                      status={!values.dob ? 'placeholder' : 'basic'}>
                      {values.dob
                        ? dayjs(values.dob).format('DD/MM/YYYY')
                        : 'DD/MM/YYYY'}
                    </Text>
                  </CustomLayout>
                )}
                placeholder={''}
                onBlur={() => handleBlur('dob')}
                onSelect={date => {
                  setFieldValue('dob', date);
                }}
                status="basic"
                // date={values.dob}
                style={styles.datepicker}
              />
              <Input
                placeholder={'Select your gender'}
                style={styles.input}
                onChangeText={handleChange('gender')}
                onBlur={handleBlur('gender')}
                value={values.gender}
                accessoryLeft={<Icon pack="assets" name="gender" />}
              />
            </KeyboardAwareScrollView>
            <CustomLayout mh={24} mb={12}>
              <Button children={'Continue'} onPress={_onContinue} />
            </CustomLayout>
          </Container>
        );
      }}
    </Formik>
  );
});

export default FillProfile;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  avatar: {
    alignSelf: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 24,
    justifyContent: 'center',
    paddingTop: 60,
  },
  input: {
    flex: 1,
  },
  datepicker: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '100%',
  },
});
