import React from 'react';
import {VirtualizedList} from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  useTheme,
  Avatar,
  Button,
} from '@ui-kitten/components';
// ----------------------------- Navigation -----------------------------------
import {useNavigation} from '@react-navigation/native';
// ----------------------------- Hooks ---------------------------------------
import {useLayout} from 'hooks';
// ----------------------------- Components && Elements -----------------------
import {Container, CustomLayout, NavigationAction, Text} from 'components';

// ----------------------------- Utils ---------------------------------------
import {globalStyle} from 'styles/globalStyle';
import keyExtractoUtil from 'utils/keyExtractorUtil';
import {faker} from '@faker-js/faker';

interface IUserProps {
  name: string;
  email: string;
  address: string;
  bio: string;
  image: string;
  invited: boolean;
  phone_number: string;
}
const InviteFriends = React.memo(() => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const {goBack} = useNavigation();
  const {height, width, top, bottom} = useLayout();

  const createUser = () => {
    return {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      address: faker.address.streetAddress(),
      bio: faker.lorem.sentence(),
      image: faker.image.avatar(),
      invited: faker.datatype.boolean(),
      phone_number: faker.phone.number(),
    };
  };

  const createUsers = (numUsers = 5) => {
    return new Array(numUsers).fill(undefined).map(createUser);
  };
  let fakeUsers = createUsers(40);

  const getItem = (_data: IUserProps[], index: number) => ({
    name: fakeUsers[index].name,
    email: fakeUsers[index].email,
    address: fakeUsers[index].address,
    phone_number: fakeUsers[index].phone_number,
    bio: fakeUsers[index].bio,
    image: fakeUsers[index].image,
    invited: fakeUsers[index].invited,
  });

  return (
    <Container style={styles.container} useSafeArea={false}>
      <TopNavigation
        style={[globalStyle.topNavigation, {paddingTop: top + 8}]}
        title={'Invite Friends'}
        accessoryLeft={() => <NavigationAction marginRight={12} />}
      />
      <VirtualizedList
        initialNumToRender={20}
        data={fakeUsers}
        contentContainerStyle={styles.content}
        // onRefresh={onRefresh}
        keyExtractor={keyExtractoUtil}
        getItemCount={data => data.length}
        getItem={getItem}
        renderItem={({item}) => {
          return (
            <CustomLayout
              horizontal
              itemsCenter
              gap={16}
              pv={12}
              justify="space-between"
              mh={24}>
              <CustomLayout horizontal itemsCenter gap={16}>
                <Avatar source={{uri: item.image}} size="tiny" />
                <CustomLayout gap={4}>
                  <Text category="body">{item.name}</Text>
                  <Text category="c1">{item.phone_number.split('x')[0]}</Text>
                </CustomLayout>
              </CustomLayout>
              <Button
                style={styles.button}
                children={item.invited ? 'Invited' : 'Invite'}
                size="tiny"
                status={item.invited ? 'primary-transparent' : 'primary'}
              />
            </CustomLayout>
          );
        }}
      />
    </Container>
  );
});

export default InviteFriends;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 60,
    paddingTop: 12,
  },
  button: {
    minWidth: 64,
  },
});
