import React, {useContext} from 'react';
import {Text, View, StatusBar} from 'react-native';

import Theme from 'src/context/theme';
import List from 'src/components/list';

export default function () {
  const theme = useContext(Theme);

  return (
    <>
      <StatusBar translucent />
      <View>
        <List action={<Text>123</Text>}>
          <View style={theme.backgroundColor}>
            <Text style={theme.color}>1231</Text>
          </View>
        </List>
      </View>
    </>
  );
}
