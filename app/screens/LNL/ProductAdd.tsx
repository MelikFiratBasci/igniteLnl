import React, { useState } from "react"
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
import * as ImagePicker from "expo-image-picker"
import { useDispatch } from "react-redux"
import { addProduct } from "../../store/index"
import ProductScreen from "./ProductScreen"
import Toast from "react-native-toast-message"
import * as Permissions from 'expo-permissions';


const ProductAdd = () => {

  const navigation = useNavigation()
  const [title, setName] = React.useState("")
  const [price, setPrice] = React.useState("")
  const [qrcode, setQrCode] = React.useState("")
  const [image, setImage] = useState("")

  const product = [{
    id: Math.random().toString(),
    title: title,
    image: image,
    price: price,
    qrcode: qrcode,
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
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== 'granted') {
      console.log('Kamera izni verilmedi.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  return (

    <Screen KeyboardAvoidingViewProps={
      { behavior: Platform.OS === "ios" ? "height" : "padding"}
    } safeAreaEdges={["top","bottom"]} contentContainerStyle={$screenContainer}>
      <View style={$sectionListContentContainer}>

        <View style={{ flexDirection: "row", marginBottom: spacing.md, gap: spacing.md }}>
          <Icon icon="back" onPress={() => navigation.goBack()} />
          <Text style={$name} preset="header" text="Add Product" />
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
                    <TextField label="Product Name" value={title} onChangeText={setName}></TextField>
                    <TextField label="Price" value={price} onChangeText={setPrice}></TextField>
                    <TextField label="Price" value={price} onChangeText={setPrice}></TextField>
                    <TextField label="Price" value={price} onChangeText={setPrice}></TextField>
                    <TextField label="Price" value={price} onChangeText={setPrice}></TextField>

                    <TextField
                      label="Barcode"
                      inputWrapperStyle={{
                        alignItems: "center",
                      }}
                      value={qrcode}
                      onChangeText={setQrCode}
                      RightAccessory={(props) => <MaterialCommunityIcons style={{ marginRight: spacing.md }}
                                                                         name="barcode-scan" size={24} color="black" />}
                    />
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
                  console.log("Product", product)
                  setLoading(true)
                  setTimeout(() => {
                    dispatch(addProduct(product))
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


export default ProductAdd