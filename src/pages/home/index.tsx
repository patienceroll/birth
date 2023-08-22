import React, {useEffect} from 'react';
import {Text, View, StatusBar} from 'react-native';

export default function (props: any) {
  console.log(props);

  useEffect(() => {
    props.navigation.openDrawer();
  }, []);

  return (
    <>
      <StatusBar translucent />
      <View>
        <Text>hom2323e</Text>
      </View>
    </>
  );
}
