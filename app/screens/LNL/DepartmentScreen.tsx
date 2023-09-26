/* eslint-disable react/jsx-key */
import React from "react"
import {
  View,
  ViewStyle,
} from "react-native"
import { spacing } from "../../theme"

import { Screen, Text } from "../../components"
import CustomTreeView from "../../components/TreeView"


const DepartmentScreen = () => {

  return (

    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContainer}>
      <View style={{ flex: 1, gap: spacing.md }}>
        <Text  preset="heading" size="md" style={{marginLeft: spacing.sm}}>Departments Tree View</Text>
          <CustomTreeView />
      </View>
    </Screen>

  )

}

export default DepartmentScreen

const $screenContainer: ViewStyle = {
  flex: 1,

}

// @demo remove-file
