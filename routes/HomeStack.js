import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

import HomePage from "../screens/HomePage.js";
import LoginPage from "../screens/Login.js";
import RegisterPage from "../screens/Register.js";

import Header from "../Shared/Header.js";
import UserPage from "../screens/UserPage.js";

const Stack = createStackNavigator();

export default function MyHomeNavigation() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Register" component={RegisterPage} />
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="UserPage" component={UserPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
