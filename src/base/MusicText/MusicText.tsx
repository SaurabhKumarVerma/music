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

export function MusicText(props: TextProps) {
  const { weight, size, text, children, style: $styleOverride, ...rest } = props

  const $presets: Record<Presets, StyleProp<TextStyle>> = {
    default: $baseStyle,
    semiBold: [$baseStyle, $sizeStyles.lg, $fontWeightStyles.semibold],
    thin: [$baseStyle, $fontWeightStyles.light],
    light: [$baseStyle, $sizeStyles.sm, $fontWeightStyles.light],
    heading: [$baseStyle, $sizeStyles.xxl, $fontWeightStyles.bold],
    normal: [$baseStyle, $sizeStyles.xs, $fontWeightStyles.regular, { color: color.white }],
    medium: [$baseStyle, $sizeStyles.sm, $fontWeightStyles.medium],
    largeHeading: [$baseStyle, $sizeStyles.xxl, $fontWeightStyles.extraBold],
    formLabel: [$baseStyle, $fontWeightStyles.medium],
    formHelper: [$baseStyle, $sizeStyles.sm, $fontWeightStyles.light],
    subHeading: [$baseStyle, $sizeStyles.lg, $fontWeightStyles.medium],
    bold: [$baseStyle, $sizeStyles.bold, $fontWeightStyles.bold],
    subheading: [$baseStyle, $sizeStyles.lg, $fontWeightStyles.medium],
  }

  const content = text || children

  const preset: Presets = props.preset ?? "default"

  const combineStyles = (...styles: (StyleProp<TextStyle> | undefined)[]): StyleProp<TextStyle> =>
    styles.filter(Boolean) as StyleProp<TextStyle>

  const $styles = combineStyles(
    ...$presets[preset],
    weight ? $fontWeightStyles[weight] : undefined,
    size ? $sizeStyles[size] : undefined,
    $styleOverride,
  )

  return (
    <RNText {...rest} style={$styles}>
      {content}
    </RNText>
  )
}

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

const $fontWeightStyles = Object.fromEntries(
  Object.entries(appFonts.primary).map(([weight, fontFamily]) => [weight, { fontFamily }]),
) as Record<Weights, TextStyle>

const $baseStyle: StyleProp<TextStyle> = [
  $sizeStyles.sm,
  $fontWeightStyles.ultraLight,
  { color: color.white },
]
