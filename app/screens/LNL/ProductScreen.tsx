/* eslint-disable react/jsx-key */
import React, { useState } from "react"
import { View, TouchableOpacity, ViewStyle, ActivityIndicator } from "react-native"
import SearchBar from "../../components/SearchBar"
import { useEffect } from "react"
import { colors, spacing } from "../../theme"
import { useNavigation } from "@react-navigation/native" // Eksik import ekledik
import { useDispatch, useSelector } from "react-redux"
import { addProduct, changeSearchTerm, resetProducts } from "../../store/index"
import { Screen } from "../../components"
import { createSelector } from "@reduxjs/toolkit"
import { AntDesign } from "@expo/vector-icons"
import Animated, {
  Easing,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"

import AnimatedFlatList from "../../components/AnimatedFlatList" // Eksik import ekledik

const ProductScreen = () => {
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

  const onItemPress = (item) => {
    navigation.navigate("ProductDetail", { item })
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContainer}>
      <View style={{ flex: 1, gap: spacing.md }}>
        <SearchBar onSearch={handleSearch} searchTerm={searchTerm} />

        {loading ? (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator size="large" color={colors.tint} />
          </View>
        ) : (
          <View style={$contentContainer}>
            <AnimatedFlatList // Animasyonlu FlatList kullanımı
              data={filteredProducts}
              loading={loading}
              isRefreshing={isRefreshing}
              onRefresh={() => {
                setIsRefreshing(true)
                getProducts()
                setIsRefreshing(false)
              }}
              onSearch={handleSearch}
              translateY={translateY}
              scrollHandler={scrollHandler}
              onItemPress={onItemPress} // onItemPress işlevini ilettik
              headerText="Products are Listed"
            />

            <Animated.View style={[$action, addButtonStyle]}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ProductAdd")
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

export default ProductScreen

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
