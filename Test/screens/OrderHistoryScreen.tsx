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
        <TouchableOpacity 
          style={styles.backBtn}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Lịch Sử Đơn Hàng</Text>
        <View style={{ width: 30 }} /> {/* Spacer */}
      </View>

      {/* CONTENT */}
      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>📦</Text>
          <Text style={styles.emptyText}>Chưa có đơn hàng nào</Text>
          <Text style={styles.emptySubtext}>Hãy đặt hàng để xem lịch sử tại đây!</Text>
          <TouchableOpacity 
            style={styles.shopNowBtn}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.shopNowText}>Mua sắm ngay</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item: any) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: any) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("OrderDetail", { order: item })}
              activeOpacity={0.8}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.orderId}>Đơn hàng #{item.id}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                    {item.status}
                  </Text>
                </View>
              </View>

              <View style={styles.cardContent}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoIcon}>📅</Text>
                  <Text style={styles.infoText}>{item.date}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoIcon}>📦</Text>
                  <Text style={styles.infoText}>{item.items.length} sản phẩm</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoIcon}>💰</Text>
                  <Text style={styles.totalAmount}>{item.total.toLocaleString()}đ</Text>
                </View>
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.viewDetailText}>Xem chi tiết →</Text>
              </View>
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
    backgroundColor: '#f8f9fa',
  },

  header: {
    backgroundColor: '#ff6699',
    padding: 15,
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },

  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  backText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    flex: 1,
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
    padding: 15,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingBottom: 10,
  },

  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },

  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  cardContent: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  infoIcon: {
    fontSize: 16,
    width: 24,
    textAlign: 'center',
  },

  infoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },

  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff6699',
    marginLeft: 8,
  },

  cardFooter: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    alignItems: 'flex-end',
  },

  viewDetailText: {
    fontSize: 14,
    color: '#ff6699',
    fontWeight: '500',
  },
});