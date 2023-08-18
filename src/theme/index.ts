import {Appearance} from 'react-native';

const mode = Appearance.getColorScheme() || 'light';

function getStringValueByMode(light: string, dark: string) {
  return {
    light,
    dark,
  };
}

export default {
  primary: getStringValueByMode('#058ce5', '')[mode],
  white: '#fff',
  black: '#000',
};
