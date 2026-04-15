import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  time: string;
};

export default function CircleTimer({ time }: Props) {
  return (
    <View style={styles.circle}>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 8,
    borderColor: '#ff4d6d',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  time: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});