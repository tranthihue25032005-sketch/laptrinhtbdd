import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function RegisterScreen({ navigation }: any) {
  const { register } = useContext(AuthContext);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!fullName || !email || !phone || !password) {
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
        <Text style={styles.title}>Đăng Ký Tài Khoản</Text>
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
          <Text style={styles.subtitle}>Tạo tài khoản mới</Text>
        </View>

        {/* FORM CARD */}
        <View style={styles.formCard}>
          
          {/* FULL NAME */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>👤 Họ và tên</Text>
            <TextInput
              placeholder="Nhập họ và tên đầy đủ"
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

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

          {/* PHONE */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>📞 Số điện thoại</Text>
            <TextInput
              placeholder="Nhập số điện thoại"
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
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

        {/* REGISTER BUTTON */}
        <TouchableOpacity 
          style={styles.registerBtn}
          onPress={handleRegister}
          activeOpacity={0.8}
        >
          <Text style={styles.registerText}>🎉 Đăng Ký Ngay</Text>
        </TouchableOpacity>

        {/* LOGIN LINK */}
        <TouchableOpacity 
          style={styles.loginContainer}
          onPress={() => navigation.navigate('Login')}
        >
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={styles.loginText}>Đã có tài khoản? </Text>
            <Text style={styles.loginLink}>Đăng nhập</Text>
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

  registerBtn: {
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

  registerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  loginContainer: {
    alignItems: 'center',
  },

  loginText: {
    fontSize: 14,
    color: '#666',
  },

  loginLink: {
    color: '#ff6699',
    fontWeight: 'bold',
  },
});