import { createStackNavigator } from "@react-navigation/native";
import { createAppContainer } from "@react-navigation/native";
import HomePage from "../screens/HomePage.js";
import ScanningPage from "../screens/ScanningPage.js";

const myScreens = {
  Home: {
    screen: HomePage,
  },
  ScanningPage: {
    screen: ScanningPage,
  },
};

const myStack = createStackNavigator(myScreens);
const myNavigator = createAppContainer(myStack);
export default myNavigator;
