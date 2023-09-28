import React, { useState } from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { ScreensArray, constant } from "../constants/constants"
import { StyleSheet } from "react-native"
import DrawerLNL from "./DrawerLNL"
import { DrawerStackNavigator } from "./DrawerStackNavigator"

const Drawer = createDrawerNavigator()

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
        console.log("ASDASD", item),
          <Drawer.Screen key={index} name={item.route} component={item.component}

                         options={{
                           item,

                         }} />))}
    </Drawer.Navigator>
  )
}


const styles = StyleSheet.create({
    drawerStyles: { width: "80%", backgroundColor: "transparent" },
  },
)

export default DrawerNavigator