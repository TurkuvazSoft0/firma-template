import React from 'react';
// ----------------------------- UI kitten -----------------------------------
import {
  StyleService,
  useStyleSheet,
  Button,
  Modal,
} from '@ui-kitten/components';
// ----------------------------- Components && Elements -----------------------
import {AppIcon, CustomLayout, NavigationAction} from 'components';
// ----------------------------- Types ---------------------------------------
import EvaIcons from 'types/eva-icon-enum';
// ----------------------------- Style ---------------------------------------
import {globalStyle} from 'styles/globalStyle';
// ----------------------------- Navigation ---------------------------------------
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from 'types/navigation-types';

const OptionChat = React.memo(({onStop}: {onStop(): void}) => {
  const styles = useStyleSheet(themedStyles);
  const {navigate} = useNavigation<NavigationProp<MainStackParamList>>();
  const [show, setShow] = React.useState(false);
  const close = () => {
    setShow(false);
  };
  const open = () => {
    setShow(true);
  };
  const toggle = () => {
    show ? close() : open();
  };
  const _onStop = () => {
    toggle();
    onStop();
  };

  return (
    <CustomLayout>
      <NavigationAction icon={EvaIcons.MoreHorizontal} onPress={toggle} />
      <Modal
        visible={show}
        onBackdropPress={close}
        backdropStyle={styles.backdropStyle}
        style={styles.modal}>
        <CustomLayout
          mt={80}
          mr={24}
          style={{width: 120, ...globalStyle.shadow, zIndex: 2000}}
          level="1"
          border={16}>
          <Button
            style={styles.button}
            accessoryLeft={<AppIcon name={EvaIcons.TrashOutline} size={18} />}
            children={'Clear Chat'}
            size="tiny"
            status="white"
            onPress={toggle}
          />
          <Button
            style={styles.button}
            accessoryLeft={
              <AppIcon name={EvaIcons.DownloadOutline} size={18} />
            }
            children={'Export Chat'}
            size="tiny"
            status="white"
            onPress={() => {}}
          />
          <Button
            style={styles.button}
            accessoryLeft={
              <AppIcon name={EvaIcons.StopCircleOutline} size={18} />
            }
            children={'Stop'}
            size="tiny"
            onPress={_onStop}
            status="white"
          />
        </CustomLayout>
      </Modal>
    </CustomLayout>
  );
});

export default OptionChat;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  button: {
    justifyContent: 'flex-start',
    paddingVertical: 8,
  },
  backdropStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  modal: {
    height: '96%',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    marginLeft: '30%',
  },
});
