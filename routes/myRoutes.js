import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HomePage from "../screens/HomePage.js";
import LoginPage from "../screens/Login.js";
import RegisterPage from "../screens/Register.js";
import ScanningPage from "../screens/ScanningPage.js";

const myScreens = {
  Home: {
    screen: HomePage,
  },
  Login: {
    screen: LoginPage,
  },

  Register: {
    screen: RegisterPage,
  },
};

const myStack = createStackNavigator(myScreens);
const myNavigator = createAppContainer(myStack);
export default myNavigator;
