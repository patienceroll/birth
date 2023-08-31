import React, {ReactElement} from 'react';
import {
  GestureResponderEvent,
  Platform,
  StyleProp,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import baseStyle from 'src/base-style';

export type ListActionProps = {
  children: ReactElement;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
};

export default function (props: ListActionProps) {
  const {children, style, onPress} = props;
  if (Platform.OS === 'android')
    return (
      <TouchableNativeFeedback onPress={onPress}>
        <View
          style={[
            baseStyle.height100,
            baseStyle.padding20,
            baseStyle.justifyContentCenter,
            baseStyle.alignItemsCenter,
            style,
          ]}>
          {children}
        </View>
      </TouchableNativeFeedback>
    );

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          baseStyle.height100,
          baseStyle.padding20,
          baseStyle.justifyContentCenter,
          baseStyle.alignItemsCenter,
          style,
        ]}>
        {children}
      </View>
    </TouchableOpacity>
  );
}
