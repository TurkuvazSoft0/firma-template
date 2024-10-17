import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  View,
} from 'react-native';
import {useLayout} from 'hooks';
import Text from './Text';

interface ITabBarProps {
  tabs: string[];
  level?: string;
  style?: ViewStyle;
  activeIndex: number;
  onChange(index: number): void;
}

const TabBarScrollable = ({
  style,
  activeIndex,
  onChange,
  tabs,
}: ITabBarProps) => {
  const {width} = useLayout();
  const changeIndex = React.useCallback(
    (i: number) => {
      return onChange(i);
    },
    [activeIndex],
  );
  const refScrollView = React.useRef<ScrollView>(null);
  React.useEffect(() => {
    refScrollView.current?.scrollTo({
      x: activeIndex * 120 + 8 - (width - 250) / 2,
      animated: true,
    });
  }, [activeIndex]);
  return (
    <View>
      <ScrollView
        contentContainerStyle={[styles.container, style]}
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={refScrollView}>
        {tabs.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <TouchableOpacity
              key={index}
              style={styles.btn}
              onPress={() => changeIndex(index)}
              activeOpacity={1}>
              <Text
                capitalize
                category="body"
                status={isActive ? 'primary' : 'placeholder'}>
                {item}
              </Text>
              {isActive && <View style={[styles.divider]} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default TabBarScrollable;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingHorizontal: 16,
    gap: 16,
  },
  btn: {
    gap: 4,
  },
  divider: {
    height: 4,
    backgroundColor: '#3366FF',
    width: '80%',
    alignSelf: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 16,
  },
});
