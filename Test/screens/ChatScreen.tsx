import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import axios from "axios";

export default function ChatScreen() {

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<any[]>([]);

  const sendMessage = async () => {

    if (!message) return;

    // lưu tin nhắn user
    const userMessage = {
      role: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {

      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyDJUj3zGPQ_YE_hTCyRotaS8C47Pwtf5w4",
        {
          contents: [
            {
              parts: [
                {
                  text: message,
                },
              ],
            },
          ],
        }
      );

      const botText =
        response.data.candidates[0].content.parts[0].text;

      const botMessage = {
        role: "bot",
        text: botText,
      };

      setMessages((prev) => [...prev, botMessage]);

    } catch (error: any) {

  console.log("LOI:", error.response?.data || error.message);

}

    setMessage("");
  };

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : undefined}
  >
    <View style={styles.container}>

      <FlatList
        data={messages}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              item.role === "user"
                ? styles.userMessage
                : styles.botMessage,
            ]}
          >
            <Text>{item.text}</Text>
          </View>
        )}
      />

      <View style={styles.inputContainer}>

        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Nhập tin nhắn..."
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.sendBtn}
          onPress={sendMessage}
        >
          <Text style={{ color: "#fff" }}>Gửi</Text>
        </TouchableOpacity>

      </View>

    </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({

  container: {
  flex: 1,
  padding: 10,
  backgroundColor: "#fff",

  paddingBottom: 0,
},

  message: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },

  userMessage: {
    backgroundColor: "#ffd6e7",
    alignSelf: "flex-end",
  },

  botMessage: {
    backgroundColor: "#eee",
    alignSelf: "flex-start",
  },

  inputContainer: {

  flexDirection: "row",

  alignItems: "center",

  paddingVertical: 10,

  paddingBottom: 40,

  backgroundColor: "#fff",
},

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
  },

  sendBtn: {
    backgroundColor: "#ff6699",
    padding: 10,
    marginLeft: 10,
    borderRadius: 10,
    justifyContent: "center",
  },

});