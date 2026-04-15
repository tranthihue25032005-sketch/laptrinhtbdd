import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function ProfileScreen({ navigation }: any) {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://ben.com.vn/tin-tuc/wp-content/uploads/2021/12/anh-che-cho-hai-huoc-cho-dien-thoai-4.jpg" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>
          {user?.fullName || "Người dùng"}
        </Text>
      </View>

      {/* INFO BOX */}
      <View style={styles.infoBox}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>
          {user?.email || "Chưa có email"}
        </Text>

        <Text style={styles.label}>Số điện thoại</Text>
        <Text style={styles.value}>
          {user?.phone || "Chưa có SĐT"}
        </Text>
        <Text style={styles.label}>Địa chỉ</Text>
        <Text style={styles.value}>
          {user?.address || "Chưa có địa chỉ"}
        </Text>
      </View>

      {/* BUTTON EDIT */}
      <TouchableOpacity
        style={styles.editBtn}
        onPress={() => navigation.navigate("EditProfile")}
      >
        <Text style={styles.editText}> Chỉnh sửa thông tin</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    backgroundColor: "#ffe6f0",
    alignItems: "center",
    paddingVertical: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "#fff",
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff6699",
  },

  infoBox: {
    marginTop: 30,
    paddingHorizontal: 20,
  },

  label: {
    fontSize: 14,
    color: "#999",
    marginTop: 15,
  },

  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  editBtn: {
    marginTop: 40,
    marginHorizontal: 20,
    backgroundColor: "#ff6699",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
  },

  editText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});