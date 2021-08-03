import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Alert,
} from "react-native";

import Navigator from "./routes/myRoutes.js";

export default function App() {
  return (
    <>
      <SafeAreaView style={styles.container}>
        {/* <StatusBar style="auto" /> */}
        <View style={styles.intro}>
          <Text style={styles.header}> InvKom </Text>
        </View>

      </SafeAreaView>
          <Navigator />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  intro: {
    alignItems: "center",
    marginBottom: 90,
  },
  header: {
    color: "#ffff",
    fontSize: 40,
    marginVertical: 10,
  },
});
