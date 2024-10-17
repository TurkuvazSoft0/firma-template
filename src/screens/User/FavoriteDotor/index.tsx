import React from 'react';
import {FlatList} from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
// ----------------------------- Types ---------------------------------------
import EvaIcons from 'types/eva-icon-enum';

// ----------------------------- Hooks ---------------------------------------
import {useLayout} from 'hooks';
// ----------------------------- Assets ---------------------------------------
import {Images} from 'assets/images';
// ----------------------------- Components && Elements -----------------------
import DoctorItem from 'elements/DoctorItem';
import {Container, CustomLayout, NavigationAction} from 'components';
import keyExtractoUtil from 'utils/keyExtractorUtil';
// ----------------------------- Types ---------------------------------------
import {IDoctorProps, StatusOnlineEnum} from 'types/element-types';
import {DOCTORS_DATA} from 'constants/data';

const FavoriteDotor = React.memo(() => {
  const styles = useStyleSheet(themedStyles);
  const {height, width, top, bottom} = useLayout();

  const renderItem = ({item}: {item: IDoctorProps}) => {
    return (
      <CustomLayout mh={24}>
        <DoctorItem data={item} />
      </CustomLayout>
    );
  };
  return (
    <Container style={styles.container} useSafeArea={false}>
      <TopNavigation
        style={[styles.topNavigation, {paddingTop: top + 8}]}
        title="Favorite Doctor"
        accessoryRight={() => (
          <NavigationAction icon={EvaIcons.Options2Outline} />
        )}
        accessoryLeft={() => <NavigationAction marginRight={8} />}
      />
      <FlatList
        data={DOCTORS_DATA.filter(doctor => {
          if (doctor.isFavorite === true) {
            return doctor;
          }
        })}
        renderItem={renderItem}
        keyExtractor={keyExtractoUtil}
        contentContainerStyle={styles.content}
      />
    </Container>
  );
});

export default FavoriteDotor;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  topNavigation: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingBottom: 12,
  },
  content: {
    paddingTop: 24,
    paddingBottom: 80,
    gap: 16,
  },
});
