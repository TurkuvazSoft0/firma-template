import React from 'react';
import {VirtualizedList} from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Radio,
  Input,
  Icon,
} from '@ui-kitten/components';

// ----------------------------- Components && Elements -----------------------
import {Container, CustomLayout, NavigationAction, Text} from 'components';

// ----------------------------- Utils ---------------------------------------
import keyExtractoUtil from 'utils/keyExtractorUtil';
import {waitUtil} from 'utils/waitUtil';

// ----------------------------- Reduxs ---------------------------------------
import {useAppDispatch, useAppSelector} from 'reduxs/store';
import {
  appSelector,
  setAppLoading,
  setLanguage,
} from 'reduxs/reducers/app-reducer';

// ----------------------------- Types ---------------------------------------
import {CountryItem} from 'types/component-types';
import {countryCodes} from 'constants/data/countryCodes/countryCodes';
import EvaIcons from 'types/eva-icon-enum';

const LanguageScreen = React.memo(() => {
  const styles = useStyleSheet(themedStyles);
  const dispatch = useAppDispatch();
  let lang = 'en';

  const current_language = useAppSelector(appSelector).language;
  const [searchValue, setSearchValue] = React.useState<string>('');

  const resultCountries = React.useMemo(() => {
    const lowerSearchValue = searchValue.toLowerCase();

    return countryCodes.filter((country: CountryItem) => {
      if (
        country?.dial_code.includes(searchValue) ||
        country?.name[lang || 'en'].toLowerCase().includes(lowerSearchValue)
      ) {
        return country;
      }
    });
  }, [searchValue]);

  const getItem = (_data: CountryItem[], index: number) => ({
    name: _data[index].name,
    dial_code: _data[index].dial_code,
    code: _data[index].code,
    flag: _data[index].flag,
  });

  const _onPress = (item: CountryItem) => () => {
    dispatch(setAppLoading(true));
    dispatch(setLanguage(item));
    waitUtil(1200).then(() => {
      dispatch(setAppLoading(false));
    });
  };

  return (
    <Container style={styles.container} level="1">
      <TopNavigation
        title={'Languages'}
        accessoryLeft={() => <NavigationAction marginRight={12} />}
      />
      <Input
        value={searchValue}
        placeholder="Search"
        style={styles.input}
        onChangeText={setSearchValue}
        accessoryLeft={<Icon name={EvaIcons.Search} />}
      />
      <VirtualizedList
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.content}
        data={resultCountries}
        initialNumToRender={10}
        renderItem={({item}) => {
          const active = current_language.code === item.code;
          let itemName = item?.name['en'];
          let checkName = itemName.length ? itemName : item?.name['en'];
          return (
            <CustomLayout
              horizontal
              justify="space-between"
              pv={12}
              itemsCenter
              onPress={_onPress(item)}>
              <CustomLayout itemsCenter horizontal gap={16}>
                <Text category="t1" marginTop={12}>
                  {item.flag}
                </Text>
                <Text>{checkName}</Text>
              </CustomLayout>
              <Radio
                checked={active}
                onPress={_onPress(item)}
                onChange={_onPress(item)}
              />
            </CustomLayout>
          );
        }}
        keyExtractor={keyExtractoUtil}
        getItemCount={(data: any) => {
          return data.length;
        }}
        getItem={getItem}
      />
    </Container>
  );
});

export default LanguageScreen;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 80,
  },
  input: {
    marginHorizontal: 24
  }
});
