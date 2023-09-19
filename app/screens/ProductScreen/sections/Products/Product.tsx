/* eslint-disable react/jsx-key */
import React, { useState } from "react"
import { Card } from "../../../../components"
import { View, FlatList, Image, TouchableOpacity, ViewStyle, RefreshControl } from "react-native"
import SearchBar from "../../SearchBar"
import { useEffect } from "react"
import { colors, spacing } from "../../../../theme"
import { Text } from "../../../../components"
import { useNavigation } from "@react-navigation/native"
import { useDispatch, useSelector } from "react-redux"
import { addProduct, changeSearchTerm, resetProducts } from "../../../../store/index"
import { createSelector} from "@reduxjs/toolkit"
import { AntDesign } from "@expo/vector-icons"
import Animated, {
  Easing,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import Toast from "react-native-toast-message"

const Product = () => {

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const productsSelector = (state) => state.products.products;
  const searchTermSelector = (state) => state.products.searchTerm;

  const filteredProductsSelector = createSelector(
    [productsSelector, searchTermSelector],
    (products, searchTerm) => {
      return products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.qrcode.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  );

  const filteredProducts = useSelector(filteredProductsSelector)

  const searchTerm = useSelector((state: any ) => state.products.searchTerm)
  const [isRefreshing, setIsRefreshing] = useState(false);

  const lastContentOffset = useSharedValue(0)
  const isScrolling = useSharedValue(false)
  const translateY = useSharedValue(0)


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

      dispatch(resetProducts());


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
    <>

      <SearchBar onSearch={handleSearch} searchTerm={searchTerm} />

      <Text preset="header" text={filteredProducts.length + " product is listed."} />

      <Animated.FlatList
        ListFooterComponent={
          <View style={{ height: 100 }} />

        }
        contentContainerStyle={{ gap: 12}} onScroll={scrollHandler} scrollEventThrottle={16}
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
          navigation.navigate("ProductAdd")}
        }
        >
          <AntDesign name="pluscircle" size={48} color={colors.tint} />
        </TouchableOpacity>
      </Animated.View>


    </>
  )
}

export default Product

const $action: ViewStyle = {

  alignItems: "center",
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 120,


}

// @demo remove-file
