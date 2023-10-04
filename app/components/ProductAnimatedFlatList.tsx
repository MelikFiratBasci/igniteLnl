import React, { useCallback, useState } from "react"
import {
  View,
  TouchableOpacity,
  ViewStyle,
  RefreshControl,
  ActivityIndicator,
  Image, TextInput,
} from "react-native"
import { Text } from "./Text"
import Animated, {
  useAnimatedScrollHandler,
} from "react-native-reanimated"
import { colors, spacing } from "../theme"
import { Card } from "./Card"
import { Toggle } from "./Toggle"
import { updateIsSelected, updateProductIsSelected } from "../store"
import { useDispatch, useSelector } from "react-redux"
import { createSelector } from "@reduxjs/toolkit"
import { CheckBox } from "react-native-elements"



interface Item {
  id: number
  title: string
  image?: string
  price?: number
  qrcode?: string
  isSelected?: boolean
}


interface AnimatedFlatListProps {
  data: Item[]
  loading: boolean
  isRefreshing: boolean
  onRefresh: () => void
  onItemPress: (item: Item) => void
  onSearch: (searchTerm: string) => void
  translateY: Animated.SharedValue<number>
  scrollHandler: ReturnType<typeof useAnimatedScrollHandler>
  headerText: string
  isSearchFormVisible: boolean
}

const ProductAnimatedFlatList: React.FC<AnimatedFlatListProps> = ({
  data,
  loading,
  isRefreshing,
  onRefresh,
  scrollHandler,
  headerText,
  onItemPress,
                                                             isSearchFormVisible

}) => {

  const dispatch = useDispatch()
  const keyExtractor = useCallback((item) => item.id.toString(), [])




  const renderItem = ({ item }) => <TouchableOpacity
          activeOpacity={1}
          delayPressIn={100}
          delayLongPress={1}
          onPress={()=> {
            onItemPress(item)

          }}

        >
          <Card
            HeadingComponent={
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.md}}>
                <Text style={{flex:1}} preset="subheading" size="sm" text={item.title} />
                {isSearchFormVisible &&
                <CheckBox checked={item.isSelected} onPress={() => {
                  dispatch(updateProductIsSelected(item.id))}
                } /> }
              </View>
            }
            heading={item.title}
            ContentComponent={
              <View style={{ gap: 16}}>
                {item.image && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Image
                      source={{ uri: item.image}}
                      resizeMode="contain"
                      style={{ width: 100, height: 100, borderRadius: 16, alignSelf:"center" }}
                    />
                  </View>
                )}
                {item.price && (
                  <Text size="lg" preset="subheading" text={"$" + item.price} />
                )}

              </View>
            }
            FooterComponent={item.qrcode && (
              <Text preset="formHelper" text={"Product Code: " + item.qrcode} />
            )}
          />
        </TouchableOpacity>


  return (
    <View style={{ flex: 1, gap: spacing.md }}>
      {loading ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size="large" color={colors.tint} />
        </View>
      ) : (
        <View style={$contentContainer}>
          <Text
            style={{
              backgroundColor: colors.background,
              borderWidth: 1,
              borderRadius: 8,
              marginHorizontal: spacing.md,
              textAlign: "center",
            }}
            preset="formLabel"
            text={data.length + ` ${headerText}`}
          />

          <Animated.FlatList
            contentContainerStyle={{
              gap: 12,
              paddingVertical: spacing.md,
              marginHorizontal: spacing.md,
            }}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            keyboardDismissMode="on-drag"
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
          />
        </View>
      )}
    </View>
  )
}

export default ProductAnimatedFlatList

const $contentContainer: ViewStyle = {
  flex: 1,
  gap: spacing.md,
}
