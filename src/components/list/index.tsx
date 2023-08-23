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

    padding: 20,
  },
  action: {},
});

export default function (props: ListProps) {
  const {children, action, style = {}, childrenStyle = {}} = props;
  const translateX = useRef(new Animated.Value(0));

  const panSponder = PanResponder.create({
    // 要求成为响应者：
    onStartShouldSetPanResponder: (evt, gestureState) => {
      console.log(evt, gestureState);
      return true;
    },
    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

    onPanResponderGrant: (evt, gestureState) => {
      // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
      // gestureState.{x,y} 现在会被设置为0
      console.log('开始操作', evt, gestureState);
    },
    onPanResponderMove: (evt, gestureState) => {
      // 最近一次的移动距离为gestureState.move{X,Y}
      // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
      console.log(gestureState.dx);
      translateX.current.setValue(gestureState.dx);
    },
    onPanResponderTerminationRequest: (evt, gestureState) => true,
    onPanResponderRelease: (evt, gestureState) => {
      // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
      // 一般来说这意味着一个手势操作已经成功完成。
      translateX.current.setValue(0);
    },
    onPanResponderTerminate: (evt, gestureState) => {
      // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
      translateX.current.setValue(0);
    },
    onShouldBlockNativeResponder: (evt, gestureState) => {
      // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
      // 默认返回true。目前暂时只支持android。
      return true;
    },
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
