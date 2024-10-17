import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Card, Modal} from '@ui-kitten/components';
import Text from './Text';
import {useLayout} from 'hooks';
import {Images} from 'assets/images';
import Lottie from 'lottie-react-native';
import CustomLayout from './CustomLayout';
import {waitUtil} from 'utils/waitUtil';
interface ModalMessageProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  type: 'success' | 'failed';
  describe: string;
  first_button?: {
    title: string;
    onPress: () => void;
  };
  second_button?: {
    title: string;
    onPress: () => void;
  };
  onBackdropPress: () => void;
}

export const ModalMessage = (props: ModalMessageProps) => {
  const {width} = useLayout();
  const {
    visible,
    setVisible,
    title,
    type,
    describe,
    first_button,
    second_button,
    onBackdropPress,
  } = props;
  const size = 140 * (width / 375);
  const closeModal = () => {
    setVisible(false);
  };
  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => {
        closeModal();
        onBackdropPress();
      }}>
      <Card disabled={true} style={[styles.card, {width: width - 64}]}>
        <Lottie
          source={
            type === 'success' ? Images.lottie.success : Images.lottie.failed
          }
          resizeMode="contain"
          style={{width: size, height: size, alignSelf: 'center'}}
          autoPlay
          loop={false}
        />
        <Text
          marginTop={40}
          category="t4"
          center
          status={type === 'success' ? 'success' : 'danger'}>
          {title}
        </Text>
        <Text category="subhead" status="platinum" center marginTop={12}>
          {describe}
        </Text>
        <CustomLayout gap={8} mt={24}>
          {first_button && (
            <Button
              onPress={() => {
                closeModal();
                waitUtil(500).then(() => {
                  first_button.onPress();
                });
              }}>
              {first_button.title}
            </Button>
          )}
          {second_button && (
            <Button
              onPress={() => {
                closeModal();
                waitUtil(500).then(() => {
                  second_button.onPress();
                });
              }}
              status="primary-transparent">
              {second_button.title}
            </Button>
          )}
        </CustomLayout>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 240,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  image: {},
  card: {
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
