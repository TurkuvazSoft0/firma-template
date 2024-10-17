import React, { useEffect } from 'react';
import {Image} from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import {
  StyleService,
  useStyleSheet,
  useTheme,
  Avatar,
  Input,
} from '@ui-kitten/components';
import { RootState, useAppDispatch } from 'reduxs/store';

// ----------------------------- Navigation -----------------------------------
import {NavigationProp, useNavigation} from '@react-navigation/native';
// ----------------------------- Hooks ---------------------------------------
import {useLayout} from 'hooks';
// ----------------------------- Assets ---------------------------------------
import {Images} from 'assets/images';
// ----------------------------- Components && Elements -----------------------

import {
  AppIcon,
  Container,
  Content,
  CustomLayout,
  NavigationAction,
  Text,
} from 'components';
import {faker} from '@faker-js/faker';
import EvaIcons from 'types/eva-icon-enum';
import {MainStackParamList} from 'types/navigation-types';
import {Icons} from 'assets/icons';
import UpcomingScreen from './Upcoming';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSirketler } from 'reduxs/reducers/SirketlerSlice';

import { AppDispatch} from "reduxs/store";
const HomePage = React.memo(() => {
  const  sirketler  = useSelector((state: RootState) => state.sirketler.sirket);

  const dispatch = useDispatch<AppDispatch>();


  // Component mount olduğunda veriyi çekiyoruz
  useEffect(() => {
    dispatch(fetchSirketler());
    console.log(sirketler);
  }, [dispatch]);
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const refInput = React.useRef<Input>(null);
  const {goBack, navigate} =
    useNavigation<NavigationProp<MainStackParamList>>();
  const {height, width, top, bottom} = useLayout();

  const _onNotification = () => {
    navigate('Notification');
  };
  const _onSearch = () => {
    navigate('SearchScreen');
    refInput?.current?.blur();
  };
  const _onFavorite = () => {
    navigate('FavoriteDoctor');
  };
  return (
    <Container style={styles.container}>
      <CustomLayout
        horizontal
        itemsCenter
        justify="space-between"
        ph={16}
        pv={8}>
        <CustomLayout horizontal itemsCenter gap={12}>
          <Avatar
            source={{uri: faker.image.avatar()}}
            //@ts-ignore
            style={styles.avatar}
            size="small"
          />
          <CustomLayout gap={8}>
            <Text category="subhead">Good Morning 👋</Text>
            <Text category="body">{faker.name.fullName()}</Text>
          </CustomLayout>
        </CustomLayout>
        <CustomLayout horizontal itemsCenter gap={12}>
          <NavigationAction
            icon={EvaIcons.BellOutline}
            onPress={_onNotification}
          />
          <NavigationAction
            icon={EvaIcons.HeartOutline}
            onPress={_onFavorite}
          />
        </CustomLayout>
      </CustomLayout>
      <Content contentContainerStyle={styles.contentContainer}>
        <Input
          placeholder="Firma Ara"
          accessoryLeft={props => (
            //@ts-ignore
            <AppIcon name={EvaIcons.Search} fill={props?.style.tintColor} />
          )}
          ref={refInput}
          style={styles.input}
          onFocus={_onSearch}
        />
        <CustomLayout horizontal justify="space-between" mh={16} mb={16}>
          <Text>Specialist Doctor</Text>
          <Text status="primary">See all</Text>
        </CustomLayout>
        <Content horizontal>
        <CustomLayout style={styles.specialist} horizontal>
          {DATA.map((item, index) => {
            return (
              <CustomLayout
                key={index}
                itemsCenter
                justify="center"
                style={{
                  width: (width - 100) / 3,
                  borderRadius: 12,
                  backgroundColor: `${theme['color-primary-default']}30`,
                  paddingTop: 16,
                  paddingBottom: 8,
                  paddingHorizontal: 12,
                  gap: 12,
                }}>
                <Image source={item.image} />
                <Text category="c2" fontWeight='700' capitalize center status="primary">
                  {item.title}
                </Text>
              </CustomLayout>
            );
          })}
        </CustomLayout>
        </Content>
        <UpcomingScreen />
      </Content>
    </Container>
  );
});

export default HomePage;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 120,
  },
  input: {
    flex: 1,
    margin: 16,
  },
  specialist: {
    // flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 4,
    marginHorizontal: 16,
  },
  avatar: {
    borderWidth: 1,
    borderColor: 'text-info-color',
  },
});
const DATA = [
  {image: Icons.consultation, title: 'Consultation'},
  {image: Icons.dental, title: 'Dental'},
  {image: Icons.heart, title: 'Heart'},
  {image: Icons.hospital, title: 'Hospital'},
  {image: Icons.surgeon, title: 'surgeon'},
  {image: Icons.skin, title: 'skin'},
  {image: Icons.physician, title: 'physician'},
  {image: Icons.medicines, title: 'medicines'},
];
