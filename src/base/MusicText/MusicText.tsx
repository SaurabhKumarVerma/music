import React, { forwardRef } from "react"
import { color } from "@music/theme/color"
import { appFonts } from "@music/theme/typography"
import { StyleProp, Text as RNText, TextProps as RNTextProps, TextStyle } from "react-native"

export type Sizes = keyof typeof $sizeStyles
export type Weights = keyof typeof appFonts.primary
export type Presets =
  | "default"
  | "bold"
  | "heading"
  | "subheading"
  | "formLabel"
  | "formHelper"
  | "semiBold"
  | "thin"
  | "light"
  | "normal"
  | "medium"
  | "largeHeading"
  | "subHeading"

export interface TextProps extends RNTextProps {
  text?: string
  style?: StyleProp<TextStyle>
  preset?: Presets
  weight?: Weights
  size?: Sizes
  children?: React.ReactNode
}

export const MusicText = forwardRef<RNText, TextProps>((props, ref) => {
  const { weight, size, text, children, style: $styleOverride, ...rest } = props

  const $presets: Record<Presets, StyleProp<TextStyle>> = {
    default: $baseStyle,
    semiBold: [$baseStyle, $sizeStyles.lg, { fontWeight: "600" }],
    thin: [$baseStyle, { fontWeight: "200" }],
    light: [$baseStyle, $sizeStyles.sm, { fontWeight: "300" }],
    heading: [$baseStyle, $sizeStyles.xxl, { fontWeight: "700" }],
    normal: [$baseStyle, $sizeStyles.xs, { fontWeight: "400" }, { color: color.white }],
    medium: [$baseStyle, $sizeStyles.sm, { fontWeight: "500" }],
    largeHeading: [$baseStyle, $sizeStyles.xxl, { fontWeight: "800" }],
    formLabel: [$baseStyle, { fontWeight: "500" }],
    formHelper: [$baseStyle, $sizeStyles.sm, { fontWeight: "300" }],
    subHeading: [$baseStyle, $sizeStyles.lg, { fontWeight: "500" }],
    bold: [$baseStyle, $sizeStyles.bold, { fontWeight: "700" }],
    subheading: [$baseStyle, $sizeStyles.lg, { fontWeight: "500" }],
  }

  const content = text || children

  const preset: Presets = props.preset ?? "default"

  const combineStyles = (...styles: (StyleProp<TextStyle> | undefined)[]): StyleProp<TextStyle> =>
    styles.filter(Boolean) as StyleProp<TextStyle>

  const $styles = combineStyles(
    ...($presets[preset] as TextStyle[]),
    weight ? $fontWeightStyles[weight] : undefined,
    size ? $sizeStyles[size] : undefined,
    $styleOverride,
  )

  return (
    <RNText {...rest} ref={ref} style={$styles}>
      {content}
    </RNText>
  )
})

const $sizeStyles = {
  xxl: { fontSize: 48, lineHeight: 55 } as TextStyle,
  bold: { fontSize: 34, lineHeight: 41 } as TextStyle,
  rg: { fontSize: 17, lineHeight: 22 } as TextStyle,
  lg: { fontSize: 20, lineHeight: 24 } as TextStyle,
  md: { fontSize: 10, lineHeight: 12 } as TextStyle,
  sm: { fontSize: 16, lineHeight: 20 } as TextStyle,
  xs: { fontSize: 14, lineHeight: 18 } as TextStyle,
  xxs: { fontSize: 12, lineHeight: 18 } as TextStyle,
}

const $fontWeightStyles = {
  ultraLight: { fontWeight: "200" },
  thin: { fontWeight: "300" },
  light: { fontWeight: "300" },
  regular: { fontWeight: "400" },
  medium: { fontWeight: "500" },
  semibold: { fontWeight: "600" },
  bold: { fontWeight: "700" },
  heavy: { fontWeight: "800" },
  black: { fontWeight: "900" },
  extraBold: { fontWeight: "800" },
} as Record<Weights, TextStyle>

const $baseStyle: StyleProp<TextStyle> = [
  $sizeStyles.sm,
  { fontWeight: "200" },
  { color: color.white },
]
