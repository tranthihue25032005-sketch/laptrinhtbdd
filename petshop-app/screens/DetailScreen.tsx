import { View, Text, Image, Button } from 'react-native';

export default function DetailScreen({ route, navigation }: any) {
  const { pet } = route.params;

  return (
    <View style={{ padding: 20 }}>
      <Image source={{ uri: pet.image }} style={{ width: 200, height: 200 }} />
      <Text style={{ fontSize: 20 }}>{pet.name}</Text>
      <Text>{pet.price} $</Text>

      <Button title="Quay lại" onPress={() => navigation.goBack()} />
    </View>
  );
}