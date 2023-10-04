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
import { updateAssetIsSelected, updateIsSelected } from "../store"
import { useDispatch, useSelector } from "react-redux"
import { createSelector } from "@reduxjs/toolkit"
import { CheckBox } from "react-native-elements"

interface Item {
  id: number;
  name: string;
  updatedTime?: string;
  epc: string;
  qrCode: string;
  image?: string;
  detailedName: string
  serialNo: string
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


  console.log("dataASDFSADASD\n", data)

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
                <Text style={{flex:1}} preset="subheading" size="sm" text={item.name} />
                {isSearchFormVisible &&
                <CheckBox checked={item.isSelected} onPress={() => {
                  dispatch(updateAssetIsSelected(item.id))}
                } /> }
              </View>
            }
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


              </View>
            }
            FooterComponent={item.id && (
              <View style={{padding: spacing.xs, gap: spacing.xxs}}>
              <Text preset="formHelper"  text={"detailedName: " + item.detailedName} />
              <Text preset="formHelper" text={"EPC: " + item.epc} />
                <Text preset="formHelper" text={"Seri Numara : " + item.serialNo} />
              <Text preset="formHelper" text={"Güncelleme Zamanı: " + item.updatedTime} />
                <Text preset="formHelper" text={"QR CODE: " + item.qrCode} />
              <Text preset="formHelper" text={"Id: " + item.id} />
              </View>
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
