import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import ClockScreen from './screens/ClockScreen';
import AlarmScreen from './screens/AlarmScreen';
import StopwatchScreen from './screens/StopwatchScreen';

import TimerScreen from './screens/TimerScreen';
import MovieListScreen from './screens/MovieListScreen';
import DetailScreen from './screens/DetailScreen';
const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Clock" component={ClockScreen} />
      <Tab.Screen name="Alarm" component={AlarmScreen} />
      <Tab.Screen name="Stopwatch" component={StopwatchScreen} />
      <Tab.Screen name="Timer" component={TimerScreen} />
      <Tab.Screen name="Movies" component={MovieListScreen} />
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        {/* 👉 Tab nằm trong Stack */}
        <Stack.Screen 
          name="HomeTabs" 
          component={MyTabs} 
          options={{ headerShown: false }}
        />

        {/* 👉 Màn Detail */}
        <Stack.Screen 
          name="Detail" 
          component={DetailScreen} 
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}