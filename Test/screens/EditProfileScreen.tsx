import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditProfileScreen({ navigation }: any) {
  const { user, setUser } = useContext(AuthContext);

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");

  const handleSave = async () => {
    const updatedUser = { ...user, fullName, email, phone, address };

    setUser(updatedUser);
    await AsyncStorage.setItem("currentUser", JSON.stringify(updatedUser));
    await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
    alert("Cập nhật thành công!");
    navigation.goBack();
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
        <Text style={styles.title}>Chỉnh Sửa Hồ Sơ</Text>
        <View style={{ width: 30 }} /> {/* Spacer */}
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        
        {/* FORM CARD */}
        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Thông Tin Cá Nhân</Text>

          {/* FULL NAME */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>👤 Họ và tên</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập họ và tên"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          {/* EMAIL */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>📧 Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* PHONE */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>📞 Số điện thoại</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập số điện thoại"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          {/* ADDRESS */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>🏠 Địa chỉ</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập địa chỉ"
              value={address}
              onChangeText={setAddress}
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        {/* SAVE BUTTON */}
        <TouchableOpacity 
          style={styles.saveBtn}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveText}>💾 Lưu Thay Đổi</Text>
        </TouchableOpacity>

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

  formCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },

  inputContainer: {
    marginBottom: 20,
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
    color: '#333',
  },

  saveBtn: {
    backgroundColor: '#ff6699',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#ff6699',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});