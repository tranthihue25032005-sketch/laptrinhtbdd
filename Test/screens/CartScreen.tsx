import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export default function CartScreen({ navigation }: any) {
  const { cart, removeFromCart, addToCart } = useContext(CartContext) as {
  cart: CartItem[];
  removeFromCart: (id: number) => void;
  addToCart: (item: CartItem) => void;
};
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  // 👉 Tính tổng tiền
  const total = cart
  .filter((item) => selectedItems.includes(item.id))
  .reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  // 👉 Tăng số lượng
  const increaseQty = (item: CartItem) => {
    addToCart({ ...item, quantity: 1 });
  };

  // 👉 Giảm số lượng
  const decreaseQty = (item: CartItem) => {
    if (item.quantity === 1) {
      removeFromCart(item.id);
    } else {
      addToCart({ ...item, quantity: -1 });
    }
  };

  //Hàm chọn/bỏ chọn

  const toggleSelect = (item: CartItem) => {
  setSelectedItems((prev) =>
    prev.includes(item.id)
      ? prev.filter((id) => id !== item.id)
      : [...prev, item.id]
  );
};

  const handleRemove = (id: number) => {
  removeFromCart(id);
  setSelectedItems(selectedItems.filter((i) => i !== id));
  };
  return (
    <View style={{ flex: 1 }}>
      
      {/*  LIST */}

      <TouchableOpacity
        onPress={() => {
          if (selectedItems.length === cart.length) {
            setSelectedItems([]);
          } else {
            setSelectedItems(cart.map((item: CartItem) => item.id));
          }
        }}
      >
        <Text>
          {cart.length > 0 && selectedItems.length === cart.length ? "Bỏ chọn tất cả" : "Chọn tất cả"}
        </Text>
      </TouchableOpacity>
      {cart.length === 0 ? (
        <Text style={styles.empty}>Giỏ hàng trống 🛒</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>

              {/* Checkbox */}
                <TouchableOpacity onPress={() => toggleSelect(item)}>
                  <Text style={styles.checkbox}>
                    {selectedItems.includes(item.id) ? "☑️" : "⬜"}
                  </Text>
                </TouchableOpacity>
  
              {/* IMAGE */}
              <Image source={{ uri: item.image }} style={styles.image} />

              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>{item.price}đ</Text>
              </View>

              {/* Quantity */}
              <View style={styles.qtyContainer}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => decreaseQty(item)}
                >
                  <Text>-</Text>
                </TouchableOpacity>

                <Text style={styles.qtyText}>{item.quantity}</Text>

                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => increaseQty(item)}
                >
                  <Text>+</Text>
                </TouchableOpacity>
                
              </View>

              {/*  Remove */}
              <TouchableOpacity onPress={() => handleRemove(item.id)}>
                <Text style={styles.remove}>Xóa</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* FOOTER */}
      {cart.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.total}>Tổng: {total}đ</Text>

          <TouchableOpacity
              style={[
                styles.checkoutBtn,
                selectedItems.length === 0 && { backgroundColor: "#ccc" }
              ]}
              disabled={selectedItems.length === 0}
              onPress={() =>
                navigation.navigate("Checkout", {
                  items: cart.filter((item) =>
                    selectedItems.includes(item.id)
                  ),
                })
              }
            >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>
              Thanh toán
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },

  item: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
  },

  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  price: {
    color: '#ff6600',
    marginTop: 5,
  },

  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },

  qtyBtn: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },

  qtyText: {
    marginHorizontal: 10,
    fontWeight: 'bold',
  },

  remove: {
    color: 'red',
    marginLeft: 10,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },

  total: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  checkoutBtn: {
    backgroundColor: '#ff3333',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },

  image: {
  width: 60,
  height: 60,
  borderRadius: 10,
  marginRight: 10,
  },

  checkbox: {
  fontSize: 18,
  marginRight: 8,
  },

}); 