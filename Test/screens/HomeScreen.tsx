import { View, Text, StyleSheet, TextInput, Image, FlatList, ScrollView } from "react-native";
import products from "../data/products.json";
import { useState, useRef, useContext  } from "react";
import { AuthContext } from "../context/AuthContext";
import { TouchableOpacity,  Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";



export default function HomeScreen({ navigation }: any) {
  const [showMenu, setShowMenu] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  //Logic lọc
  const removeVietnameseTones = (str: string) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

  //tách riêng chó/mèo
  const dogProducts = products.filter((p: any) => p.type === "dog");
   
  const catProducts = products.filter((p: any) => p.type === "cat");

  //lọc hàng mới
  const newProducts = products.filter((p: any) => p.isNew === true);
  
  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.trim() === "") {
      setSuggestions([]);
      setIsSearching(false);
      return;
    }

  // Lọc danh sách sản phẩm khớp với chữ đang gõ
  const search = removeVietnameseTones(text.toLowerCase());
  const keywords = search.split(" ").filter(word => word);

  const results = products.filter((p: any) => {
      const name = removeVietnameseTones(p.name.toLowerCase());
      return keywords.every(word => name.includes(word));
    });

    setSuggestions(results);
    setIsSearching(true); // Đang trong chế độ tìm kiếm
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

      {/* SEARCH BAR GIỐNG SHOPEE */}
        <View style={styles.searchRow}>
          {isSearching && (
            <TouchableOpacity onPress={() => { setIsSearching(false); setSearchText(""); }}>
              <Ionicons name="arrow-back" size={24} color="#ff6699" />
            </TouchableOpacity>
          )}
          
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Tìm kiếm sản phẩm..."
              style={styles.searchInput}
              value={searchText}
              onChangeText={handleSearch}
              onSubmitEditing={() => Keyboard.dismiss()} // Nhấn Enter để đóng phím
            />
            {searchText !== "" && (
              <TouchableOpacity onPress={() => { setSearchText(""); setSuggestions([]); setIsSearching(false); }}>
                <Ionicons name="close-circle" size={18} color="#ccc" />
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.searchButton} onPress={() => Keyboard.dismiss()}>
              <Ionicons name="search" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
 
      
</View>
  
  {/* FLATLIST CHÍNH: Hiển thị sản phẩm */}
      <FlatList
        data={isSearching ? suggestions : selectedCategory === null ? products : selectedCategory === 'new' ? newProducts : selectedCategory === 'dog' ? dogProducts : selectedCategory === 'cat' ? catProducts : newProducts} // Nếu tìm kiếm thì hiện list lọc, ko thì hiện theo category
        numColumns={2}
        keyExtractor={(item: any) => item.id.toString()}
        ListHeaderComponent={
          !isSearching ? (
            <>
              
              {/* DANH MỤC SẢN PHẨM Ở ĐÂY */}
              <View style={styles.menuHeader}>
                <Text style={styles.title}>DANH MỤC SẢN PHẨM</Text>
                <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
                  <Text style={styles.menuIcon}>☰</Text>
                </TouchableOpacity>
              </View>
              
              {/* ... DropdownMenu ... */}
              {showMenu && (
                <View style={styles.dropdownMenu}>
                  
                  <TouchableOpacity style={styles.menuItem} onPress={() => { setSelectedCategory(null); setShowMenu(false); }}>
                    <Text>🏠 Tất cả</Text>
                    <Ionicons name="chevron-forward" size={16} color="#333" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.menuItem} onPress={() => { setSelectedCategory('new'); setShowMenu(false); }}>
                    <Text>🔥 Sản phẩm mới</Text>
                    <Ionicons name="chevron-forward" size={16} color="#333" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.menuItem} onPress={() => { setSelectedCategory('dog'); setShowMenu(false); }}>
                    <Text>🐶 Dành cho chó</Text>
                    <Ionicons name="chevron-forward" size={16} color="#333" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.menuItem} onPress={() => { setSelectedCategory('cat'); setShowMenu(false); }}>
                    <Text>🐱 Dành cho mèo</Text>
                    <Ionicons name="chevron-forward" size={16} color="#333" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.menuItem}>
                    <Text>🦴 Dây dắt, phụ kiện</Text>
                    <Ionicons name="chevron-forward" size={16} color="#333" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.menuItem}>
                    <Text>👕 Quần áo</Text>
                    <Ionicons name="chevron-forward" size={16} color="#333" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.menuItem}>
                    <Text>🥣 Bát, bình chứa</Text>
                    <Ionicons name="chevron-forward" size={16} color="#333" />
                  </TouchableOpacity>

                </View>
                )}
                <Image source={require("../assets/banner.png")} style={styles.banner} />
              {selectedCategory === 'new' ? <Text style={styles.title}>Sản Phẩm Mới</Text> :
              selectedCategory === 'dog' ? <Text style={styles.title}>Dành Cho Chó</Text> :
              selectedCategory === 'cat' ? <Text style={styles.title}>Dành Cho Mèo</Text> :
              <Text style={styles.title}>Hàng Mới Về</Text>}
              
            </>
          ) : (
            <Text style={styles.title}>Kết quả cho: "{searchText}"</Text>
          )
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
      {/*  THÔNG TIN */}
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
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 4, // Shopee dùng bo góc ít hơn
    borderWidth: 1.5,
    borderColor: "#ff6699", // Màu chủ đạo của bạn
    height: 40,
    overflow: "hidden",
  },
  searchInput: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 14,
  },
  searchButton: {
    backgroundColor: "#ff6699",
    height: "100%",
    width: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  suggestionBox: {
    //position: "absolute",
    top: 120, // Chỉnh sao cho nó khớp ngay dưới thanh search
    left: 0,
    right: 0,
    bottom: 0, // Kéo dài xuống hết màn hình như Shopee
    backgroundColor: "#fff",
    zIndex: 999,
  },
  suggestionItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  suggestionText: {
    fontSize: 15,
    color: "#333",
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