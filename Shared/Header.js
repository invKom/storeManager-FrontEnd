import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { alignItems } from "styled-system";

export default function Header() {
  return (
    <View style={myStyles.header}>
      <AntDesign name="isv" size={40} color="black" />
      <Text style={myStyles.title}>InvKom</Text>
    </View>
  );
}

const myStyles = StyleSheet.create({
  header: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
