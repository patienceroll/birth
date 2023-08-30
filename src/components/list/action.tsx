import React, {ReactElement} from 'react';
import {
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
};

export default function (props: ListActionProps) {
  const {children, style} = props;
  if (Platform.OS === 'android')
    return (
      <TouchableNativeFeedback>
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
    <TouchableOpacity>
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
