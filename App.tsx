import {useColorScheme, LogBox} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

import {createDrawerNavigator} from '@react-navigation/drawer';

import 'react-native-gesture-handler';

import Home from 'src/pages/home';
import Sets from 'src/pages/sets';

import DrawerContent from 'src/components/drawer-content';

const Drawer = createDrawerNavigator();

// 忽略报错
LogBox.ignoreAllLogs();

export default function App() {
  const color = useColorScheme();
  return (
    <NavigationContainer
      theme={{
        dark: color === 'dark',
        colors: {
          ...DefaultTheme.colors,
          primary: '#058ce5',
        },
      }}>
      <Drawer.Navigator initialRouteName="home" drawerContent={DrawerContent}>
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
  );
}
