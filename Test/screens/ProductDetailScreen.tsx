import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

export default function ProductDetailScreen({ route, navigation }: any) {
  const { product } = route.params;

  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [quantity, setQuantity] = useState(1);
  const [showFullDesc, setShowFullDesc] = useState(false);
  
  const handleAddToCart = () => {
    if (!user) {
      navigation.navigate("Login");
      return;
    }

    addToCart({ ...product, quantity });
    alert("Đã thêm vào giỏ hàng!");
  };

  const handleBuyNow = () => {
    if (!user) {
      navigation.navigate("Login");
      return;
    }

    navigation.navigate("Checkout", {
    items: [
      {
        ...product,
        quantity: quantity, // hoặc chỉ viết quantity
      },
    ],
  });
  };

  const description =
    product.description ||
    "Sản phẩm chất lượng cao dành cho thú cưng của bạn. An toàn, bền đẹp và được nhiều khách hàng tin dùng.";

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Image source={{ uri: product.image }} style={styles.img} />

        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{product.price.toLocaleString()}đ</Text>
        <Text>Chất liệu: {product.material}</Text>
        <Text>Kích thước: {product.size}</Text>

        {/* MÔ TẢ */}
        <Text style={styles.sectionTitle}>Mô tả</Text>
        <Text numberOfLines={showFullDesc ? undefined : 3}>
          {description}
        </Text>

        <TouchableOpacity onPress={() => setShowFullDesc(!showFullDesc)}>
          <Text style={styles.seeMore}>
            {showFullDesc ? "Thu gọn" : "Xem thêm"}
          </Text>
        </TouchableOpacity>

        {/* SỐ LƯỢNG */}
        <Text style={styles.sectionTitle}>Số lượng</Text>

          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.circleBtn}
              onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            >
              <Text style={styles.btnText}>-</Text>
            </TouchableOpacity>

            <View style={styles.quantityBox}>
              <Text style={styles.qtyText}>{quantity}</Text>
            </View>

            <TouchableOpacity
              style={styles.circleBtn}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Text style={styles.btnText}>+</Text>
            </TouchableOpacity>
          </View>
      </ScrollView>

      {/* THANH NÚT DƯỚI */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.cartBtn} onPress={handleAddToCart}>
          <Text style={{ color: "#fff" }}>Thêm giỏ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buyBtn} onPress={handleBuyNow}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            Mua ngay
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15 },

  img: {
    height: 250,
    borderRadius: 15,
    marginBottom: 10,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },

  price: {
    color: "#ff6600",
    fontSize: 16,
    marginVertical: 10,
  },

  sectionTitle: {
    marginTop: 15,
    fontWeight: "bold",
  },

  seeMore: {
    color: "#007bff",
    marginTop: 5,
  },

  quantityContainer: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 10,
},

circleBtn: {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: "#f2f2f2",
  justifyContent: "center",
  alignItems: "center",
  elevation: 2,
},

btnText: {
  fontSize: 18,
  fontWeight: "bold",
},

quantityBox: {
  marginHorizontal: 15,
  paddingHorizontal: 20,
  paddingVertical: 8,
  borderWidth: 1,
  borderColor: "#ddd",
  borderRadius: 8,
  backgroundColor: "#fff",
},

qtyText: {
  fontSize: 16,
  fontWeight: "bold",
},

  bottomBar: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },

  cartBtn: {
    flex: 1,
    backgroundColor: "#ff9900",
    padding: 15,
    marginRight: 5,
    borderRadius: 10,
    alignItems: "center",
  },

  buyBtn: {
    flex: 1,
    backgroundColor: "#ff3333",
    padding: 15,
    marginLeft: 5,
    borderRadius: 10,
    alignItems: "center",
  },
});