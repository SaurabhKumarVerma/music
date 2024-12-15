import { StyleSheet, View } from "react-native"
import { MusicText } from "../MusicText/MusicText"
import MusicImage from "../MusicImage/MusicImage"
import AntDesign from "@expo/vector-icons/AntDesign"
import { color } from "@music/theme/color"
import { formatString } from "@music/utils/utils"
import LoaderKit from "react-native-loader-kit"

interface ISmallCard {
  artistImg: string
  artistSongName: string
  isPlaying?: string
  artistName?: string
  // artist: string
}

const SmallCard = (props: ISmallCard) => {
  return (
    <View style={styles.container}>
      <View style={styles.imagePlaceholderContainer}>
        <MusicImage source={{ uri: props?.artistImg }} style={styles.imageStyle} />
        {props.isPlaying ? (
          <LoaderKit style={styles.playingStyle} name={"LineScale"} color={color.white} />
        ) : null}

        <View style={styles.iconStyle}>
          <View>
            <MusicText text={formatString(props.artistSongName)} size="rg" preset="semiBold" />
            <MusicText
              text={props?.artistName}
              preset="formLabel"
              size="sm"
              style={{ color: color.dustyGray }}
            />
          </View>
        </View>
      </View>
      <AntDesign name="right" size={20} color={color.grey5} />
    </View>
  )
}

export default SmallCard

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconStyle: {
    marginLeft: 12,
  },
  imagePlaceholderContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  imageStyle: {
    borderRadius: 12,
    height: 58,
    position: "relative",
    width: 58,
  },
  playingStyle: {
    height: 20,
    left: "8%",
    position: "absolute",
    width: 20,
  },
})
