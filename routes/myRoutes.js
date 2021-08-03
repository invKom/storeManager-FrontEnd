import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HomePage from "../screens/HomePage.js";
import LoginPage from "../screens/Login";
import ScanningPage from "../screens/ScanningPage.js";

const myScreens = {
  Home: {
    screen: HomePage,
  },
  Login: {
    screen: LoginPage,
  },
};

const myStack = createStackNavigator(myScreens);
const myNavigator = createAppContainer(myStack);
export default myNavigator;
