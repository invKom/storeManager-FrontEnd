import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HomePage from "../screens/HomePage.js";
import LoginPage from "../screens/Login.js";
import RegisterPage from "../screens/Register.js";
import ScanningPage from "../screens/ScanningPage.js";

import Header from "../Shared/Header.js";

const myScreens = {
  Home: {
    screen: HomePage,
    navigationOptions: {
      headerTitle: () => <Header />,
    },
  },
  Login: {
    screen: LoginPage,
  },

  Register: {
    screen: RegisterPage,
  },

  Scanning: {
    screen: ScanningPage,
  },
};

const myStack = createStackNavigator(myScreens, {
  defaultNavigationOptions: {
    headerStyle: { backgroundColor: "white" },
  },
});
const myNavigator = createAppContainer(myStack);
export default myNavigator;
