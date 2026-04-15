import { View, Text, StyleSheet, TextInput, Image, FlatList, ScrollView } from "react-native";
import products from "../data/products.json";
import { useState,  useEffect, useRef, useContext  } from "react";
import { AuthContext } from "../context/AuthContext";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableWithoutFeedback, Keyboard } from "react-native";


export default function HomeScreen({ navigation }: any) {
  const [showMenu, setShowMenu] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAllDog, setShowAllDog] = useState(false);//xem tất cả ở chó
  const [showAllCat, setShowAllCat] = useState(false);//ở mèo
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  useEffect(() => {
  const loadHistory = async () => {
    const history = await AsyncStorage.getItem("searchHistory");
    if (history) setSearchHistory(JSON.parse(history));
  };
  loadHistory();
  }, []);
  const dogProducts = products.filter((p: any) =>
        p.name.toLowerCase().includes("chó")
      );
   
    const listRef = useRef<any>(null);
    const scrollToDog = () => {
      setShowMenu(false);
      listRef.current?.scrollToOffset({
        offset: 700,
        animated: true,
      });
    };

    const scrollToCat = () => {
      setShowMenu(false);
      listRef.current?.scrollToOffset({
        offset: 1100,
        animated: true,
      });
    };
  const catProducts = products.filter((p: any) =>
        p.name.toLowerCase().includes("mèo")
      );
  const [searchText, setSearchText] = useState("");//
  const removeVietnameseTones = (str: string) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};
  const filteredProducts = products.filter((p: any) => {
  const name = removeVietnameseTones(p.name.toLowerCase());
  const search = removeVietnameseTones(searchText.toLowerCase());

  const keywords = search.split(" "); // tách từng từ

  return keywords.every(word => name.includes(word));
});
  const handleSearch = async (text: string) => {
  setSearchText(text);

  if (text.trim() === "") return;

  let newHistory = [text, ...searchHistory.filter(i => i !== text)];
  newHistory = newHistory.slice(0, 5); // tối đa 5 cái

  setSearchHistory(newHistory);
  await AsyncStorage.setItem("searchHistory", JSON.stringify(newHistory));
};

  return (
    <View style={styles.container}>
      
      <View style={styles.topSection}>
      {/* HEADER */}
      <View style={styles.header}>
  <Text style={styles.logo}>🐶 CutePets</Text>
  

  {/* Icon user */}
  <TouchableOpacity 
  style={styles.userContainer}
  onPress={() => {
    if (user) {
      setShowUserMenu(!showUserMenu);
    } else {
      navigation.navigate("Login");
    }
  }}
>
  <View style={styles.iconCircle}>
    <Ionicons name="person-outline" size={20} color="#fff" />
  </View>
</TouchableOpacity>

{showUserMenu && (
  <View style={styles.userMenu}>
    
    {/* 🆕 Đơn hàng */}
    <TouchableOpacity 
      style={styles.userMenuItem}
      onPress={() => {
        setShowUserMenu(false);
        navigation.navigate("Orders");
      }}
    >
      <Text> Đơn hàng</Text>
      </TouchableOpacity>
    <TouchableOpacity 
      style={styles.userMenuItem}
      onPress={() => {
        setShowUserMenu(false);
        navigation.navigate("Profile");
      }}
    >
      <Text> Hồ sơ</Text>
    </TouchableOpacity>

    <TouchableOpacity 
      style={styles.userMenuItem}
      onPress={async () => {
        setShowUserMenu(false);
        await logout();
        
        navigation.navigate("Home");
      }}
    >
      <Text> Đăng xuất</Text>
    </TouchableOpacity>

  </View>
)}

  {/* Icon giỏ hàng (đẹp hơn) */}
  <TouchableOpacity 
  style={styles.bagContainer} 
  onPress={() => navigation.navigate("Cart")}
    >
    
    <Ionicons name="bag-outline" size={24} color="#ff6699" />
  </TouchableOpacity>
</View>

      {/* SEARCH */}
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
        setShowHistory(false);
      }}>
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#999" style={styles.searchIcon} />
        
       <TextInput
          placeholder="Tìm kiếm sản phẩm..."
          style={styles.searchInput}
          value={searchText}
          onChangeText={handleSearch}
          onFocus={() => setShowHistory(true)}
        />
      </View>
      </TouchableWithoutFeedback>
      {showHistory && searchHistory.length > 0 && (
          <View style={styles.historyBox}>
            {searchHistory.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.historyItem}
                onPress={() => {
                  setSearchText(item);
                  setShowHistory(false);
                }}
              >
                <Text>🔍 {item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )} 

      
      {/* DANH MỤC */}
      {/* HEADER DANH MỤC */}
<View style={styles.menuHeader}>
  <Text style={styles.title}>DANH MỤC SẢN PHẨM</Text>

  <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
    <Text style={styles.menuIcon}>☰</Text>
  </TouchableOpacity>
</View>

{/* MENU XỔ XUỐNG */}
{showMenu && (
  <View style={styles.dropdownMenu}>
    
    <TouchableOpacity style={styles.menuItem}>
      <Text>🔥 Sản phẩm mới</Text>
      <Text>›</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.menuItem}
      
       onPress={scrollToDog}
    
  >
      <Text>🐶 Dành cho chó</Text>
      <Text>›</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.menuItem}
    onPress={scrollToCat}>
      <Text>🐱 Dành cho mèo</Text>
      <Text>›</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.menuItem}>
      <Text>🦴 Dây dắt, phụ kiện</Text>
      <Text>›</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.menuItem}>
      <Text>👕 Quần áo</Text>
      <Text>›</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.menuItem}>
      <Text>🥣 Bát, bình chứa</Text>
      <Text>›</Text>
    </TouchableOpacity>

  </View>
  )}
