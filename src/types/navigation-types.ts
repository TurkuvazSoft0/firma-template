import {RouteProp} from '@react-navigation/native';
import {
  AppointmentItemProps,
  IArticleProps,
  IDoctorProps,
} from './element-types';

export type RootStackParamList = {
  AuthStack:
    | RouteProp<AuthStackParamList, keyof AuthStackParamList>
    | undefined;
  MainStack:
    | RouteProp<MainStackParamList, keyof MainStackParamList>
    | undefined;
};

export type AuthStackParamList = {
  Walkthough: undefined;
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  FillProfile: undefined;
  VerifySignup: undefined;
  CreatePassword: undefined;
  CreatePin: undefined;
  ChangePassword: undefined;
  MusteriSignup:undefined
  MusteriLogin:undefined;
};
export type BottomTabParamList = {
  Home: undefined;
  Appointments: undefined;
  Messages: undefined;
  Articles: undefined;
  Profile: undefined;
};

export type MainStackParamList = {
  BottomTabNavigator:
    | RouteProp<BottomTabParamList, keyof BottomTabParamList>
    | undefined;
  Notification: undefined;
  FavoriteDoctor: undefined;
  TopDoctor: undefined;
  CompanyAdd:undefined,
  Bildirimler:undefined,
  BildirimlerMusteri:undefined,
  SirketEkle:undefined,
  TabNavigator:undefined,
  Tekliflerim:undefined,
  SearchScreen: undefined;
  DetailsDoctor: {doctor: IDoctorProps};
  ChatScreen: {user: IDoctorProps};
  VoiceCallScreen: {user: IDoctorProps};
  VideoCallScreen: {user: IDoctorProps};
  HistoryChatScreen: {user: IDoctorProps};
  AppointmentFinish: {doctor: IDoctorProps};
  WriteReviewScreen: {doctor: IDoctorProps};
  AppointmentDetails: {appointment: AppointmentItemProps};
  CancelAppoiment: {appointment: AppointmentItemProps};
  RescheduleAppointment: {appointment: AppointmentItemProps};
  ArticlesScreen: undefined;
  ArticlesDetails: {articles: IArticleProps};
  ArticlesBookmark: undefined;
  EditProfile: undefined;
  SettingsScreen: undefined;
  PaymentsScreen: undefined;
  SecurityScreen: undefined;
  LanguageScreen: undefined;
  HelpCenter: undefined;
  InviteFriends: undefined;
};
export type RescheduleAppointmentNavigationProp = RouteProp<
  MainStackParamList,
  'RescheduleAppointment'
>;
