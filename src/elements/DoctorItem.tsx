import React from 'react';
import {TouchableOpacity} from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import {
  StyleService,
  useStyleSheet,
  useTheme,
  Avatar,
  Icon,
  Divider,
} from '@ui-kitten/components';
// ----------------------------- Components && Elements -----------------------
import {AppIcon, CustomLayout, Text} from 'components';
// ----------------------------- @Types ---------------------------------------
import EvaIcons from 'types/eva-icon-enum';
import {IDoctorProps} from 'types/element-types';

import {useLayout} from 'hooks';
import {globalStyle} from 'styles/globalStyle';

const DoctorItem = React.memo(({data}: {data: any}) => {
  const theme = useTheme();
  const {width} = useLayout();
  const styles = useStyleSheet(themedStyles);
  
  return (
    <CustomLayout level="1" style={styles.container} horizontal gap={12}>
      {/* @ts-ignore */}
      <CustomLayout style={{flex: 1}}>
        <CustomLayout horizontal justify="space-between">
          <Text numberOfLines={1} maxWidth={300 * (width / 375)}>
            {data.sirket_ad}
          </Text>
        </CustomLayout>
       
        <CustomLayout horizontal itemsCenter gap={8} mb={8}>
        </CustomLayout>
      </CustomLayout>
    </CustomLayout>
  );
});

export default DoctorItem;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    ...globalStyle.shadow,
  },
  divider: {
    width: '100%',
    height: 0.5,
    backgroundColor: 'background-basic-color-7',
    opacity: 0.5,
    marginVertical: 12,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'text-primary-color',
  },
  avatar: {
    borderWidth: 1,
    borderRadius: 99,
    borderColor: 'text-primary-color',
  },
});
