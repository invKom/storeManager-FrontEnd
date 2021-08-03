import React from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

const Login = () => {
  const [number, onChangeText] = React.useState("");

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder="Email"
        keyboardType="default"
      />

      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={number}
        placeholder="Password"
        keyboardType="default"
        type="password"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Login;
