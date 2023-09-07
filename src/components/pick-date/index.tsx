import {useRef, forwardRef, useImperativeHandle} from 'react';
import {View, StyleSheet} from 'react-native';
import baseStyle from 'src/style/base';

import * as Overlay from 'src/components/overlay';
import theme from 'src/style/theme';

const style = StyleSheet.create({
  view: {
    flexDirection: 'row',
    height: 400,
  },
});

type Pick = {
  time: number;
  type: 'day' | 'lunar';
};

export type Ref = {
  getBirth: () => Promise<Pick>;
};

export default forwardRef<Ref>(function (props, ref) {
  const promise = useRef<{
    reject: (reason?: any) => void;
    resoleve: (value: Pick | PromiseLike<Pick>) => void;
  }>({reject(_) {}, resoleve() {}});
  const overlay = useRef<Overlay.Ref>(null);

  useImperativeHandle(ref, () => ({
    getBirth() {
      overlay.current?.setTrue();
      return new Promise((resolve, reject) => {
        promise.current.reject = reject;
        promise.current.resoleve = resolve;
      });
    },
  }));
  return (
    <Overlay.default ref={overlay} onOvlayClose={overlay.current?.setFalse}>
      <View style={[style.view, theme.backgroundColor]}></View>
    </Overlay.default>
  );
});
