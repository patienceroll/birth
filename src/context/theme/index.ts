import {createContext} from 'react';
import {ViewStyle, TextStyle} from 'react-native/types';

type ThemeType = {
  color: RequiredPick<TextStyle, 'color'>;
  danger: RequiredPick<TextStyle, 'color'>;
  backgroundColor: RequiredPick<ViewStyle, 'backgroundColor'>;
  borderColor: RequiredPick<ViewStyle, 'borderColor'>;
  blue: RequiredPick<TextStyle, 'color'>;
};

export const defaultTheme: ThemeType = {
  color: {color: '#000'},
  backgroundColor: {backgroundColor: '#fff'},
  danger: {color: '#fe3d2f'},
  blue: {
    color: '#4691fa',
  },
  borderColor: {
    borderColor: '#dadada',
  },
};

export const darkTheme: ThemeType = {
  color: {color: '#fff'},
  backgroundColor: {backgroundColor: '#000'},
  danger: defaultTheme.danger,
  borderColor: defaultTheme.borderColor,
  blue: defaultTheme.blue,
};

export default createContext(defaultTheme);

