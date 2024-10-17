import React from 'react';
import {Image} from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import { TopNavigation, StyleService, useStyleSheet } from '@ui-kitten/components';
// ----------------------------- Navigation -----------------------------------
import {RouteProp, useRoute} from '@react-navigation/native';
// ----------------------------- Hooks ---------------------------------------
import {useLayout} from 'hooks';
// ----------------------------- Components && Elements -----------------------
import { Container, Content, CustomLayout, NavigationAction, Text } from 'components';
import dayjs from 'dayjs';
// ----------------------------- Types ---------------------------------------
import EvaIcons from 'types/eva-icon-enum';
import {MainStackParamList} from 'types/navigation-types';

const ArticlesDetails = React.memo(() => {
  const styles = useStyleSheet(themedStyles);
  const {height, width, top, bottom} = useLayout();

  const data =
    useRoute<RouteProp<MainStackParamList, 'ArticlesDetails'>>().params
      .articles;
  return (
    <Container style={styles.container} level="1">
      <TopNavigation
        accessoryLeft={() => <NavigationAction />}
        accessoryRight={() => (
          <CustomLayout horizontal itemsCenter>
            <NavigationAction icon={EvaIcons.ShareOutline} />
            <NavigationAction icon={EvaIcons.Bookmark} />
          </CustomLayout>
        )}
      />
      <Content contentContainerStyle={styles.content}>
        <CustomLayout itemsCenter mt={24}>
          <Image
            source={{uri: data.image_url}}
            borderRadius={12}
            style={{width: width - 48, height: 200 * (height / 812)}}
          />
        </CustomLayout>
        <CustomLayout mh={24} gap={12}>
          <Text category="t4" left>
            {data.title}
          </Text>
          <CustomLayout horizontal itemsCenter>
            <Text category="c1" status="placeholder">
              {'by '}
            </Text>
            <Text category="c1" status="primary">
              {data.author}
            </Text>
          </CustomLayout>
          <CustomLayout horizontal itemsCenter gap={8}>
            <Text category="c2" status="placeholder">
              {dayjs(data.date).format('MMM DD,YYYY')}
            </Text>
            <CustomLayout style={styles.category}>
              <Text category="c1" status="primary">
                {data.category}
              </Text>
            </CustomLayout>
          </CustomLayout>
          <Text fontWeight="400">{data.content}</Text>
        </CustomLayout>
      </Content>
    </Container>
  );
});

export default ArticlesDetails;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    gap: 16,
    paddingBottom: 80,
  },
  image: {
    width: '80%',
  },
  category: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'text-primary-color',
    paddingHorizontal: 2,
  },
});
