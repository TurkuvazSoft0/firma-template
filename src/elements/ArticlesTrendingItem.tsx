import React from 'react';
import {Image} from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import {StyleService, useStyleSheet} from '@ui-kitten/components';

// ----------------------------- Navigation -----------------------------------
import {NavigationProp, useNavigation} from '@react-navigation/native';

// ----------------------------- Assets ---------------------------------------
import {globalStyle} from 'styles/globalStyle';

// ----------------------------- Components && Elements -----------------------
import {CustomLayout, Text} from 'components';
import dayjs from 'dayjs';

// ----------------------------- Types ---------------------------------------
import {MainStackParamList} from 'types/navigation-types';
import {IArticleProps} from 'types/element-types';

const ArticlesTrendingItem = React.memo(({data}: {data: IArticleProps}) => {
  const {image_url, tags, date, author, title} = data;
  const styles = useStyleSheet(themedStyles);
  const {navigate} = useNavigation<NavigationProp<MainStackParamList>>();
  const onPress = () => {
    navigate('ArticlesDetails', {articles: data});
  };
  return (
    <CustomLayout style={styles.container} level="1" onPress={onPress}>
      {/* @ts-ignore */}
      <Image source={{uri: image_url}} style={styles.image} />
      <CustomLayout horizontal gap={4} mh={12} mt={8}>
        {tags.map((tag, index) => {
          return (
            <CustomLayout style={styles.tag} key={index}>
              <Text category="c2" status="primary">
                {tag}
              </Text>
            </CustomLayout>
          );
        })}
      </CustomLayout>
      <CustomLayout ph={12} pb={16} mt={8}>
        <Text numberOfLines={2}>{title}</Text>
        <CustomLayout horizontal justify="space-between" mt={8}>
          <CustomLayout horizontal itemsCenter>
            <Text category="c1" status="placeholder">
              {'by '}
            </Text>
            <Text category="c1" status="primary">
              {author}
            </Text>
          </CustomLayout>
          <Text category="c2" status="placeholder">
            {dayjs(date).format('MMM DD,YYYY')}
          </Text>
        </CustomLayout>
      </CustomLayout>
    </CustomLayout>
  );
});

export default ArticlesTrendingItem;

const themedStyles = StyleService.create({
  container: {
    width: 240,
    ...globalStyle.shadow,
    borderRadius: 8,
  },
  image: {
    width: 240,
    height: 120,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tag: {
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderColor: 'text-primary-color',
  },
});
