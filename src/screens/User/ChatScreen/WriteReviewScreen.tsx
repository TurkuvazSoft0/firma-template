import React from 'react';
// ----------------------------- UI kitten -----------------------------------
import { TopNavigation, StyleService, useStyleSheet, Avatar, Input, Radio, Button } from '@ui-kitten/components';

// ----------------------------- Navigation -----------------------------------
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';

// ----------------------------- Components && Elements -----------------------
import { Container, Content, Text, NavigationAction, CustomLayout, IDivider, ModalMessage } from 'components';
import Rate from 'elements/Rating';

// ----------------------------- Types ---------------------------------------
import {MainStackParamList} from 'types/navigation-types';

const WriteReviewScreen = React.memo(() => {
  const styles = useStyleSheet(themedStyles);
  const {navigate} = useNavigation<NavigationProp<MainStackParamList>>();

  const doctor =
    useRoute<RouteProp<MainStackParamList, 'WriteReviewScreen'>>().params
      .doctor;
  const _review = `${doctor.name} is a very friendly and professional person in carrying out his duties. I consulted him for 30 minutes and he also always responded to my complaints swiftly and clearly. I really like, and highly recommend ${doctor.name} to you.`;
  const [rate, setRate] = React.useState(4);
  const [review, setReview] = React.useState(_review);
  const [recommend, setRecommend] = React.useState(true);
  const [modal, setModal] = React.useState(false);

  const _onSubmit = () => {
    setModal(true);
  };
  const _onHomePage = () => {
    //@ts-ignore
    navigate('BottomTabNavigator', {screen: 'Home'});
  };
  return (
    <Container style={styles.container} level="1">
      <TopNavigation
        title={'Write a Review'}
        //@ts-ignore
        accessoryLeft={<NavigationAction marginRight={12} />}
      />
      <Content contentContainerStyle={styles.content}>
        {/* @ts-ignore */}
        <Avatar source={doctor.avatar} size="giant" style={styles.avatar} />
        <CustomLayout itemsCenter mh={56} mv={16}>
          <Text category="t5" center>
            How was your experience with {doctor.name}?
          </Text>
        </CustomLayout>
        <Rate setDefaultRate={setRate} defaultRate={rate} />
        <IDivider marginVertical={24} />
        <Text category="t5" children={'Write your review'} marginBottom={16} />
        <Input
          placeholder="Your review here..."
          style={[styles.input]}
          numberOfLines={6}
          value={review}
          onChangeText={setReview}
          multiline
        />
        <Text
          category="t5"
          children={`Would you recommend ${doctor.name} to your friends?`}
          marginBottom={16}
        />
        <CustomLayout horizontal gap={12}>
          <Radio
            children={'Yes'}
            checked={recommend}
            onChange={() => setRecommend(true)}
          />
          <Radio
            children={'No'}
            checked={!recommend}
            onChange={() => setRecommend(false)}
          />
        </CustomLayout>
      </Content>
      <CustomLayout horizontal mh={24}>
        <Button children="Submit" style={styles.button} onPress={_onSubmit} />
      </CustomLayout>
      <ModalMessage
        title="Review Success!"
        describe="Your review has been successfully submitted. Thank you!"
        type="success"
        first_button={{title: 'Go to Home', onPress: _onHomePage}}
        visible={modal}
        setVisible={setModal}
        onBackdropPress={_onHomePage}
      />
    </Container>
  );
});

export default WriteReviewScreen;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    alignSelf: 'center',
  },
  input: {
    flex: 1,
    marginBottom: 24,
  },
  button: {
    flex: 1,
  },
});
