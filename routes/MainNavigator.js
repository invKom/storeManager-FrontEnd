import React, { useContext } from "react";
import { myContext } from "../Context/myContext";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import SellingPage from "../screens/SellingPage.js";
import AddProduct from "../screens/AddProduct.js";
import UserPage from "../screens/UserPage.js";
import ScanningPage from "../screens/ScanningPage";

import HomePage from "../screens/HomePage.js";
import LoginPage from "../screens/Login.js";
import RegisterPage from "../screens/Register.js";

import Header from "../Shared/Header.js";

import { DrawerContent } from "../Shared/DrawerContent";
import { DrawerContentUser } from "../Shared/DrawerContentUser";
import { Title } from "react-native-paper";

const Drawer = createDrawerNavigator();

export default function MyUserNavigation() {
  const { token } = useContext(myContext);

  return !token ? (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <Drawer.Screen name="Home" component={HomePage} />
        <Drawer.Screen name="Login" component={LoginPage} />
        <Drawer.Screen name="Register" component={RegisterPage} />
      </Drawer.Navigator>
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="User"
        drawerContent={(props) => <DrawerContentUser {...props} />}
      >
        <Drawer.Screen
          name="UserPage"
          component={UserPage}
          options={{ title: "Profile" }}
        />
        <Drawer.Screen
          name="AddProduct"
          component={AddProduct}
          options={{ title: "Add Product" }}
        />
        <Drawer.Screen
          name="SellingPage"
          component={SellingPage}
          options={{ title: "Selling" }}
        />
        <Drawer.Screen
          name="Scanning"
          component={ScanningPage}
          options={{ title: "Code Scanner" }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
