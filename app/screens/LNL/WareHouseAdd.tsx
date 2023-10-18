import React, { useEffect, useState } from "react"
import {
  View,
  Image,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  ScrollView,
  StyleSheet, Platform,
} from "react-native"
import { Card, Icon, Screen, TextField } from "../../components"
import { Text } from "../../components"
import { BottomSheet, Button, ListItem } from "react-native-elements"
import { colors, spacing, typography } from "../../theme"
import { useNavigation } from "@react-navigation/native"
import { MaterialIcons } from "@expo/vector-icons"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import MapView, { Marker } from "react-native-maps"
import * as ImagePicker from "expo-image-picker"
import { useDispatch } from "react-redux"
import { addWareHouse } from "../../store/index"
import Toast from "react-native-toast-message"
import * as Permissions from "expo-permissions"
import { StorageUnit } from "../../store/slices/storageUnitsSlice"
import * as Location from 'expo-location';


const WareHouseAdd = () => {


  const navigation = useNavigation()

  const [name, setName] = useState("")
  const [code, setCode] = useState("")
  const [type, setType] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [address, setAddress] = useState("")
  const [capacity, setCapacity] = useState("")
  const [manager, setManager] = useState("")
  const [createdTime, setCreatedTime] = useState("")
  const [updatedTime, setUpdatedTime] = useState("")
  const [storageUnits, setStorageUnits] = useState("")
  const [isSelected, setIsSelected] = useState("")
  const [barCode, setBarCode] = useState("")
  const [image, setImage] = useState(null)

  const wareHouse = [{
    id: Math.random().toString(),
    name: name,
    code: code,
    barCode: barCode,
    type: type,
    description: description,
    category: category,
    address: address,
    capacity: capacity,
    manager: manager,
    createdTime: createdTime,
    updatedTime: updatedTime,
    storageUnits: storageUnits,
    isSelected: isSelected,
    image: image,

  }]

  const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result)

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const takePhoto = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    if (status !== "granted") {
      console.log("Kamera izni verilmedi.")
      return
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result)

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  return (

    <Screen KeyboardAvoidingViewProps={
      { behavior: Platform.OS === "ios" ? "height" : "padding" }
    } safeAreaEdges={["top", "bottom"]} contentContainerStyle={$screenContainer}>
      <View style={$sectionListContentContainer}>
        <View style={{ flexDirection: "row", marginBottom: spacing.md, gap: spacing.md }}>
          <Icon icon="back" onPress={() => navigation.goBack()} />
          <Text style={$name} preset="header" text="Add WareHouse" />
        </View>

        {/*56 px classic bottom nav rule*/}

        <ScrollView showsVerticalScrollIndicator={false}>
          <Card
            HeadingComponent={
              <View>
                <TouchableOpacity delayPressIn={300} onPress={() => {
                  setIsVisible(true)
                  // pickImage().then(r => console.log(r))
                }}>
                  <View style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: spacing.md,
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderRadius: 8,
                    backgroundColor: colors.background,
                  }}>
                    {image ? <Image resizeMethod="scale" source={{ uri: image }}
                                    style={{ width: "100%", height: 200, borderRadius: 8 }} /> :
                      <MaterialIcons style={{ paddingVertical: spacing.xl }} name="add-a-photo" size={72}
                                     color={colors.textDim} />}
                  </View>
                </TouchableOpacity>
                <BottomSheet modalProps={{ animationType: "slide" }} isVisible={isVisible}
                             containerStyle={{ backgroundColor: "rgba(0.5, 0.25, 0, 0.3)" }}>

                  <View
                    style={{
                      borderTopLeftRadius: 16,
                      borderTopRightRadius: 16,
                      backgroundColor: colors.background,
                    }}>
                    <View style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: spacing.xs,
                    }}>
                      <Text preset="heading" size="md" text="Select Image"></Text>
                      <TouchableOpacity onPress={() => {
                        setIsVisible(false)
                      }}>
                        <MaterialIcons name="cancel" size={32} color="black" />
                      </TouchableOpacity>
                    </View>
                    <ListItem onPress={() => {
                      pickImage().then(r => console.log(r))
                      setIsVisible(false)
                    }}>
                      <ListItem.Content>
                        <ListItem.Title>Gallery</ListItem.Title>
                      </ListItem.Content>
                    </ListItem>

                    <ListItem onPress={() => {
                      takePhoto().then(r => console.log(r))
                      setIsVisible(false)
                    }}>
                      <ListItem.Content>
                        <ListItem.Title>Camera</ListItem.Title>
                      </ListItem.Content>
                    </ListItem>

                  </View>

                </BottomSheet>
              </View>
            }

            ContentComponent={
              <View style={{ gap: spacing.md }}>
                <TextField label="WareHouse Name" value={name} onChangeText={setName}></TextField>
                <TextField label="WareHouse Code" value={code} onChangeText={setCode}></TextField>
                <TextField
                  label="Barcode"
                  inputWrapperStyle={{
                    alignItems: "center",
                  }}
                  value={barCode}
                  onChangeText={setBarCode}
                  RightAccessory={(props) => <MaterialCommunityIcons style={{ marginRight: spacing.md }} name="barcode-scan" size={24} color="black" />}
                />
                <TextField                      inputWrapperStyle={{
                  alignItems: "center",
                }}     RightAccessory={(props) => <MaterialIcons onPress={()=>{navigation.navigate("AddAddress")}} style={{ marginRight: spacing.md }} name="add-location-alt" size={24} color="black" />} label="WareHouse Type" value={type} onChangeText={setType}></TextField>
                <TextField label="WareHouse Description" value={description} onChangeText={setDescription}></TextField>
                <TextField label="WareHouse Category" value={category} onChangeText={setCategory}></TextField>
                <TextField label="WareHouse Address" value={address} onChangeText={setAddress}></TextField>
                <TextField label="WareHouse Capacity" value={capacity} onChangeText={setCapacity}></TextField>
                <TextField label="WareHouse Manager" value={manager} onChangeText={setManager}></TextField>


              </View>
            }

          >

          </Card>

          <Button
            TouchableComponent={TouchableOpacity}
            loading={loading}
            buttonStyle={{
              marginTop: spacing.md, backgroundColor: colors.text,
            }}
            title="Save"
            onPress={() => {
              console.log("WareHouse", wareHouse)
              setLoading(true)
              setTimeout(() => {
                dispatch(addWareHouse(wareHouse))
                setLoading(false)
                navigation.goBack()

                Toast.show({
                  type: "success",
                  position: "bottom",
                  text1: "Ürün eklendi",
                  visibilityTime: 2000,
                  autoHide: true,
                  bottomOffset: 120,
                })
              }, 300)
            }}
          />


        </ScrollView>
      </View>

    </Screen>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },
})

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


export default WareHouseAdd