import React from 'react';

// ----------------------------- UI kitten -----------------------------------
import {StyleService, useStyleSheet} from '@ui-kitten/components';

// ----------------------------- Components && Elements -----------------------
import {CustomLayout, Text} from 'components';

// ----------------------------- Types ---------------------------------------
import {IAvailableDayProps} from 'types/element-types';

const WorkingTime = ({
  availableDays,
}: {
  availableDays: IAvailableDayProps[];
}) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <CustomLayout margin={24} gap={12}>
      <Text category="t5">Working time</Text>
      <CustomLayout>
        {availableDays.map((day, index) => {
          return (
            <CustomLayout key={index} horizontal pv={8} gap={12}>
              <Text category="body">{day.day}: </Text>
              {day.timeslots.map((timeslot, _index) => {
                return (
                  <CustomLayout key={_index} style={styles.timeslot}>
                    <Text category="c1" status="white">
                      {timeslot.start} - {timeslot.end}
                    </Text>
                  </CustomLayout>
                );
              })}
            </CustomLayout>
          );
        })}
      </CustomLayout>
    </CustomLayout>
  );
};

export default WorkingTime;

const themedStyles = StyleService.create({
  timeslot: {
    borderRadius: 6,
    backgroundColor: 'text-primary-color',
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
});
