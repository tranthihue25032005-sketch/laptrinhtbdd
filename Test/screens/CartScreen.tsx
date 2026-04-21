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
    <View style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🛒 Giỏ Hàng</Text>
        <TouchableOpacity
          style={styles.selectAllBtn}
          onPress={() => {
            if (selectedItems.length === cart.length) {
              setSelectedItems([]);
            } else {
              setSelectedItems(cart.map((item: CartItem) => item.id));
            }
          }}
        >
          <Text style={styles.selectAllText}>
            {cart.length > 0 && selectedItems.length === cart.length ? "Bỏ chọn tất cả" : "Chọn tất cả"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* LIST */}
      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={styles.emptyText}>Giỏ hàng của bạn trống</Text>
          <Text style={styles.emptySubtext}>Hãy thêm sản phẩm yêu thích!</Text>
          <TouchableOpacity 
            style={styles.shopNowBtn}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.shopNowText}>Mua sắm ngay</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.item}>

              {/* Checkbox */}
              <TouchableOpacity 
                style={styles.checkboxContainer}
                onPress={() => toggleSelect(item)}
              >
                <View style={[styles.checkbox, selectedItems.includes(item.id) && styles.checkboxSelected]}>
                  {selectedItems.includes(item.id) && <Text style={styles.checkmark}>✓</Text>}
                </View>
              </TouchableOpacity>
  
              {/* IMAGE */}
              <Image source={{ uri: item.image }} style={styles.image} />

              <View style={styles.itemDetails}>
                <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.price}>{item.price.toLocaleString()}đ</Text>
              </View>

              {/* Quantity Controls */}
              <View style={styles.qtyContainer}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => decreaseQty(item)}
                >
                  <Text style={styles.qtyBtnText}>-</Text>
                </TouchableOpacity>

                <Text style={styles.qtyText}>{item.quantity}</Text>

                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => increaseQty(item)}
                >
                  <Text style={styles.qtyBtnText}>+</Text>
                </TouchableOpacity>
              </View>

              {/* Remove Button */}
              <TouchableOpacity 
                style={styles.removeBtn}
                onPress={() => handleRemove(item.id)}
              >
                <Text style={styles.removeText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* FOOTER */}
      {cart.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Tổng cộng:</Text>
            <Text style={styles.totalAmount}>{total.toLocaleString()}đ</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.checkoutBtn,
              selectedItems.length === 0 && styles.checkoutBtnDisabled
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
            <Text style={styles.checkoutText}>
              Thanh toán ({selectedItems.length})
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },

  header: {
    backgroundColor: '#ff6699',
    padding: 15,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },

  selectAllBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  selectAllText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  emptyEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },

  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 10,
  },

  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 30,
  },

  shopNowBtn: {
    backgroundColor: '#ff6699',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },

  shopNowText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  listContainer: {
    padding: 10,
  },

  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },

  checkboxContainer: {
    marginRight: 10,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  checkboxSelected: {
    backgroundColor: '#ff6699',
    borderColor: '#ff6699',
  },

  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 15,
  },

  itemDetails: {
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },

  price: {
    fontSize: 14,
    color: '#ff6699',
    fontWeight: 'bold',
  },

  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },

  qtyBtn: {
    width: 32,
    height: 32,
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  qtyBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },

  qtyText: {
    marginHorizontal: 15,
    fontSize: 16,
    fontWeight: 'bold',
    minWidth: 20,
    textAlign: 'center',
  },

  removeBtn: {
    padding: 8,
  },

  removeText: {
    fontSize: 16,
  },

  footer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },

  totalContainer: {
    flex: 1,
  },

  totalLabel: {
    fontSize: 14,
    color: '#666',
  },

  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff6699',
  },

  checkoutBtn: {
    backgroundColor: '#ff6699',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: '#ff6699',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  checkoutBtnDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },

  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 