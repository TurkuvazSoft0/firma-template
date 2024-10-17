import React from 'react';
import Lottie from 'lottie-react-native';
import {Images} from 'assets/images';
import {useLayout} from 'hooks';
import CustomLayout from 'components/CustomLayout';
import Text from '../Text';

export default function AnimationLoading() {
  const {width, height} = useLayout();
  const size = 100 * (width / 375);
  return (
    <CustomLayout
      style={{
        width: width,
        height: height,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 6,
          height: 6,
        },
        shadowOpacity: 0.41,
        shadowRadius: 5.11,
        elevation: 14,
        backgroundColor:'#00000030'
      }}>
      <CustomLayout
        style={{
          borderRadius: 16,
          width: size * 1.3,
          height: size * 1.3,
          alignItems: 'center',
          justifyContent: 'center',

        }}
        level="1">
        <Lottie
          source={Images.lottie.loading}
          style={{width: size, height: size}}
          autoPlay
          loop
        />
        {/* <Text marginVertical={12} center>Loading...</Text> */}
      </CustomLayout>
    </CustomLayout>
  );
}
