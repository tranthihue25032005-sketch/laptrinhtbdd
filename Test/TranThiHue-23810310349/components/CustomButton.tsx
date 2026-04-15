import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';

type Props = {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
};

export default function CustomButton({ title, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#ff4d6d',
    padding: 12,
    borderRadius: 20,
    margin: 5,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});