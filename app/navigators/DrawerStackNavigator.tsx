/**
 * The app navigator (formerly "SubMenuNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams, useNavigation, // @demo remove-current-line
} from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React from "react"
import { useColorScheme } from "react-native"
import * as Screens from "app/screens"
import Config from "../config"
import { useStores } from "../models" // @demo remove-current-line
import { DemoNavigator, DemoTabParamList } from "./DemoNavigator" // @demo remove-current-line
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { colors } from "app/theme"
import DrawerNavigator from "./DrawerNavigator"
import Toast from "react-native-toast-message"
import ProductAdd from "../screens/LNL/ProductAdd"
import ProductDetail from "../screens/LNL/ProductDetail"
import AssetAdd from "../screens/LNL/AssetAdd"
import AssetDetail from "../screens/LNL/AssetDetail"
import ProductScreen from "../screens/LNL/ProductScreen"
import AssetScreen from "../screens/LNL/AssetScreen"

export type DrawerStackParamList = {
DrawerNavigator: undefined
  ProductScreen: undefined
  ProductDetail: undefined
  ProductAdd: undefined
  AssetScreen: undefined
  AssetAdd: undefined
  AssetDetail: undefined
}

const exitRoutes = Config.exitRoutes

const Stack = createNativeStackNavigator<DrawerStackParamList>()

const DrawerStack = observer(function DrawerStack() {

  return (

    <Stack.Navigator
      screenOptions={{ headerShown: false, navigationBarColor: colors.background }}
      initialRouteName="DrawerNavigator"
    >
      {/* @demo remove-block-start */}

      <>
        {/* @demo remove-block-end */}
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
        <Stack.Screen name="AssetScreen" component={AssetScreen} />
        <Stack.Screen name="ProductScreen" component={ProductScreen} />


      </>


      {/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
    </Stack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {
}

export const DrawerStackNavigator = observer(function DrawerStackNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (

      <DrawerStack>
      <DrawerNavigator />
      </DrawerStack>

  )
})
