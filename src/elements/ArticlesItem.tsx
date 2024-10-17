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

const ArticlesItem = React.memo(({data}: {data: IArticleProps}) => {
  const {image_url, category, date, author, title} = data;

  const styles = useStyleSheet(themedStyles);
  const {navigate} = useNavigation<NavigationProp<MainStackParamList>>();

  const onPress = () => {
    navigate('ArticlesDetails', {articles: data});
  };
  return (
    <CustomLayout
      horizontal
      style={styles.container}
      level="1"
      onPress={onPress}>
      {/* @ts-ignore */}
      <Image source={{uri: image_url}} style={styles.image} />
      <CustomLayout pv={8} mr={16} style={{flex: 1}} justify="space-between">
        <Text>{title}</Text>
        <CustomLayout horizontal>
          <CustomLayout style={styles.category}>
            <Text category="c2" fontWeight="700" status="primary">
              {category}
            </Text>
          </CustomLayout>
        </CustomLayout>
        <CustomLayout horizontal justify="space-between">
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

export default ArticlesItem;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    marginHorizontal: 24,
    gap: 12,

    borderRadius: 16,
    ...globalStyle.shadow,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 12,
  },
  category: {
    borderRadius: 4,
    backgroundColor: 'color-primary-transparent-200',
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
});