</View>
  <FlatList
    ref={listRef}
    data={filteredProducts}
    numColumns={2}
    keyExtractor={(item: any) => item.id.toString()}
    ListHeaderComponent={
            <>
    {/* BANNER */}

            <Image
              source={require("../assets/banner.png")}
              style={styles.banner}
            />
            <Text style={styles.title}>Hàng Mới Về</Text>
          </>
        }
  renderItem={({ item }: any) => (
    <TouchableOpacity 
  style={styles.card}
  onPress={() => navigation.navigate("Products", { product: item })}
>
  
      <Image source={{ uri: item.image }} style={styles.img} />
      <Text numberOfLines={2}>{item.name}</Text>
      <Text style={styles.price}>{item.price.toLocaleString()}đ</Text>
      </TouchableOpacity>
    
    
  )}

  ListFooterComponent={
    searchText === "" ? (
    <>
      {/* 🐶 DÀNH CHO CHÓ */}
      <View style={styles.rowBetween}>
        <Text style={styles.title}>🐶 Dành cho chó</Text>
        <TouchableOpacity onPress={() => setShowAllDog(!showAllDog)}>
          <Text style={styles.seeAll}>
            {showAllDog ? "Thu gọn" : "Xem tất cả"}
          </Text>
        </TouchableOpacity>
      </View>
      

      <FlatList
        data={showAllDog ? dogProducts : dogProducts.slice(0, 4)}
        numColumns={2}
        scrollEnabled={false}//vì flat trong flat nên dùng này để tránh lỗi 
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => (

          <TouchableOpacity
            style={styles.smallCard}
            onPress={() =>
              navigation.navigate("Products", { product: item })
            }
          >
            <Image source={{ uri: item.image }} style={styles.smallImg} />
            <Text numberOfLines={1}>{item.name}</Text>
            <Text style={styles.price}>{item.price.toLocaleString()}đ</Text>
          </TouchableOpacity>

        )}
      />

      {/* 🐱 DÀNH CHO MÈO */}
      <View style={styles.rowBetween}>
        <Text style={styles.title}>🐱 Dành cho mèo</Text>
        <TouchableOpacity onPress={() => setShowAllCat(!showAllCat)}>
          <Text style={styles.seeAll}>
            {showAllCat ? "Thu gọn" : "Xem tất cả"}
          </Text>
        </TouchableOpacity>
      </View>
     
      <FlatList
        data={showAllCat ? catProducts : catProducts.slice(0, 4)}
        numColumns={2}
        scrollEnabled={false}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => (
          <TouchableOpacity
            style={styles.smallCard}
            onPress={() =>
              navigation.navigate("Products", { product: item })
            }
          >
            <Image source={{ uri: item.image }} style={styles.smallImg} />
            <Text numberOfLines={1}>{item.name}</Text>
            <Text style={styles.price}>{item.price.toLocaleString() }đ</Text>
          </TouchableOpacity>
        )}
      />

      {/* 📍 THÔNG TIN */}
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>📍 Địa chỉ</Text>
        <Text>Nam Định, Việt Nam</Text>

        <Text style={styles.footerTitle}>📞 Hotline</Text>
        <Text>0337 498 433</Text>

        <Text style={styles.footerTitle}>📧 Liên hệ</Text>
        <Text>xuandungg2601@gmail.com</Text>
      </View>
    </>
    ):null
  }
