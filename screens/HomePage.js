import React from "react";
import { StyleSheet, Button, View, Text, Alert } from "react-native";

const Separator = () => <View style={styles.separator} />;

const HomePage = () => (
  
  <View style={styles.btn}>
    <Text style={styles.title}>
      In order to proceed you have to be logged-in
    </Text>
    <Button
      title="Login"
      onPress={() => Alert.alert("Simple Button pressed")}
    />
    <Separator />

    <Button
      title="Register"
      onPress={() => Alert.alert("Simple Button pressed")}
    />
  </View>
);
export default HomePage;

const styles = StyleSheet.create({
  title: {
    color: "#ffff",
    textAlign: "center",
    marginBottom: 40,
  },

  btn: {
    width: "50%",
  },

  separator: {
    marginVertical: 20,
    borderBottomColor: "#ffff",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
