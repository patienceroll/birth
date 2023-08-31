import React from 'react';
import {Text, View, FlatList, Image, StyleSheet, Alert} from 'react-native';

import List from 'src/components/list';
import ListAction from 'src/components/list/action';
import useBirth from 'src/hooks/use-birth';
import useTheme from 'src/hooks/use-theme';
import baseStyle from 'src/base-style';
import assets from 'src/assets';

const style = StyleSheet.create({
  action: {width: 20, height: 20},
  avatar: {width: 50, height: 50},
});

export default function () {
  const theme = useTheme();
  const birth = useBirth();

  function onDelete(item: BirthItem) {
    return function () {
      Alert.alert('删除生日', `确定删除${item.name}的生日吗?`, [
        {text: '取消'},
        {
          text: '确定',
          onPress() {},
        },
      ]);
    };
  }

  return (
    <>
      <View style={baseStyle.height100}>
        <FlatList<BirthItem>
          data={birth.list}
          style={baseStyle.flex1}
          renderItem={row => (
            <List
              key={row.item.id}
              action={
                <ListAction
                  onPress={onDelete(row.item)}
                  style={[{backgroundColor: theme.danger.color}]}>
                  <Image style={style.action} source={assets[3]} />
                </ListAction>
              }>
              <View style={[baseStyle.flexDirectionRow, theme.backgroundColor]}>
                <View style={[baseStyle.flexCenter]}>
                  <Image style={[style.avatar]} source={assets[4]} />
                </View>
                <View style={baseStyle.padding20}>
                  <Text style={theme.color}>{row.item.name}</Text>
                </View>
              </View>
            </List>
          )}
        />
      </View>
    </>
  );
}
