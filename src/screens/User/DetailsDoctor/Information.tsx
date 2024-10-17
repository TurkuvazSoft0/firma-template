import React from 'react';
// ----------------------------- UI kitten -----------------------------------
import {
  StyleService,
  useStyleSheet,
  useTheme,
  Avatar,
  Divider,
} from '@ui-kitten/components';
// ----------------------------- Hooks ---------------------------------------
import {useLayout} from 'hooks';
// ----------------------------- Components && Elements -----------------------
import {Text, CustomLayout, AppIcon} from 'components';
import ReadMoreText from 'components/ReadMoreText';
// ----------------------------- Types ---------------------------------------
import {IDoctorProps} from 'types/element-types';
import EvaIcons from 'types/eva-icon-enum';
// ----------------------------- Style -----------------------------------
import {globalStyle} from 'styles/globalStyle';

const Information = React.memo(({doctor}: {doctor: IDoctorProps}) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const {width} = useLayout();

  const address =
    doctor.address.street +
    ', ' +
    doctor.address.city +
    ', ' +
    doctor.address.country;

  const CButton = ({
    icon,
    title,
    desc,
  }: {
    icon: EvaIcons;
    title: string;
    desc: string;
  }) => {
    return (
      <CustomLayout itemsCenter style={{width: (width - 120) / 4}}>
        <CustomLayout
          mb={8}
          padding={16}
          border={99}
          style={{
            backgroundColor: `${theme['text-primary-color']}40`,
            alignSelf: 'center',
          }}>
          <AppIcon name={icon} fill={theme['text-primary-color']} />
        </CustomLayout>
        <Text category="body" status="primary">
          {title}
        </Text>
        <Text category="c1" capitalize>
          {desc}
        </Text>
      </CustomLayout>
    );
  };
  return (
    <CustomLayout>
      <CustomLayout
        level="1"
        style={styles.information}
        horizontal
        gap={24}
        itemsCenter
        mh={24}>
        <Avatar source={doctor.avatar} size="large" />
        <CustomLayout gap={4}>
          <Text category="t5">{doctor.name}</Text>
          <Divider />
          <Text category="subhead" opacity={0.7}>
            {doctor.specialty}
          </Text>
          <Text category="subhead" opacity={0.7}>
            {doctor.hospital}
          </Text>
          <Text category="subhead" opacity={0.7}>
            {address}
          </Text>
        </CustomLayout>
      </CustomLayout>
      <CustomLayout horizontal justify="space-between" margin={24}>
        <CButton title="500+" desc={'patient'} icon={EvaIcons.People} />
        <CButton title="10+" desc={'year exp'} icon={EvaIcons.Book} />
        <CButton title="4.8" desc={'rating'} icon={EvaIcons.Star} />
        <CButton title="1,901" desc={'reviews'} icon={EvaIcons.MessageCircle} />
      </CustomLayout>
      <CustomLayout mh={24} gap={12}>
        <Text category="t5">About me</Text>
        <ReadMoreText text={doctor.about_me} maxLength={150} />
      </CustomLayout>
    </CustomLayout>
  );
});

export default Information;

const themedStyles = StyleService.create({
  information: {
    borderRadius: 16,
    padding: 16,
    ...globalStyle.shadow,
    zIndex: 10,
  },
});
