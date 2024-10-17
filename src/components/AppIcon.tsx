import {Icon, useTheme} from '@ui-kitten/components';
import React from 'react';
import {
  ColorValue,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import EvaIcons from 'types/eva-icon-enum';

interface AppIcon {
  name?: EvaIcons;
  size?: number;
  fill?: ColorValue;
  buttonStyle?: StyleProp<ViewStyle>;
  layoutIconStyle?: StyleProp<ViewStyle>;
  onPress?(): void;
  children?: React.ReactNode;
}

export const AppIcon = ({
  name = EvaIcons.ArrowBackOutline,
  size = 24,
  fill,
  buttonStyle,
  onPress,
  children,
  layoutIconStyle,
}: AppIcon) => {
  const theme = useTheme();
  const onIconPress = () => {
    onPress && onPress();
  };

  return (
    <TouchableOpacity
      onPressIn={onIconPress}
      style={buttonStyle}
      disabled={!onPress}
      activeOpacity={0.54}>
      <View style={layoutIconStyle}>
        <Icon
          name={name}
          width={size}
          fill={fill ? fill : theme['text-basic-color']}
          height={size}
        />
      </View>
      {children}
    </TouchableOpacity>
  );
};
