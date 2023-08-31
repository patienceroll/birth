import {
  LogBox,
  StatusBar,
  Image,
  ImageSourcePropType,
  View,
} from 'react-native';
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
import OutSideContext from 'src/context/outside-press';
import BirthCtx from 'src/context/birth';
import Birth from 'src/pages/birth';
import Sets from 'src/pages/sets';
import useIsDark from 'src/hooks/use-is-dark';
import assets from 'src/assets';
import baseStyle from 'src/base-style';

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
