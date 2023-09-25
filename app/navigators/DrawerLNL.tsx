import { Alert, Image, LayoutAnimation, StyleSheet, TouchableOpacity, View } from "react-native"
import React, { useState } from "react"
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer"
import { colors, spacing, themeColors } from "../theme"
import { Text } from "../components/Text"
import Icon from "../components/Icons"
import { AntDesign, MaterialIcons } from "@expo/vector-icons"
import { DemoDivider } from "../screens/DemoShowroomScreen/DemoDivider"
import { constant } from "../constants/constants"
import { Entypo } from "@expo/vector-icons"
import { useStores } from "../models"


const DrawerItem = ({
                      label,
                      onPress,
                      tabBarTestID,
                      type,
                      name,
                      activeItemColor,
                      color,
                      subMenu,
                      iconColor,
                      openSubMenu,
                      onSubMenuPress,
                      isFocused,
                    }) => {

  const [subMenuIndex, setSubMenuIndex] = useState(subMenu && subMenu.length > 0 ? subMenu.findIndex((item) => item.active) : -1)

  // if there is a subMenu, onPress will be handled by onSubMenuPress
  return (


    LayoutAnimation.configureNext(LayoutAnimation.create(100, "easeInEaseOut", "opacity")),


      <TouchableOpacity
        onPress={subMenu && subMenu.length > 0 ? onSubMenuPress : onPress}
        testID={tabBarTestID}
        activeOpacity={subMenu && subMenu.length > 0 ? 1 : 0.8}
        accessibilityRole="button"
        style={{ backgroundColor: activeItemColor, borderRadius: spacing.xs, marginBottom: spacing.sm }}
      >
        <View style={[styles.drawerItem]}>
          <Icon type={type} name={name} style={{ marginRight: spacing.md }} color={iconColor}></Icon>
          <Text style={{ color, flex: 1, fontWeight: '700' }} preset="heading" size="sm">{label} </Text>
          {subMenu && subMenu.length > 0 && (
            <MaterialIcons style={{ color }} name={openSubMenu ? "arrow-drop-up" : "arrow-drop-down"} size={24} />
          )}
        </View>
        {openSubMenu && subMenu && subMenu.length > 0 && (
          <View style={{
            flex: 1,
            left: 36,
            padding: spacing.sm,
            borderRadius: spacing.xs,
            backgroundColor: themeColors.sidebar.menuItemBgActive,
            marginRight: spacing.xxl,
            marginBottom: spacing.sm,
          }}>
            {subMenu.map((item, index) => {
              const isFocusedSubMenu = subMenuIndex === index
              const color = isFocused ? colors.text : colors.textDim
              const backgroundColor = isFocused && isFocusedSubMenu ? themeColors.primaryAlt : themeColors.sidebar.menuItemBgActive

              return (
                <TouchableOpacity
                  style={{ marginBottom: spacing.sm, padding: spacing.xs, backgroundColor, borderRadius: spacing.sm }}
                  key={index} onPress={() => {

                  onPress(item.route)
                  setSubMenuIndex(index)

                  console.log("subMenuIndex", subMenuIndex)
                  // then close subMenu

                }
                }>
                  <Text preset="subheading" size="xs" style={{ color }}>{item.label}</Text>

                </TouchableOpacity>
              )
            })}
          </View>
        )}
      </TouchableOpacity>
  )
}


const DrawerLNL = (props) => {

  const {
    authenticationStore: { logout },
  } = useStores()

  const { state, descriptors, navigation } = props
  const [openSubMenu, setOpenSubMenu] = useState(null)



  return (
    <View style={styles.container}>
      {/*header*/}

      <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate("Profile")}>

        <View style={[styles.header, styles.view]}>
          <Image source={require("./../../assets/images/avatar.png")} style={styles.avatar} />
          <View style={styles.textContainer}>
            <Text preset="heading" size="md">İlker Tuna TUZCU</Text>
            <Text preset="subheading" size="xxs">Software Engineer</Text>
          </View>

        </View>
      </TouchableOpacity>

      {/*drawerList Item*/}
      <DrawerContentScrollView {...props}  contentContainerStyle={{paddingTop:0}} style={[styles.view]}>

        {state.routes.map((route, i) => {

          const isFocused = state.index === i
          const { options } = descriptors[route.key]


          const onSubMenuPress = (subMenuIndex) => {
            if (openSubMenu === subMenuIndex) {
              setOpenSubMenu(null) // Sub menüyü kapat
            } else {
              setOpenSubMenu(subMenuIndex) // Yeni bir sub menüyü aç
            }
          }

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
              isFocused={isFocused}
              openSubMenu={openSubMenu === i} // Sub menü açık mı?
              onSubMenuPress={() => onSubMenuPress(i)} // Sub menüyü aç/kapat

            />)
        })}

      </DrawerContentScrollView>

      {/*footer*/}
      <View style={[styles.footer, styles.view]}>
        <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
          <Image source={require("./../../assets/images/logo192.png")} style={styles.logo} resizeMode="contain" />
          <Image source={require("./../../assets/images/logoAyanet.png")} style={[styles.logo,{marginLeft: spacing.sm}]} resizeMode="contain" />
          <View style={styles.footerView}>
            <Entypo name="language" size={24} color={colors.textDim} />

            <TouchableOpacity
              onPress={() => {
                Alert.alert(

                  'Çıkış Yap',
                  'Çıkış yapmak istediğinize emin misiniz?',
                  [
                    {
                      text: 'İptal',
                      style: 'cancel',
                    },
                    {
                      text: 'Çıkış Yap',
                      onPress: () => {
                        logout();
                      },
                    },
                  ],
                  { cancelable: false }
                );
              }}
            >
              <MaterialIcons style={{ marginLeft: spacing.sm }} name="logout" size={24} color={colors.textDim} />
            </TouchableOpacity>
          </View>
        </View>
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
      padding: spacing.sm,

    },
    header: {
      paddingTop: spacing.xl,
      padding: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.background,
      flexDirection: "row",
      alignItems: "center",

    },

    footer: {
      height: 64,
      borderTopWidth: 1,
      borderTopColor: colors.background,


    },
    drawerItem: {

      alignItems: "center",
      flexDirection: "row",
      padding: spacing.xs,
      borderRadius: 8,


    },
    textContainer: {
      paddingHorizontal: constant.SPACING,
    },
    avatar: {
      width: 48,
      height: 48,
    },
    logo: {
      width: "100%",
      height: "100%",
      flex: 1,

    },
    footerView: {

      flexDirection: "row",
      alignItems: "center",
      flex: 3,
      justifyContent: "flex-end",
    },
    headerImage: {},
  },
)


export default DrawerLNL