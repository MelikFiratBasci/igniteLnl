/* eslint-disable react/jsx-key */
import React, { useCallback, useRef, useState } from "react"
import { View, TouchableOpacity, ViewStyle, ActivityIndicator, TextStyle } from "react-native"
import SearchBar from "../../components/SearchBar"
import { useEffect } from "react"
import { colors, spacing, typography } from "../../theme"
import { useNavigation } from "@react-navigation/native" // Eksik import ekledik
import { useDispatch, useSelector } from "react-redux"
import { addAsset, changeAssetSearchTerm, resetAssets} from "../../store/index"
import { Icon, Screen, Text } from "../../components"
import { createSelector } from "@reduxjs/toolkit"
import { AntDesign } from "@expo/vector-icons"
import Animated, {
  Easing,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,

} from "react-native-reanimated"

import AnimatedFlatList from "../../components/AnimatedFlatList"

const AssetScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const assetsSelector = (state) => state.assets.assets
  const searchTermSelector = (state) => state.assets.searchTerm
  const selectedItems = useSelector((state) => state.assets.assets.filter((item) => item.isSelected))

  const filteredAssetsSelector = createSelector(
    [assetsSelector, searchTermSelector],
    (assets, searchTerm) => {
      return assets.filter(
        (asset) =>
          asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          asset.qrcode.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    },
  )

  const filteredAssets = useSelector(filteredAssetsSelector)


  const searchTerm = useSelector((state: any) => state.assets.searchTerm)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const lastContentOffset = useSharedValue(0)
  const isScrolling = useSharedValue(false)
  const translateY = useSharedValue(0)

  const [loading, setLoading] = useState(false)

  const addButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(translateY.value, {
            duration: 300,
            easing: Easing.inOut(Easing.ease),
          }),
        },
      ],
    }
  })

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      if (lastContentOffset.value > event.contentOffset.y && isScrolling.value) {
        translateY.value = 0
        //console.log("scrolling up")
      } else if (lastContentOffset.value < event.contentOffset.y && isScrolling.value) {
        translateY.value = 100
        // console.log("scrolling down")
      }
      lastContentOffset.value = event.contentOffset.y
    },
    onBeginDrag: (e) => {
      isScrolling.value = true
    },
    onEndDrag: (e) => {
      isScrolling.value = false
    },
  })

  function generateRandomString(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let result = ""

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      result += characters.charAt(randomIndex)
    }

    return result
  }

  const getAssets = async () => {
    try {
      setLoading(true)
      dispatch(resetAssets())

      const response = await fetch("https://fakestoreapi.com/products")
      const json = await response.json()

      const simplifiedAssets = json.map((asset) => ({
        id: asset.id,
        title: asset.title,
        image: asset.image,
        price: asset.price,
        qrcode: generateRandomString(8),
        isSelected: false,

      }))

      dispatch(addAsset(simplifiedAssets))
      setLoading(false)

      //      setSearchResults(simplifiedAssets)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAssets()
  }, [])

  // console.log(assets)

  const handleSearch = (searchTerm) => {
    dispatch(changeAssetSearchTerm(searchTerm))
  }

  const onItemPress = (item) => {
    navigation.navigate("AssetDetail", { item })
  }


  const [open, setOpen] = useState(false)

  const toggleDrawer = () => {

    if (!open) {
      setOpen(true)
      navigation.openDrawer({ speed: 2 })
    } else {
      setOpen(false)

      navigation.closeDrawer({ speed: 2 })
    }
  }

  const [isSearchFormVisible, setIsSearchFormVisible] = useState(false)

  return (
    <Screen  preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContainer}>
      <View style={{ flex: 1, gap: spacing.md }}>
        <View style={{ flexDirection: "row", alignItems:"center", marginLeft: spacing.md, gap: spacing.md, marginTop: spacing.md}}>
          <Icon icon="menu" onPress={toggleDrawer} />
          <Text style={[$name,{flex:1}]} preset="header" text="Assets" />
          <Text style={[$name,{marginRight:spacing.md}]} preset="header" text={selectedItems.length.toString()} />
          <TouchableOpacity onPress={()=>{
            setIsSearchFormVisible(!isSearchFormVisible)
          }}>
            <Text style={[$name,{marginRight:spacing.md}]} preset="header" text={isSearchFormVisible ? "İptal" : "Seç"} />
          </TouchableOpacity>

        </View>
        <SearchBar onSearch={handleSearch} searchTerm={searchTerm} />

        {loading ? (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator size="large" color={colors.tint} />
          </View>
        ) : (
          <View style={$contentContainer}>
            <AnimatedFlatList // Animasyonlu FlatList kullanımı
              isSearchFormVisible={isSearchFormVisible}
              data={filteredAssets}
              loading={loading}
              isRefreshing={isRefreshing}
              onRefresh={() => {
                setIsRefreshing(true)
                getAssets()
                setIsRefreshing(false)
              }}
              onItemPress={onItemPress}
              onSearch={handleSearch}
              translateY={translateY}
              scrollHandler={scrollHandler}
              headerText="Assets are Listed"
            />

            <Animated.View style={[$action, addButtonStyle]}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("AssetAdd")
                }}
              >
                <AntDesign name="pluscircle" size={48} color={colors.tint} />
              </TouchableOpacity>
            </Animated.View>
          </View>
        )}
      </View>
    </Screen>
  )
}

export default AssetScreen

const $action: ViewStyle = {
  alignItems: "center",
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 16,
}

const $contentContainer: ViewStyle = {
  flex: 1,
  gap: spacing.md,
}

const $screenContainer: ViewStyle = {
  flex: 1,
}

const $name: TextStyle = {
  fontFamily: typography.primary.bold,

}