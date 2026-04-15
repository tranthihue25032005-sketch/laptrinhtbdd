import { 
  View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Alert 
} from 'react-native';
import { useState, useContext } from "react";
import { TextInput } from "react-native";
import { CartContext } from '../context/CartContext';
import { OrderContext } from "../context/OrderContext";
import { AuthContext } from "../context/AuthContext";

export default function CheckoutScreen({ navigation, route }: any) {
  const { cart, clearCart } = useContext(CartContext);
  const { addOrder } = useContext(OrderContext);
  const { user } = useContext(AuthContext);

  const [address, setAddress] = useState(user?.address || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const { items } = route.params;

    const total = items.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
  if (!address || !phone) {
    Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  addOrder({
    items: items,
    address,
    phone,
    paymentMethod, 
  });

  Alert.alert("🎉 Thành công", "Đơn hàng của bạn đã được đặt!");
  clearCart();
  navigation.navigate('Orders');
};

  return (
    <View style={styles.container}>
      
      {/* 📦 DANH SÁCH SẢN PHẨM */}
      <Text style={styles.title}>Sản phẩm</Text>

      <FlatList
        data={items}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.img} />

            <View style={{ flex: 1 }}>
              <Text numberOfLines={1}>{item.name}</Text>
              <Text>Số lượng: {item.quantity}</Text>
            </View>

            <Text style={styles.price}>
              {item.price * item.quantity}đ
            </Text>
          </View>
        )}
      />
      {/* 📍 THÔNG TIN GIAO HÀNG */}
        <Text style={styles.title}>Thông tin giao hàng</Text>

        <TextInput
          value={address}
          onChangeText={setAddress}
          placeholder="Địa chỉ"
          style={styles.input}
        />

        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="Số điện thoại"
          style={styles.input}
        />

        <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
          <Text style={{ color: "#007bff", marginBottom: 10 }}>
            Thay đổi từ hồ sơ
          </Text>
        </TouchableOpacity>

        <Text style={styles.title}>Phương thức thanh toán</Text>

        <TouchableOpacity
          style={styles.paymentItem}
          onPress={() => setPaymentMethod("COD")}
        >
          <Text>Thanh toán khi nhận hàng</Text>
          <Text>{paymentMethod === "COD" ? "✔️" : ""}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.paymentItem}
          onPress={() => setPaymentMethod("MOMO")}
        >
          <Text>Ví điện tử </Text>
          <Text>{paymentMethod === "MOMO" ? "✔️" : ""}</Text>
        </TouchableOpacity>

      {/* 💰 TỔNG TIỀN */}
      <View style={styles.totalBox}>
        <Text style={styles.totalText}>Tổng tiền:</Text>
        <Text style={styles.totalPrice}>{total}đ</Text>
      </View>

      {/* 🛒 NÚT THANH TOÁN */}
      <TouchableOpacity style={styles.btn} onPress={handleCheckout}>
        <Text style={styles.btnText}>Xác nhận đặt hàng</Text>
      </TouchableOpacity>
      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ff6699",
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 10,
  },

  img: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },

  price: {
    color: "#ff6600",
    fontWeight: "bold",
  },

  totalBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
  },

  totalText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  totalPrice: {
    fontSize: 16,
    color: "#ff3333",
    fontWeight: "bold",
  },

  btn: {
    marginTop: 15,
    backgroundColor: "#ff6699",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  input: {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 10,
  padding: 10,
  marginBottom: 10,
  backgroundColor: "#fff",
  },
  paymentItem: {
  flexDirection: "row",
  justifyContent: "space-between",
  padding: 12,
  borderWidth: 1,
  borderColor: "#eee",
  borderRadius: 10,
  marginBottom: 10,
  },
});