import {
  View,
  Animated,
  StyleSheet,
  ViewProps,
  PanResponder,
} from 'react-native';
import {ReactElement, useRef} from 'react';

export type ListProps = {
  children: ReactElement;
  action: ReactElement;
  style?: ViewProps['style'];
  childrenStyle?: ViewProps['style'];
};

const comStyle = StyleSheet.create({
  ct: {backgroundColor: '#fff'},
  children: {
    width: '100%',
    backgroundColor: '#444',
    padding: 20,
    zIndex: 1
  },
  action: {backgroundColor: '#f40',position:'absolute',right:0,top:0,height:'100%'},
});

export default function (props: ListProps) {
  const {children, action, style = {}, childrenStyle = {}} = props;
  const translateX = useRef(new Animated.Value(0));

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
    onPanResponderMove: (evt, gestureState) => {
      // 最近一次的移动距离为gestureState.move{X,Y}
      // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
      translateX.current.setValue(gestureState.dx);
    },
    onPanResponderTerminationRequest: () => true,
    onPanResponderRelease: () => {
      // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
      // 一般来说这意味着一个手势操作已经成功完成。
      Animated.timing(translateX.current, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    },
    onPanResponderTerminate: () => {
      // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
      Animated.timing(translateX.current, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    },
    onShouldBlockNativeResponder: () => true,
  });

  return (
    <View style={[comStyle.ct, style]}>
      <Animated.View
        style={[
          comStyle.children,
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
      <View style={[comStyle.action]}>{action}</View>
    </View>
  );
}
