/* eslint-disable react/jsx-key */
import React from "react"
import {
  View,
  ViewStyle,
} from "react-native"
import { spacing } from "../../theme"

import { Screen, Text } from "../../components"


const WarningScreen = () => {

  return (

    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContainer}>
      <View style={{ flex: 1, gap: spacing.md }}>
        <Text>WarningScreen</Text>
      </View>
    </Screen>

  )

}

export default WarningScreen

const $screenContainer: ViewStyle = {
  flex: 1,

}

// @demo remove-file
