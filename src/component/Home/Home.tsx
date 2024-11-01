/* eslint-disable react-native/no-inline-styles */
import MusicScreen from "@music/base/MusicScreen/MusicScreen"
import { StyleSheet, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import HomeHeader from "./HomeHeader"
import Divider from "@music/base/Divider/Divider"
import { MusicText } from "@music/base/MusicText/MusicText"
import TopPick from "./TopPick"
import { color } from "@music/theme/color"
import { useAppDispatch } from "@music/hook/hook"
import { useEffect } from "react"
import { topPicks } from "@music/store/slice/topPicksSlice"
import { userProfile } from "@music/store/slice/userSlice"

export default function Home() {
  const insets = useSafeAreaInsets()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(topPicks())
    dispatch(userProfile())
  }, [])

  return (
    <MusicScreen style={[styles.container, { top: insets.top }]}>
      <View style={styles.headerStyle}>
        <HomeHeader />
      </View>

      <Divider />

      <View style={styles.topPicsContainer}>
        <MusicText
          text="Top Picks"
          preset="bold"
          style={{ color: color.white, fontSize: 28, fontWeight: "700" }}
        />
        <TopPick />
      </View>
    </MusicScreen>
  )
}

const styles = StyleSheet.create({
  container: {},
  headerStyle: {
    marginHorizontal: 16,
    marginTop: 30,
  },
  topPicsContainer: {
    marginLeft: 16,
    marginTop: 30,
  },
})
