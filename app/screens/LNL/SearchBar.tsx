import React, { useState } from "react"
import { TextInput, TouchableOpacity, View, ViewStyle } from "react-native"
import { EvilIcons, MaterialIcons } from "@expo/vector-icons"
import Scanner from "./Scanner"
import { colors, spacing } from "../../theme"
import { useDispatch, useSelector } from "react-redux"
import { changeSearchTerm} from "../../store"


const SearchBar = ({ onSearch, searchTerm }) => { // onSearch prop'unu doğru şekilde alın

  // Aramak yapmak istediğin her yere bu component'i koyabilirsin. Sadece aramayı yapacağın componente özgü olan propsları buraya göndermen yeterli olacaktır.

  const [scannerVisible, setScannerVisible] = useState(false)

  const openScanner = () => {
    setScannerVisible(true)
  }


  return (
    <>
      <View style={$searchLayout}>
        <EvilIcons name="search" size={32} color="black" />
        <TextInput
          style={{ flex: 1 }}
          placeholder="Search by name or QR code"
          value={searchTerm}
          onChangeText={(text) => {
            onSearch(text)

          }}
        />
        <TouchableOpacity onPress={openScanner}>
          <MaterialIcons name="qr-code-scanner" size={32} color="black" />
        </TouchableOpacity>
      </View>

      {scannerVisible && <Scanner search={true} setModalVisible={setScannerVisible} visible={scannerVisible} />}
    </>
  )
}

const $searchLayout: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  borderRadius: 8,
  elevation: 2,
  borderColor: colors.palette.neutral400,
  padding: spacing.xs,
  justifyContent: "space-between",
  alignItems: "center",
  gap: spacing.xs,
  flexDirection: "row",
  marginHorizontal: spacing.md,

}

export default SearchBar
