/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, View } from "react-native"
import MusicImage from "../MusicImage/MusicImage"
import { DEVICE_WIDTH } from "@music/constant/constant"
import { MusicText } from "../MusicText/MusicText"
import { usePlayerBackground } from "@music/hook/usePlayerBackground"
import { LinearGradient } from "expo-linear-gradient"
import { color } from "@music/theme/color"
import { ITrack } from "@music/models/toptrack.interface"
import { images } from "../../../assets/index"
import { extractDate } from "@music/utils/extractDate"
import { BLUR_HASH } from "@music/types/type"
interface ICard {
  track: ITrack
}

const Card = (props: ICard) => {
  const { imageColors } = usePlayerBackground(
    props.track.album?.images[0]?.url || images.variousArtisit1,
  )

  return (
    <View style={styles.container}>
      <MusicImage
        cachePolicy="memory"
        source={props.track.album?.images[0]?.url || images.variousArtist}
        style={styles.imageStyle}
        contentFit="fill"
        placeholder={BLUR_HASH}
        priority={"high"}
        transition={2000}
      />
      <LinearGradient
        colors={imageColors ? [imageColors?.background, imageColors.secondary] : [color.background]}
        style={styles.textContainerStyle}
      >
        <MusicText
          numberOfLines={1}
          text={props.track.album.name}
          preset="largeHeading"
          size="lg"
          style={{ fontWeight: "600", fontSize: 22 }}
        />
        <MusicText
          numberOfLines={1}
          text={props.track.album.artists[0].name}
          weight="thin"
          size="xs"
          preset="thin"
          style={{ fontWeight: "500" }}
        />
        <MusicText
          numberOfLines={1}
          text={extractDate(props.track.album.release_date)}
          weight="thin"
          size="xs"
          preset="light"
          style={{ fontWeight: "500", fontSize: 12 }}
        />
      </LinearGradient>
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    width: DEVICE_WIDTH * 0.5,
  },
  imageStyle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 220,
    width: DEVICE_WIDTH * 0.6,
  },
  textContainerStyle: {
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "center",
    paddingVertical: 10,
  },
})
