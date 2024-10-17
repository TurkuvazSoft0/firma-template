import * as React from "react";
import { StyleSheet, TouchableHighlight, TouchableOpacity } from "react-native";
// ----------------------------- @Hooks -----------------------------------
import { useLayout } from "hooks";
// ----------------------------- @UU kitten -----------------------------------
import { Icon, Layout, useTheme } from "@ui-kitten/components";
// ----------------------------- @Reduxs -----------------------------------
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
// ----------------------------- @Reduxs -----------------------------------
import { useDispatch, useSelector } from "react-redux";
import { clearAlert, setAppAlert } from "reduxs/reducers/app-reducer";
import { AppDispatch, RootState } from "reduxs/store";
// ----------------------------- @Text -----------------------------------
import Text from "./Text";
import { AppIcon } from "./AppIcon";
import EvaIcons from "types/eva-icon-enum";
import { TouchableWithoutFeedback } from "react-native";

const AppMessage = () => {
  const alert = useSelector((state: RootState) => state.app.alert);
  const offset = useSharedValue(1);
  const dispatch = useDispatch<AppDispatch>();
  const delayTimeoutRef = React.useRef<NodeJS.Timeout[]>([]);
  const { width, height, top } = useLayout();
  const themes = useTheme();
  const clearAllTimeout = () => {
    delayTimeoutRef?.current?.map((id) => {
      clearTimeout(id);
    });
  };

  const renderIcon = () => {
    switch (alert?.type) {
      case "notification":
        return (
          <AppIcon
            name={EvaIcons.Bell}
            size={40}
            fill={themes["text-warning-color"]}
          />
        );
      case "success":
        return (
          <AppIcon
            name={EvaIcons.CheckmarkCircle2}
            size={40}
            fill={themes["text-success-color"]}
          />
        );
      case "error":
        return (
          <AppIcon
            name={EvaIcons.AlertTriangle}
            size={40}
            fill={themes["text-danger-color"]}
          />
        );
      default:
        return (
          <AppIcon
            name={EvaIcons.Bell}
            size={40}
            fill={themes["text-warning-color"]}
          />
        );
    }
  };
  const getColor = () => {
    switch (alert?.type) {
      case "notification":
        return themes["background-basic-color-2"];
      case "success":
        return themes["color-success-default"];
      case "error":
        return themes["color-danger-default"];
      default:
        return themes["background-basic-color-2"];
    }
  };

  const onClose = () => {
    offset.value = withTiming(1);
    dispatch(setAppAlert(null));
  };
  React.useEffect(() => {
    if (alert) {
      offset.value = withTiming(1, {
        duration: 550,
        easing: Easing.circle,
      });
      offset.value = withTiming(0, {
        duration: 550,
        easing: Easing.circle,
      });
      clearAllTimeout();
      let newDelayId = setTimeout(() => {
        onClose();
      }, 2500);
      delayTimeoutRef?.current?.push(newDelayId);
    }
  }, [alert]);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: width,
      alignSelf: "center",
      alignItems: "flex-start",
      height: height,
      transform: [
        {
          translateX: offset.value * (width / 3 + 24),
        },
      ],
    };
  });
  return alert ? (
    <Animated.View style={[styles.container, animatedStyles]}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={{ width: width, height: height }}
        onPress={() => {
          dispatch(clearAlert());
        }}
      />
      <TouchableOpacity
        onPress={() => {
          dispatch(clearAlert());
        }}
        activeOpacity={1}
        style={[
          styles.content,
          {
            borderColor: getColor(),
            shadowColor: getColor(),
            top: top + 40,
            width: width - 32,
            backgroundColor: themes["background-basic-color-1"],
          },
        ]}
      >
        {renderIcon()}
        <Layout style={styles.contentTitle}>
          <Text category="c1">{alert?.title}</Text>
          <Text category="c2" maxWidth={width-100}>{alert?.message}</Text>
        </Layout>
      </TouchableOpacity>
    </Animated.View>
  ) : null;
};

export default AppMessage;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: "hidden",
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 100,
    gap: 24,
  },
  contentTitle: {
    justifyContent: "space-between",
    marginLeft:16
  },
  icon: {
    width: 40,
    height: 40,
    alignSelf: "center",
    marginRight: 8,
  },
  content: {
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: "row",
    padding: 8,
    position: "absolute",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5.46,
    elevation: 9,
    left: 16,
    alignSelf: "flex-start",
  },
});
