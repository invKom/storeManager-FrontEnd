import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Alert,
} from "react-native";

import Navigator from "./routes/myRoutes.js";

import ContextProvider from "./Context/myContext.js";

export default function App() {
  return (
    <>
      <ContextProvider>
        <StatusBar style="auto" />
        <Navigator />
      </ContextProvider>
    </>
  );
}
