import { StatusBar } from "expo-status-bar";
import React from "react";
import { NativeBaseProvider } from "native-base";
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
        <StatusBar style="auto" />
        <Navigator />
    </>
  );
}
