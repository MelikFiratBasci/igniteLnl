import { LNLHomeScreen } from "../screens/LNL/HomeScreen"
import Product from "../screens/LNL/Product"
import { AntDesign } from '@expo/vector-icons';
import { colors } from "../theme"
import { Icons } from "../components/Icons"



export const constant = {
  SPACING: 16,
  borderRadius: 10,
  titleFontSize: 24,
  textFontSize: 16,
  subTextFontSize: 14,
}

export const IconSize = 24

export const ScreensArray = [
  { route: 'Home', label: "Home", type: Icons.AntDesign, icon: 'home', component: LNLHomeScreen},
  { route: 'Product', label: "Product", type:Icons.FontAwesome, icon: 'product-hunt', component: Product, subMenu: [
    { route: 'Product', label: "Product", type:Icons.FontAwesome, icon: 'product-hunt', component: Product},
      { route: 'Test', label: "Test", type:Icons.FontAwesome, icon: 'product-hunt', component: undefined},
      { route: 'Test 2', label: "Test 2", type:Icons.FontAwesome, icon: 'product-hunt', component: undefined},

  ]},
  { route: 'Changable', label: "Changable", type:Icons.FontAwesome, icon: 'product-hunt', component: Product, subMenu: [
      { route: 'Product', label: "Product", type:Icons.FontAwesome, icon: 'product-hunt', component: Product},
      { route: 'Test', label: "Test", type:Icons.FontAwesome, icon: 'product-hunt', component: undefined},
      { route: 'Test 2', label: "Test 2", type:Icons.FontAwesome, icon: 'product-hunt', component: undefined},

    ]},
  { route: 'Settings', label: "Settings", type: Icons.AntDesign, icon: 'home', component: LNLHomeScreen},

];


export const drawerMenu = [
  {
    title: "Settings",
    bg: colors.tint,
    type: Icons.Feather, icon: 'settings',
    route: 'Settings',
    menuList: [
      { title: 'Change Theme', route: 'Theme' },
      { title: 'Notify Me', route: 'Notify' },
    ]
  },
  {
    title: "Products and Services",
    bg: colors.tint,
    type: Icons.FontAwesome5, icon: 'servicestack',
    route: 'Todo',
    menuList: [
      { title: 'Products', route: 'Product' },
      { title: 'Services', route: 'Product' },
      { title: 'Sleep', route: 'Product' },
    ]
  },
]