import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import details from '../data/product_detail.json';
import { CartContext } from '../context/CartContext';

export default function OrderScreen({ route, navigation }: any) {
  const { productId, image, name } = route.params;
  const { addToCart } = useContext(CartContext);

  const product = details.find(p => p.id === productId);

  // ❗ Fix crash
  if (!product) {
    return <Text>Product not found</Text>;
  }

  const [size, setSize] = useState(product.sizes[0]);
  const [addons, setAddons] = useState<any[]>([]);
  const [qty, setQty] = useState(1);

  const toggleAddon = (addon: any) => {
    if (addons.find(a => a.id === addon.id)) {
      setAddons(addons.filter(a => a.id !== addon.id));
    } else {
      setAddons([...addons, addon]);
    }
  };

  const totalPrice = () => {
    if (!size) return 0;
    const addonTotal = addons.reduce((sum, a) => sum + a.price, 0);
    return (size.price + addonTotal) * qty;
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Choose Size</Text>

      {product.sizes.map(s => (
        <TouchableOpacity key={s.id} onPress={() => setSize(s)}>
          <Text style={{ color: size.id === s.id ? 'red' : 'black' }}>
            {s.name} - ${s.price}
          </Text>
        </TouchableOpacity>
      ))}

      <Text>Add-ons</Text>

      {product.addons.map(a => (
        <TouchableOpacity key={a.id} onPress={() => toggleAddon(a)}>
          <Text style={{ color: addons.find(x => x.id === a.id) ? 'green' : 'black' }}>
            {a.name} +${a.price}
          </Text>
        </TouchableOpacity>
      ))}

      <Text>Qty: {qty}</Text>

      <TouchableOpacity onPress={() => setQty(qty + 1)}>
        <Text>+</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setQty(qty > 1 ? qty - 1 : 1)}>
        <Text>-</Text>
      </TouchableOpacity>

      <Text>Total: ${totalPrice()}</Text>

      <TouchableOpacity
        onPress={() => {
          addToCart({
            productId,
            size,
            addons,
            qty,
            total: totalPrice()
          });
          navigation.navigate('Cart');
        }}
      >
        <Text>Add</Text>
      </TouchableOpacity>
    </View>
  );
}