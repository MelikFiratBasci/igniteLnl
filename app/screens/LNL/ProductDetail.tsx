import React from "react"
import { View, Image, ViewStyle, TextStyle, Alert } from "react-native"
import { Icon, Screen } from "../../components"
import { Text } from "../../components"
import { colors, spacing, typography } from "../../theme"
import { useNavigation } from "@react-navigation/native"
import { SpeedDial } from 'react-native-elements';
import { removeProduct } from "../../store"
import { useDispatch } from "react-redux"


interface ProductDetailProps {
  route: {
    params: {
      item: {
        title: string;
        description: string;
        price: number;
        image: string;
      };
    };
  };
}

const ProductDetail: React.FC<ProductDetailProps> = ({ route }) => {

  const { item } = route.params
  const navigation = useNavigation()
  const [showSpeedDial, setShowSpeedDial] = React.useState(false);

  const dispatch = useDispatch()

  return (

    <Screen preset="fixed" safeAreaEdges={["top", "bottom"]} contentContainerStyle={$screenContainer}>
      <View style={$sectionListContentContainer}>
        <View style={{ flexDirection: "row", gap: spacing.md }}>
          <Icon icon="back" onPress={() => navigation.goBack()} />
          <Text style={$name} preset="header" text="Product Detail" />

        </View>

        <View>
          <Image
            source={{ uri: item.image }}
            resizeMode="contain"
            style={{ width: "100%", height: 300, borderRadius: 16, marginVertical: spacing.lg }}
          />
          <Text>{item.title}</Text>
          <Text>{item.description}</Text>
          <Text>{"$" + item.price}</Text>

        </View>
      </View>
      <SpeedDial
        buttonStyle={{backgroundColor:colors.tint, borderRadius: 100}}
        color={colors.tint}
        isOpen={showSpeedDial}
        icon={{ name: 'menu', color: '#fff' }}
        openIcon={{ name: 'close', color: '#fff' }}
        onOpen={() => setShowSpeedDial(!showSpeedDial)}
        onClose={() => setShowSpeedDial(!showSpeedDial)}
      >
        <SpeedDial.Action
          buttonStyle={{backgroundColor:colors.tint, borderRadius: 100}}
          icon={{ name: 'edit', color: '#fff' }}
            title="Edit"
          onPress={() => console.log('Edit Something')}
        />
        <SpeedDial.Action
          buttonStyle={{backgroundColor:colors.tint, borderRadius: 100}}
          icon={{ name: 'delete', color: '#fff' }}
          title="Delete"
          onPress={() => {
            Alert.alert(
              "Delete Product",
              "Are you sure you want to delete this product?",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                {
                  text: "Delete", onPress: () => {
                    dispatch(removeProduct(item.id))
                    navigation.goBack()
                  }
                }
              ],
              { cancelable: false }
            );
          }}
        />
      </SpeedDial>
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


export default ProductDetail