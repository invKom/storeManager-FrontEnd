import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "expo-status-bar";

import MainNavigator from "./routes/UserPageStack";

import ContextProvider from "./Context/myContext.js";

export default function App() {
  return (
    <>
      <ContextProvider>
        <StatusBar style="auto" />
        <MainNavigator />
      </ContextProvider>
    </>
  );
}
