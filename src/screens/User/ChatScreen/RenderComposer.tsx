import React from 'react';
import {View} from 'react-native';
import {StyleService, useStyleSheet, Layout} from '@ui-kitten/components';
import {Composer, Send, ComposerProps} from 'react-native-gifted-chat';
import {NavigationAction} from 'components';
import EvaIcons from 'types/eva-icon-enum';

const RenderComposer = (props: ComposerProps) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <Layout style={styles.container} level="1">
      <Composer
        {...props}
        textInputStyle={{backgroundColor: 'transparent', flex: 1}}
        placeholderTextColor={'#52606D'}
      />
      <View style={styles.content}>
        <NavigationAction icon={EvaIcons.CameraOutline} />
        <NavigationAction icon={EvaIcons.AttachOutline} />
      </View>
    </Layout>
  );
};

export default RenderComposer;

const themedStyles = StyleService.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    paddingTop: 16,
    marginBottom: 12,
    height: 80,
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  send: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
