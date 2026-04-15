import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";

const movies = [
  {
    imdbID: "tt0372784",
    Title: "Batman Begins",
    Poster: "https://m.media-amazon.com/images/M/MV5B.jpg"
  },
  {
    imdbID: "tt0468569",
    Title: "The Dark Knight",
    Poster: "https://m.media-amazon.com/images/M/MV5B2.jpg"
  }
];

const MovieListScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.imdbID}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("Detail", {
                imdbID: item.imdbID
              })
            }
          >
            <Image source={{ uri: item.Poster }} style={styles.image} />

            <View style={styles.info}>
              <Text style={styles.title}>{item.Title}</Text>
              <Text style={styles.subtitle}>Click để xem chi tiết</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MovieListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 10
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",

    // shadow (iOS)
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },

    // elevation (Android)
    elevation: 4
  },

  image: {
    width: 100,
    height: 140
  },

  info: {
    flex: 1,
    padding: 10,
    justifyContent: "center"
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5
  },

  subtitle: {
    fontSize: 12,
    color: "gray"
  }
});