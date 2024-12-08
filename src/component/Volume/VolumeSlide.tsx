import { View } from "react-native"
import Svg, { Rect } from "react-native-svg"
import Animated, {
  useSharedValue,
  useAnimatedProps,
  interpolate,
  Extrapolation,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import { color } from "@music/theme/color"
import Volumeup from "./Volumeup"
import VolumeDown from "./VolumeDown"

const AnimatedRect = Animated.createAnimatedComponent(Rect)

const springConfig = {
  damping: 5,
  mass: 0.1,
  stiffness: 50,
}

const sideWidth = 250
const VolumeSlide = () => {
  const innerWidth = useSharedValue(0)
  const startWidth = useSharedValue(0)
  const onVolumeBarPressed = useSharedValue(false)

  const gesture = Gesture.Pan()
    .onBegin(() => {
      onVolumeBarPressed.value = true
    })
    .onUpdate((event) => {
      innerWidth.value = event.translationX + startWidth.value
    })
    .onEnd(() => {
      if (innerWidth.value < 0) {
        innerWidth.value = 0
      } else if (innerWidth.value >= sideWidth) {
        innerWidth.value = sideWidth
      }

      startWidth.value = innerWidth.value
    })
    .onFinalize(() => {
      onVolumeBarPressed.value = false
    })

  const barProps = useAnimatedProps(() => ({
    width: interpolate(innerWidth.value, [0, sideWidth], [0, sideWidth], {
      extrapolateLeft: Extrapolation.CLAMP,
      extrapolateRight: Extrapolation.CLAMP,
    }),
  }))

  const volPercentage = useDerivedValue(() => {
    return interpolate(innerWidth.value, [0, 140], [0, 100], {
      extrapolateLeft: Extrapolation.CLAMP,
      extrapolateRight: Extrapolation.CLAMP,
    })
  })

  const outerBar = useDerivedValue(() => {
    return onVolumeBarPressed.value ? 220 : 140
  })

  const innerBar = useDerivedValue(() => {
    return (volPercentage * outerBar) / 100
  })

  const innerbarProps = useAnimatedProps(() => ({
    width: withSpring(innerBar.value, springConfig),
    height: onVolumeBarPressed.value ? onVolumeBarPressed.value : 10,
  }))

  return (
    <GestureDetector gesture={gesture}>
      <View
        style={{
          alignSelf: "center",
          paddingHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ marginRight: 20 }}>
          <VolumeDown />
        </View>

        <Svg
          width={sideWidth}
          height="14"
          viewBox={`0 0 ${sideWidth} 10`}
          fill="#000000"
          xmlns="http://www.w3.org/2000/svg"
          color={"#000000"}
        >
          <Rect
            y="0.5"
            width={`${sideWidth}`}
            height="12"
            rx="8"
            fill={color.grey}
            fillOpacity="0.5"
          />
          <AnimatedRect height="12" rx="8" fill={color.white} animatedProps={barProps} />
        </Svg>

        <View style={{ marginLeft: 20 }}>
          <Volumeup animatedProps={innerWidth.value} outerBar={outerBar} />
        </View>
      </View>
    </GestureDetector>
  )
}

export default VolumeSlide
