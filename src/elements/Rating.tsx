import React from 'react';
import {View, TouchableOpacity, ViewStyle, StyleProp} from 'react-native';
import {useTheme, StyleService, useStyleSheet} from '@ui-kitten/components';
import useLayout from 'hooks/useLayout';
import {AppIcon} from 'components';
import EvaIcons from 'types/eva-icon-enum';

interface Props {
  defaultRate: number;
  setDefaultRate: React.Dispatch<React.SetStateAction<number>>;
  style?: StyleProp<ViewStyle>;
}
const Rate = ({defaultRate, setDefaultRate, style}: Props) => {
  const theme = useTheme();
  const {width} = useLayout();

  const [maxRating, setMaxRating] = React.useState([1, 2, 3, 4, 5]);
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={[styles.container, {width: width - 80}, style]}>
      {maxRating.map((item, _) => {
        return (
          <TouchableOpacity
            key={_}
            style={[styles.button]}
            onPress={() => setDefaultRate(_ + 1)}
            activeOpacity={0.7}>
            <AppIcon
              name={
                item < defaultRate + 1 ? EvaIcons.Star : EvaIcons.StarOutline
              }
              fill={theme['text-primary-color']}
              size={40}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Rate;

const themedStyles = StyleService.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  star: {
    height: 40,
    width: 40,
  },
  button: {
    backgroundColor: 'transparent',
  },
});
