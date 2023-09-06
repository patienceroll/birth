import {useRef, forwardRef, useImperativeHandle} from 'react';
import {View, StyleSheet} from 'react-native';
import baseStyle from 'src/base-style';

import * as Overlay from 'src/components/overlay';
import useTheme from 'src/hooks/use-theme';

const style = StyleSheet.create({
  view: {
    flexDirection: 'row',
    height: 400,
  },
});

export type Ref = {
  getBirth: () => Promise<{
    time: number;
    type: 'day' | 'lunar';
  }>;
};

export default forwardRef<Ref>(function (props, ref) {
  const overlay = useRef<Overlay.Ref>(null);
  const theme = useTheme();

  useImperativeHandle(ref, () => ({
    getBirth() {
      overlay.current?.setTrue();
      return new Promise((resolve, reject) => {});
    },
  }));
  return (
    <Overlay.default ref={overlay}>
      <View style={[style.view, theme.backgroundColor]}></View>
    </Overlay.default>
  );
});
