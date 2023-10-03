import HomeScreen from "../screens/LNL/HomeScreen"
import ProductScreen from "../screens/LNL/ProductScreen"
import { AntDesign, Entypo, FontAwesome, FontAwesome5 } from "@expo/vector-icons"
import { colors } from "../theme"
import { Icons } from "../components/Icons"
import Feather from "react-native-vector-icons/Feather"
import DepartmentScreen from "../screens/LNL/DepartmentScreen"
import WarningScreen from "../screens/LNL/WarningScreen"
import AssetScreen from "../screens/LNL/AssetScreen"
import TestOneScreen from "../screens/LNL/TestOneScreen"
import TestTwoScreen from "../screens/LNL/TestTwoScreen"


export const constant = {
  SPACING: 16,
  borderRadius: 10,
  titleFontSize: 24,
  textFontSize: 16,
  subTextFontSize: 14,
}

export const IconSize = 24

export const ScreensArray = [
  { route: 'Home', label: "Home", type: AntDesign, icon: 'home', component: HomeScreen},
  { route: 'Product', label: "Products and Services", type:FontAwesome, icon: 'product-hunt', component: ProductScreen,
    subMenu: [
      { route: 'ProductScreen',label: "Products", type: FontAwesome, icon: 'product-hunt', component: ProductScreen},
      { route: 'AssetScreen', label: "Assets", type: FontAwesome5, icon: 'box', component: AssetScreen},
    ]},
  { route: 'Departments', label: "Departments", type: FontAwesome, icon: 'users', component: DepartmentScreen},
  { route: 'Warnings', label: "Warnings", type: Entypo, icon: 'warning', component: WarningScreen, subMenu: [
      { route: 'TestOne',label: "TestOne", type: FontAwesome, icon: 'product-hunt', component: TestOneScreen },
      { route: 'TestTwo', label: "TestTwo", type: FontAwesome5, icon: 'box', component: TestTwoScreen},
    ]},

];

