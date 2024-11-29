import React from 'react';
// ----------------------------- UI kitten -----------------------------------
import {StyleService, useStyleSheet, useTheme} from '@ui-kitten/components';
// ----------------------------- Navigation -----------------------------------
import {useNavigation} from '@react-navigation/native';
// ----------------------------- Hooks ---------------------------------------
import {useLayout} from 'hooks';
import tw from "twrnc";
// ----------------------------- Components && Elements -----------------------
import {AppIcon, CustomLayout, IDivider, ReadMoreText, Text} from 'components';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {RectButton} from 'react-native-gesture-handler';
// ----------------------------- Types -----------------------
import EvaIcons from 'types/eva-icon-enum';
import dayjs from 'dayjs';
import {Alert, Animated, TouchableOpacity} from 'react-native';

export interface INotificationItemProps {
  type: 'success' | 'primary' | 'danger' | 'warning';
  title: string;
  createAt: string;
  describe: string;
  readed: boolean;
  firma_baslik: string;
  firma_mesaj: string;
  firma_mail: string;
  mail_adresi: string;
  mail_durum: number;
  onPress: any;
}

const UserNotificationsItem = ({
  data,
  lastItem,
  onPress,
  mail_id
}: {
  data: INotificationItemProps;
  lastItem: boolean;
  onPress: any;
  mail_id: number;
}) => {
  const {type, mail_adresi, firma_baslik, firma_mesaj, describe, readed, mail_durum,mail_tarih,firma_mail} = data;
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const {height, width, top, bottom} = useLayout();
  const ButtonAnimation = Animated.createAnimatedComponent(TouchableOpacity);

 
  const size_button = 80 * (width / 375);
  const renderLeftActions = (
    progressAnimatedValue: Animated.AnimatedInterpolation<string | number>,
    dragAnimatedValue: Animated.AnimatedInterpolation<string | number>,
  ) => {
    const scale = dragAnimatedValue.interpolate({
      inputRange: [0, 20, 80, 100],
      outputRange: [0, 0.3, 1, 1],
    });
    return (
      <>
        <ButtonAnimation
          onPress={() => {}}
          style={{
            transform: [{scale}],
            alignItems: 'center',
            justifyContent: 'center',
            width: size_button,
            backgroundColor: theme['text-danger-color'],
            borderWidth: 0.5,
            borderRadius: 4,
            borderColor: theme['text-basic-color'],
          }}>
          <AppIcon
            name={EvaIcons.Trash2Outline}
            fill={theme['text-white-color']}
          />
        </ButtonAnimation>
      </>
    );
  };

  const renderRightActions = (
    progressAnimatedValue: Animated.AnimatedInterpolation<string | number>,
    dragAnimatedValue: Animated.AnimatedInterpolation<string | number>,
  ) => {
    const scale = dragAnimatedValue.interpolate({
      inputRange: [-180, -140, -100, -50, 0],
      outputRange: [1, 1, 0.8, 0.5, 0],
    });
    return (
      <Animated.View style={{transform: [{scale}]}}>
        <CustomLayout
          horizontal
          style={{flex: 1, borderWidth: 1, borderColor: 'transparent'}}>
          <RectButton
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: size_button,
              backgroundColor: theme['text-primary-color'],
              borderWidth: 0.5,
              borderRadius: 4,
              borderColor: theme['text-basic-color'],
            }}
            onPress={() => {}}>
            <AppIcon
              name={EvaIcons.PhoneCall}
              fill={theme['text-white-color']}
            />
          </RectButton>
          <RectButton
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme['text-success-color'],
              paddingHorizontal: 24,
              width: size_button,
              borderWidth: 0.5,
              borderColor: theme['text-basic-color'],
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
              borderColor: theme['text-basic-color'],
              borderRadius: 4,
            }}
            onPress={() => {}}>
            <AppIcon
              name={EvaIcons.CalendarOutline}
              fill={theme['text-white-color']}
            />
          </RectButton>
        </CustomLayout>
      </Animated.View>
    );
  };

  return (
    <Swipeable rightThreshold={0} marginBottom={10}>
      <CustomLayout style={{display: "flex", flexDirection: "row",marginBottom:20,marginHorizontal:10,borderRadius:30}}>
        <CustomLayout 
          style={[
            styles.container,
            { backgroundColor: mail_durum === 1 ? theme['color-success-default'] : mail_durum === 0 ? theme['color-danger-default'] : mail_durum === 2 ? theme['color-warning-default'] : theme['color-basic-100'] }]} 
          level="1"
        >
          <CustomLayout horizontal itemsCenter gap={16} mb={16} mh={16}>
            <CustomLayout gap={4}>
              <Text category="body">{firma_baslik}</Text>
              <Text status="placeholder" style={{color:"white"}} category="subhead">
                {mail_tarih}
              </Text>
              <Text status="placeholder" category="subhead" style={tw`text-gray-200`}>
                {firma_mail}
              </Text>
            </CustomLayout>
          </CustomLayout>
          <Text category="subhead" marginHorizontal={16} status="platinum" style={tw`text-gray-300`}>
            {firma_mesaj}
          </Text>

          <CustomLayout style={{display: "flex", flexDirection: "row", gap: 10, marginLeft: 10}}>
          
          </CustomLayout>
          {!lastItem && <IDivider marginTop={8} />}
          {readed && (
            <CustomLayout style={styles.read} />
          )}
        </CustomLayout>
      </CustomLayout>
    </Swipeable>
  );
};

export default UserNotificationsItem;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  read: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    color: "white",
    borderRadius: 4,
    backgroundColor: 'color-primary-default',
    position: 'absolute',
    right: 16,
    top: 16,
  },
});
