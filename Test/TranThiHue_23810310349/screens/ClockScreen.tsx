import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CircleTimer from '../components/CircleTimer';

const ClockScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <CircleTimer time="11:43" />

      <Text>Tokyo - 18:43</Text>
      <Text>London - 12:43</Text>
      <Text>New York - 06:43</Text>
    </View>
  );
};

export default ClockScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});