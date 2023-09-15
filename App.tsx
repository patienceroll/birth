import {LogBox, StatusBar, View} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  NavigationContainerRef,
} from '@react-navigation/native';
import React, {useContext, Suspense, useState, useRef, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createDrawerNavigator} from '@react-navigation/drawer';

import OutSideContext from 'src/context/outside-press';
import BirthCtx from 'src/context/birth';

import baseStyle from 'src/style/base';
import * as DrawerLayout from 'src/drawer-layout';
import RouteNames from 'src/route';

import Birth from 'src/pages/birth';
import Sets from 'src/pages/sets';
import BirthModify from 'src/pages/birth-modify';
import theme from 'src/style/theme';
import isDark from 'src/utils/is-dark';

import NativeDatePicker from 'rtn-native-date-picker/js/NativeDatePicker';
import TimerPicker from 'rtn-time-picker/js/TimePickerNativeComponent';

const Drawer = createDrawerNavigator();

// 忽略报错
LogBox.ignoreAllLogs();

function App(props: {list: BirthItem[]}) {
  const dark = isDark();
  const outSideContext = useContext(OutSideContext);
  const navigation =
    useRef<NavigationContainerRef<Record<keyof typeof RouteNames, undefined>>>(
      null,
    );

  const [list, setList] = useState(() => props.list);

  function onOutSideTounchStart() {
    outSideContext.eventStore.forEach(item => {
      if (!item.disabled && !outSideContext.skipIds.has(item.id)) {
        item.onOutsidePress();
      }
    });
  }

  useEffect(() => {
    console.log(NativeDatePicker);
    console.log(TimerPicker);
  }, []);

  return (
    <OutSideContext.Provider value={outSideContext}>
      <BirthCtx.Provider value={{list, setList}}>
        <View style={baseStyle.flex1} onTouchStart={onOutSideTounchStart}>
          <StatusBar
            animated
            barStyle={dark ? 'light-content' : 'dark-content'}
          />
          <NavigationContainer
            ref={navigation}
            theme={{
              dark: dark,
              colors: dark ? DarkTheme.colors : DefaultTheme.colors,
            }}>
            <Drawer.Navigator
              drawerContent={DrawerLayout.DrawerContent}
              initialRouteName={RouteNames.birth}
              screenOptions={{
                headerLeft: DrawerLayout.HeaderLeft,
                drawerActiveTintColor: theme.color.color,
              }}>
              <Drawer.Screen
                name={RouteNames.birth}
                component={Birth as any}
                options={{
                  title: '生日列表',
                  drawerIcon: DrawerLayout.DrawerIcon(RouteNames.birth),
                  headerRight: DrawerLayout.HeaderRight({
                    onPress() {
                      navigation.current?.navigate(RouteNames.birthModify);
                    },
                  }),
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
