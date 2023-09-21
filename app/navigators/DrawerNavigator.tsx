import React, { useRef, useState } from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { ScreensArray, constant } from '../constants/constants';
import {StyleSheet} from "react-native"
import DrawerLNL from "./DrawerLNL"

const Drawer = createDrawerNavigator<drawerType>()

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


//     <Drawer.Navigator
//
//       screenOptions={{
//
//
//         headerShown: true,
//         drawerWidth: Platform.select({ default: 326, web: Dimensions.get("window").width * 0.3 }),
//         drawerType: "slide",
//         drawerPosition:isRTL ? "right" : "left",
//         drawerActiveBackgroundColor: themeColors.sidebar.menuItemBgActive,
//         drawerStyle: {
//
//           width: "80%",
//         },
//         overlayColor:colors.palette.overlay20,
//         drawerItemStyle: {
// marginVertical: 4,
//           borderRadius: 8,
//         },
//         drawerActiveTintColor: themeColors.sidebar.menuItemColor,
//         drawerLabelStyle: {
//           marginLeft: -16,
//           color: colors.text,
//           fontSize: 16,
//         },
//
//
//       }}
//       drawerContent={(props) => <CustomDrawerNavigator {...props} />
//     }
//
//     >
//
//       {ScreensArray.map((item, index) => {
//         return (
//           <Drawer.Screen
//             key={index}
//             name={item.route}
//             component={item.component}
//             options={{
//               item,
//               drawerIcon: ({ color, size, focused }) => (
//                 <Icon type={item.type} name={item.icon} size={size} color={color} />
//               )
//             }}
//           />)
//       })}
//     </Drawer.Navigator>

  )
}



const styles = StyleSheet.create({
  drawerStyles: {width: "80%", backgroundColor: "transparent"},
  }
)

export default DrawerNavigator
