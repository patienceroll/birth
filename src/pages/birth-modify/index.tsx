import {DrawerScreenProps} from '@react-navigation/drawer';
import React, {useLayoutEffect, useEffect, useRef} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

import * as PickDate from 'src/components/pick-date';
import baseStyle from 'src/style/base';


import RouteNames from 'src/route';
import key from 'src/utils/key';

export default function (
  props: DrawerScreenProps<
    Record<keyof typeof RouteNames, BirthItem | undefined>,
    keyof typeof RouteNames
  >,
) {
  const {route, navigation} = props;
  const pickDate = useRef<PickDate.Ref>(null);

  const form = useRef<BirthItem>({
    id: key.get,
    name: '',
    birthType: 'day',
    birthDay: NaN,
    birthLunar: NaN,
  });

  useEffect(() => {
    navigation.setOptions({
      title: route.params ? '编辑生日' : '新增生日',
    });
  }, [navigation, route.params]);

  const Touch = Platform.select({
    default: TouchableHighlight,
    android: TouchableNativeFeedback as unknown as typeof TouchableHighlight,
  });

  return (
    <View>
      <Touch>
        <View>
          <View style={[style.label]}>
            <Text>姓名</Text>
          </View>
          <View style={[style.content]}></View>
        </View>
      </Touch>
      {/* <Touch style={style.touch}>
        <View style={[baseStyle.flexDirectionRow, style.item]}>
          <Text style={style.label}>姓名</Text>
          <View style={[style.content, theme.borderColor]}>
            <TextInput style={[style.textInput, baseStyle.flex1]} />
          </View>
        </View>
      </Touch>
      <Touch
        style={style.touch}
        onPress={() => {
          pickDate.current?.getBirth();
        }}>
        <View style={[baseStyle.flexDirectionRow, style.item]}>
          <Text style={style.label}>生日</Text>
          <View style={[style.content, theme.borderColor]}>
            <Text>
              {Object.is(form.current.birthDay, NaN)
                ? ''
                : form.current.birthDay}
            </Text>
          </View>
        </View>
      </Touch> */}

      <PickDate.default ref={pickDate} />
    </View>
  );
}

const style = StyleSheet.create({
  label: {},
  content: {},
});
