import {useColorScheme, LogBox, StatusBar, Text} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {useContext} from 'react';

import {
  createDrawerNavigator,
  DrawerToggleButton,
  DrawerNavigationOptions,
} from '@react-navigation/drawer';

import Theme, {darkTheme, defaultTheme} from 'src/context/theme';
import Home from 'src/pages/home';
import Sets from 'src/pages/sets';

// import DrawerContent from 'src/components/drawer-content';

const Drawer = createDrawerNavigator();

// 忽略报错
LogBox.ignoreAllLogs();

function headerLeft(
  ...arg: Parameters<NonNullable<DrawerNavigationOptions['headerLeft']>>
) {
  const [props] = arg;
  const theme = useContext(Theme);
  if (typeof props.tintColor === 'undefined') {
    props.tintColor = theme.color.color?.toString();
  }
  return <DrawerToggleButton {...props} />;
}

export default function App() {
  // const color = useColorScheme();
  const color = 'dark';

  return (
    <Theme.Provider value={color === 'dark' ? darkTheme : defaultTheme}>
      <StatusBar
        animated
        barStyle={color === 'dark' ? 'light-content' : 'dark-content'}
      />
      <NavigationContainer
        theme={{
          dark: color === 'dark',
          colors: color === 'dark' ? DarkTheme.colors : DefaultTheme.colors,
        }}>
        <Drawer.Navigator
          initialRouteName="home"
          screenOptions={{
            headerLeft,
          }}>
          <Drawer.Screen
            name="home"
            component={Home}
            options={{
              title: '生日列表',
            }}
          />
          <Drawer.Screen
            name="sets"
            component={Sets}
            options={{
              title: '设置',
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </Theme.Provider>
  );
}
