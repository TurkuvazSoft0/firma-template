import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import {
  StyleService,
  useStyleSheet,
  useTheme,
  Avatar,
} from '@ui-kitten/components';
// ----------------------------- Navigation -----------------------------------
import {NavigationProp, RouteProp, useNavigation, useRoute} from '@react-navigation/native';
// ----------------------------- Hooks ---------------------------------------
import {useLayout} from 'hooks';
// ----------------------------- Components && Elements -----------------------
import {AppIcon, Container, CustomLayout, Text} from 'components';
import LinearGradient from 'react-native-linear-gradient';
// ----------------------------- Types ---------------------------------------
import EvaIcons from 'types/eva-icon-enum';
import {MainStackParamList} from 'types/navigation-types';
// ----------------------------- Utils ---------------------------------------
import useStopwatch from 'utils/useStopwatch';
import {waitUtil} from 'utils/waitUtil';
import {Images} from 'assets/images';

const VideoCallScreen = React.memo(() => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const {goBack,navigate} = useNavigation<NavigationProp<MainStackParamList>>();
  const {top, bottom} = useLayout();

  const {time, startTimer} = useStopwatch();
  const [isCalling, setIsCalling] = React.useState(false);
  const [video, setVideo] = React.useState(true);
  const [mic, setMic] = React.useState(true);
  const [volume, setVolume] = React.useState(true);
  React.useEffect(() => {
    isCalling && startTimer();
    waitUtil(2200).then(() => {
      setIsCalling(true);
    });
  }, [isCalling]);
  const toggleVolume = () => {
    setVolume(!volume);
  };
  const toggleMic = () => {
    setMic(!mic);
  };
  const toggleVideo = () => {
    setVideo(!video);
  };

  const doctor =
    useRoute<RouteProp<MainStackParamList, 'VideoCallScreen'>>().params.user;
  const _onEnd=()=>{
      navigate('AppointmentFinish',{doctor:doctor})
    }
  return (
    <Container style={styles.container} useSafeArea={false}>
      {!isCalling ? (
        <CustomLayout style={styles.background} />
      ) : (
        <Image source={Images.doctor} style={styles.background} />
      )}
      <TouchableOpacity
        style={[styles.navigation, {paddingTop: top + 8}]}
        onPress={goBack}>
        <AppIcon
          name={EvaIcons.ArrowBack}
          size={32}
          fill={theme['text-white-color']}
        />
      </TouchableOpacity>
      <Image source={Images.patient} style={styles.camera} />
      <LinearGradient
        colors={['#00000000', '#00000099']}
        style={[
          styles.content,
          {justifyContent: isCalling ? 'flex-end' : 'center'},
        ]}>
        {/* @ts-ignore */}
        {!isCalling && <Avatar source={doctor.avatar} style={styles.avatar} />}
        <Text category="t3" status="white">
          {doctor.name}
        </Text>
        {!isCalling ? (
          <Text status="white">Ringing...</Text>
        ) : (
          <Text status="white">{time}</Text>
        )}
        {isCalling && (
          <Text
            marginTop={isCalling ? 0 : 40}
            marginBottom={8}
            status="white"
            opacity={0.8}>
            Video recording is active...
          </Text>
        )}
        <CustomLayout horizontal alignSelfCenter pb={bottom + 12} gap={24}>
          <CustomLayout style={styles.button} onPress={toggleMic}>
            <AppIcon
              name={mic ? EvaIcons.Mic : EvaIcons.MicOff}
              fill={theme['text-white-color']}
            />
          </CustomLayout>
          <CustomLayout style={styles.button} onPress={toggleVolume}>
            <AppIcon
              name={volume ? EvaIcons.VolumeUp : EvaIcons.VolumeOff}
              fill={theme['text-white-color']}
            />
          </CustomLayout>
          <CustomLayout style={styles.button} onPress={toggleVideo}>
            <AppIcon
              name={video ? EvaIcons.Video : EvaIcons.VideoOff}
              fill={theme['text-white-color']}
            />
          </CustomLayout>
          <CustomLayout
            onPress={_onEnd}
            style={[
              styles.button,
              {backgroundColor: theme['text-danger-color']},
            ]}>
            <AppIcon
              name={EvaIcons.PhoneMissed}
              fill={theme['text-white-color']}
            />
          </CustomLayout>
        </CustomLayout>
      </LinearGradient>
    </Container>
  );
});

export default VideoCallScreen;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  navigation: {
    marginLeft: 24,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    gap: 16,
  },
  avatar: {
    width: 160,
    height: 160,
  },
  button: {
    padding: 12,
    borderRadius: 99,
    backgroundColor: `color-basic-control-transparent-600`,
  },
  background: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    width: '100%',
    zIndex: -10,
    backgroundColor: '#00000080',
  },
  camera: {
    width: 120,
    height: 240,
    borderRadius: 16,
    alignSelf: 'flex-end',
    marginRight: 24,
    marginTop: 24,
  },
});
