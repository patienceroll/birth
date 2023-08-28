import {createContext} from 'react';
import {ViewStyle, TextStyle} from 'react-native/types';

type ThemeType = {
  color: Pick<TextStyle, 'color'>;
  backgroundColor: Pick<ViewStyle, 'backgroundColor'>;
};

export const darkTheme: ThemeType = {
  color: {color: '#fff'},
  backgroundColor: {backgroundColor: '#000'},
};

export const defaultTheme: ThemeType = {
  color: {color: '#000'},
  backgroundColor: {backgroundColor: '#fff'},
};

export default createContext(defaultTheme);
