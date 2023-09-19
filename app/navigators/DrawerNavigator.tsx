import React from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { LnlDebugScreen, DemoDebugScreen, DemoCommunityScreen, TesterScreen } from "app/screens"

import { DemoNavigator } from "./DemoNavigator"
import { ProductScreen } from "../screens/ProductScreen/ProductScreen"
type drawerType = {
  Home: undefined
  Debug: undefined
  Community: undefined
  Test: undefined
  ProductScreen: undefined
}
const Drawer = createDrawerNavigator<drawerType>()

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        options={{
          drawerLabel: "Home Screen",
        }}
        component={LnlDebugScreen}
      />
      <Drawer.Screen
        name="Debug"
        options={{
          drawerLabel: "Debug Screen",
        }}
        component={DemoDebugScreen}
      />
      <Drawer.Screen
        name="Community"
        options={{
          drawerLabel: "Community Screen",
        }}
        component={DemoCommunityScreen}
      />
      <Drawer.Screen
        name="Test"
        options={{
          drawerLabel: "Test",
        }}
        component={TesterScreen}
      />
      <Drawer.Screen
        name="ProductScreen"
        options={{
          drawerLabel: "Products and Services",
        }}
        component={ProductScreen}
      />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator
