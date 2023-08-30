import {Appearance} from 'react-native';

function generate(base: any, dark: any) {
  const index = Appearance.getColorScheme() === 'dark' ? 1 : 0;
  return [base, dark][index];
}

export default {
  get 1() {
    return generate(require('./1.png'), require('./1.dark.png'));
  },
  get 2() {
    return generate(require('./2.png'), require('./2.dark.png'));
  },
  get 3() {
    return require('./3.png');
  },
};
