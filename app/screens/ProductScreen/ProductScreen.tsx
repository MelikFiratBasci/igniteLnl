import { Link, useTheme } from "@react-navigation/native"
import React, { FC, ReactElement, useEffect, useRef, useState } from "react"
import {
  Dimensions,
  FlatList,
  Image,
  ImageStyle,
  Platform, ScrollView, TextStyle, TouchableOpacity,

  View,
  ViewStyle,
} from "react-native"
import { DrawerLayout, DrawerState } from "react-native-gesture-handler"
import {
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { ListItem, Screen, Text } from "../../components"
import { isRTL } from "../../i18n"
import { DemoTabScreenProps } from "../../navigators/DemoNavigator"
import { colors, spacing, themeColors, typography } from "../../theme"
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle"
import * as Demos from "./sections"
import { DrawerIconButton } from "./DrawerIconButton"

const logo = require("../../../assets/images/logo192.png")

export interface Demo {
  name: string
  description: string
  data: ReactElement[]

}

interface DemoListItem {
  item: { name: string; useCases: string[] }
  sectionIndex: number
  handleScroll?: (sectionIndex: number, itemIndex?: number) => void
}

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")

const WebListItem: FC<DemoListItem> = ({ item, sectionIndex }) => {
  const sectionSlug = item.name.toLowerCase()

  return (
    <View>
      <Link to={`/showroom/${sectionSlug}`} style={$menuContainer}>
        <Text preset="bold">{item.name}</Text>
      </Link>
      {item.useCases.map((u) => {
        const itemSlug = slugify(u)

        return (
          <Link key={`section${sectionIndex}-${u}`} to={`/showroom/${sectionSlug}/${itemSlug}`}>
            <Text>{u}</Text>
          </Link>
        )
      })}
    </View>
  )
}

const NativeListItem: FC<DemoListItem> = ({ item, sectionIndex, handleScroll }) => {
  return (
    <View>
      <Text onPress={() => handleScroll(sectionIndex)} preset="bold" style={$menuContainer}>
        {item.name}
      </Text>
      {item.useCases.map((u, index) => (
        <ListItem
          key={`section${sectionIndex}-${u}`}
          onPress={() => handleScroll(sectionIndex, index + 1)}
          text={u}
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
        />
      ))}
    </View>
  )
}

const AyanetListItem = Platform.select({ web: WebListItem, default: NativeListItem })

export const ProductScreen: FC<DemoTabScreenProps<"DemoAsset">> =
  function DemoAssetScreen(_props) {
    const [open, setOpen] = useState(false)
    const timeout = useRef<ReturnType<typeof setTimeout>>()
    const drawerRef = useRef<DrawerLayout>()
    const menuRef = useRef<FlatList>()
    const progress = useSharedValue(0)


    const toggleDrawer = () => {
      if (!open) {
        setOpen(true)
        drawerRef.current?.openDrawer({ speed: 2 })
      } else {
        setOpen(false)
        drawerRef.current?.closeDrawer({ speed: 2 })
      }
    }

    const handleScroll = (sectionIndex: number, itemIndex = 0) => {
      console.log("handleScroll Tıklandı", sectionIndex, itemIndex)
      const selectedSection = Object.values(Demos)[sectionIndex]
      setSelectedSection(selectedSection)

      const selectedItem = selectedSection.data[itemIndex - 1]

      setSelectedItem(selectedItem)

      toggleDrawer()
    }


    useEffect(() => {
      return () => timeout.current && clearTimeout(timeout.current)
    }, [])

    const $drawerInsets = useSafeAreaInsetsStyle(["top"])

    const [selectedSection, setSelectedSection] = useState(Object.values(Demos)[0])
    const [selectedItem, setSelectedItem] = useState<React.ReactNode | null>(null)


    return (
      <DrawerLayout
        ref={drawerRef}
        drawerWidth={Platform.select({ default: 326, web: Dimensions.get("window").width * 0.3 })}
        drawerType={"slide"}
        drawerPosition={isRTL ? "right" : "left"}
        overlayColor={open ? colors.palette.overlay20 : "transparent"}
        onDrawerSlide={(drawerProgress) => {
          progress.value = open ? 1 - drawerProgress : drawerProgress
        }}
        onDrawerStateChanged={(newState: DrawerState, drawerWillShow: boolean) => {
          if (newState === "Settling") {
            progress.value = withTiming(drawerWillShow ? 1 : 0, {
              duration: 250,
            })
            setOpen(drawerWillShow)
          }
        }}
        renderNavigationView={() => (
          <View style={[$drawer, $drawerInsets]}>
            <View style={$logoContainer}>
              <Image source={logo} style={$logoImage} />
            </View>

            <FlatList<{ name: string; useCases: string[] }>
              ref={menuRef}
              contentContainerStyle={$flatListContentContainer}
              data={Object.values(Demos).map((d) => ({
                name: d.name,
                useCases: d.data.map((u) => u.props.name),
              }))}
              keyExtractor={(item) => item.name}
              renderItem={({ item, index: sectionIndex }) => (
                <AyanetListItem {...{ item, sectionIndex, handleScroll }}
                />
              )}
            />
          </View>
        )}
      >
        <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContainer}>
          <View style={{ flexDirection: "row", alignItems: "center"}}>
            <DrawerIconButton onPress={toggleDrawer} {...{ open, progress }} />
            {selectedItem && React.isValidElement(selectedItem) && selectedItem.props.name ? (
              <Text style={$name} preset="header" text={selectedItem.props.name} />
            ) : (
              <Text preset="header" text={selectedSection.name} /> // Başlık yoksa bir varsayılan değer gösterilebilir
            )}
          </View>

          <View style={$sectionListContentContainer}>

              {selectedItem}

          </View>
        </Screen>
      </DrawerLayout>
    )
  }

const $screenContainer: ViewStyle = {
  flex: 1,

}


const $drawer: ViewStyle = {
  backgroundColor: colors.background,
  flex: 1,
}

const $flatListContentContainer: ViewStyle = {
  paddingHorizontal: spacing.lg,
}

const $sectionListContentContainer: ViewStyle = {
  flex: 1,


}

const $name: TextStyle = {
  fontFamily: typography.primary.bold,
}

const $logoImage: ImageStyle = {


  height: 58,
  width: 82,
}

const $logoContainer: ViewStyle = {
  alignSelf: "flex-start",
  justifyContent: "center",
  height: 56,
  paddingHorizontal: spacing.lg,
}

const $menuContainer: ViewStyle = {
  paddingBottom: spacing.xs,
  paddingTop: spacing.lg,
}


// @demo remove-file
