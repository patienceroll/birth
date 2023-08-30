import {createContext} from 'react';
import {ViewStyle, TextStyle} from 'react-native/types';

type ThemeType = {
  color: Pick<TextStyle, 'color'>;
  danger: Pick<TextStyle, 'color'>;
  backgroundColor: Pick<ViewStyle, 'backgroundColor'>;
  borderColor: Pick<ViewStyle, 'borderColor'>;
};

export const defaultTheme: ThemeType = {
  color: {color: '#000'},
  backgroundColor: {backgroundColor: '#fff'},
  danger: {color: '#fe3d2f'},
  borderColor: {
    borderColor: '#dadada',
  },
};

export const darkTheme: ThemeType = {
  color: {color: '#fff'},
  backgroundColor: {backgroundColor: '#000'},
  danger: defaultTheme.danger,
  borderColor: defaultTheme.borderColor,
};

export default createContext(defaultTheme);
