// React Native Tree View for Android and IOS devices
// https://aboutreact.com/react-native-final-tree-view/
import { Chip } from "react-native-elements"
import LinearGradient from 'react-native-linear-gradient';
// import React in our code
import React from 'react';

// import all the components we are going to use
import { SafeAreaView, Text, View } from 'react-native';

//import library for the TreeView
import TreeView from 'react-native-final-tree-view';
import { colors, spacing, themeColors } from "../theme"
import { Entypo } from '@expo/vector-icons';

type DataType = {
  id: string;
  name: string;
  children?: DataType[];
};


const DashLine = ({ lineWidth, level }) => {
  const containerStyle = {
    width: lineWidth,
    overflow: 'hidden',
  };

  const lineStyle = {
    width: '100%',
    height: 2,
    borderBottomWidth: 1,
    borderBottomColor: 'red', // Çizgi rengini istediğiniz renge ayarlayabilirsiniz
    borderStyle: 'dashed', // Çizgi stili
    // Çizginin ortalama pozisyonu
  };

  return (
    <View style={containerStyle}>
      <View style={lineStyle}></View>
    </View>
  );
};

//Dummy data for the Tree View
const state = {
  data: [
    {
      id: 'Parent1',
      name: 'Parent1',
      children: [
        {
          id: 'child1',
          name: 'child1',
          children: [
            {
              id: 'child11',
              name: 'child11',
              children: [
                {
                  id: 'child111',
                  name: 'child111',
                },
              ],
            },
            {
              id: 'child12',
              name: 'child12',
            },
          ],
        },
      ],
    },
    {
      id: 'Parent2',
      name: 'Parent2',
      children: [
        {
          id: 'child2',
          name: 'child2',
          children: [
            {
              id: 'child21',
              name: 'child21',
            },
            {
              id: 'child22',
              name: 'child22',
            },
          ],
        },
      ],
    },
    {
      id: 'Parent3',
      name: 'Parent3',
      children: [
        {
          id: 'child3',
          name: 'child3',
          children: [
            {
              id: 'child31',
              name: 'child31',
            },
            {
              id: 'child23',
              name: 'child32',
            },
          ],
        },
      ],
    },
  ],
};

const getIndicator = (isExpanded, hasChildrenNodes) => {
  if (!hasChildrenNodes) {
    return '*';
  } else if (isExpanded) {
    return '-';
  } else {
    return '+';
  }
};

const CustomTreeView = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 10,}}>
        <TreeView
          data={state.data}
          renderNode={({ node, level, isExpanded, hasChildrenNodes }) => {
            // Dash çizgi stili
            const dashStyle = {
              borderLeftWidth: level > 0 ? 1 : 0, // İlk seviye için border yok
              borderLeftColor: "red", // Çizgi rengi
              marginLeft: 46 * level, // Çizginin düzeyine bağlı olarak uzaklık
              paddingLeft: 10, // İçerikten önce boşluk
              flexDirection: "row",
              alignItems: "center",
              paddingBottom: 10,
              borderStyle: "dashed",

            };

            return (
              <View style={dashStyle}>

                <DashLine lineWidth={24} level={level} />

                {hasChildrenNodes ? (
                  <Entypo name={isExpanded ? "chevron-small-down" : "chevron-small-right"} size={24} color="black" />
                ) : null}

                {/* Düğüm içeriği */}
                <Chip title={node.name} containerStyle={{}} />
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};


export default CustomTreeView;
