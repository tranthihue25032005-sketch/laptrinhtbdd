import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";

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
    <FlatList
      data={movies}
      keyExtractor={(item) => item.imdbID}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Detail", {
              imdbID: item.imdbID
            })
          }
        >
          <Image source={{ uri: item.Poster }} style={{ width: 100, height: 150 }} />
          <Text>{item.Title}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default MovieListScreen;