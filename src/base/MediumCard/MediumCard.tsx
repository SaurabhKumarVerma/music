import { StyleSheet, View } from "react-native"
import MusicImage from "../MusicImage/MusicImage"
import { MusicText } from "../MusicText/MusicText"
import { images } from "assets"
import { DEVICE_WIDTH } from "@music/constant/constant"
import { color } from "@music/theme/color"

const DEFAULT_HEIGHT = 200
const DEFAULT_WIDTH = DEVICE_WIDTH * 0.5
interface IMediumCard {
  imageUrl: string
  songOrAlbumName: string
  artistName?: string
  imageWidth?: number
  imageHeight?: number
}

const MediumCard = ({
  imageUrl,
  songOrAlbumName,
  artistName,
  imageWidth = DEFAULT_WIDTH,
  imageHeight = DEFAULT_HEIGHT,
}: IMediumCard) => {
  const imageUpdatedHeight = imageHeight ?? DEFAULT_HEIGHT
  const imageUpdatedWidth = imageWidth ?? DEFAULT_WIDTH
  return (
    <View style={[styles.container, { width: imageUpdatedWidth }]}>
      <MusicImage
        contentFit="fill"
        cachePolicy="memory"
        source={imageUrl || images.variousArtist}
        style={[styles.imageStyle, { width: imageUpdatedWidth, height: imageUpdatedHeight }]}
      />
      <MusicText
        preset="normal"
        text={songOrAlbumName}
        size="rg"
        numberOfLines={1}
        style={styles.songOrAlbumStyle}
      />

      {artistName ? (
        <MusicText
          preset="normal"
          text={artistName}
          size="rg"
          numberOfLines={1}
          style={styles.artistNameStyle}
        />
      ) : null}
    </View>
  )
}

export default MediumCard

const styles = StyleSheet.create({
  artistNameStyle: {
    color: color.grey4,
    fontSize: 14,
    marginTop: 2,
  },
  container: {
    marginTop: 14,
    overflow: "hidden",
  },
  imageStyle: {
    borderRadius: 10,
    height: 180,
  },
  songOrAlbumStyle: {
    fontSize: 16,
    marginTop: 10,
  },
})
