import {
  useColorScheme,
  LogBox,
  StatusBar,
  Text,
  View,
  Image,
  ImageSourcePropType,
} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import React, {useContext} from 'react';

import {
  createDrawerNavigator,
  DrawerToggleButton,
  DrawerNavigationOptions,
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import Theme, {darkTheme, defaultTheme} from 'src/context/theme';
import Home from 'src/pages/home';
import Sets from 'src/pages/sets';
import theme from 'src/context/theme';
import useIsDark from 'src/hooks/use-is-dark';

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

function DrawerIcon(type: 'home' | 'sets') {
  return function (
    props: Parameters<NonNullable<DrawerNavigationOptions['drawerIcon']>>[0],
  ) {
    const isDark = useIsDark();

    const store: Record<typeof type, ImageSourcePropType> = {
      home: isDark
        ? require('src/assets/1.dark.png')
        : require('src/assets/1.png'),
      sets: isDark
        ? require('src/assets/2.dark.png')
        : require('src/assets/2.png'),
    };

    return (
      <Image
        style={{width: props.size, height: props.size}}
        source={store[type]}
      />
    );
  };
}

export default function App() {
  const isDark = useIsDark();

  return (
    <Theme.Provider value={isDark ? darkTheme : defaultTheme}>
      <StatusBar
        animated
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <NavigationContainer
        theme={{
          dark: isDark,
          colors: isDark ? DarkTheme.colors : DefaultTheme.colors,
        }}>
        <Drawer.Navigator
          initialRouteName="home"
          screenOptions={{
            headerLeft,
            drawerActiveTintColor: isDark
              ? darkTheme.color.color?.toString()
              : defaultTheme.color.color?.toString(),
          }}>
          <Drawer.Screen
            name="home"
            component={Home}
            options={{
              title: '生日列表',
              drawerIcon: DrawerIcon('home'),
            }}
          />
          <Drawer.Screen
            name="sets"
            component={Sets}
            options={{
              title: '设置',
              drawerIcon: DrawerIcon('sets'),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </Theme.Provider>
  );
}
