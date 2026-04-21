// import 'react-native-gesture-handler';
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { createStackNavigator } from '@react-navigation/stack';

// import ClockScreen from './screens/ClockScreen';
// import AlarmScreen from './screens/AlarmScreen';
// import StopwatchScreen from './screens/StopwatchScreen';

// import TimerScreen from './screens/TimerScreen';
// import MovieListScreen from './screens/MovieListScreen';
// import DetailScreen from './screens/DetailScreen';
// const Tab = createMaterialTopTabNavigator();
// const Stack = createStackNavigator();

// function MyTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Clock" component={ClockScreen} />
//       <Tab.Screen name="Alarm" component={AlarmScreen} />
//       <Tab.Screen name="Stopwatch" component={StopwatchScreen} />
//       <Tab.Screen name="Timer" component={TimerScreen} />
//       <Tab.Screen name="Movies" component={MovieListScreen} />
//     </Tab.Navigator>
//   );
// }
// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
        
//         {/* 👉 Tab nằm trong Stack */}
//         <Stack.Screen 
//           name="HomeTabs" 
//           component={MyTabs} 
//           options={{ headerShown: false }}
//         />

//         {/* 👉 Màn Detail */}
//         <Stack.Screen 
//           name="Detail" 
//           component={DetailScreen} 
//         />

//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartProvider } from './context/CartContext';

import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import CartScreen from './screens/CartScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Order" component={OrderHistoryScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}