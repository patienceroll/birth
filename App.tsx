import {useColorScheme, LogBox, StatusBar} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {useContext} from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import Theme from 'src/context/theme';
import Home from 'src/pages/home';
import Sets from 'src/pages/sets';

// import DrawerContent from 'src/components/drawer-content';

const Drawer = createDrawerNavigator();

// 忽略报错
// LogBox.ignoreAllLogs();

export default function App() {
  const color = 'dark';
  const theme = useContext(Theme);

  return (
    <Theme.Provider value={theme}>
      <StatusBar
        animated
        barStyle={color === 'dark' ? 'light-content' : 'dark-content'}
      />
      <NavigationContainer
      documentTitle={}
        theme={{
          dark: color === 'dark',
          colors: {
            ...DefaultTheme.colors,
            primary: '#058ce5',
          },
        }}>
        <Drawer.Navigator initialRouteName="home">
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
