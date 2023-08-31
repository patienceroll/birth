import {
  View,
  Animated,
  StyleSheet,
  ViewProps,
  PanResponder,
  LayoutRectangle,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import {ReactElement, useContext, useRef} from 'react';

import Theme from 'src/context/theme';
import useOutsidePress from 'src/hooks/use-outside-press';

export type ListProps = {
  children: ReactElement;
  action: ReactElement;
  style?: ViewProps['style'];
  /** 包含滑块和action的容器style */
  wrapperStyle?: ViewProps['style'];
};

const comStyle = StyleSheet.create({
  ct: {},
  children: {
    width: '100%',
    zIndex: 1
  },
  action: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
  },
});

export default function (props: ListProps) {
  const {children, action, style = {}, wrapperStyle = {}} = props;

  const translateX = useRef(new Animated.Value(0));
  const actionLayout = useRef<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const showAction = useRef(false);

  const theme = useContext(Theme);
  const {onTouchStart, onTouchEnd} = useOutsidePress(() => {
    showAction.current = false;
    Animated.timing(translateX.current, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  });

  function onStopSwipe(
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) {
    const {dx} = gestureState;
    if (
      dx < 0 &&
      Math.abs(dx) > actionLayout.current.width &&
      !showAction.current
    ) {
      showAction.current = true;
    }

    if (dx > 0 && showAction.current) {
      showAction.current = false;
    }

    Animated.timing(translateX.current, {
      toValue: showAction.current ? -actionLayout.current.width : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  const panSponder = PanResponder.create({
    // 要求成为响应者：
    onStartShouldSetPanResponder: () => true,
    /** 是否捕获子元素事件(拦截) */
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderGrant: () => {},
    onPanResponderMove: (_, gestureState) => {
      // 最近一次的移动距离为gestureState.move{X,Y}
      // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
      const {dx} = gestureState;
      if (dx < 0) {
        translateX.current.setValue(
          showAction.current ? dx + -actionLayout.current.width : dx,
        );
      }
    },
    onPanResponderTerminationRequest: () => true,
    onPanResponderRelease: onStopSwipe,
    onPanResponderTerminate: onStopSwipe,
    onShouldBlockNativeResponder: () => true,
  });

  return (
    <View
      style={[comStyle.ct, theme.backgroundColor, wrapperStyle]}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}>
      <Animated.View
        style={[
          comStyle.children,
          theme.backgroundColor,
          style,
          {
            transform: [
              {
                translateX: translateX.current,
              },
            ],
          },
        ]}
        {...panSponder.panHandlers}>
        {children}
      </Animated.View>
      <View
        style={[comStyle.action]}
        onLayout={e => {
          actionLayout.current = e.nativeEvent.layout;
        }}>
        {action}
      </View>
    </View>
  );
}
