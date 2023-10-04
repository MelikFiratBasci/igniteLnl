/* eslint-disable react/jsx-key */
import React, { useCallback, useContext, useRef, useState } from "react"
import { View, TouchableOpacity, ViewStyle, ActivityIndicator, TextStyle, Button, FlatList } from "react-native"
import SearchBar from "../../components/SearchBar"
import { useEffect } from "react"
import { colors, spacing, typography } from "../../theme"
import { useNavigation } from "@react-navigation/native"
import { useDispatch, useSelector } from "react-redux"
import { changeAssetSearchTerm, resetAssets } from "../../store/index"
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

import ProductAnimatedFlatList from "../../components/ProductAnimatedFlatList"
import { fetchAssets } from "../../store/actions"
import { Context as AuthContext } from "../../context/AuthContext"
import AssetAnimatedFlatList from "../../components/AssetAnimatedFlatList"

const AssetScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const authContext = useContext(AuthContext)
  const accessToken = authContext.state.accessToken

  const assetsSelector = (state) => state.assets.assets
  const searchTermSelector = (state) => state.assets.searchTerm
  const selectedItems = useSelector((state) => state.assets.assets.filter((item) => item.isSelected))

  const filteredAssetsSelector = createSelector(
    [assetsSelector, searchTermSelector],
    (assets, searchTerm) => {
      return assets.filter(
        (asset) =>
          asset.id.toLowerCase().includes(searchTerm.toLowerCase())) || asset.name.toLowerCase().includes(searchTerm.toLowerCase())
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

  const getAssets = async () => {
    try {
      setLoading(true)
      dispatch(resetAssets())
      await dispatch(fetchAssets(accessToken))
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }


  useEffect(() => {
    getAssets()
  }, [dispatch])

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
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContainer}>
      <View style={{ flex: 1, gap: spacing.md }}>
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: spacing.md,
          gap: spacing.md,
          marginTop: spacing.md,
        }}>
          <Icon icon="menu" onPress={toggleDrawer} />
          <Text style={[$name, { flex: 1 }]} preset="header" text="Assets" />
          <Text style={[$name, { marginRight: spacing.md }]} preset="header" text={selectedItems.length.toString()} />
          <TouchableOpacity onPress={() => {
            setIsSearchFormVisible(!isSearchFormVisible)
          }}>
            <Text style={[$name, { marginRight: spacing.md }]} preset="header"
                  text={isSearchFormVisible ? "İptal" : "Seç"} />
          </TouchableOpacity>

        </View>
        <SearchBar onSearch={handleSearch} searchTerm={searchTerm} />
        {loading ? (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator size="large" color={colors.tint} />
          </View>
        ) : (
          <View style={$contentContainer}>
            <AssetAnimatedFlatList // Animasyonlu FlatList kullanımı
              isSearchFormVisible={isSearchFormVisible}
              data={filteredAssets}
              loading={loading}
              isRefreshing={isRefreshing}
              onRefresh={() => {
                setIsRefreshing(true)
                getAssets().then(r =>
                  console.log("refreshed")
                )
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