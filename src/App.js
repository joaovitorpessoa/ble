import React from 'react';
import ManagerProvider from './BLE/Context/Manager';
import ConnectedDeviceInfoProvider from './BLE/Context/ConnectedDeviceInfo';
import ReadMonitorProvider from './BLE/Context/ReadMonitor';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Pages/Home';
import BLEIO from './Pages/BLE IO';

const Stack = createStackNavigator();

const App = () => {
  return (
    <ManagerProvider>
      <ReadMonitorProvider>
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
      </ReadMonitorProvider>
    </ManagerProvider>
  );
};

export default App;
