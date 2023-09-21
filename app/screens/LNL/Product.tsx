/* eslint-disable react/jsx-key */
import React, { useRef, useState } from "react"
import { Card } from "../../components"
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ViewStyle,
  RefreshControl,
  ActivityIndicator,
  Platform, Dimensions, ImageStyle,
} from "react-native"
import SearchBar from "./SearchBar"
import { useEffect } from "react"
import { colors, spacing } from "../../theme"
import { NavigationContainer, useNavigation } from "@react-navigation/native"
import { useDispatch, useSelector } from "react-redux"
import { addProduct, changeSearchTerm, resetProducts } from "../../store/index"
import { ListItem, Screen, Text } from "../../components"
import { createSelector } from "@reduxjs/toolkit"
import { AntDesign } from "@expo/vector-icons"
import Animated, {
  Easing,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import Toast from "react-native-toast-message"
import { DrawerLayout, DrawerState } from "react-native-gesture-handler"
import { DrawerIconButton } from "../DemoShowroomScreen/DrawerIconButton"
import { isRTL } from "../../i18n"
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle"
import drawerNavigator from "../../navigators/DrawerNavigator"
import DrawerNavigator from "../../navigators/DrawerNavigator"
import * as Demos from "../DemoShowroomScreen/demos"

const Product = () => {

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const productsSelector = (state) => state.products.products
  const searchTermSelector = (state) => state.products.searchTerm

  const filteredProductsSelector = createSelector(
    [productsSelector, searchTermSelector],
    (products, searchTerm) => {
      return products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.qrcode.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    },
  )

  const filteredProducts = useSelector(filteredProductsSelector)

  const searchTerm = useSelector((state: any) => state.products.searchTerm)
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
      if (
        lastContentOffset.value > event.contentOffset.y &&
        isScrolling.value
      ) {
        translateY.value = 0
        console.log("scrolling up")
      } else if (
        lastContentOffset.value < event.contentOffset.y &&
        isScrolling.value
      ) {
        translateY.value = 100
        console.log("scrolling down")
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

  const getProducts = async () => {
    try {
      setLoading(true)
      dispatch(resetProducts())


      const response = await fetch("https://fakestoreapi.com/products")
      const json = await response.json()

      const simplifiedProducts = json.map((product) => ({
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        qrcode: generateRandomString(8),
      }))

      dispatch(addProduct(simplifiedProducts))
      setLoading(false)

//      setSearchResults(simplifiedProducts)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  // console.log(products)

  const handleSearch = (searchTerm) => {
    dispatch(changeSearchTerm(searchTerm))

  }

  return (

    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContainer}>

    <View style={{  flex: 1,  gap: spacing.md  }}>

      <SearchBar onSearch={handleSearch} searchTerm={searchTerm} />

      {loading ? (

        <View style={{flex:1, alignItems: "center", justifyContent: "center"}}>
          <ActivityIndicator size="large"  color={colors.tint} />
        </View>

      ) : (
        <View style={$contentContainer}>

          <Text style={{backgroundColor:colors.background,borderWidth:1,borderRadius:8,marginHorizontal:spacing.md, textAlign:"center"}} preset="header" text={filteredProducts.length + " products are listed."} />

          <Animated.FlatList

            contentContainerStyle={{ gap: 12, paddingVertical: spacing.md, marginHorizontal: spacing.md, }} onScroll={scrollHandler} scrollEventThrottle={16}
            keyboardDismissMode="on-drag"
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={() => {
                  setIsRefreshing(true)
                  getProducts()
                  setIsRefreshing(false)
                }}

              />
            }
            showsVerticalScrollIndicator={false} data={filteredProducts}
            keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={1}
              delayPressIn={100}
              onPress={() => {
                // Ürün detay sayfasına yönlendirme işlemi
                navigation.navigate("ProductDetail", { item })
              }}
            >
              <Card ContentComponent={

                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                  <View style={{ gap: 16 }}>

                    <Text preset="default" text={item.title} />

                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                      <Image
                        source={{ uri: item.image }}
                        resizeMode="contain" // ya da "contain" veya "stretch"
                        style={{ width: 100, height: 100, borderRadius: 16 }}
                      />
                      <Text size="lg" preset="subheading" text={"$" + item.price} />
                    </View>

                    <Text preset="formHelper" text={"Product Code: " + item.qrcode} />

                  </View>

                </View>
              }
              />
            </TouchableOpacity>
          )}
          />


          <Animated.View style={[$action, addButtonStyle]}>
            <TouchableOpacity onPress={() => {
              navigation.navigate("ProductAdd") }}
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


export default Product

const $action: ViewStyle = {

  alignItems: "center",
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 16,


}

const $contentContainer: ViewStyle = {
  flex:1,
  gap: spacing.md
}

const $screenContainer: ViewStyle = {
  flex: 1,

}
const $drawer: ViewStyle = {
  backgroundColor: colors.background,
  flex: 1,
}
const $logoImage: ImageStyle = {
  height: 150,
  width: 150,
}
const $flatListContentContainer: ViewStyle = {
  paddingHorizontal: spacing.lg,
}

const $logoContainer: ViewStyle = {
  alignSelf: "flex-start",
  justifyContent: "center",
  height: 56,
  paddingHorizontal: spacing.lg,
}


// @demo remove-file
