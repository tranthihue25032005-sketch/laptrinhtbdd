import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';

import pets from '../data/pets.json';
import categories from '../data/categories.json';

export default function HomeScreen({ navigation }: any) {

  // 👉 category đang chọn
  const [selectedCategory, setSelectedCategory] = useState('all');

  // 👉 lọc dữ liệu
  const filteredPets =
    selectedCategory === 'all'
      ? pets
      : pets.filter(p => p.categoryId === selectedCategory);

  return (
    <View style={{ flex: 1, padding: 10 }}>

      {/* 🔥 CATEGORY LIST */}
      <FlatList
        horizontal
        data={[{ id: 'all', name: 'All' }, ...categories]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedCategory(item.id)}
            style={{
              marginRight: 10,
              padding: 8,
              backgroundColor: selectedCategory === item.id ? 'orange' : '#ddd',
              borderRadius: 10
            }}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* 🐶 PET LIST */}
      <FlatList
        data={filteredPets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Detail', { pet: item })}
          >
            <View style={{ padding: 10 }}>
              <Image
                source={{ uri: item.image }}
                style={{ width: 100, height: 100 }}
              />
              <Text>{item.name}</Text>
              <Text>{item.price} $</Text>
            </View>
          </TouchableOpacity>
        )}
      />

    </View>
  );
}