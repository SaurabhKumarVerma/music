import { GestureResponderEvent, Pressable, StyleSheet, View } from "react-native"
import { MusicText } from "../MusicText/MusicText"
import MusicImage from "../MusicImage/MusicImage"
import Entypo from "@expo/vector-icons/Entypo"
import { color } from "@music/theme/color"
import { formatString } from "@music/utils/utils"
import LoaderKit from "react-native-loader-kit"

interface ISmallCard {
  artistImg: string
  artistSongName: string
  isPlaying?: string
  artistName?: string
  // artist: string
  showMenuToggle?: (data: GestureResponderEvent | undefined) => void
  onArtistClick?: () => void
}

const SmallCard = (props: ISmallCard) => {
  const onClickThreeDot = (data: GestureResponderEvent) => {
    props.showMenuToggle && props.showMenuToggle(data)
  }

  const artistNameClick = () => {
    props.onArtistClick && props.onArtistClick()
  }

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
            <Pressable onPress={artistNameClick}>
              <MusicText
                text={props?.artistName}
                preset="formLabel"
                size="sm"
                style={{ color: color.dustyGray }}
              />
            </Pressable>
          </View>
        </View>
      </View>
      <Pressable onPress={onClickThreeDot} hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
        <Entypo name="dots-three-vertical" size={20} color={color.grey5} />
      </Pressable>
    </View>
  )
}

export default SmallCard

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
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
