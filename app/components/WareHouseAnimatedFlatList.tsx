import React, { useCallback } from "react"
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
  useAnimatedScrollHandler,
} from "react-native-reanimated"
import { colors, spacing } from "../theme"
import { Card } from "./Card"
import { updateWareHouseIsSelected } from "../store"
import { useDispatch,  } from "react-redux"
import { CheckBox } from "react-native-elements"
import { StorageUnit } from "../store/slices/storageUnitsSlice"
import { FontAwesome5 } from '@expo/vector-icons';


interface Item {
  id: number;
  name: string;
  code: string;
  type: string;
  description: string;
  category: string;
  address: string;
  capacity: number;
  manager: string;
  createdTime: Date;
  updatedTime: Date;
  storageUnits: StorageUnit[];
  isSelected: boolean;
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

const WareHouseAnimatedFlatList: React.FC<AnimatedFlatListProps> = ({
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
          <View style={{ flex:1, elevation:1, margin:spacing.xxxs, backgroundColor:"white", borderRadius: spacing.md }}>

              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.md,margin:spacing.md}}>
                <Text preset="subheading" size="sm" style={{fontWeight:"700", color: colors.textDim}} text={item.name} />
                <FontAwesome5 name="warehouse" size={24} color={colors.textDim} />
                {isSearchFormVisible &&
                <CheckBox checked={item.isSelected} onPress={() => {
                  dispatch(updateWareHouseIsSelected(item.id))}
                } /> }
              </View>



          </View>


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

export default WareHouseAnimatedFlatList

const $contentContainer: ViewStyle = {
  flex: 1,
  gap: spacing.md,
}
