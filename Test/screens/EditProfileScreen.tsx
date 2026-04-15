import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
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

  const handleSave =  async() => {
    const updatedUser = { ...user, fullName, email, phone, address, };

    setUser(updatedUser); // 🔥 cập nhật
    await AsyncStorage.setItem(
      "currentUser",
      JSON.stringify(updatedUser)
    ); // 🔥 lưu lại
    await AsyncStorage.setItem("user", JSON.stringify(updatedUser)); //sau khi logout ko quay lại thông tin cũ
    alert("Cập nhật thành công!");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chỉnh sửa thông tin</Text>

      <TextInput
        style={styles.input}
        placeholder="Họ tên"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        value={phone}
        onChangeText={setPhone}
      />

      <TextInput
        style={styles.input}
        placeholder="Địa chỉ"
        value={address}
        onChangeText={setAddress}
      />

      <TouchableOpacity style={styles.btn} onPress={handleSave}>
        <Text style={{ color: "#fff" }}>Lưu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#ff6699",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },

  btn: {
    backgroundColor: "#ff6699",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
});