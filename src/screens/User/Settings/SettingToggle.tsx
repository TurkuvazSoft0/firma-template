import React from 'react';
// ----------------------------- UI kitten -----------------------------------
import {StyleService, useStyleSheet, Toggle} from '@ui-kitten/components';
// ----------------------------- Components && Elements -----------------------
import {CustomLayout, Text} from 'components';

interface ISettingToggleProps {
  value: boolean;
  onChange: () => void;
  title: string;
}

const SettingToggle = React.memo(
  ({title, onChange, value}: ISettingToggleProps) => {
    return (
      <CustomLayout
        horizontal
        justify="space-between"
        onPress={onChange}
        itemsCenter>
        <Text category="body">{title}</Text>
        <Toggle checked={value} onChange={onChange} />
      </CustomLayout>
    );
  },
);

export default SettingToggle;
