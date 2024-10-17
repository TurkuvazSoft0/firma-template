import React from 'react';
import {View} from 'react-native';
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
// ----------------------------- Assets ---------------------------------------
import {Images} from 'assets/images';
// ----------------------------- Components && Elements -----------------------
import RenderComposer from './RenderComposer';
import {Container, CustomLayout, NavigationAction, Text} from 'components';
// ----------------------------- Message -----------------------
import {
  Bubble,
  BubbleProps,
  GiftedChat,
  IMessage,
  InputToolbar,
  InputToolbarProps,
  Message,
  MessageProps,
} from 'react-native-gifted-chat';
// ----------------------------- Types ---------------------------------------
import EvaIcons from 'types/eva-icon-enum';
import {MainStackParamList} from 'types/navigation-types';
import dayjs from 'dayjs';
import OptionChat from './OptionChat';

const ChatScreen = React.memo(() => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const {navigate} = useNavigation<NavigationProp<MainStackParamList>>();
  const {top, bottom} = useLayout();

  const user =
    useRoute<RouteProp<MainStackParamList, 'ChatScreen'>>().params.user;
  const [messages, setMessages] = React.useState<IMessage[]>([]);
  const onSend = React.useCallback((messages: IMessage[]) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);
  React.useEffect(() => {
    setMessages([
      {
        _id: 2,
        text: "Hello doctor. I'm great",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: Images.avatar,
        },
      },
      {
        _id: 1,
        createdAt: new Date(),
        text: 'How are you?',
        user: {
          _id: 2,
          name: user.name,
          avatar: user.avatar,
        },
      },
      {
        _id: 0,
        createdAt: new Date(),
        text: 'Hi There Mister! 👋.',
        user: {
          _id: 2,
          name: user.name,
          avatar: user.avatar,
        },
      },
    ]);
  }, []);
  const renderInputToolbar = React.useCallback(
    (props: InputToolbarProps<IMessage>) => {
      return (
        <InputToolbar
          {...props}
          containerStyle={styles.containerStyle}
          renderComposer={props => <RenderComposer {...props} />}
          primaryStyle={{
            marginBottom: -bottom,
            backgroundColor: theme['background-basic-color-1'],
            paddingBottom: bottom + 4,
          }}
        />
      );
    },
    [],
  );
  const renderBubble = React.useCallback((props: BubbleProps<IMessage>) => {
    return (
      <View>
        <Bubble
          {...props}
          wrapperStyle={{
            left: styles.wrapperLeftStyle,
            right: styles.wrapperRightStyle,
          }}
          textStyle={{
            left: styles.textStyleLeft,
            right: styles.textStyleRight,
          }}
        />
        <Text
          marginTop={8}
          category="c1"
          status="platinum"
          right={props.position === 'right'}>
          {dayjs(props.currentMessage?.createdAt).format('MM/DD/YYYY  HH:MM')}
        </Text>
      </View>
    );
  }, []);
  const renderMessage = React.useCallback((props: MessageProps<IMessage>) => {
    return (
      <View style={{paddingBottom: 24}}>
        <Message
          {...props}
          containerStyle={{
            left: {marginLeft: 16, alignItems: 'flex-start'},
            right: {marginRight: 24, alignItems: 'flex-start'},
          }}
        />
      </View>
    );
  }, []);
  return (
    <Container style={styles.container} useSafeArea={false}>
      <CustomLayout
        level="1"
        style={styles.topNavigation}
        pt={top + 8}
        horizontal
        itemsCenter>
        <NavigationAction />
        <CustomLayout horizontal itemsCenter gap={12}>
          {/* @ts-ignore */}
         {user.avatar && <Avatar source={user.avatar} style={styles.avatar} />}
          <Text>{user.name}</Text>
        </CustomLayout>
        <OptionChat onStop={()=>navigate('AppointmentFinish',{doctor:user})}/>
      </CustomLayout>
      <GiftedChat
        user={{_id: 1}}
        scrollToBottom
        messages={messages}
        renderSend={prop => (
          <NavigationAction
            icon={EvaIcons.PaperPlaneOutline}
            marginBottom={24}
            marginRight={12}
            onPress={() =>
              prop.text !== '' && prop?.onSend?.({text: prop?.text?.trim()}, true)
            }
          />
        )}
        onSend={message => onSend(message)}
        renderBubble={props => renderBubble(props)}
        renderMessage={props => renderMessage(props)}
        showAvatarForEveryMessage
        showUserAvatar
        renderTime={props => null}
        imageStyle={{marginHorizontal: -12}}
        renderInputToolbar={props => renderInputToolbar(props)}
        infiniteScroll
      />
    </Container>
  );
});

export default ChatScreen;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  topNavigation: {
    paddingBottom: 12,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  avatar: {
    width: 36,
    height: 36,
  },
  textStyleRight: {
    fontSize: 16,
    color: 'text-white-color',
    lineHeight: 24,
    fontFamily: 'SpaceGrotesk-Regular',
  },
  timeTextStyle: {
    color: 'text-basic-color',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'SpaceGrotesk-Bold',
  },
  wrapperLeftStyle: {
    backgroundColor: 'background-basic-color-1',
    borderTopLeftRadius: 0,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  wrapperRightStyle: {
    borderTopRightRadius: 0,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'color-primary-500',
  },
  textStyleLeft: {
    color: 'text-basic-color',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'SpaceGrotesk-Regular',
  },
  containerStyle: {
    flex: 1,
    backgroundColor: '#FBF0EA',
  },
});
