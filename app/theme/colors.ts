// TODO: write documentation for colors and palette in own markdown file and add links from here

const palette = {
  neutral100: "#FFFFFF",
  neutral200: "#F4F2F1",
  neutral300: "#D7CEC9",
  neutral400: "#B6ACA6",
  neutral500: "#978F8A",
  neutral600: "#564E4A",
  neutral700: "#3C3836",
  neutral800: "#191015",
  neutral900: "#000000",

  primary100: "#F4E0D9",
  primary200: "#E8C1B4",
  primary300: "#DDA28E",
  primary400: "#D28468",
  primary500: "#C76542",
  primary600: "#A54F31",

  secondary100: "#DCDDE9",
  secondary200: "#BCC0D6",
  secondary300: "#9196B9",
  secondary400: "#626894",
  secondary500: "#41476E",

  accent100: "#FFEED4",
  accent200: "#FFE1B2",
  accent300: "#FDD495",
  accent400: "#FBC878",
  accent500: "#FFBB50",

  angry100: "#F2D6CD",
  angry500: "#C03403",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",
} as const

export const lnl = {
  0: ['#231f20', '#484749', '#9e9e9d', '#dbdbdb'],
  1: ['#215059', '#358e94', '#52c4be'],
  2: ['#57b0c5', '#a0dbd9'],
  3: ['#f17e14', '#e3b386'],
  4: ['#f4b30b', '#f2cf78'],
  5: ['#5a8e82', '#aad9c4'],
  6: ['#8b4e87', '#d597d1'],
  7: ['#64c446', '#97d66a'],
  8: ['#F4F3F4'], // new white
  9: ['#c55d57', '#e5817b'],
  10: ['#5644ef'],


  //8: ['#fdfdfe'] // new white old
  // 8: ['#eeedeb'] // new white
//f409ee
};

export const themeColors = {
  primary:    lnl[2][0],
  secondary:  lnl[1][0],
  success:    lnl[7][0],
  warning:    lnl[3][0],
  error:      lnl[9][0],
  info:       lnl[1][2],

  black:      lnl[0][1],
  white:      lnl[8][0],
  primaryAlt: lnl[2][1],
  general: {
    bodyBg:   lnl[0][3]
  },
  sidebar: {
    dividerBg: '#f2f5f9',
    menuItemColor: '#52c4be',
    menuItemBgActive: '#f2f5f9',
  },

  gradientColor: {
    blue1: ['#6B73FF', '#000DFF'],
    blue2: ['#ABDCFF', '#0396FF'],
    blue3: ['#141E30', '#243B55'],
    blue4: ['#2b5876', '#4e4376'],
    blue5: ['#97ABFF', '#123597'],
    orange1: ['#FCCF31', '#F55555'],
    orange2: ['#FFD3A5', '#FD6585'],
    orange3: ['#f6d365', '#fda085'],
    purple1: ['#43CBFF', '#9708CC'],
    purple3: ['#667eea', '#764ba2'],
    pink1: ['#F6CEEC', '#D939CD'],
    pink2: ['#F761A1', '#8C1BAB'],
    green1: ['#FFF720', '#3CD500'],
    green2: ['#00b09b', '#96c93d'],
    black1: ['#434343', '#000000'],
    black2: ['#29323c', '#485563'],
  },

  shadows: {
    success: ['rgba(68, 214, 0, 0.25)', 'rgba(68, 214, 0, 0.35)'],
    error:   ['rgba(255, 25, 67, 0.25)', 'rgba(255, 25, 67, 0.35)'],
    info:    ['rgba(51, 194, 255, 0.25)', 'rgba(51, 194, 255, 0.35)'],
    primary: ['rgba(85, 105, 255, 0.25)', 'rgba(85, 105, 255, 0.35)'],
    warning: ['rgba(255, 163, 25, 0.25)', 'rgba(255, 163, 25, 0.35)'],
    card:    ['rgba(159, 162, 191, 0.1)', 'rgba(159, 162, 191, 0.32)'],
    cardSm:  ['rgba(159, 162, 191, 0.1)', 'rgba(159, 162, 191, 0.32)'],
    cardLg : ['rgba(255, 255, 255, 0.3)', 'rgba(0, 0, 0, 0.6)'],
  }

};

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: palette.neutral800,
  /**
   * Secondary text information.
   */
  textDim: palette.neutral600,
  /**
   * The default color of the screen background.
   */
  background: palette.neutral200,
  /**
   * The default border color.
   */
  border: palette.neutral400,
  /**
   * The main tinting color.
   */
  tint: themeColors.primary,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   *
   */
  errorBackground: palette.angry100,
}
