import React from 'react';
import {Text, View, StatusBar} from 'react-native';

import List from 'src/components/list';

export default function () {

  return (
    <>
      <StatusBar translucent />
      <View>
        <Text>hom2323e</Text>
        <List action={<Text>123</Text>}>
          <View>
            <Text>1231</Text>
          </View>
        </List>
      </View>
    </>
  );
}
