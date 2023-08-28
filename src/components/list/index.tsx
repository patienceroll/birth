import {
  View,
  Animated,
  StyleSheet,
  ViewProps,
  PanResponder,
  LayoutRectangle,
} from 'react-native';
import {ReactElement, useContext, useRef} from 'react';

import Theme from 'src/context/theme';

export type ListProps = {
  children: ReactElement;
  action: ReactElement;
  style?: ViewProps['style'];
  childrenStyle?: ViewProps['style'];
};

const comStyle = StyleSheet.create({
  ct: {},
  children: {
    width: '100%',
    padding: 20,
    zIndex: 1,
  },
  action: {
    backgroundColor: '#f40',
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
  },
});

export default function (props: ListProps) {
  const {children, action, style = {}, childrenStyle = {}} = props;

  const translateX = useRef(new Animated.Value(0));
  const actionLayout = useRef<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const showAction = useRef(false);

  const theme = useContext(Theme);

  const panSponder = PanResponder.create({
    // 要求成为响应者：
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderGrant: () => {
      // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
      // gestureState.{x,y} 现在会被设置为0
    },
    onPanResponderMove: (_, gestureState) => {
      // 最近一次的移动距离为gestureState.move{X,Y}
      // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
      const {dx} = gestureState;
      if (dx < 0) {
        showAction.current = true;
        translateX.current.setValue(dx);
      } else {
        showAction.current = false;
      }
    },
    onPanResponderTerminationRequest: () => true,
    onPanResponderRelease: () => {
      // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
      // 一般来说这意味着一个手势操作已经成功完成。
      Animated.timing(translateX.current, {
        toValue: showAction.current ? -actionLayout.current.width : 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    },
    onPanResponderTerminate: () => {
      // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
      Animated.timing(translateX.current, {
        toValue: showAction.current ? -actionLayout.current.width : 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    },
    onShouldBlockNativeResponder: () => true,
  });

  return (
    <View style={[comStyle.ct, theme.backgroundColor, style]}>
      <Animated.View
        style={[
          comStyle.children,
          theme.backgroundColor,
          childrenStyle,
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
