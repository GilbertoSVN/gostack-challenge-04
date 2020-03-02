import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';
import Web from './pages/WebView';

const Stack = createStackNavigator();

const Routes = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          title: 'Main',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#7159c1',
          },
          headerTintColor: '#FFF',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="User"
        component={User}
        options={{
          title: 'User',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#7159c1',
          },
          headerTintColor: '#FFF',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Webview"
        component={Web}
        options={{
          title: 'Webview',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#7159c1',
          },
          headerTintColor: '#FFF',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Routes;
