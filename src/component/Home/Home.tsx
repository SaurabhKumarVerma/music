import MusicScreen from "@music/base/MusicScreen/MusicScreen"
import { keys } from "@music/utils/pckeVerifier"
import tokenCache from "@music/utils/tokenCache"
import { Pressable, StyleSheet, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import HomeHeader from "./HomeHeader"
import Divider from "@music/base/Divider/Divider"
import { MusicText } from "@music/base/MusicText/MusicText"
import TopPick from "./TopPick"
import { color } from "@music/theme/color"

export default function Home() {
  const insets = useSafeAreaInsets()

  const onPress = () => {}

  const onPressDel = async () => {
    await tokenCache.deleteSaveToken(keys)
  }

  return (
    <MusicScreen style={[styles.container, { top: insets.top }]}>
      <View style={styles.headerStyle}>
        <HomeHeader />
      </View>

      <Divider />

      <View style={styles.topPicsContainer}>
        <MusicText
          text="Top Picks"
          // preset="heading"
          // weight="extraBold"
          preset="largeHeading"
          size="lg"
          style={{ color: color.white, fontSize: "40", fontWeight: "700" }}
        />
        <TopPick />
      </View>
      {/* <MusicIcon name='play' size={30} color={color.torchRed as string}/> */}
    </MusicScreen>
  )
}

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 16,
  },
  headerStyle: {
    marginBottom: 20,
    marginHorizontal: 16,
    marginTop: 30,
  },
  topPicsContainer: {
    marginLeft: 16,
    marginTop: 30,
  },
})
