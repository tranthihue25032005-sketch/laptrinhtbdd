import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ClockScreen from './screens/ClockScreen';
import AlarmScreen from './screens/AlarmScreen';
import StopwatchScreen from './screens/StopwatchScreen';
import TimerScreen from './screens/TimerScreen';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Clock" component={ClockScreen} />
        <Tab.Screen name="Alarm" component={AlarmScreen} />
        <Tab.Screen name="Stopwatch" component={StopwatchScreen} />
        <Tab.Screen name="Timer" component={TimerScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}