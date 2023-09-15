import {useRef, forwardRef, useImperativeHandle} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
} from 'react-native';
import baseStyle from 'src/style/base';

import * as Overlay from 'src/components/overlay';
import theme from 'src/style/theme';
import {ScrollView} from 'react-native-gesture-handler';

const style = StyleSheet.create({
  view: {
    width: '100%',
    backgroundColor: theme.backgroundColor.backgroundColor,
    position: 'absolute',
    bottom: 0,
  },
  scrollView: {
    flex: 1,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

  const Touch = Platform.select({
    default: TouchableHighlight,
    android: TouchableNativeFeedback as unknown as typeof TouchableHighlight,
  });

  return (
    <Overlay.default ref={overlay} onOvlayClose={overlay.current?.setFalse}>
      <View style={style.view}>
        <View style={style.title}>
          <Touch>
            <Text>取消</Text>
          </Touch>
          <Touch>
            <Text>确定</Text>
          </Touch>
        </View>
        <View>
          <ScrollView style={style.scrollView}>
            <Text>123</Text>
          </ScrollView>
          <ScrollView style={style.scrollView}>
            <Text>123</Text>
          </ScrollView>
          <ScrollView style={style.scrollView}>
            <Text>123</Text>
          </ScrollView>
        </View>
      </View>
    </Overlay.default>
  );
});
