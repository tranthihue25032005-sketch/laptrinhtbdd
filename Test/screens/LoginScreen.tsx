import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen({ navigation }: any) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>

      {/* TITLE */}
      <Text style={styles.title}>🐶 CutePets</Text>
      <Text style={styles.subtitle}>Đăng nhập</Text>

      {/* INPUT */}
      <TextInput
        placeholder="Nhập email..."
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Nhập password..."
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* BUTTON LOGIN */}
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={async () => {
        if (!email || !password) {
          alert("Nhập đầy đủ thông tin");
          return;
        }

        const success = await login(email, password); // ✅ đúng

        if (success) {
          navigation.navigate('Home');
        } else {
          alert("Sai tài khoản hoặc mật khẩu");
        }
      }}
      >
        <Text style={styles.loginText}>Đăng nhập</Text>
      </TouchableOpacity>

      {/* REGISTER */}
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>
          Chưa có tài khoản? Đăng ký
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

  loginBtn: {
    backgroundColor: "#ff6699",
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 15,
  },

  loginText: {
    color: "#fff",
    fontWeight: "bold",
  },

  registerText: {
    textAlign: "center",
    color: "#ff6699",
  },
});