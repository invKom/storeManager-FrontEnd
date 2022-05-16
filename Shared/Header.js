import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

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
