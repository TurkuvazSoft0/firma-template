import React from 'react';
import {Animated, FlatList} from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import { StyleService, useStyleSheet, Avatar, useTheme } from '@ui-kitten/components';
// ----------------------------- Components && Elements -----------------------
import {AppIcon, CustomLayout, Text} from 'components';
// ----------------------------- Utils -----------------------------------
import dayjs from 'dayjs';
import keyExtractoUtil from 'utils/keyExtractorUtil';
import relativeTime from 'dayjs/plugin/relativeTime';

// ----------------------------- Navigation ---------------------------------------
import {NavigationProp, useNavigation} from '@react-navigation/native';

// ----------------------------- @Types ---------------------------------------
import {MainStackParamList} from 'types/navigation-types';
import { IDoctorProps } from 'types/element-types';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import EvaIcons from 'types/eva-icon-enum';
import { useLayout } from 'hooks';
interface IMessageItemProps {
  id: string;
  message: string;
  createAt: string;
  user: IDoctorProps;
  isReaded: boolean;
  isOnline: boolean;
}

const MessageList = React.memo(({data}: {data: IMessageItemProps[]}) => {
  const {navigate} = useNavigation<NavigationProp<MainStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const {width}=useLayout()
  const theme=useTheme()
  dayjs.extend(relativeTime);
  const size_button = 80 * (width / 375);
  const renderRightActions = (
    progressAnimatedValue: Animated.AnimatedInterpolation<string | number>,
    dragAnimatedValue: Animated.AnimatedInterpolation<string | number>,
  ) => {
    const trans = dragAnimatedValue.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [0, 0, 140, 140],
    });
    return (
      <CustomLayout horizontal>
        <RectButton
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme['text-primary-color'],
            paddingHorizontal: 24,
            width: size_button,
            borderWidth: 0.5,
            borderColor: '#FFF',
            borderRadius: 4,
          }}
          onPress={() => {}}>
          <AppIcon name={EvaIcons.PhoneCall} fill={theme['text-white-color']} />
        </RectButton>
        <RectButton
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme['text-success-color'],
            paddingHorizontal: 24,
            width: size_button,
            borderWidth: 0.5,
            borderColor: '#FFF',
            borderRadius: 4,
          }}
          onPress={() => {}}>
          <AppIcon name={EvaIcons.Email} fill={theme['text-white-color']} />
        </RectButton>
        <RectButton
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme['text-danger-color'],
            paddingHorizontal: 24,
            width: size_button,
            borderWidth: 0.5,
            borderColor: '#FFF',
            borderRadius: 4,
          }}
          onPress={() => {}}>
          <AppIcon
            name={EvaIcons.CalendarOutline}
            fill={theme['text-white-color']}
          />
        </RectButton>
      </CustomLayout>
    );
  };
  return (
    <CustomLayout style={styles.container}>
      <FlatList
        data={data}
        contentContainerStyle={styles.contentContainer}
        keyExtractor={keyExtractoUtil}
        renderItem={({item}) => {
          return (
            <Swipeable renderRightActions={renderRightActions}>
            <CustomLayout
              level='3'
              horizontal
              itemsCenter
              gap={12}
              mh={16}
              pv={12}
              onPress={() => navigate('HistoryChatScreen', {user: item.user})}>
              <CustomLayout>
                {item.isOnline && <CustomLayout style={styles.onlNote} />}
                <Avatar source={item.user.avatar} size="medium" />
              </CustomLayout>
              <CustomLayout gap={8} style={{flex: 1}}>
                <CustomLayout gap={8} horizontal justify="space-between">
                  <Text category="body">{item.user.name}</Text>
                  <Text category="c2" status="placeholder">
                    {dayjs(item.createAt).fromNow()}
                  </Text>
                </CustomLayout>
                <Text
                  status="platinum"
                  fontWeight={item.isReaded ? '400' : '600'}
                  category={'subhead'}
                  opacity={item.isReaded ? 0.5 : 1}
                  numberOfLines={1}>
                  {item.message}
                </Text>
              </CustomLayout>
            </CustomLayout>
            </Swipeable>
          );
        }}
      />
    </CustomLayout>
  );
});

export default MessageList;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 120,
  },
  onlNote: {
    width: 16,
    height: 16,
    borderRadius: 99,
    backgroundColor: 'text-success-color',
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 100,
    borderWidth: 1,
    borderColor: 'background-basic-color-1',
  },
});
