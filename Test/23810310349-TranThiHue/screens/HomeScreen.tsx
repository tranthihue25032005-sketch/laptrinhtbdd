import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import categories from '../data/categories.json';
import products from '../data/products.json';
import { Image } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  const [selectedCategory, setSelectedCategory] = useState('c1');

  const filteredProducts = products.filter(
    (p) => p.categoryId === selectedCategory
  );

  return (
    <View style={{ padding: 20 }}>
      
      {/* Categories */}
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedCategory(item.id)}>
            <Text style={{ margin: 10 }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Products */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
  <TouchableOpacity
    onPress={() =>
     navigation.navigate('Order', { 
  productId: item.id,
  image: item.image,
  name: item.name
})
    }
    style={{ marginBottom: 15 }}
  >
    <Image
  source={{ uri: item.image }}
  style={{ width: '100%', height: 150, borderRadius: 10 }}
/>
    <Text>{item.name}</Text>
    <Text>${item.price}</Text>
  </TouchableOpacity>
)}
      />
    </View>
  );
}