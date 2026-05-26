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

  const [messages, setMessages] = useState<any[]>(([
    {
      role: "bot",
      text: "🐶 Xin chào! Mình là trợ lý CutePets. Bạn cần tư vấn gì cho thú cưng?",
    },
  ]));

  const sendMessage = async () => {

    if (!message.trim()) return;

    // tin nhắn user
    const userMessage = {
      role: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {

      const prompt = `
Bạn là chatbot tư vấn bán đồ thú cưng của shop CutePets.

Hãy:
- trả lời thân thiện
- ngắn gọn
- có icon chó mèo
- tư vấn đồ cho thú cưng

Khách hỏi:
${message}
`;

      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyBZHd3thS3I7ZdRaC7RCHl5JBVyeJx9-uU",
        {
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }
      );

      const botText =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text
        || "🐾 Mình chưa trả lời được.";

      const botMessage = {
        role: "bot",
        text: botText,
      };

      setMessages((prev) => [...prev, botMessage]);

    } catch (error: any) {

      console.log("LOI:", error.response?.data || error.message);

      const botMessage = {
        role: "bot",
        text: "⚠️ Chatbot đang bận, thử lại sau nhé!",
      };

      setMessages((prev) => [...prev, botMessage]);
    }

    setMessage("");
  };

  return (

    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >

      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            🐶 CutePets AI Assistant
          </Text>
        </View>

        {/* CHAT */}
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingBottom: 120,
          }}
          renderItem={({ item }) => (

            <View
              style={[
                styles.message,
                item.role === "user"
                  ? styles.userMessage
                  : styles.botMessage,
              ]}
            >
              <Text style={styles.messageText}>
                {item.text}
              </Text>
            </View>

          )}
        />

        {/* INPUT */}
        <View style={styles.inputContainer}>

          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Nhập câu hỏi về thú cưng..."
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.sendBtn}
            onPress={sendMessage}
          >
            <Text style={styles.sendText}>
              Gửi
            </Text>
          </TouchableOpacity>

        </View>

      </View>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff5f8",
  },

  header: {
    backgroundColor: "#ff6699",
    paddingTop: 50,
    paddingBottom: 15,
    alignItems: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  message: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 15,
    marginVertical: 6,
    marginHorizontal: 10,
  },

  userMessage: {
    backgroundColor: "#ffd6e7",
    alignSelf: "flex-end",
  },

  botMessage: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#ffe0eb",
  },

  messageText: {
    fontSize: 15,
    color: "#333",
  },

  inputContainer: {

    position: "absolute",

    bottom: 0,

    left: 0,

    right: 0,

    flexDirection: "row",

    alignItems: "center",

    padding: 10,

    paddingBottom: Platform.OS === "android" ? 25 : 10,

    backgroundColor: "#fff",

    borderTopWidth: 1,

    borderTopColor: "#eee",
  },

  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ffd6e7",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  sendBtn: {
    backgroundColor: "#ff6699",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 25,
    marginLeft: 10,
  },

  sendText: {
    color: "#fff",
    fontWeight: "bold",
  },

});