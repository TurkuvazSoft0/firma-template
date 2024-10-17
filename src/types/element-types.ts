import {
  ImageRequireSource,
  ImageStyle,
  ListRenderItem,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';
import EvaIcons from './eva-icon-enum';

export interface IntroButtonProps {
  title: string;
  onPress(): void;
  isActive?: boolean;
}

export interface IIntroListProps {
  data: IntroButtonProps[];
  title: string;
  contentContainerStyle?: StyleProp<ViewStyle> | undefined;
  renderItem?: ListRenderItem<IntroButtonProps> | null;
  numColumns?: number | undefined;
  refreshing?: boolean | null | undefined;
  horizontal?: boolean | null | undefined;
  initialNumToRender?: number | undefined;
  keyExtractor?:
    | ((item: IntroButtonProps, index: number) => string)
    | undefined;
  columnWrapperStyle?: StyleProp<ViewStyle> | undefined;
  keyboardShouldPersistTaps?:
    | boolean
    | 'always'
    | 'never'
    | 'handled'
    | undefined;
}
export interface IThemeLogoProps {
  source?: ImageRequireSource;
  style?: StyleProp<ImageStyle>;
  onPress?(): void;
  size?: number;
}
export interface ITextContentProps {
  index: number;
  animValue: Animated.SharedValue<number>;
  title: string;
  describe: string;
}
export interface IPaginationProps {
  data: Array<any>;
  animValue: Animated.SharedValue<number>;
  horizontal?: boolean;
  size?: number;
  space?: number;
  activeWidth?: number;
  activeColor?: string;
  inactiveColor?: string;
}
export interface IOptionProfileProps {
  icon: EvaIcons;
  title: string;
  desc: string;
  onPress?(): void;
  style?: StyleProp<ViewStyle>;
}
export enum StatusOnlineEnum {
  Online = 'Online',
  JustLeave = 'JustLeave',
  Offline = 'Offline',
}
export interface IReviewProps {
  id: string;
  patient: {name: string; id: string; avatar: string};
  rating: number;
  comment: string;
}
export interface IAvailableDayProps {
  day: string;
  timeslots: {
    start: string;
    end: string;
  }[];
}
export interface IEducationDoctorProps {
  type: string;
  institution: string;
  year: number;
  description?: string;
}

export interface IAddressProps {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}
export interface IDoctorProps {
  isFavorite: boolean;
  isOnline: StatusOnlineEnum;
  name: string;
  specialty: string;
  avatar: any;
  languages: string[];
  education: IEducationDoctorProps[];
  certifications: string[];
  address: IAddressProps;
  hospital: string;
  phone: string;
  email: string;
  availableDays: IAvailableDayProps[];
  about_me: string;
  insuranceAccepted: string[];
  totalRating: number;
  reviews: IReviewProps[];
}

export enum AppointmentType {
  Message = 'Message',
  VoiceCall = 'VoiceCall',
  VideoCall = 'VideoCall',
}
export interface IPackageProps {
  id: string;
  title: string;
  describe: string;
  price: number;
}

export interface AppointmentItemProps {
  type: AppointmentType;
  doctor: IDoctorProps;
  time: string;
  problem: string;
  package: IPackageProps;
  id: string;
}
export interface IArticleProps {
  title: string;
  author: string;
  date: string;
  content: string;
  category: string;
  tags: string[];
  image_url: string;
  likes: number;
  comments: {
    user: string;
    comment: string;
    date: string;
    avatar: string;
  }[];
}
