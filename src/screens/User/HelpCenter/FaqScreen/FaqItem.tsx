import React from 'react';
// ----------------------------- UI kitten -----------------------------------
import {StyleService, useStyleSheet, useTheme} from '@ui-kitten/components';
// ----------------------------- Components && Elements -----------------------
import {AppIcon, CustomLayout, IDivider, Text} from 'components';
import EvaIcons from 'types/eva-icon-enum';

export interface IFagProps {
  question: string;
  answer: string;
}

const FaqItem = React.memo(
  ({
    item,
    isOpen,
    onSelect,
  }: {
    item: IFagProps;
    isOpen: boolean;
    onSelect: () => void;
  }) => {
    const theme = useTheme();
    const styles = useStyleSheet(themedStyles);

    return (
      <CustomLayout
        style={styles.container}
        level="1"
        onPress={() => {
          onSelect();
        }}>
        <CustomLayout horizontal itemsCenter justify="space-between">
          <Text maxWidth={280} status={isOpen ? 'primary' : 'basic'}>
            {item.question}
          </Text>
          <AppIcon
            buttonStyle={{
              transform: [
                {
                  rotate: isOpen ? '180deg' : '0deg',
                },
              ],
            }}
            name={EvaIcons.ArrowDown}
            size={24}
            fill={
              isOpen ? theme['text-primary-color'] : theme['text-basic-color']
            }
          />
        </CustomLayout>
        {isOpen && (
          <CustomLayout>
            <IDivider marginVertical={12} />
            <Text category="subhead">{item.answer}</Text>
          </CustomLayout>
        )}
      </CustomLayout>
    );
  },
);

export default FaqItem;

const themedStyles = StyleService.create({
  container: {
    marginBottom: 16,
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 16,
  },
});
