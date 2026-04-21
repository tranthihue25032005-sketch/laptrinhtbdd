import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function OrderDetailScreen({ route, navigation }: any) {
  const { order } = route.params;

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
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Chi Tiết Đơn Hàng</Text>
        <View style={{ width: 30 }} /> {/* Spacer */}
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        
        {/* ORDER INFO */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 Thông Tin Đơn Hàng</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>🆔</Text>
              <Text style={styles.infoLabel}>Mã đơn:</Text>
              <Text style={styles.infoValue}>#{order.id}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>📅</Text>
              <Text style={styles.infoLabel}>Ngày đặt:</Text>
              <Text style={styles.infoValue}>{order.date}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>📞</Text>
              <Text style={styles.infoLabel}>SĐT:</Text>
              <Text style={styles.infoValue}>{order.phone}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>📍</Text>
              <Text style={styles.infoLabel}>Địa chỉ:</Text>
              <Text style={styles.infoValue}>{order.address}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>💳</Text>
              <Text style={styles.infoLabel}>Thanh toán:</Text>
              <Text style={styles.infoValue}>{order.paymentMethod}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>🚚</Text>
              <Text style={styles.infoLabel}>Trạng thái:</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '20' }]}>
                <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
                  {order.status}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* PRODUCTS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📦 Sản Phẩm ({order.items.length})</Text>
          
          <FlatList
            data={order.items}
            keyExtractor={(item: any) => item.id.toString()}
            scrollEnabled={false}
            renderItem={({ item }: any) => (
              <View style={styles.productCard}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
                  <Text style={styles.productQuantity}>Số lượng: {item.quantity}</Text>
                  <Text style={styles.productPrice}>{item.price.toLocaleString()}đ</Text>
                </View>
                
                <View style={styles.productTotal}>
                  <Text style={styles.productTotalText}>
                    {(item.price * item.quantity).toLocaleString()}đ
                  </Text>
                </View>
              </View>
            )}
          />
        </View>

        {/* TOTAL */}
        <View style={styles.totalSection}>
          <View style={styles.totalCard}>
            <Text style={styles.totalLabel}>Tổng cộng:</Text>
            <Text style={styles.totalAmount}>{order.total.toLocaleString()}đ</Text>
          </View>
        </View>

      </ScrollView>
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

  scrollContainer: {
    flex: 1,
    padding: 15,
  },

  section: {
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },

  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  infoIcon: {
    fontSize: 16,
    width: 24,
    textAlign: 'center',
  },

  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    width: 70,
  },

  infoValue: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
    flex: 1,
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },

  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },

  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },

  productInfo: {
    flex: 1,
  },

  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },

  productQuantity: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },

  productPrice: {
    fontSize: 14,
    color: '#ff6699',
    fontWeight: '500',
  },

  productTotal: {
    alignItems: 'flex-end',
  },

  productTotalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff6699',
  },

  totalSection: {
    marginTop: 10,
    marginBottom: 30,
  },

  totalCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },

  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff6699',
  },
});