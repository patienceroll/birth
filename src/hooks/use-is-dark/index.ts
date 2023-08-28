import {useColorScheme} from 'react-native';

export default function () {
  const color = useColorScheme() || 'light';
  // const color = 'dark'
  return color === 'dark';
}
