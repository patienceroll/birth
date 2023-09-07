import isDark from 'src/utils/is-dark';

function generateTheme<T, B>(params: [T, B]) {
  const index = isDark() ? 1 : 0;
  return params[index];
}

// type ThemeType = {
//   color: RequiredPick<TextStyle, 'color'>;
//   danger: RequiredPick<TextStyle, 'color'>;
//   backgroundColor: RequiredPick<ViewStyle, 'backgroundColor'>;
//   borderColor: RequiredPick<ViewStyle, 'borderColor'>;
//   blue: RequiredPick<TextStyle, 'color'>;
// };

export default {
  get color() {
    return generateTheme([{color: '#000'}, {color: '#fff'}]);
  },
  get backgroundColor() {
    return generateTheme([
      {backgroundColor: '#fff'},
      {backgroundColor: '#000'},
    ]);
  },
  get danger() {
    return {color: '#fe3d2f'};
  },
  get blue() {
    return {
      color: '#4691fa',
    };
  },
  get borderColor() {
    return {
      borderColor: '#dadada',
    };
  },
};
