import React, { useEffect, useRef, useState } from "react"
import {
  View,
  Image,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  ScrollView,
  StyleSheet, Platform,
  Animated, ActivityIndicator,
} from "react-native"
import { Button, Icon, Screen, TextField } from "../../components"
import { Text } from "../../components"
import { colors, spacing, themeColors, typography } from "../../theme"
import { useNavigation } from "@react-navigation/native"
import SearchBar from "../../components/SearchBar"
import MapView, { Marker } from "react-native-maps"
import * as Location from "expo-location"
import { AntDesign } from "@expo/vector-icons"
import { FontAwesome, MaterialIcons } from "@expo/vector-icons"


const AddAddress = () => {

  const navigation = useNavigation()
  const [currentLocation, setCurrentLocation] = useState(null)
  const mapViewRef = useRef(null)
  const [markerAnimation, setMarkerAnimation] = useState(false)
  const [markerCoordinate, setMarkerCoordinate] = useState(null)

  const markerTranslateY = useRef(new Animated.Value(0)).current // Animasyonlu translateY değeri

  // Konum bilgisini alma işlemi
  useEffect(() => {
    fetchLocation().then(r =>
      console.log(r, "r"),
    )
  }, [])

  const fetchLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()
    console.log(status, "status")
    if (status !== "granted") {
      console.log("Konuma erişim izni verilmedi")
      return
    }
    const location = await Location.getCurrentPositionAsync({})
    console.log(location, "location234234")
    setCurrentLocation(location)
  }

  const handleMapRegionChange = (region) => {
    setMarkerCoordinate(region)

  }

  useEffect(() => {
    if (markerAnimation) {
      Animated.timing(markerTranslateY, {

        toValue: -10, // Yukarı animasyonlu kaydırma
        duration: 100, // Animasyon süresi
        useNativeDriver: false, // Android için useNativeDriver'ı false olarak ayarlayın
      }).start()
    } else {
      Animated.timing(markerTranslateY, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }).start()
    }
  }, [markerAnimation])


  return (

    <Screen KeyboardAvoidingViewProps={
      { behavior: Platform.OS === "ios" ? "height" : "padding" }
    } safeAreaEdges={["top", "bottom"]} contentContainerStyle={$screenContainer}>
      <View style={$sectionListContentContainer}>
        <View style={{ flexDirection: "row", marginBottom: spacing.md, gap: spacing.md }}>
          <Icon icon="back" onPress={() => navigation.goBack()} />
          <Text style={$name} preset="header" text="Add Address" />
        </View>
        <SearchBar qrFeature={false} onChangeText={() => {
          console.log("Changed Texxt")
        }} placeholder="Search street or post code" />
        <View style={{
          flex: 2,
          justifyContent: "center",
          borderWidth: 1,
          borderColor: colors.border,
          marginVertical: spacing.md,
          borderRadius: spacing.xs,
          overflow: "hidden",
        }}>
          {currentLocation ? <MapView

              showsUserLocation // Important! This is needed to show the current location
              key={currentLocation ? "map_with_location" : "map_without_location"}
              ref={mapViewRef}
              onRegionChangeComplete={handleMapRegionChange}
              onTouchStart={() => setMarkerAnimation(true)}
              onTouchEnd={() => setMarkerAnimation(false)}
              region={{
                latitude: currentLocation ? currentLocation.coords.latitude : 0, // Varsayılan bir değer kullanabilirsiniz
                longitude: currentLocation ? currentLocation.coords.longitude : 0, // Varsayılan bir değer kullanabilirsiniz
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              style={{ backgroundColor: colors.errorBackground, flex: 1 }}
            />
            : <ActivityIndicator size="large" color={themeColors.primary} />}

          <View style={{ alignItems: "center", position: "absolute", alignSelf: "center" }}>
            <Animated.View style={{
              alignItems: "center",
              position: "absolute",
              bottom: 0,
              zIndex: 1,
              alignSelf: "center",
              transform: [{ translateY: markerTranslateY }],
            }}>
              <FontAwesome style={{ zIndex: 1 }} name="map-marker" size={48} color={themeColors.secondary} />
            </Animated.View>
            <View
              style={{
                width: 8,
                height: 8,
                position: "absolute",
                bottom: -6,
                zIndex: 0,
                borderRadius: 20, // Daha büyük bir değer kullanarak daireyi hilal şekline getirin
                backgroundColor: themeColors.primary,
                overflow: "hidden", // Bu, taşan kısmın gizlenmesini sağlar
              }}
            />

          </View>

          <View style={$mapTopView}>
            <AntDesign name="infocirlceo" size={16} color={themeColors.info} />
            <Text preset="default" size="xxs" text="Search or just move the map to your desired location" />
          </View>

        </View>
        {/*<Text preset="secondary" text={markerCoordinate?.latitude.toString() + markerCoordinate?.longitude.toString()} />*/}

        <View style={{ flex: 2 }}>
          <View style={{
            flex:1,
            backgroundColor: themeColors.sidebar.menuItemBgActive,
            borderRadius: spacing.xs,
            borderWidth: 1,
            borderColor: colors.border,
            padding: spacing.xs,
          }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name={"location-on"} size={24} color={themeColors.primary} />
              <Text style={{ flex: 1, color: colors.text }} preset="default" text="Çankaya, Ankara, Türkiye" />
              <TouchableOpacity style={{
                backgroundColor: "white",
                paddingVertical: spacing.xxs,
                paddingHorizontal: spacing.xs,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: spacing.xs,
              }}>
                <Text style={{ color: themeColors.primary, fontSize: 12 }} preset="default" text="Change" />
              </TouchableOpacity>
            </View>
            <Text preset="secondary" style={{ color: colors.textDim, fontSize: 12 }}
                  text="Riders deliver your order to the location shown on the map. Adding address details below also assists ultrafast delivery." />
          </View>

        </View>
        <View style={{ flex: 4,backgroundColor:"red" }}>
<TextField placeholder="Street Name" />
          <View style={{flexDirection:"row",gap:5,backgroundColor:"green"}}>
          <TextField placeholder="Street No"/>
          <TextField placeholder="Floor" />

          </View>
        </View>

        <Button text="Continue" onPress={() => {
          console.log("Search or just move the map to your desired location")
        }} />

      </View>


    </Screen>
  )
}

const $screenContainer: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.md,
  paddingTop: spacing.md,

}

const $sectionListContentContainer: ViewStyle = {
  flex: 1,

}

const $name: TextStyle = {
  fontFamily: typography.primary.bold,

}

const $mapTopView: ViewStyle = {
  flexDirection: "row",
  gap: spacing.xs,
  alignItems: "center",
  borderStyle: "dashed",
  borderRadius: spacing.xs,
  width: "75%",
  backgroundColor: themeColors.white,

  opacity: 0.8,
  borderWidth: 1,
  borderColor: colors.border,
  padding: spacing.xs,
  margin: spacing.xs,
  top: spacing.xxs,
  position: "absolute",
}


export default AddAddress