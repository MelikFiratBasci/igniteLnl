import React, { ReactNode, useState } from "react"
import { TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Text } from "../../components"
import { colors, spacing, typography } from "../../theme"
import { AntDesign, EvilIcons } from "@expo/vector-icons"
import { MaterialIcons } from "@expo/vector-icons"
import Scanner from "./Scanner"

interface DemoUseCaseProps {
  name: string
  description?: string
  layout?: "column" | "row"
  children: ReactNode

}


export function DemoUseCase(props: DemoUseCaseProps) {
  const { name, description, children, layout = "column" } = props

  return (

    <View>
      {description && <Text style={$description}>{description}</Text>}
      <View style={[layout === "row" && $rowLayout, $item]}>{children}</View>

    </View>


  )
}

const $description: TextStyle = {
  marginTop: spacing.md,
}

const $item: ViewStyle = {

  borderRadius: 8,
  marginHorizontal: spacing.xs,
  padding: spacing.xs,
  marginBottom: spacing.md,
  gap: spacing.xs,
  justifyContent: "center",
}

const $name: TextStyle = {
  fontFamily: typography.primary.bold,
}

const $rowLayout: ViewStyle = {

  flexDirection: "row",
  flexWrap: "wrap",
}


// @demo remove-file
