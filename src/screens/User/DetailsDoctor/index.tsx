import React from 'react';
// ----------------------------- UI kitten -----------------------------------
import { TopNavigation, StyleService, useStyleSheet } from '@ui-kitten/components';
// ----------------------------- Navigation -----------------------------------
import {RouteProp, useRoute} from '@react-navigation/native';
// ----------------------------- Hook ---------------------------------------
import { useLayout } from 'hooks';

// ----------------------------- Types ---------------------------------------
import EvaIcons from 'types/eva-icon-enum';
import {MainStackParamList} from 'types/navigation-types';
// ----------------------------- Components && Elements -----------------------
import {Container, Content, NavigationAction} from 'components';
import Information from './Information';

const DetailsDoctorScreen = React.memo(() => {
  const styles = useStyleSheet(themedStyles);
  const {height, width, top, bottom} = useLayout();
  const doctor =
    useRoute<RouteProp<MainStackParamList, 'DetailsDoctor'>>().params.doctor;
    
  return (
    <Container style={styles.container} useSafeArea={false}>
      <TopNavigation
        style={[styles.navigation, {paddingTop: top + 8}]}
        appearance="control"
        accessoryLeft={() => <NavigationAction marginRight={12} />}
        title={doctor.sirket_ad}
      />
      <Content contentContainerStyle={styles.content} level="3">
        <Information doctor={doctor} />
     
      </Content>
    </Container>
  );
});

export default DetailsDoctorScreen;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  navigation: {
    backgroundColor: 'background-basic-color-1',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  content: {
    paddingTop: 24,
    paddingBottom: 120,
    display:"flex",
    flexDirection:"column"
  },
});
