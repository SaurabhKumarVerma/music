import { StyleSheet, View } from "react-native"
import MusicIcon from "@music/base/MusicIcon/MusicIcon"
import { MusicText } from "@music/base/MusicText/MusicText"
import { color } from "@music/theme/color"

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <MusicText preset="bold" weight="extraBold" text="Listen Now" />
      <MusicIcon name="user" size={30} color={color.selectedColor} />
    </View>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
})
