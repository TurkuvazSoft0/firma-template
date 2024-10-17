import React from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import { TopNavigation, StyleService, useStyleSheet } from '@ui-kitten/components';
// ----------------------------- Navigation -----------------------------------
import {NavigationProp, useNavigation} from '@react-navigation/native';
// ----------------------------- Hooks ---------------------------------------
import {useLayout} from 'hooks';
// ----------------------------- Assets ---------------------------------------
import {EXAMPLE_ARTICLES} from 'constants/data';

// ----------------------------- Components && Elements -----------------------
import {Container, CustomLayout, NavigationAction, Text} from 'components';
import ArticlesItem from 'elements/ArticlesItem';
// ----------------------------- Style ---------------------------------------
import {globalStyle} from 'styles/globalStyle';

// ----------------------------- Utils ---------------------------------------
import keyExtractoUtil from 'utils/keyExtractorUtil';

// ----------------------------- Types ---------------------------------------
import EvaIcons from 'types/eva-icon-enum';
import {MainStackParamList} from 'types/navigation-types';

const ArticlesScreen = React.memo(() => {
  const styles = useStyleSheet(themedStyles);
  const {navigate} = useNavigation<NavigationProp<MainStackParamList>>();
  const {top} = useLayout();

  const [active, setActive] = React.useState(0);

  const _onBookmark = () => {
    navigate('ArticlesBookmark');
  };

  const ListHeaderComponent = () => {
    return (
      <FlatList
        keyExtractor={keyExtractoUtil}
        data={OPTIONS}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentTag}
        horizontal
        renderItem={({item: opt, index}) => {
          const isActive = index === active;
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.tag, isActive && styles.activeTag]}
              onPress={() => {
                setActive(index);
              }}
              key={index}>
              <Text status={isActive ? 'white' : 'primary'}>{opt}</Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  };
  return (
    <Container style={styles.container} useSafeArea={false}>
      <TopNavigation
        title="Articles"
        style={[globalStyle.topNavigation, {paddingTop: top + 8}]}
        //@ts-ignore
        accessoryLeft={<NavigationAction marginRight={12} />}
        accessoryRight={() => (
          <CustomLayout horizontal gap={12}>
            <NavigationAction icon={EvaIcons.SearchOutline} />
            <NavigationAction
              icon={EvaIcons.BookmarkOutline}
              onPress={_onBookmark}
            />
          </CustomLayout>
        )}
      />

      <FlatList
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={styles.content}
        keyExtractor={keyExtractoUtil}
        data={EXAMPLE_ARTICLES}
        renderItem={({item}) => {
          return <ArticlesItem data={item} />;
        }}
      />
    </Container>
  );
});

export default ArticlesScreen;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    gap: 12,
    paddingTop: 24,
    paddingBottom: 80,
  },
  activeTag: {
    backgroundColor: 'color-primary-default',
  },
  tag: {
    borderWidth: 1,
    borderColor: 'color-primary-default',
    paddingHorizontal: 12,
    borderRadius: 99,
    paddingVertical: 4,
  },
  contentTag: {
    gap: 8,
    paddingHorizontal: 24,
    marginBottom: 12,
  },
});

export const OPTIONS = [
  'Newest',
  'COVID-19',
  'Health',
  'Nutritionist',
  'Lifestyle',
];
