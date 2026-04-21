import { 
  View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Alert, ScrollView
} from 'react-native';
import { useState, useContext } from "react";
import { TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thanh Toán</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
      
      {/* 📦 DANH SÁCH SẢN PHẨM */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📦 Sản Phẩm ({items.length})</Text>
        
        <FlatList
          data={items}
          keyExtractor={(item: any) => item.id.toString()}
          scrollEnabled={false}
          renderItem={({ item }: any) => (
            <View style={styles.productCard}>
              <Image source={{ uri: item.image }} style={styles.productImg} />
              
              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.productQty}>Số lượng: {item.quantity}</Text>
                <Text style={styles.productPrice}>{item.price.toLocaleString()}đ</Text>
              </View>
              
              <View style={styles.productTotal}>
                <Text style={styles.totalItemPrice}>
                  {(item.price * item.quantity).toLocaleString()}đ
                </Text>
              </View>
            </View>
          )}
        />
      </View>

      {/* 📍 THÔNG TIN GIAO HÀNG */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📍 Thông Tin Giao Hàng</Text>
        
        <View style={styles.formCard}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Địa chỉ</Text>
            <TextInput
              value={address}
              onChangeText={setAddress}
              placeholder="Nhập địa chỉ giao hàng"
              style={styles.input}
              multiline
              numberOfLines={2}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Số điện thoại</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="Nhập số điện thoại"
              style={styles.input}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.profileLink} onPress={() => navigation.navigate("EditProfile")}>
          <Ionicons name="person-circle-outline" size={16} color="#ff6699" />
          <Text style={styles.profileLinkText}>Sử dụng thông tin hồ sơ</Text>
        </TouchableOpacity>
      </View>

      {/* 💳 PHƯƠNG THỨC THANH TOÁN */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💳 Phương Thức Thanh Toán</Text>
        
        <TouchableOpacity
          style={[
            styles.paymentOption,
            paymentMethod === "COD" && styles.paymentOptionSelected
          ]}
          onPress={() => setPaymentMethod("COD")}
        >
          <View style={styles.paymentIcon}>
            <Ionicons 
              name={paymentMethod === "COD" ? "radio-button-on" : "radio-button-off"} 
              size={20} 
              color={paymentMethod === "COD" ? "#ff6699" : "#ccc"} 
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.paymentName}>Thanh toán khi nhận hàng</Text>
            <Text style={styles.paymentDesc}>Trả tiền khi nhận đơn hàng</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.paymentOption,
            paymentMethod === "MOMO" && styles.paymentOptionSelected
          ]}
          onPress={() => setPaymentMethod("MOMO")}
        >
          <View style={styles.paymentIcon}>
            <Ionicons 
              name={paymentMethod === "MOMO" ? "radio-button-on" : "radio-button-off"} 
              size={20} 
              color={paymentMethod === "MOMO" ? "#ff6699" : "#ccc"} 
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.paymentName}>Ví điện tử MoMo</Text>
            <Text style={styles.paymentDesc}>Thanh toán qua ứng dụng MoMo</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* 💰 TỔNG TIỀN */}
      <View style={styles.totalSection}>
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Tổng cộng:</Text>
          <Text style={styles.totalAmount}>{total.toLocaleString()}đ</Text>
        </View>
      </View>

      </ScrollView>

      {/* 🛒 NÚT THANH TOÁN */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
          <Ionicons name="bag-check-outline" size={20} color="#fff" />
          <Text style={styles.checkoutBtnText}>Đặt Hàng Ngay</Text>
        </TouchableOpacity>
      </View>

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

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
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
    color: '#ff6699',
    marginBottom: 12,
  },

  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
    alignItems: 'center',
  },

  productImg: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },

  productInfo: {
    flex: 1,
  },

  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },

  productQty: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },

  productPrice: {
    fontSize: 13,
    color: '#ff6699',
    fontWeight: '600',
  },

  productTotal: {
    alignItems: 'flex-end',
  },

  totalItemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ff6699',
  },

  formCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  inputGroup: {
    marginBottom: 12,
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#fafafa',
    color: '#333',
  },

  profileLink: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 102, 153, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },

  profileLinkText: {
    color: '#ff6699',
    fontWeight: '600',
    marginLeft: 8,
  },

  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  paymentOptionSelected: {
    borderColor: '#ff6699',
    backgroundColor: 'rgba(255, 102, 153, 0.05)',
  },

  paymentIcon: {
    marginRight: 12,
  },

  paymentName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },

  paymentDesc: {
    fontSize: 12,
    color: '#999',
  },

  totalSection: {
    marginBottom: 20,
  },

  totalCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
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
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },

  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff6699',
  },

  bottomBar: {
    padding: 15,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },

  checkoutBtn: {
    backgroundColor: '#ff6699',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#ff6699',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  checkoutBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
});