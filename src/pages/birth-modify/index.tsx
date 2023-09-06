import {DrawerScreenProps} from '@react-navigation/drawer';
import React, {useLayoutEffect, useEffect, useRef} from 'react';
import {Text, View, TextInput, StyleSheet, Pressable} from 'react-native';

import * as Overlay from 'src/components/overlay';
import baseStyle from 'src/base-style';
import useTheme from 'src/hooks/use-theme';

import RouteNames from 'src/route';

const style = StyleSheet.create({
  text: {
    paddingVertical: 5,
    borderBottomWidth: 1,
  },
  view: {
    paddingHorizontal: 20,
  },
});

export default function (
  props: DrawerScreenProps<
    Record<keyof typeof RouteNames, BirthItem | undefined>,
    keyof typeof RouteNames
  >,
) {
  const {route, navigation} = props;
  const theme = useTheme();

  const overlay = useRef<Overlay.Ref>(null);

  useEffect(() => {
    navigation.setOptions({
      title: route.params ? '编辑生日' : '新增生日',
    });
  }, [navigation, route.params]);

  return (
    <View>
      <View style={style.view}>
        <TextInput
          placeholder="姓名"
          style={[style.text, theme.borderColor]}
          onChangeText={console.log}
        />
      </View>

      <Pressable
        onPress={() => {
          console.log('press');
          overlay.current?.setTrue();
        }}>
        <View style={baseStyle.padding20}>
          <Text>打开</Text>
        </View>
      </Pressable>

      {/* <View
        style={baseStyle.padding20}
        onTouchCancel={() => {
          console.log('onTouchCancel');
        }}
        onTouchStart={() => {
          overlay.current?.setFalse();
        }}>
        <Text>关闭</Text>
      </View> */}

      <Overlay.default ref={overlay}>
        <View style={[{backgroundColor: '#f40'}, baseStyle.padding20]}>
          <Text>123</Text>
        </View>
      </Overlay.default>
    </View>
  );
}
