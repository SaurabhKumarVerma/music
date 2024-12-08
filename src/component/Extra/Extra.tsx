import { Platform, StyleSheet, View } from "react-native"
import MusicIcon from "@music/base/MusicIcon/MusicIcon"
import { color } from "@music/theme/color"
import AirPlayButton from "react-native-airplay-button"

const Extra = () => {
  const showAirplay = () => {
    if (Platform.OS === "ios") {
      return (
        <AirPlayButton
          activeTintColor="blue"
          tintColor="white"
          prioritizesVideoDevices={false}
          style={{ width: 40, height: 40 }}
        />
      )
    } else {
      return null
    }
  }
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 30,
        marginTop: "20%",
      }}
    >
      <MusicIcon name="info" size={23} color={color.dustyGray} />
      {/* <MusicIcon name="airplay" size={20} color={color.dustyGray} /> */}
      {showAirplay()}
      <MusicIcon name="related" size={20} color={color.dustyGray} />
    </View>
  )
}

export default Extra

const styles = StyleSheet.create({})
