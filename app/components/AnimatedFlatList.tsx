import React from "react"
import {
  View,
  TouchableOpacity,
  ViewStyle,
  RefreshControl,
  ActivityIndicator,
  Image,
} from "react-native"
import { Text } from "./Text"
import Animated, {
  Easing,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { colors, spacing } from "../theme"
import { useDispatch } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { Card } from "./Card"

interface Item {
  id: number
  title: string
  image?: string
  price?: number
  qrcode?: string
}

interface AnimatedFlatListProps {
  data: Item[]
  loading: boolean
  isRefreshing: boolean
  onRefresh: () => void
  onSearch: (searchTerm: string) => void
  onItemPress: (item: Item) => void
  translateY: Animated.SharedValue<number>
  scrollHandler: ReturnType<typeof useAnimatedScrollHandler>
  headerText: string
}

const AnimatedFlatList: React.FC<AnimatedFlatListProps> = ({
  data,
  loading,
  isRefreshing,
  onRefresh,
  onSearch,
  translateY,
  scrollHandler,
  onItemPress,
  headerText,
}) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

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
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={1}
                delayPressIn={100}
                onPress={() => onItemPress(item)}
              >
                <Card
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
                              source={{ uri: item.image }}
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
            )}
          />
        </View>
      )}
    </View>
  )
}

export default AnimatedFlatList

const $contentContainer: ViewStyle = {
  flex: 1,
  gap: spacing.md,
}
