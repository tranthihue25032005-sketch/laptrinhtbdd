import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";

export default function DetailScreen({ route }: any) {
  const { imdbID } = route.params; // nhận id
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=886c2bf`)
      .then(res => res.json())
      .then(data => setMovie(data))
      .catch(err => console.log(err));
  }, []);

  if (!movie) return <Text>Loading...</Text>;

  return (
    <ScrollView style={{ padding: 10 }}>
      <Image
        source={{ uri: movie.Poster }}
        style={{ width: "100%", height: 300 }}
      />

      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        {movie.Title}
      </Text>

      <Text>Năm: {movie.Year}</Text>
      <Text>Thể loại: {movie.Genre}</Text>
      <Text>Đạo diễn: {movie.Director}</Text>
      <Text>Diễn viên: {movie.Actors}</Text>

      <Text style={{ marginTop: 10 }}>
        Nội dung: {movie.Plot}
      </Text>
    </ScrollView>
  );
}