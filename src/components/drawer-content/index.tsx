import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {View, Text} from 'react-native';

export default function (props: DrawerContentComponentProps) {
  console.log(props);
  return <Text>23</Text>;
}