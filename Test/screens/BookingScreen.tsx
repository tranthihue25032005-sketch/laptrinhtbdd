import { View, Text, Button, Alert } from 'react-native';

export default function BookingScreen() {
  return (
    <View>
      <Text>Đặt lịch cho thú cưng</Text>
      <Button title="Đặt lịch tắm" onPress={() => Alert.alert("Đã đặt lịch!")} />
    </View>
  );
}