import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {ManagerProvider} from './BLE';
import {ConnectedDeviceInfoProvider} from './BLE';

import {Home, BLEIO} from './Pages';

const Stack = createStackNavigator();

const App = () => {
  return (
    <ManagerProvider>
      <ConnectedDeviceInfoProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="BLEIO"
              component={BLEIO}
              options={{title: ''}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ConnectedDeviceInfoProvider>
    </ManagerProvider>
  );
};

export default App;
