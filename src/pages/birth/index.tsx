import React from 'react';
import {Text, View, StatusBar, FlatList, Image} from 'react-native';

import List from 'src/components/list';
import ListAction from 'src/components/list/action';
import useBirth from 'src/hooks/use-birth';
import useTheme from 'src/hooks/use-theme';
import baseStyle from 'src/base-style';
import assets from 'src/assets';

export default function () {
  const theme = useTheme();
  const birth = useBirth();
  return (
    <>
      <StatusBar translucent />
      <View>
        <FlatList<BirthItem>
          data={birth.list}
          renderItem={row => (
            <List
              key={row.item.id}
              action={
                <ListAction style={[{backgroundColor:theme.danger.color}]}>
                  <Image style={{width: 20, height: 20}} source={assets[3]} />
                </ListAction>
              }>
              <View style={theme.backgroundColor}>
                <Text style={theme.color}>{row.item.name}</Text>
              </View>
            </List>
          )}
        />
      </View>
    </>
  );
}
