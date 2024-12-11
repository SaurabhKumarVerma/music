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

const SIDE_WIDTH = 250
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
      } else if (innerWidth.value >= SIDE_WIDTH) {
        innerWidth.value = SIDE_WIDTH
      }

      startWidth.value = innerWidth.value
    })
    .onFinalize(() => {
      onVolumeBarPressed.value = false
    })

  const barProps = useAnimatedProps(() => ({
    width: interpolate(innerWidth.value, [0, SIDE_WIDTH], [0, SIDE_WIDTH], {
      extrapolateLeft: Extrapolation.CLAMP,
      extrapolateRight: Extrapolation.CLAMP,
    }),
  }))

  const volPercentage = useDerivedValue(() => {
    return interpolate(innerWidth.value, [0, SIDE_WIDTH], [0, 100], {
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

  const interpolatedInnerWidth = useDerivedValue(() => {
    const value = interpolate(innerWidth.value, [0, SIDE_WIDTH], [0, 240], {
      extrapolateLeft: Extrapolation.CLAMP,
      extrapolateRight: Extrapolation.CLAMP,
    })
    return value
  })

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
          width={SIDE_WIDTH}
          height="14"
          viewBox={`0 0 ${SIDE_WIDTH} 10`}
          fill="#000000"
          xmlns="http://www.w3.org/2000/svg"
          color={"#000000"}
        >
          <Rect
            y="0.5"
            width={`${SIDE_WIDTH}`}
            height="12"
            rx="8"
            fill={color.grey}
            fillOpacity="0.5"
          />
          <AnimatedRect height="12" rx="8" fill={color.white} animatedProps={barProps} />
        </Svg>

        <View style={{ marginLeft: 20 }}>
          <Volumeup innerWidth={interpolatedInnerWidth.value} />
        </View>
      </View>
    </GestureDetector>
  )
}

export default VolumeSlide
