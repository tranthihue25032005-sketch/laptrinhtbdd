import React, { useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import { CartContext } from '../context/CartContext';

export default function CartScreen() {
  const { cart } = useContext(CartContext);

  const total = cart.reduce((sum: number, item: any) => sum + item.total, 0);

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={cart}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.productId}</Text>
            <Text>{item.size.name}</Text>
            <Text>Qty: {item.qty}</Text>
            <Text>${item.total}</Text>
          </View>
        )}
      />

      <Text>Total: ${total}</Text>
    </View>
  );
}