/>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  topSection: {
  backgroundColor: "#e6fffd", 
  padding: 10,
  borderRadius: 15,
  marginBottom: 10,
},
 header: {
  justifyContent: "center", // ✅ căn giữa
  alignItems: "center",
  marginBottom: 10,
  position: "relative",
},

logo: {
  fontSize: 22,
  fontWeight: "bold",
  color: "#ff6699",
},

bagContainer: {
  position: "absolute",
  right: 0,   // ✅ nằm bên phải
},

bag: {
  fontSize: 22,
},
userContainer: {
  position: "absolute",
  right: 40,
},

userMenu: {
  position: "absolute",
  top: 60,
  right: 10,
  backgroundColor: "#fff",
  borderRadius: 10,
  padding: 10,
  elevation: 5,
  zIndex: 100,
},

userMenuItem: {
  paddingVertical: 10,
  paddingHorizontal: 15,
},
iconCircle: {
  backgroundColor: "#ff6699",
  padding: 8,
  borderRadius: 20,
},

//css tìm kiếm
  searchContainer: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#fff",
  borderRadius: 25,
  paddingHorizontal: 15,
  paddingVertical: 8,
  borderWidth: 1,
  borderColor: "#eee",
  elevation: 2,
  marginBottom: 10,
},

searchIcon: {
  marginRight: 8,
},

searchInput: {
  flex: 1,
  fontSize: 14,
},

historyBox: {
  backgroundColor: "#fff",
  borderRadius: 10,
  padding: 10,
  marginBottom: 10,
  elevation: 3,
},

historyItem: {
  paddingVertical: 8,
  borderBottomWidth: 1,
  borderBottomColor: "#eee",
},

//
  banner: {
    //backgroundColor: yellow,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: "center",
  },
  title: {
    fontWeight: "bold",
    marginVertical: 10,
    color: "#ff6699",
  },
  category: {
    backgroundColor: "#ffc0cb",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  card: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
  img: {
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  price: {
    color: "orange",
    fontWeight: "bold",
  },
  menuHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},

menuIcon: {
  fontSize: 24,
  padding: 5,
},
dropdownMenu: {
  backgroundColor: "#fff",
  borderRadius: 10,
  marginBottom: 10,
  elevation: 5, // Android shadow
},

menuItem: {
  flexDirection: "row",
  justifyContent: "space-between",
  padding: 12,
  borderBottomWidth: 1,
  borderBottomColor: "#eee",
},
smallCard: {
  flex: 1,
  backgroundColor: "#f5f5f5",
  margin: 5,
  padding: 10,
  borderRadius: 10,
},

smallImg: {
  height: 100,
  borderRadius: 10,
  marginBottom: 5,
},

//
rowBetween: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},

seeAll: {
  color: "#007bff",
  fontSize: 14,
},

//

footer: {
  marginTop: 20,
  padding: 15,
  backgroundColor: "#ffe6f0",
  borderRadius: 10,
},

footerTitle: {
  fontWeight: "bold",
  marginTop: 10,
  color: "#ff6699",
},

});