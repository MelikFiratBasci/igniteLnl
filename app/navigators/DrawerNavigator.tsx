import React, { useState } from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { ScreensArray, constant } from "../constants/constants"
import { StyleSheet } from "react-native"
import DrawerLNL from "./DrawerLNL"
import { DrawerStackNavigator } from "./DrawerStackNavigator"
import ProductScreen from "../screens/LNL/ProductScreen"
import { createStackNavigator } from "@react-navigation/stack"
import ProductDetail from "../screens/LNL/ProductDetail"
import ProductAdd from "../screens/LNL/ProductAdd"
import AssetAdd from "../screens/LNL/AssetAdd"
import AssetDetail from "../screens/LNL/AssetDetail"

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

const DrawerNavigator = () => {
  return (

    <Drawer.Navigator
      screenOptions={{
        drawerStyle: styles.drawerStyles,
        headerShown: false,

      }}

      drawerContent={(props) => <DrawerLNL {...props} />}

    >
      {ScreensArray.map((item, index) => (
          <Drawer.Screen key={index} name={item.route} component={item.component}
                         options={{
                           item,
                         }} />)

      )}

      {ScreensArray.map((item) => (
      item.hasOwnProperty("subMenu") ? item.subMenu.map((subItem, subIndex) => (
        <Drawer.Screen key={subIndex} name={subItem.route} component={subItem.component}
                        options={{
                          subItem,
                        }}
       />)) : null
      ))}


    </Drawer.Navigator>
  )
}


const styles = StyleSheet.create({
    drawerStyles: { width: "80%", backgroundColor: "transparent" },
  },
)

export default DrawerNavigator