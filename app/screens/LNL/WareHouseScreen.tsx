/* eslint-disable react/jsx-key */
import React, { useCallback, useRef, useState } from "react"
import { View, TouchableOpacity, ViewStyle, ActivityIndicator, TextStyle } from "react-native"
import SearchBar from "../../components/SearchBar"
import { useEffect } from "react"
import { colors, spacing, themeColors, typography } from "../../theme"
import { useNavigation } from "@react-navigation/native" // Eksik import ekledik
import { useDispatch, useSelector } from "react-redux"
import { addWareHouse, changeWareHouseSearchTerm, resetWareHouses } from "../../store/index"
import { Icon, Screen, Text } from "../../components"
import { createSelector, current } from "@reduxjs/toolkit"
import { AntDesign } from "@expo/vector-icons"
import Animated, {
  Easing,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"

import WareHouseAnimatedFlatList from "../../components/WareHouseAnimatedFlatList"

const WareHouseScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const wareHousesSelector = (state) => state.wareHouses.wareHouses
  const searchTermSelector = (state) => state.wareHouses.searchTerm
  const selectedItems = useSelector((state) => state.wareHouses.wareHouses.filter((item) => item.isSelected))

  const [scaleValue] = useState(new Animated.Value(1))


  const filteredWareHousesSelector = createSelector(
    [wareHousesSelector, searchTermSelector],
    (wareHouses, searchTerm) => {
      return wareHouses.filter(
        (wareHouse) =>
          wareHouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          wareHouse.barCode.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    },
  )

  const filteredWareHouses = useSelector(filteredWareHousesSelector)

  const searchTerm = useSelector((state: any) => state.wareHouses.searchTerm)
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

  // const getWareHouses = async () => {
  //   try {
  //     setLoading(true)
  //     dispatch(resetWareHouses())
  //
  //     const response = await fetch("https://fakestoreapi.com/wareHouses")
  //     const json = await response.json()
  //
  //     const simplifiedWareHouses = json.map((wareHouse) => ({
  //       id: wareHouse.id,
  //       title: wareHouse.title,
  //       image: wareHouse.image,
  //       price: wareHouse.price,
  //       qrcode: generateRandomString(8),
  //       isSelected: false,
  //
  //     }))
  //
  //     dispatch(addWareHouse(simplifiedWareHouses))
  //     setLoading(false)
  //
  //     //      setSearchResults(simplifiedWareHouses)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // useEffect(() => {
  //   getWareHouses()
  // }, [])

  // console.log(wareHouses)

  const handleSearch = (searchTerm) => {
    dispatch(changeWareHouseSearchTerm(searchTerm))
  }

  const onItemPress = (item) => {
    navigation.navigate("WareHouseDetail", { item })
  }


  const [open, setOpen] = useState(false)

  const toggleDrawer = () => {

    if (!open) {
      console.log("testest")
      try {
        console.log("NAV", navigation)

        navigation.openDrawer({ speed: 2 })
        setOpen(true)

        console.log("testest", open)
      } catch (error) {
        console.error("error", error)
      }
    } else {
      setOpen(false)

      navigation.closeDrawer({ speed: 2 })
    }
    console.log("testest", open)
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
          <TouchableOpacity onPress={toggleDrawer}>
            <Icon icon="menu" />
          </TouchableOpacity>
          <Text style={[$name, { flex: 1 }]} preset="header" text="Ware Houses" />
          {/*<Text style={[$name,{marginRight:spacing.md}]} preset="header" text={selectedItems.length.toString()} />*/}
          {/*<TouchableOpacity onPress={()=>{*/}
          {/*setIsSearchFormVisible(!isSearchFormVisible)*/}
          {/*}}>*/}
          {/*  <Text style={[$name,{marginRight:spacing.md}]} preset="header" text={isSearchFormVisible ? "İptal" : "Seç"} />*/}
          {/*</TouchableOpacity>*/}

        </View>
        {filteredWareHouses.length === 0 ? (
          <TouchableOpacity onPress={() => navigation.navigate("WareHouseAdd")} activeOpacity={0.9} style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            margin: spacing.xl,
            borderRadius: spacing.xxl,
            elevation: 2,
          }}>

            <Text preset="header" size="sm" text="Tap to create new ware house." />
            <Animated.View style={[$actionEmpty]}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("WareHouseAdd")
                }}
              >
                <AntDesign name="pluscircle" size={48} color={colors.tint} />
              </TouchableOpacity>
            </Animated.View>
          </TouchableOpacity>
        ) : (<>
          <SearchBar onSearch={handleSearch} searchTerm={searchTerm} />

          {loading ? (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <ActivityIndicator size="large" color={colors.tint} />
            </View>
          ) : (
            <View style={$contentContainer}>
              <WareHouseAnimatedFlatList // Animasyonlu FlatList kullanımı
                isSearchFormVisible={isSearchFormVisible}
                data={filteredWareHouses}
                loading={loading}
                isRefreshing={isRefreshing}
                onRefresh={() => {
                  setIsRefreshing(true)
                  setIsRefreshing(false)
                }}
                onItemPress={onItemPress}
                onSearch={handleSearch}
                translateY={translateY}
                scrollHandler={scrollHandler}
                headerText="WareHouses are Listed"
              />

              <Animated.View style={[$action, addButtonStyle]}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("WareHouseAdd")
                  }}
                >
                  <AntDesign name="pluscircle" size={48} color={colors.tint} />
                </TouchableOpacity>
              </Animated.View>
            </View>
          )}
        </>)}
      </View>
    </Screen>
  )
}

export default WareHouseScreen

const $action: ViewStyle = {
  alignItems: "center",
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 16,
}

const $actionEmpty: ViewStyle = {

  alignItems: "center",
  position: "absolute",
  left: 0,
  right: 0,
  bottom: -22,

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