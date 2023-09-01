import {DrawerScreenProps} from '@react-navigation/drawer';
import React, {useLayoutEffect,useEffect} from 'react';
import {Text, View} from 'react-native';

import RouteNames from 'src/route';

export default function (
  props: DrawerScreenProps<
    Record<keyof typeof RouteNames, BirthItem | undefined>,
    keyof typeof RouteNames
  >,
) {
  const {route, navigation} = props;

  useEffect(() => {
    navigation.setOptions({
      title: route.params ? '编辑生日' : '新增生日',
    });
  }, [navigation, route.params]);

  return (
    <View>
      <Text>123</Text>
    </View>
  );
}
