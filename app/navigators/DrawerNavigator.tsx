import React from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { ScreensArray, constant } from '../constants/constants';
import {StyleSheet} from "react-native"
import DrawerLNL from "./DrawerLNL"

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {

  return (

    <Drawer.Navigator
      screenOptions={{

        drawerStyle: styles.drawerStyles,
      }}
      drawerContent={(props) => <DrawerLNL {...props} />}
    >
      {ScreensArray.map((item, index) => (
        <Drawer.Screen key={index} name={item.route} component={item.component}

                       options={{
                         item,

                       }}/> ))}
    </Drawer.Navigator>
  )
}


const styles = StyleSheet.create({
    drawerStyles: {width: "80%", backgroundColor: "transparent"},
  }
)

export default DrawerNavigator
