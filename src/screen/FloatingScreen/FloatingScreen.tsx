import { Pressable, StyleSheet, View, ViewProps } from "react-native"
import React from "react"
import Floating from "@music/component/Floating/Floating"
import { BlurView } from "expo-blur"
import { DEVICE_WIDTH } from "@music/constant/constant"
import { useNavigation } from "@react-navigation/native"
import { ESCREEN } from "@music/types/screen"

interface IFloatingScreen {
  style: ViewProps
}

const FloatingScreen = (props: ViewProps) => {
  const navigation = useNavigation<any>()
  const navigationToPlayingScreen = () => {
    navigation.navigate(ESCREEN.PLAYING_TRACK)
  }
  return (
    <BlurView intensity={100} style={[style.container, props.style]}>
      <Pressable onPress={navigationToPlayingScreen}>
        <Floating />
      </Pressable>
    </BlurView>
  )
}

const style = StyleSheet.create({
  container: {
    borderRadius: 8,
    flex: 1,
    overflow: "hidden",
  },
})
export default FloatingScreen
