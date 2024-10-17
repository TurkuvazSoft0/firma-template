import {useTheme} from '@ui-kitten/components';
import * as React from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const Pagination: React.FC<{
  index: number;
  backgroundColor: string;
  placholderColor?: string;
  length: number;
  animValue: Animated.SharedValue<number>;
  isRotate?: boolean;
  sizeIndicator?: number;
  widthActiveIndicator?: number;
  heightActiveIndicator?: number;
}> = props => {
  const {
    animValue,
    index,
    length,
    backgroundColor,
    isRotate,
    widthActiveIndicator = 8,
    sizeIndicator = 8,
    placholderColor,
    heightActiveIndicator = 8,
  } = props;
  const theme = useTheme();

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-sizeIndicator, 0, sizeIndicator];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-sizeIndicator, 0, sizeIndicator];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  }, [animValue, index, length]);
  const styled = useAnimatedStyle(() => {
    return {
      width: interpolate(
        animValue.value,
        [index - 1, index, index + 1],
        [sizeIndicator, widthActiveIndicator, sizeIndicator],
        Extrapolate.CLAMP,
      ),
      height: interpolate(
        animValue.value,
        [index - 1, index, index + 1],
        [sizeIndicator, heightActiveIndicator, sizeIndicator],
        Extrapolate.CLAMP,
      ),
    };
  });
  return (
    <Animated.View
      style={[
        {
          marginHorizontal: 4,
          width: sizeIndicator,
          height: sizeIndicator,
          borderRadius: 50,
          overflow: 'hidden',
          backgroundColor: placholderColor
            ? placholderColor
            : `${theme['background-basic-color-10']}30`,
          transform: [
            {
              rotateZ: isRotate ? '90deg' : '0deg',
            },
          ],
        },
        styled,
      ]}>
      <Animated.View
        style={[
          {
            borderRadius: 50,
            backgroundColor,
            flex: 1,
          },
          animStyle,
        ]}
      />
    </Animated.View>
  );
};
export default Pagination;
