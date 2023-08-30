import {LogBox, StatusBar, Image, ImageSourcePropType} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import React, {useContext, Suspense, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createDrawerNavigator,
  DrawerToggleButton,
  DrawerNavigationOptions,
} from '@react-navigation/drawer';

import Theme, {darkTheme, defaultTheme} from 'src/context/theme';
import BirthCtx from 'src/context/birth';
import Birth from 'src/pages/birth';
import Sets from 'src/pages/sets';
import useIsDark from 'src/hooks/use-is-dark';
import assets from 'src/assets';

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

function DrawerIcon(type: 'birth' | 'sets') {
  return function (
    props: Parameters<NonNullable<DrawerNavigationOptions['drawerIcon']>>[0],
  ) {
    const store: Record<typeof type, ImageSourcePropType> = {
      birth: assets[1],
      sets: assets[2],
    };

    return (
      <Image
        style={{width: props.size, height: props.size}}
        source={store[type]}
      />
    );
  };
}

function App(props: {list: BirthItem[]}) {
  const isDark = useIsDark();
  const [list, setList] = useState(() => props.list);

  return (
    <BirthCtx.Provider value={{list, setList}}>
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
            initialRouteName="birth"
            screenOptions={{
              headerLeft,
              drawerActiveTintColor: isDark
                ? darkTheme.color.color?.toString()
                : defaultTheme.color.color?.toString(),
            }}>
            <Drawer.Screen
              name="birth"
              component={Birth}
              options={{
                title: '生日列表',
                drawerIcon: DrawerIcon('birth'),
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
    </BirthCtx.Provider>
  );
}

export default function AppLazy() {
  return (
    <Suspense>
      {React.createElement(
        React.lazy(() =>
          AsyncStorage.getItem('list').then(res => {
            const list = (res ? JSON.parse(res) : []) as BirthItem[];
            list.push({
              name: '张显磊',
              id: '12',
              birthDay: 1693376281993,
              birthLunar: 1693376281993,
            });
            list.push({
              name: '李若和',
              id: '13',
              birthDay: 1693376281993,
              birthLunar: 1693376281993,
            });
            return {
              // eslint-disable-next-line react/no-unstable-nested-components
              default: () => <App list={list} />,
            };
          }),
        ),
      )}
    </Suspense>
  );
}
