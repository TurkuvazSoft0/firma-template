import React from 'react';
// ----------------------------- UI kitten -----------------------------------
import {
  StyleService,
  useStyleSheet,
  useTheme,
  Button,
  CheckBox,
} from '@ui-kitten/components';
// ----------------------------- Navigation -----------------------------------
import {useNavigation} from '@react-navigation/native';
// ----------------------------- Components && Elements -----------------------
import {AppIcon, CustomLayout, Text} from 'components';
import EvaIcons from 'types/eva-icon-enum';
import { globalStyle } from 'styles/globalStyle';

interface ICheckInItemProps {
  type: 'checkin';
  icon: EvaIcons;
  title: string;
  describe: string;
}
interface IMedicationItemProps {
  type: 'medication';
  icon: EvaIcons;
  title: string;
  describe: string;
  data: {
    title: string;
    drugs: {
      name: string;
      amount: string;
    }[];
  }[];
}

const UpcomingScreen = React.memo(() => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const CheckIn = ({item}: {item: ICheckInItemProps}) => {
    return (
      <CustomLayout style={styles.item} level="1">
        <CustomLayout horizontal itemsCenter gap={8} mb={4}>
          <CustomLayout
            style={{
              backgroundColor: `${theme['text-warning-color']}40`,
              ...styles.iconBorder,
            }}>
            <AppIcon
              name={item.icon}
              size={16}
              fill={theme['text-warning-color']}
            />
          </CustomLayout>
          <Text category="t5">{item.title}</Text>
        </CustomLayout>
        <Text category="subhead" status="platinum" marginBottom={12}>
          {item.describe}
        </Text>
        <Button status="warning" children={'Start assessment'} />
      </CustomLayout>
    );
  };
  const Medication = ({item}: {item: IMedicationItemProps}) => {
    return (
      <CustomLayout style={styles.item} level="1">
        <CustomLayout horizontal itemsCenter gap={8} mb={4}>
          <CustomLayout
            style={{
              backgroundColor: `${theme['text-primary-color']}40`,
              ...styles.iconBorder,
            }}>
            <AppIcon
              name={item.icon}
              size={16}
              fill={theme['text-primary-color']}
            />
          </CustomLayout>
          <Text category="t5">{item.title}</Text>
        </CustomLayout>
        <Text category="subhead" status="platinum" marginBottom={12}>
          {item.describe}
        </Text>
        {item.data.map((drugItem, id) => {
          return (
            <CustomLayout key={id} gap={16} mb={16}>
              <Text category="c1">{drugItem.title}</Text>
              {drugItem.drugs.map((drug, _id) => {
                return (
                  <CustomLayout
                    key={_id}
                    horizontal
                    justify="space-between"
                    gap={8}>
                    <CustomLayout horizontal gap={4}>
                      <CheckBox />
                      <Text category="subhead">{drug.name}</Text>
                    </CustomLayout>
                    <Text category="subhead">{drug.amount}</Text>
                  </CustomLayout>
                );
              })}
            </CustomLayout>
          );
        })}
      </CustomLayout>
    );
  };
  const renderItem = (item: any) => {
    switch (item.type) {
      case 'checkin':
        return <CheckIn item={item} />;
      case 'medication':
        return <Medication item={item} />;

      default:
        break;
    }
  };
  return (
    <CustomLayout style={styles.container}>
      <CustomLayout horizontal mt={16}>
        <Text>Upcoming activities</Text>
      </CustomLayout>
      {UPCOMING.map((item, index) => {
        return <CustomLayout key={index}>{renderItem(item)}</CustomLayout>;
      })}
    </CustomLayout>
  );
});

export default UpcomingScreen;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    gap: 16,
    marginHorizontal: 16,
  },
  iconBorder: {
    borderRadius: 10,
    padding: 12,
  },
  item: {
    borderRadius: 16,
    padding: 16,
    ...globalStyle.shadow,
  },
});
const UPCOMING: Array<ICheckInItemProps | IMedicationItemProps> = [
  {
    type: 'checkin',
    icon: EvaIcons.Bell,
    title: 'Mental health checkin',
    describe: 'Your monthly checkin with Dr. Franzen (online) is long overdue.',
  },
  {
    type: 'medication',
    icon: EvaIcons.Droplet,
    title: 'Medication reminder',
    describe:
      'Don’t forget to take your daily pills today. Here’s what you need to take.',
    data: [
      {
        title: 'Morning 6:30 AM',
        drugs: [{name: 'Ibuprofen', amount: '400mg'}],
      },
      {
        title: 'Evening 7:30 PM',
        drugs: [
          {name: 'Ibuprofen', amount: '400mg'},
          {name: 'Citrizine', amount: '10g'},
        ],
      },
    ],
  },
];
