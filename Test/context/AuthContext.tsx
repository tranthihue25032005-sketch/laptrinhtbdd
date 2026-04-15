import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);

  // Load user khi mở app
  useEffect(() => {
  const loadUser = async () => {
    const currentUser = await AsyncStorage.getItem("currentUser"); // ✅ đổi key
    if (currentUser) setUser(JSON.parse(currentUser));
  };
  loadUser();
}, []);

  const register = async (user: any) => {
  await AsyncStorage.setItem("user", JSON.stringify(user));
};

  const login = async (email: string, password: string) => {
    const savedUser = await AsyncStorage.getItem("user");

    if (!savedUser) return false;

    const userData = JSON.parse(savedUser);

    if (
      userData.email === email &&
      userData.password === password
    ) {
      setUser(userData);
      await AsyncStorage.setItem("currentUser", JSON.stringify(userData));
      return true;
    }

    return false;
  };

  const logout = async () => {
  await AsyncStorage.removeItem("currentUser"); // ✅ chỉ logout thôi
  setUser(null);
};

  return (
    <AuthContext.Provider value={{ user, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};