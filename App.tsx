import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LogBox} from 'react-native';

import theme from 'src/theme';

import Home from 'src/pages/home';

const Stack = createNativeStackNavigator();
LogBox.ignoreAllLogs();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen
          name="home"
          component={Home}
          options={{
            title: '生日列表',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: theme.white,
              fontWeight: 'bold',
            },
            headerStyle: {
              backgroundColor: theme.primary,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
