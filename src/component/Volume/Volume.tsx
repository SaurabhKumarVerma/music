import MusicIcon from "@music/base/MusicIcon/MusicIcon"
import { color } from "@music/theme/color"
import { StyleSheet } from "react-native"
import Animated, { useAnimatedProps } from "react-native-reanimated"
import VolumeSlide from "./VolumeSlide"

interface IVolume {
  opacityProps: any
}
const Volume = (props: IVolume) => {
  const animatedOpacityValue = useAnimatedProps(() => {
    const opacity = props.opacityProps.value

    return {
      opacity,
    }
  })
  return (
    <Animated.View
      style={[
        {
          marginTop: 60,
          alignSelf: "center",
        },
        animatedOpacityValue,
      ]}
    >
      <VolumeSlide />
    </Animated.View>
  )
}

export default Volume

const styles = StyleSheet.create({})
