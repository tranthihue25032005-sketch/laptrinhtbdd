import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';

export default function BookingScreen() {
  return (
    <View style={styles.container}>
      <Text>Đặt lịch cho thú cưng</Text>
      <Button 
        title="Đặt lịch tắm" 
        onPress={() => Alert.alert("Thông báo", "Đã đặt lịch thành công!")} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});