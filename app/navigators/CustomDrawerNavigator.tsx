import {
  Image,
  LayoutAnimation,
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native"
import React, { useState } from "react"
import { constant, drawerMenu } from "../constants/constants"
import { DrawerNavigationState, ParamListBase, useNavigation } from "@react-navigation/native"
import { DrawerItemList } from "@react-navigation/drawer"
import { DrawerDescriptorMap, DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types"
import { colors, spacing, themeColors } from "../theme"
import Icon from "../components/Icons"
import { MaterialIcons } from "@expo/vector-icons"


import { Text } from "../components/Text"

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

type Props = {
  state: DrawerNavigationState<ParamListBase>;
  navigation: DrawerNavigationHelpers;
  descriptors: DrawerDescriptorMap;
};





const CustomDrawerNavigator = (props: Props) => {
  const navigation = useNavigation()
  const [menuIndex, setMenuIndex] = useState(-1)
  const [subM, setSubM] = useState(-1)

  const [openItems, setOpenItems] = useState(Array(drawerMenu.length).fill(false));
  return (
    <View>
      {/* profile header */}
      <TouchableNativeFeedback onPress={() => navigation.navigate("Profile")}>
        <View style={styles.header}>
          <Image source={require("./../../assets/images/avatar.png")} style={styles.avatar} />
          <View style={styles.textContainer}>
            <Text preset="heading" size="md">İlker Tuna TUZCU</Text>
            <Text preset="subheading" size="xxs">Software Engineer</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
      {/* DrawerList */}
      <DrawerItemList {...props}/>
      {/*<View style={styles.spacer} />*/}
      {/* Menu */}
      {drawerMenu.map((item, index) => {
        const isDropDown = openItems[index];
        return (
          <TouchableOpacity activeOpacity={0.8} key={index}
                            style={[styles.menu, { backgroundColor: colors.transparent }]}
                            onPress={() => {
                              // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
                              LayoutAnimation.configureNext(LayoutAnimation.create(200, "easeInEaseOut", "opacity"))
                              const newOpenItems = Array(drawerMenu.length).fill(false);
                              newOpenItems[index] = !isDropDown;
                              setOpenItems(newOpenItems);
                              setMenuIndex(menuIndex === index ? -1 : index)

                            }}>
            <View style={{
              backgroundColor: menuIndex=== index ? themeColors.sidebar.menuItemBgActive : colors.transparent,
              marginHorizontal: spacing.xs,
              padding: spacing.xs,
              flexDirection: "row",
              justifyContent: "space-between",

            }}>
              <View style={{ flexDirection: "row",
                alignItems: "center" }}>
                <Icon style={{ marginLeft: 1, color: menuIndex === index ? themeColors.sidebar.menuItemColor: colors.textDim }} type={item.type} name={item.icon} size={24}/>
                <Text preset="heading" size="sm" style={{ paddingLeft: spacing.md,
                  color: menuIndex === index ? colors.text : colors.textDim,
                }}>{item.title}</Text>
              </View>
              {isDropDown && menuIndex === index ? <MaterialIcons name="arrow-drop-down" size={24} color="black" /> : <MaterialIcons name="arrow-right" size={24} color="black" />}
            </View>
            {menuIndex === index && <View style={{ borderRadius: 4, left: 24, marginRight: 24 }}>
              {item.menuList.map((subMenu, index) => (
                <TouchableNativeFeedback key={index} onPress={()=>{
                  setSubM(subM === index ? -1 : index)

                  console.log(subMenu.route)
                  navigation.navigate(subMenu.route)
                }}>
                  <View style={{ backgroundColor: subM === index ? themeColors.sidebar.menuItemBgActive : colors.transparent,
                    borderRadius: 4,
                    marginVertical: constant.SPACING / 5,
                    marginHorizontal: constant.SPACING / 2,
                    paddingHorizontal: constant.SPACING,
                    paddingVertical: constant.SPACING / 1.5,}}>
                    <Text>{subMenu.title}</Text>
                  </View>
                </TouchableNativeFeedback>
              ))}
            </View>}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

  export default CustomDrawerNavigator

  const styles = StyleSheet.create({
    textContainer: {
      paddingHorizontal: constant.SPACING,
    },
    avatar: {
      width: 50,
      height: 50,
    },
    header: {
      padding: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.background,
      flexDirection: "row",
      alignItems: "center",
      marginTop: spacing.md,

    },
    name: {
      fontSize: constant.titleFontSize,
    },
    menu: {},
    item: {
      paddingHorizontal: constant.SPACING / 5,
      paddingVertical: constant.SPACING / 1.2,
    },
    text: {
      fontWeight: "bold",
      fontSize: constant.textFontSize,
      paddingHorizontal: constant.SPACING,
    },
    subMenu: {

      marginVertical: constant.SPACING / 5,
      marginHorizontal: constant.SPACING / 2,
      paddingHorizontal: constant.SPACING,
      paddingVertical: constant.SPACING / 1.5,
    },
    spacer: {
      marginVertical: constant.SPACING,
      width: "90%",
      height: 1,
      alignSelf: "center",
    },
  })