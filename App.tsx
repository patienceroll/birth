import {LogBox, StatusBar, View} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import React, {useContext, Suspense, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Theme, {darkTheme, defaultTheme} from 'src/context/theme';
import OutSideContext from 'src/context/outside-press';
import BirthCtx from 'src/context/birth';
import useIsDark from 'src/hooks/use-is-dark';
import baseStyle from 'src/base-style';
import * as DrawerLayout from 'src/drawer-layout';
import RouteNames, {RouteName} from 'src/route';

import Birth from 'src/pages/birth';
import Sets from 'src/pages/sets';
import BirthModify from 'src/pages/birth-modify';

const Drawer = createDrawerNavigator();

// 忽略报错
LogBox.ignoreAllLogs();

function App(props: {list: BirthItem[]}) {
  const isDark = useIsDark();
  const [list, setList] = useState(() => props.list);
  const outSideContext = useContext(OutSideContext);

  function onOutSideTounchStart() {
    outSideContext.eventStore.forEach(item => {
      if (!item.disabled && !outSideContext.skipIds.has(item.id)) {
        item.onOutsidePress();
      }
    });
  }

  return (
    <Theme.Provider value={isDark ? darkTheme : defaultTheme}>
      <OutSideContext.Provider value={outSideContext}>
        <BirthCtx.Provider value={{list, setList}}>
          <View style={baseStyle.flex1} onTouchStart={onOutSideTounchStart}>
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
                drawerContent={DrawerLayout.DrawerContent}
                initialRouteName={RouteNames.birth}
                screenOptions={{
                  headerLeft: DrawerLayout.HeaderLeft,
                  drawerActiveTintColor: isDark
                    ? darkTheme.color.color?.toString()
                    : defaultTheme.color.color?.toString(),
                }}>
                <Drawer.Screen
                  name={RouteNames.birth}
                  component={Birth as any}
                  options={{
                    title: '生日列表',
                    drawerIcon: DrawerLayout.DrawerIcon(RouteNames.birth),
                  }}
                />

                <Drawer.Screen
                  name={RouteNames.sets}
                  component={Sets}
                  options={{
                    title: '设置',
                    drawerIcon: DrawerLayout.DrawerIcon(RouteNames.sets),
                  }}
                />
                <Drawer.Screen
                  name={RouteNames.birthModify}
                  component={BirthModify as any}
                />
              </Drawer.Navigator>
            </NavigationContainer>
          </View>
        </BirthCtx.Provider>
      </OutSideContext.Provider>
    </Theme.Provider>
  );
}

export default function AppLazy() {
  return (
    <Suspense>
      {React.createElement(
        React.lazy(() =>
          AsyncStorage.getItem('list').then(res => {
            const list = (res ? JSON.parse(res) : []) as BirthItem[];
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
