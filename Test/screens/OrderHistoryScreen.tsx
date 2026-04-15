import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity 
} from "react-native";
import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";

export default function OrderHistoryScreen({ navigation }: any) {

  // ✅ Đặt đúng chỗ
  const { orders } = useContext(OrderContext);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đã giao":
        return "#28a745";
      case "Đang giao":
        return "#ff9900";
      case "Đã hủy":
        return "#dc3545";
      default:
        return "#333";
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
  <View style={styles.header}>
    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
      <Text style={styles.back}>←</Text>
    </TouchableOpacity>
      <Text style={styles.title}> Lịch sử đơn hàng</Text>
       </View>
      {orders.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Chưa có đơn hàng nào
        </Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item: any) => item.id}
          renderItem={({ item }: any) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("OrderDetail", { order: item })}
            >
              <Text style={styles.orderId}>#{item.id}</Text>
              <Text>📅 {item.date}</Text>
              <Text>📦 {item.items.length} sản phẩm</Text>

              <Text style={styles.total}>
                💰 {item.total.toLocaleString()}đ
              </Text>

              <Text style={{ color: getStatusColor(item.status) }}>
                🚚 {item.status}
              </Text>
            </TouchableOpacity>
          
            
          )}
        />
      )}
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
    marginBottom: 15,
    color: "#ff6699",
  },

  card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },

  orderId: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 5,
  },

  total: {
    marginTop: 5,
    fontWeight: "bold",
    color: "#ff3333",
  },
  header: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 15,
},

back: {
  fontSize: 22,
  marginRight: 10,
  color: "#ff6699",
},
});