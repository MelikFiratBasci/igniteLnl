import { StyleSheet, TouchableOpacity, View } from "react-native"
import React, { useState } from "react"
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer"
import { colors, spacing, themeColors } from "../theme"
import { Text } from "../components/Text"
import Icon from "../components/Icons"
import { MaterialIcons } from "@expo/vector-icons"


const DrawerItem = ({ label, onPress, tabBarTestID, type, name, activeItemColor, color, subMenu, iconColor,openSubMenu,onSubMenuPress }) => {
  // if there is a subMenu, onPress will be handled by onSubMenuPress
  return (
    <TouchableOpacity
      onPress={subMenu && subMenu.length > 0 ? onSubMenuPress : onPress}
      testID={tabBarTestID}
      activeOpacity={subMenu && subMenu.length > 0 ? 1 : 0.8}
      accessibilityRole="button"
      style={{ backgroundColor: activeItemColor, borderRadius: spacing.xs, marginBottom: spacing.sm}}
    >
      <View style={[styles.drawerItem]}>
        <Icon type={type} name={name} style={{ marginRight: spacing.md }}  color={iconColor}></Icon>
        <Text style={{ color, flex: 1 }} preset="heading" size="md">{label}</Text>
        {subMenu && subMenu.length > 0 && (
          <MaterialIcons style={{ color }} name={openSubMenu ? 'arrow-drop-up' : 'arrow-drop-down'}  size={24}/>
        )}
      </View>
      {openSubMenu && subMenu && subMenu.length > 0 && (
        <View style={{ flex: 1, left:32,padding:spacing.sm,borderRadius: spacing.xs, backgroundColor: colors.background, marginRight: spacing.xxl}}>
          {subMenu.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => {
              onPress(item.route)
              // then close subMenu

            }
            }>
              <Text style={{ color }}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </TouchableOpacity>
  )
}

const DrawerLNL = (props) => {

  const { state, descriptors, navigation } = props
  const [openSubMenu, setOpenSubMenu] = useState(null);

  return (
    <View style={styles.container}>
      {/*header*/}
      <View style={[styles.header, styles.view]}>
        <Text preset="heading" size="lg">Header</Text>
      </View>
      {/*drawerList Item*/}
      <DrawerContentScrollView {...props} style={[styles.view]}>
        {state.routes.map((route, i) => {

          const isFocused = state.index === i
          const { options } = descriptors[route.key]

          const onSubMenuPress = (subMenuIndex) => {
            if (openSubMenu === subMenuIndex) {
              setOpenSubMenu(null); // Sub menüyü kapat
            } else {
              setOpenSubMenu(subMenuIndex); // Yeni bir sub menüyü aç
            }
          };

          const onPress = () => {
            const event = navigation.emit({
              type: "drawerPress",
              target: route.key,
              canPreventDefault: true,
            })

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name)
            }
          }
          console.log(options)

          const color = isFocused ? colors.text : colors.textDim
          const iconColor = isFocused ? themeColors.sidebar.menuItemColor : colors.textDim
          const drawerItem = options.item
          const activeItemColor = isFocused ? themeColors.sidebar.menuItemBgActive : null

          return (
            <DrawerItem
              key={i}
              label={drawerItem.label}
              name={drawerItem.icon}
              tabBarTestID={drawerItem.tabBarTestID}
              onPress={onPress}
              type={drawerItem.type}
              subMenu={drawerItem.subMenu}
              color={color}
              iconColor={iconColor}
              activeItemColor={activeItemColor}
              openSubMenu={openSubMenu === i} // Sub menü açık mı?
              onSubMenuPress={() => onSubMenuPress(i)} // Sub menüyü aç/kapat

            /> )
        })}

      </DrawerContentScrollView>

      {/*footer*/}
      <View style={[styles.footer, styles.view]}>
        <Text preset="heading" size="lg">Footer</Text>
      </View>


    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    view: {
      backgroundColor: colors.palette.neutral100,
      borderRadius: 8,
      marginLeft: spacing.xs,
      padding: spacing.md,
    },
    header: {
      marginBottom: spacing.sm,
      marginTop: spacing.xl,
      height: 64,

    },
    footer: {
      height: 64,
      marginVertical: spacing.xs,

    },
    drawerItem: {

      alignItems: "center",
      flexDirection: "row",
      padding: spacing.xs,
      borderRadius: 8,


    },
  },
)

export default DrawerLNL