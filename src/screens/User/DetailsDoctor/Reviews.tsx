import React from 'react';
// ----------------------------- UI kitten -----------------------------------
import {Avatar, Divider} from '@ui-kitten/components';

// ----------------------------- Components && Elements -----------------------
import {AppIcon, CustomLayout, ReadMoreText, Text} from 'components';

// ----------------------------- Types ---------------------------------------
import {IReviewProps} from 'types/element-types';
import EvaIcons from 'types/eva-icon-enum';
import { StyleSheet } from 'react-native';

const ReviewItem = React.memo(({reviews}: {reviews: IReviewProps[]}) => {
  return (
    <CustomLayout mh={24} gap={12}>
      <Text category="t5" marginBottom={12}>
        Reviews
      </Text>
      {reviews.map((review, index) => {
        return (
          <CustomLayout>  
          <CustomLayout key={index} gap={8}>
            <CustomLayout horizontal gap={12}>
              <Avatar source={{uri: review.patient.avatar}} size="tiny" />
              <CustomLayout justify="space-between">
                <Text>{review.patient.name}</Text>
                <CustomLayout horizontal itemsCenter gap={4}>
                  <AppIcon name={EvaIcons.Star} size={16} />
                  <Text>{review.rating}</Text>
                </CustomLayout>
              </CustomLayout>
            </CustomLayout>
            <ReadMoreText text={review.comment} maxLength={80} />
          </CustomLayout>
          <Divider style={styles.divider}/>

</CustomLayout>
        );
      })}
    </CustomLayout>
  );
});

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    height: 0.5,
    backgroundColor: 'background-basic-color-7',
    opacity: 0.5,
    marginVertical: 8, // Daha küçük margin
  },
})
export default ReviewItem;
