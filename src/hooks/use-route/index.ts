import {NavigationProp, useNavigation} from '@react-navigation/native';
import RouteNames from 'src/route';

export default function <T = BirthItem>() {
  const navigation =
    useNavigation<
      NavigationProp<
        Record<keyof typeof RouteNames, T>,
        keyof typeof RouteNames
      >
    >();
  return navigation;
}
