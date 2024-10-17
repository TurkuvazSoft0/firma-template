import React from 'react';
import {Image, ImageProps, ImageSourcePropType, StyleSheet} from 'react-native';
import {IconPack, IconProvider} from '@ui-kitten/components';
import {SvgProps} from 'react-native-svg';
import {Icons} from './icons';

const createIcon = (source: ImageSourcePropType): IconProvider<ImageProps> => {
  return {
    toReactElement: props => (
      <Image
        style={styles.icon}
        {...props}
        source={source}
        resizeMode="cover"
      />
    ),
  };
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

const AssetsIconsPack: IconPack<ImageProps | SvgProps> = {
  name: 'assets',
  icons: {
    'arrow-left': createIcon(Icons['arrow-left']),
    'arrow-right': createIcon(Icons['arrow-right']),
    cardholder: createIcon(Icons['cardholder']),
    'arrow-down': createIcon(Icons['arrow-down']),
    'arrow-up': createIcon(Icons['arrow-up']),
    'arrows-out-simple': createIcon(Icons['arrows-out-simple']),
    'caret-double-left': createIcon(Icons['caret-double-left']),
    'caret-double-right': createIcon(Icons['caret-double-right']),
    'caret-down': createIcon(Icons['caret-down']),
    'caret-up': createIcon(Icons['caret-up']),
    'caret-left': createIcon(Icons['caret-left']),
    'caret-right': createIcon(Icons['caret-right']),
    eye: createIcon(Icons.eye),
    'eye-slash': createIcon(Icons['eye-slash']),
    apple: createIcon(Icons.apple),
    facebook: createIcon(Icons.facebook),
    google: createIcon(Icons.google),
    gender: createIcon(Icons.gender),
    surgeon: createIcon(Icons.surgeon),
    skin: createIcon(Icons.skin),
    physician: createIcon(Icons.physician),
    medicines: createIcon(Icons.medicines),
    heart: createIcon(Icons.heart),
    dental: createIcon(Icons.dental),
    hospital: createIcon(Icons.hospital),
    consultation: createIcon(Icons.consultation),
    favorite: createIcon(Icons.favorite), 
    favorite_fill: createIcon(Icons.favorite_fill),
  },
};
export default AssetsIconsPack;
