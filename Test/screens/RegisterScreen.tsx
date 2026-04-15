import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function RegisterScreen({ navigation }: any) {
  const { register } = useContext(AuthContext);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>

      {/* TITLE */}
      <Text style={styles.title}>🐶 CutePets</Text>
      <Text style={styles.subtitle}>Đăng ký tài khoản</Text>

      
      <TextInput
        placeholder="Nhập họ và tên..."
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        placeholder="Nhập email..."
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Nhập số điện thoại..."
        style={styles.input}
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      {/* INPUT PASSWORD */}
      <TextInput
        placeholder="Nhập password..."
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* BUTTON REGISTER */}
      <TouchableOpacity
        style={styles.registerBtn}
        onPress={async () => {
        if (!fullName || !email || !phone|| !password) {
          Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
          return;
        }

        await register({
          fullName,
          email,
          phone,
          password,
          address: "",
        });

        Alert.alert("Thành công", "Đăng ký thành công!");
        navigation.navigate('Login');
      }}
      >
        <Text style={styles.registerText}>Đăng ký</Text>
      </TouchableOpacity>

      {/* BACK TO LOGIN */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>
          Đã có tài khoản? Đăng nhập
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ff6699",
    marginBottom: 10,
  },

  subtitle: {
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    padding: 12,
    marginBottom: 15,
  },

  registerBtn: {
    backgroundColor: "#ff6699",
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 15,
  },

  registerText: {
    color: "#fff",
    fontWeight: "bold",
  },

  loginLink: {
    textAlign: "center",
    color: "#ff6699",
  },
});