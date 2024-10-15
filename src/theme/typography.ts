import { ETypography, ITypography } from "@music/types/type"

export const typography: ITypography = {
  bold: require("../../assets/fonts/SFProBold.otf"),
  extraBold: require("../../assets/fonts/SFProHeavy.otf"),
  light: require("../../assets/fonts/SFProLight.otf"),
  medium: require("../../assets/fonts/SFProMedium.otf"),
  regular: require("../../assets/fonts/SFProRegular.otf"),
  semibold: require("../../assets/fonts/SFProSemibold.otf"),
  thin: require("../../assets/fonts/SFProThin.otf"),
  ultraLight: require("../../assets/fonts/SFProUltralight.otf"),
}

const fonts = {
  sfPro: {
    bold: ETypography.BOLD,
    extraBold: ETypography.EXTRA_BOLD,
    light: ETypography.LIGHT,
    medium: ETypography.MEDIUM,
    regular: ETypography.REGULAR,
    semibold: ETypography.SEMI_BOLD,
    thin: ETypography.THIN,
    ultraLight: ETypography.ULTRA_LIGHT,
  },
}

export const appFonts = {
  fonts,
  primary: fonts.sfPro,
}
