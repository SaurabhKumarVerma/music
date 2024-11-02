import { StyleSheet, View } from "react-native"
import MusicIcon from "@music/base/MusicIcon/MusicIcon"
import { MusicText } from "@music/base/MusicText/MusicText"
import { color } from "@music/theme/color"
import { useAppSelector } from "@music/hook/hook"
import MusicImage from "@music/base/MusicImage/MusicImage"
import Animated, { FadeInDown } from "react-native-reanimated"

const HomeHeader = () => {
  const { profile } = useAppSelector((state) => state.userStore)

  return (
    <View style={styles.container}>
      <MusicText preset="bold" weight="extraBold" text="Listen Now" />
      {!profile ? (
        <Animated.View>
          <MusicIcon name="user" size={30} color={color.selectedColor} />
        </Animated.View>
      ) : (
        <Animated.View style={styles.profileStyleContainer}>
          <MusicImage source={profile?.images[0]?.url} style={styles.profileStyle} />
        </Animated.View>
      )}
    </View>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 16,
  },
  profileStyle: {
    borderRadius: 20,
    height: 40,
    width: 40,
  },
  profileStyleContainer: {
    paddingBottom: 8,
  },
})
