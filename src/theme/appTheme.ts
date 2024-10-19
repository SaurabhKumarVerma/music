import { DefaultTheme } from "@react-navigation/native"
import { color } from "./color"

export const appTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: color.splashBackgroundColor,
  },
}
