import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen({ navigation }: any) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Nhập đầy đủ thông tin");
      return;
    }

    const success = await login(email, password);

    if (success) {
      navigation.navigate('Home');
    } else {
      alert("Sai tài khoản hoặc mật khẩu");
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
        <Text style={styles.title}>Đăng Nhập</Text>
        <View style={{ width: 30 }} /> {/* Spacer */}
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        
        {/* LOGO */}
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🐶 CutePets</Text>
          <Text style={styles.subtitle}>Chào mừng bạn quay trở lại</Text>
        </View>

        {/* FORM CARD */}
        <View style={styles.formCard}>
          
          {/* EMAIL */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>📧 Email</Text>
            <TextInput
              placeholder="Nhập địa chỉ email"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* PASSWORD */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>🔒 Mật khẩu</Text>
            <TextInput
              placeholder="Nhập mật khẩu"
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

        </View>

        {/* LOGIN BUTTON */}
        <TouchableOpacity 
          style={styles.loginBtn}
          onPress={handleLogin}
          activeOpacity={0.8}
        >
          <Text style={styles.loginText}>🚀 Đăng Nhập</Text>
        </TouchableOpacity>

        {/* REGISTER LINK */}
        <TouchableOpacity 
          style={styles.registerContainer}
          onPress={() => navigation.navigate('Register')}
        >
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={styles.registerText}>Chưa có tài khoản? </Text>
            <Text style={styles.registerLink}>Đăng ký ngay</Text>
          </View>
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
    padding: 20,
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },

  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ff6699',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: '#666',
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

  loginBtn: {
    backgroundColor: '#ff6699',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#ff6699',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },

  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  registerContainer: {
    alignItems: 'center',
  },

  registerText: {
    fontSize: 14,
    color: '#666',
  },

  registerLink: {
    color: '#ff6699',
    fontWeight: 'bold',
  },
});