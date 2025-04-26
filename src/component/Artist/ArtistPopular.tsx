import MusicButton from "@music/base/MusicButton/MusicButton"
import { color } from "@music/theme/color"
import { Pressable, StyleSheet, View } from "react-native"
import FontAwesome5 from "@expo/vector-icons/FontAwesome5"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import Share from "react-native-share"
import TrackScreen from "@music/screen/TrackScreen/TrackScreen"

interface IArtistPopular {
  share: string
  artistName: string
  artistImage: string
  id: string
}

const ArtistPopular = (props: IArtistPopular) => {
  const url = props.share
  const title = `${props.artistName}`
  const message = `Checkout Artist ${props.artistName}`
  const icon = `${props.artistImage}`

  const options = {
    icon,
    title,
    message: `${message} ${url}`,
    url,
    failOnCancel: false,
  }

  const onShare = async () => {
    try {
      const res = await Share.open(options)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <View style={{}}>
      <View style={{ flexDirection: "row", alignSelf: "center", alignItems: "center" }}>
        <MusicButton
          buttonCta="Follow"
          onPress={() => console.log("Follow")}
          buttonWidth={"24%"}
          buttonColor={color.spotifyGreen}
          borderRadius={20}
          buttonStyle={{ paddingVertical: 10 }}
        />

        <View style={[styles.playContainer, { marginHorizontal: 22 }]}>
          <FontAwesome5 name="play" size={14} color={"#000000"} />
        </View>

        <Pressable style={styles.playContainer} onPress={onShare}>
          <FontAwesome name="share" size={14} color="black" />
        </Pressable>
      </View>

      <View>
        <TrackScreen id={props?.id} />
      </View>
    </View>
  )
}

export default ArtistPopular

const styles = StyleSheet.create({
  playContainer: {
    alignItems: "center",
    backgroundColor: color.white,
    borderRadius: 15,
    flexDirection: "row",
    height: 30,
    justifyContent: "center",
    width: 30,
  },
})
