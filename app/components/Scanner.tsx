import React, { useState, useEffect, useRef } from "react"
import { View, StyleSheet, Button, Modal, TouchableOpacity } from "react-native"
import { BarCodeScanner } from "expo-barcode-scanner"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import * as Animatable from "react-native-animatable"
import { Text } from "../components"
import { useNavigation } from "@react-navigation/native"
import { colors } from "../theme"

const Scanner = ({ visible, setModalVisible, search, products }) => {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const navigation = useNavigation()

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === "granted")
    })()
  }, [])

  const findProductByQRCode = (qrCode) => {
    const product = products.find((product) => product.qrcode === qrCode)
    return product
  }


  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    if (search) {
      const item = findProductByQRCode(data);
      if(item){

        navigation.navigate("ProductDetail", { item })

    } else {

      console.log(data, type)
      return data
    }

  }}


  return (
    <View style={styles.container}>

      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={() => setModalVisible(false)}
      >
        {visible && (
          <View style={styles.container}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.backButton}>
              <MaterialCommunityIcons name="arrow-left" size={32} color="white" />
            </TouchableOpacity>
            <Text style={styles.topText}>Point the camera at a code</Text>

            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
            {scanned && (
              <TouchableOpacity onPress={() => setScanned(false)}>
                <View>
                  <Animatable.View animation="fadeInUpBig" style={styles.button}>
                    <Text size="sm" preset="bold" text="Okuduğunuz ürün listede yok."></Text>
                    <Text size="lg" preset="subheading" text="Okumak için tekrar basın."></Text>
                  </Animatable.View>
                </View>
              </TouchableOpacity>


            )}
          </View>
        )}
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 10,
    zIndex: 999,
  },
  topText: {
    color: "white",
    position: "absolute",
    top: 45,
    zIndex: 999,
  },

  button: {
    backgroundColor: colors.tint,
    borderRadius: 20,
    padding: 10,
    margin: 40,
    width: 300,
    alignItems: "center",
    justifyContent: "center",

  }
})

export default Scanner
