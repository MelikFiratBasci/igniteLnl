import React from "react"
import { SafeAreaView, View, StyleSheet, ViewStyle } from "react-native"
import TreeView from "react-native-final-tree-view"
import { colors, spacing, themeColors } from "../theme"
import { Entypo } from "@expo/vector-icons"
import { Text } from "./Text"

type DataType = {
  id: string;
  name: string;
  children?: DataType[];
};

interface CustomTreeViewProps {
  data?: DataType[];
}

const state: CustomTreeViewProps = {
  data: [
    {
      id: "Parent1",
      name: "Parent1",
      children: [
        {
          id: "child1",
          name: "child1",
          children: [
            {
              id: "child11",
              name: "child11",
              children: [
                {
                  id: "child111",
                  name: "child111",
                  children: [
                    { id: "asdad", name: "asdad" },
                  ],
                },
                {
                  id: "child11s1",
                  name: "child111",
                },
              ],
            },
            {
              id: "child12",
              name: "child12",
            },
          ],
        },
      ],
    },
    {
      id: "Parent2",
      name: "Parent2",
      children: [
        {
          id: "child2",
          name: "child2",
          children: [
            {
              id: "child21",
              name: "child21",
            },
            {
              id: "child22",
              name: "child22",
            },
          ],
        },
      ],
    },
    {
      id: "Parent3",
      name: "Parent3",
      children: [
        {
          id: "child3",
          name: "child3",
          children: [
            {
              id: "child31",
              name: "child31",
            },
            {
              id: "child23",
              name: "child32",
            },
          ],
        },
      ],
    },
  ],
}

let BORDER_WIDTH = 1
let BORDER_COLOR = colors.border
let BORDER_STYLE = "dashed"
let INDENTATION = 12

const TreeItem = ({ node, level, isExpanded, hasChildrenNodes }) => {
  const dashViews = []
  for (let i = 0; i < level; i++) {
    dashViews.push(<View key={`dash-${i}`} style={$dashVertical} />)
  }

  return (

    <View style={$treeItem}>
      {level > 0 && (
        <>
          <View style={$dashViews}>
            {dashViews}
          </View>
          <View style={$dashHorizontal} />
        </>
      )}

      <View style={{ flexDirection: "row", alignItems: "center", flex: 1, backgroundColor: "#ccc" }}>
        {hasChildrenNodes ? (
          <Entypo name={isExpanded ? "chevron-small-down" : "chevron-small-right"} size={INDENTATION * 2}
                  color="black" />
        ) : null}

        <Text style={{
          flex: 1,
          paddingLeft: hasChildrenNodes ? null : spacing.xs,
          paddingVertical: spacing.xxxs,
        }} preset="subheading" size="xxs" text={node.name}></Text>
      </View>

    </View>
  )
}

const CustomTreeView = ({ data }: CustomTreeViewProps) => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: spacing.xs }}>
        <TreeView
          data={state.data}
          renderNode={({ node, level, isExpanded, hasChildrenNodes }) => {
            return <TreeItem node={node} level={level} isExpanded={isExpanded} hasChildrenNodes={hasChildrenNodes} />
          }}
        />
      </View>
    </SafeAreaView>
  )
}

const $dashHorizontal: any = {
  borderBottomWidth: BORDER_WIDTH,
  borderBottomColor: BORDER_COLOR,
  borderStyle: BORDER_STYLE,
  height: 1,
  width: INDENTATION,
}

const $dashVertical: any = {
  borderLeftWidth: BORDER_WIDTH,
  borderLeftColor: BORDER_COLOR,
  borderStyle: BORDER_STYLE,
  height: INDENTATION * 2,
  width: 1,
}

const $dashViews: any = {
  marginLeft: INDENTATION,
  flexDirection: "row",
  gap: INDENTATION * 2,
}

const $treeItem: any = {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: spacing.xxxs,
}


export default CustomTreeView