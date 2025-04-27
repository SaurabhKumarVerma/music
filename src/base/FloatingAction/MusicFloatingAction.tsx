import { Pressable, StyleSheet } from "react-native"
import AntDesign from "@expo/vector-icons/AntDesign"
import { color } from "@music/theme/color"
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated"
import FontAwesome5 from "@expo/vector-icons/FontAwesome5"
import Entypo from "@expo/vector-icons/Entypo"

const MusicFloatingAction = () => {
  const isOpen = useSharedValue(false)
  const progress = useDerivedValue(() => (isOpen.value ? withTiming(1) : withTiming(0)))
  const facebook = useSharedValue(0)

  const rotateIcon = useAnimatedStyle(() => {
    const transform = [{ rotate: `${progress.value * 45}deg` }]
    return {
      transform,
    }
  })

  const facebookIcon = useAnimatedStyle(() => {
    const scale = interpolate(facebook.value, [30, 40], [0, 1], Extrapolation.CLAMP)

    return {
      bottom: facebook.value,
      transform: [{ scale }],
    }
  })

  const onPress = () => {
    const config = {
      easing: Easing.bezier(0.98, -0.6, 0.32, 4.6),
      duration: 500,
    }

    if (progress.value) {
      facebook.value = withTiming(30, config)
    } else {
      facebook.value = withDelay(300, withSpring(100))
    }
    isOpen.value = !isOpen.value
  }

  return (
    <Pressable style={styles.containerStyle} onPress={onPress}>
      <Animated.View style={[styles.containerStyleFirst, { marginBottom: 20 }, facebookIcon]}>
        <Entypo name="instagram" size={24} color={color.black} />
      </Animated.View>

      <Animated.View style={[styles.containerStyleFirst, { marginBottom: 20 }, facebookIcon]}>
        <FontAwesome5 name="whatsapp" size={24} color={color.black} />
      </Animated.View>

      <Animated.View style={[styles.containerStyleFirst, facebookIcon]}>
        <AntDesign name="facebook-square" size={24} color={color.black} />
      </Animated.View>

      <Animated.View style={[styles.iconContainer, rotateIcon]}>
        <AntDesign name="plus" size={24} color={color.black} />
      </Animated.View>
    </Pressable>
  )
}

export default MusicFloatingAction

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: color.spotifyGreen,
    borderRadius: 50,
    // position: "absolute",
    bottom: 30,
    right: 30,

    // flex:
    left: 30,
    // flexDirection: "row",
    width: 60,
    height: 60,
    alignSelf: "flex-end",
    justifyContent: "flex-end",
  },
  containerStyleFirst: {
    alignItems: "center",

    alignSelf: "flex-end",
    backgroundColor: color.spotifyGreen,
    borderRadius: 50,
    height: 60,
    // right: 30,
    justifyContent: "center",
    width: 60,
  },
  iconContainer: {
    alignItems: "center",
    alignSelf: "flex-end",
    height: 60,
    justifyContent: "center",
    width: 60,
  },
})
