import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Foundation from 'react-native-vector-icons/Foundation';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { IconSize } from '../constants/constants';
import { AntDesign, FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons"

export const Icons = {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  Feather,
  FontAwesome,
  FontAwesome5,
  AntDesign,
  Entypo,
  SimpleLineIcons,
  Octicons,
  Foundation,
  EvilIcons,
}

interface IconProps {
  type: Function;
  name: string;
  color?: string;
  size?: number;
  style?: object;
}

const Icon = ({ type, name, color, size, style }: IconProps) => {
  const fontSize = IconSize;
  const Tag = type;
  if (type) {
    return <Tag name={name} size={size || fontSize} color={color} style={style} />
  }
  return null;
}

export default Icon