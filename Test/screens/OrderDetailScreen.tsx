import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";

export default function OrderDetailScreen({ route }: any) {
  const { order } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chi tiết đơn hàng</Text>

      {/* 📍 THÔNG TIN */}
      <Text>📅 Ngày: {order.date}</Text>
      <Text>📞 SĐT: {order.phone}</Text>
      <Text>📍 Địa chỉ: {order.address}</Text>
      <Text>💳 Thanh toán: {order.paymentMethod}</Text>

      {/* 📦 DANH SÁCH SP */}
      <Text style={styles.subtitle}>Sản phẩm</Text>

      <FlatList
        data={order.items}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.img} />

            <View style={{ flex: 1 }}>
              <Text numberOfLines={1}>{item.name}</Text>
              <Text>Số lượng: {item.quantity}</Text>
            </View>

            <Text>{item.price * item.quantity}đ</Text>
          </View>
        )}
      />

      <Text style={styles.total}>
        Tổng tiền: {order.total.toLocaleString()}đ
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#fff" },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ff6699",
  },

  subtitle: {
    marginTop: 15,
    fontWeight: "bold",
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
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 8,
  },

  total: {
    marginTop: 15,
    fontWeight: "bold",
    color: "#ff3333",
  },
});