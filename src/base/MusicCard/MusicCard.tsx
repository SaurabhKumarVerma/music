import { StyleProp, StyleSheet, TextStyle, View, ViewProps } from "react-native"
import MusicScreen from "../MusicScreen/MusicScreen"
import MusicImage from "../MusicImage/MusicImage"
import { ImageStyle } from "expo-image"
import { MusicText, Presets, Sizes } from "../MusicText/MusicText"

interface IBaseMusicCard {
  cardStyle?: StyleProp<ViewProps>
  textStyle?: StyleProp<TextStyle>
  imagePath: string
  titleText: string
  imgStyle?: StyleProp<ImageStyle>
  imageContainerStyle?: ViewProps
  titleTextPreset?: Presets
  titleTextSize?: Sizes
}

interface MusicWithSubTitle extends IBaseMusicCard {
  subTitleText?: string
  subtitlePreset?: Presets
  subTitleSize?: Sizes
  subTextStyle?: StyleProp<TextStyle>
}

interface MusicWithoutSubTitle extends IBaseMusicCard {
  subTitleText?: undefined
}

type IMusicCard = MusicWithSubTitle | MusicWithoutSubTitle

const MusicCard = (props: IMusicCard) => {
  return (
    <MusicScreen>
      <View style={props.imageContainerStyle}>
        <MusicImage
          source={{ uri: props.imagePath }}
          style={StyleSheet.flatten(props.imgStyle ? props.imgStyle : styles.imageStyle)}
        />
        <MusicText
          text={props.titleText}
          preset={props.titleTextPreset || "default"}
          size={props.titleTextSize || "md"}
          style={props.textStyle}
        />

        {props.subTitleText && (
          <MusicText
            text={props.subTitleText}
            preset={props.subtitlePreset || "default"}
            size={props.subTitleSize || "md"}
            style={props.subTextStyle}
          />
        )}
      </View>
    </MusicScreen>
  )
}

export default MusicCard

const styles = StyleSheet.create({
  imageStyle: {
    height: 140,
    marginBottom: 10,
    width: 140,
  },
})
