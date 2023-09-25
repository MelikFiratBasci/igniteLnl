import HomeScreen from "../screens/LNL/HomeScreen"
import ProductScreen from "../screens/LNL/ProductScreen"
import { AntDesign, Entypo, FontAwesome, FontAwesome5 } from "@expo/vector-icons"
import { colors } from "../theme"
import { Icons } from "../components/Icons"
import Feather from "react-native-vector-icons/Feather"
import DepartmentScreen from "../screens/LNL/DepartmentScreen"
import WarningScreen from "../screens/LNL/WarningScreen"

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
  { route: 'Product', label: "Product", type:FontAwesome, icon: 'product-hunt', component: ProductScreen, subMenu: [
      { route: 'Product', label: "Product", type:FontAwesome, icon: 'product-hunt', component: ProductScreen},
    ]},
  { route: 'Departments', label: "Departments", type: FontAwesome, icon: 'users', component: DepartmentScreen},
  { route: 'Warnings', label: "Warnings", type: Entypo, icon: 'warning', component: WarningScreen},

];

