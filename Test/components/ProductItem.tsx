import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

type Props = {
  time: string;
};

export default function CircleTimer({ time }: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [time]);

  return (
    <Animated.View style={[styles.circle, { transform: [{ scale }] }]}>
      <Text style={styles.time}>{time}</Text>
    </Animated.View>
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