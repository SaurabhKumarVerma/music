import { StyleSheet, View } from "react-native"
import MusicImage from "../MusicImage/MusicImage"
import { DEVICE_WIDTH } from "@music/constant/constant"
import { MusicText } from "../MusicText/MusicText"
import { usePlayerBackground } from "@music/hook/usePlayerBackground"
import { LinearGradient } from "expo-linear-gradient"
import { color } from "@music/theme/color"
import { ITrack } from "@music/models/toptrack.interface"
import { images } from "../../../assets/index"
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
        source={props.track.album?.images[0]?.url || images.variousArtisit}
        style={styles.imageStyle}
        contentFit="fill"
      />
      <LinearGradient
        colors={
          imageColors
            ? [
                imageColors?.background,
                // imageColors?.primary,
                // imageColors?.detail,
                imageColors.secondary,
              ]
            : [color.background]
        }
        style={styles.textContainerStyle}
      >
        <MusicText
          text="Escape of the phoenix"
          preset="largeHeading"
          size="lg"
          style={{ fontWeight: "500" }}
        />
        <MusicText
          text={props.track.album.name}
          weight="thin"
          size="xs"
          preset="thin"
          style={{ fontWeight: "500" }}
        />
        <MusicText
          text="2021"
          weight="thin"
          size="xs"
          preset="thin"
          style={{ fontWeight: "500" }}
        />
      </LinearGradient>
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    width: DEVICE_WIDTH * 0.6,
  },
  imageStyle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 280,
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
