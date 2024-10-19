import { Color } from "@music/types/type"
import Svg, { Defs, RadialGradient as SVGRadialGradient, Rect, Stop } from "react-native-svg"
import { View, Text, StyleSheet, TextStyle, ViewStyle } from "react-native"
import { MusicText, Presets, Sizes, Weights } from "../MusicText/MusicText"

interface RadialGradientProps {
  colorList: Color[]
  x: string
  y: string
  rx: string
  ry: string
  width: number
  height: number
  text: string
  element?: React.ReactElement
  textStyle?: TextStyle
  textPreset?: Presets
  textWeight?: Weights
  textSize?: Sizes
}

export const RadialGradient = ({
  colorList,
  x,
  y,
  rx,
  ry,
  width,
  height,
  text,
  element,
  textStyle,
  textPreset = "semiBold",
  textWeight = "semibold",
  textSize = "md",
}: RadialGradientProps) => {
  return (
    <>
      <Svg height={`${height}%`} width={`${width}%`}>
        <Defs>
          <SVGRadialGradient id="grad" cx={x} cy={y} rx={rx} ry={ry} gradientUnits="userSpaceOnUse">
            {colorList.map((value, index) => (
              <Stop
                key={`RadialGradientItem_${index}`}
                offset={value.offset}
                stopColor={value.color}
                stopOpacity={value.opacity}
              />
            ))}
          </SVGRadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
      </Svg>

      {/* Render Text or Custom Element */}
      {text ? (
        <MusicText
          preset={textPreset}
          weight={textWeight}
          size={textSize}
          style={[styles.text, { ...textStyle }]}
        >
          {text}
        </MusicText>
      ) : (
        element && <View style={styles.elementContainer}>{element}</View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  elementContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  text: {
    position: "absolute",
  },
})
