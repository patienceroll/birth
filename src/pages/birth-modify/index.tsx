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
import theme from 'src/style/theme';

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
        <View style={style.item}>
          <View style={[style.label]}>
            <Text style={[style.labelText, theme.color]}>姓名</Text>
          </View>
          <View style={[style.content]}>
            <TextInput
              style={style.textInput}
              autoComplete="name"
              onTextInput={e => {
                form.current.name = e.nativeEvent.text;
              }}
            />
          </View>
        </View>
      </Touch>
      <Touch
        onPress={() => {
          pickDate.current?.getBirth().then(birth => {
            form.current.birthType = birth.type;
          });
        }}>
        <View style={style.item}>
          <View style={[style.label]}>
            <Text style={[style.labelText, theme.color]}>生日</Text>
          </View>
          <View style={[style.content]}>
            <View style={style.textContent}>
              {form.current.birthType === 'day' && (
                <Text>{form.current.birthDay || ''}</Text>
              )}
              {form.current.birthType === 'lunar' && (
                <Text>{form.current.birthLunar || ''}</Text>
              )}
            </View>
          </View>
        </View>
      </Touch>
      <PickDate.default ref={pickDate} />
    </View>
  );
}

const style = StyleSheet.create({
  item: {
    flexDirection: 'row',
  },
  label: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  labelText: {
    lineHeight: 49,
  },
  content: {
    flex: 1,
    borderBlockColor: theme.borderColor.borderColor,
    borderBottomWidth: 1,
    marginRight: 10,
  },
  textInput: {
    height: 49,
  },
  textContent: {
    height: 49,
  },
});
