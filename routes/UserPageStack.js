import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import SellingPage from "../screens/SellingPage.js";
import AddProduct from "../screens/AddProduct.js";
import UserPage from "../screens/UserPage.js";

import HomePage from "../screens/HomePage.js";
import LoginPage from "../screens/Login.js";
import RegisterPage from "../screens/Register.js";

import Header from "../Shared/Header.js";

const Drawer = createDrawerNavigator();

export default function MyUserNavigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="UserPage">
        <Drawer.Screen name="Home" component={HomePage} />

        <Drawer.Screen name="UserPage" component={UserPage} />
        <Drawer.Screen name="AddProduct" component={AddProduct} />
        <Drawer.Screen name="SellingPage" component={SellingPage} />
        {/* <Drawer.Screen name="Logout" component={HomePage} /> */}

        <Drawer.Screen name="Login" component={LoginPage} />
        <Drawer.Screen name="Register" component={RegisterPage} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
