import {DrawerScreenProps} from '@react-navigation/drawer';
import React, {useLayoutEffect, useEffect, useRef} from 'react';
import {Text, View, TextInput, StyleSheet, Pressable} from 'react-native';

import * as PickDate from 'src/components/pick-date';
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
  const pickDate = useRef<PickDate.Ref>(null);

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
      <PickDate.default ref={pickDate} />
    </View>
  );
}
