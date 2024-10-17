import React from 'react';
import {FlatList} from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import { TopNavigation, StyleService, useStyleSheet, useTheme } from '@ui-kitten/components';
// ----------------------------- Hooks ---------------------------------------
import {useLayout} from 'hooks';
// ----------------------------- Components && Elements -----------------------
import {Container, CustomLayout, NavigationAction} from 'components';
import ArticlesItem from 'elements/ArticlesItem';
// ----------------------------- Types ---------------------------------------
import EvaIcons from 'types/eva-icon-enum';

// ----------------------------- Utils ---------------------------------------
import keyExtractoUtil from 'utils/keyExtractorUtil';

// ----------------------------- Style ---------------------------------------
import {globalStyle} from 'styles/globalStyle';

// ----------------------------- Assets ---------------------------------------
import {EXAMPLE_ARTICLES} from 'constants/data';

const ArticlesBookmark = React.memo(() => {
  const styles = useStyleSheet(themedStyles);
  const {top} = useLayout();

  return (
    <Container style={styles.container} useSafeArea={false}>
      <TopNavigation
        title="My Bookmark Articles"
        style={[globalStyle.topNavigation, {paddingTop: top + 8}]}
        //@ts-ignore
        accessoryLeft={<NavigationAction marginRight={12} />}
        accessoryRight={() => (
          <CustomLayout>
            <NavigationAction icon={EvaIcons.SearchOutline} />
          </CustomLayout>
        )}
      />
      <FlatList
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

export default ArticlesBookmark;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 24,
    gap: 12,
  },
});
