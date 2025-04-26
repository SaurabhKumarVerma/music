import { DEVICE_WIDTH } from "@music/constant/constant"
import { color } from "@music/theme/color"
import { useRef } from "react"
import { Pressable, StyleSheet, View, Animated, StyleProp, ViewStyle } from "react-native"
import { MusicText } from "../MusicText/MusicText"

interface IMusicButton {
  onPress: () => void
  buttonWidth?: number | string
  buttonCta: string
  buttonColor?: string
  buttonRippleColor?: string
  borderRadius?: number
  buttonStyle?: StyleProp<ViewStyle>
}

const MusicButton = (props: IMusicButton) => {
  const rippleAnim = useRef(new Animated.Value(0)).current

  const handlePressIn = () => {
    Animated.timing(rippleAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.timing(rippleAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }

  return (
    <Pressable
      onPress={props.onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.button,
        props.buttonStyle,
        {
          width: props.buttonWidth || 0,
          backgroundColor: props.buttonColor,
          borderRadius: props.borderRadius || 0,
        },
      ]}
    >
      <View style={styles.rippleContainer}>
        <Animated.View
          style={[
            styles.ripple,
            {
              transform: [
                {
                  scale: rippleAnim.interpolate({
                    inputRange: [0, 10],
                    outputRange: [0, DEVICE_WIDTH],
                  }),
                },
              ],
              opacity: rippleAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.4, 0],
              }),
            },
          ]}
        />
      </View>
      <MusicText text={props.buttonCta} preset="bold" size="sm" weight="extraBold" />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 12,
    justifyContent: "center",
    overflow: "hidden",
    padding: 10,
    paddingVertical: 16,
  },
  ripple: {
    backgroundColor: color.rippleColor,
    borderRadius: 50,
    height: 100,
    position: "absolute",
    width: 100,
  },
  rippleContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default MusicButton
