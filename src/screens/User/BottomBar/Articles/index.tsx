import React from 'react';
import {Image, FlatList} from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import { TopNavigation, StyleService, useStyleSheet } from '@ui-kitten/components';

// ----------------------------- Hooks ---------------------------------------
import {useLayout} from 'hooks';

// ----------------------------- Navigation ---------------------------------------
import { NavigationProp, useNavigation } from '@react-navigation/native';

// ----------------------------- Assets ---------------------------------------
import {Images} from 'assets/images';

// ----------------------------- Components && Elements -----------------------
import { Container, Content, CustomLayout, NavigationAction, Text } from 'components';
import ArticlesTrendingItem from 'elements/ArticlesTrendingItem';
import ArticlesItem from 'elements/ArticlesItem';

// ----------------------------- Style ---------------------------------------
import {globalStyle} from 'styles/globalStyle';

// ----------------------------- Types ---------------------------------------
import EvaIcons from 'types/eva-icon-enum';

// ----------------------------- Utils -----------------------------------
import keyExtractoUtil from 'utils/keyExtractorUtil';
import { EXAMPLE_ARTICLES } from 'constants/data';
import { MainStackParamList } from 'types/navigation-types';
import { appSelector, ThemeMode } from 'reduxs/reducers/app-reducer';
import { useAppSelector } from 'reduxs/store';

const ArticlesPage = React.memo(() => {
  const styles = useStyleSheet(themedStyles);
  const {top} = useLayout();
  const {navigate}=useNavigation<NavigationProp<MainStackParamList>>()

  const app = useAppSelector(appSelector);
  const themeMode = app.theme;
  const isDarkMode = themeMode === ThemeMode.DARK;

  const _onArticles=()=>{
    return navigate('ArticlesScreen')
  }

  const _onBookmark = () => {
    navigate('ArticlesBookmark');
  };
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={[globalStyle.topNavigation, {paddingTop: top + 8}]}
        title={'Articles'}
        // @ts-ignore
        accessoryLeft={() => <Image source={isDarkMode?Images.dark_logo:Images.logo} style={styles.logo} />}
        accessoryRight={() => (
          <CustomLayout horizontal gap={12}>
            <NavigationAction icon={EvaIcons.SearchOutline} />
            <NavigationAction icon={EvaIcons.BookOutline} onPress={_onBookmark}/>
          </CustomLayout>
        )}
      />
      <Content contentContainerStyle={styles.content}>
        <CustomLayout horizontal justify="space-between" mh={24} mb={16}>
          <Text category="t5">Trending</Text>
          <Text status="primary">See All</Text>
        </CustomLayout>
        <FlatList
          data={EXAMPLE_ARTICLES}
          keyExtractor={keyExtractoUtil}
          horizontal
          contentContainerStyle={styles.contentTrending}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => <ArticlesTrendingItem data={item} />}
        />
        <CustomLayout horizontal justify="space-between" mh={24} mb={16}>
          <Text category="t5">Articles</Text>
          <Text status="primary" onPress={_onArticles}>See All</Text>
        </CustomLayout>
        <CustomLayout gap={12}>
          {EXAMPLE_ARTICLES.map((item, index) => {
            return <ArticlesItem data={item} key={index} />;
          })}
        </CustomLayout>
      </Content>
    </Container>
  );
});

export default ArticlesPage;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 24,
  },
  content: {
    paddingTop: 24,
    paddingBottom: 120,
  },
  contentTrending: {
    gap: 16,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
});

