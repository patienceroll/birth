import {createContext} from 'react';
import {ViewStyle, TextStyle} from 'react-native/types';

type ThemeType = {
  color: Pick<TextStyle, 'color'>;
  danger: Pick<TextStyle, 'color'>;
  backgroundColor: Pick<ViewStyle, 'backgroundColor'>;
};

export const darkTheme: ThemeType = {
  color: {color: '#fff'},
  backgroundColor: {backgroundColor: '#000'},
  danger: {color: '#fe3d2f'},
};

export const defaultTheme: ThemeType = {
  color: {color: '#000'},
  backgroundColor: {backgroundColor: '#fff'},
  danger: {color: '#fe3d2f'},
};

export default createContext(defaultTheme);
