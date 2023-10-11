import {DrawerScreenProps} from '@react-navigation/drawer';
import React, {useRef, useLayoutEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import DatePickerDialog from 'rtn-native-date-picker/js';
import moment from 'moment';

import RouteNames from 'src/route';
import key from 'src/utils/key';
import theme from 'src/style/theme';
import useWhether from 'src/hooks/use-whether';

export default function (
  props: DrawerScreenProps<
    Record<keyof typeof RouteNames, BirthItem | undefined>,
    keyof typeof RouteNames
  >,
) {
  const {route, navigation} = props;

  const form = useRef<BirthItem>({
    id: key.get,
    name: '',
    birthType: 'day',
    birthDay: NaN,
    birthLunar: NaN,
  });
  const {toggle} = useWhether();

  useLayoutEffect(() => {
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
          DatePickerDialog?.show({themeResId: 2}).then(res => {
            form.current.birthDay = moment(
              `${res.year}-${res.month}-${res.day}`,
            ).valueOf();
            toggle();
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
    </View>
  );
}

const style = StyleSheet.create({
  timer: {
    height: '100%',
  },
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
