import * as React from 'react';
import EvaIcons from 'types/eva-icon-enum';
import {
  useTheme,
  useStyleSheet,
  StyleService,
} from '@ui-kitten/components';
import {CustomLayout, AppIcon, Text} from 'components';

interface IOptionProps {
  title: string;
  icon: EvaIcons;
  fill?: string;
  onPress?(): void;
}

const Option = ({option}: {option: IOptionProps}) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <CustomLayout level="1" style={styles.option} onPress={option.onPress}>
      <CustomLayout horizontal itemsCenter justify="space-between">
        <CustomLayout horizontal itemsCenter mv={8} gap={12}>
          <AppIcon
            name={option.icon}
            size={28}
            layoutIconStyle={[
              styles.layoutIcon,
              option.fill !== undefined && {
                backgroundColor: theme['text-danger-color'],
              },
            ]}
            fill={theme['text-white-color']}
          />
          <Text style={option.fill !== undefined && {color: option.fill}}>
            {option.title}
          </Text>
        </CustomLayout>
        {option.title !== 'Logout' && option.title !== 'Change Theme' && (
          <AppIcon name={EvaIcons.ChevronRight} />
        )}
      </CustomLayout>
    </CustomLayout>
  );
};
export default Option;

const themedStyles = StyleService.create({
  layoutIcon: {
    borderRadius: 10,
    padding: 6,
    backgroundColor: 'color-primary-default',
  },
  option: {
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
});
