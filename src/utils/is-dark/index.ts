import {Appearance} from 'react-native';

export default function () {
  return Appearance.getColorScheme() !== 'dark';
}
