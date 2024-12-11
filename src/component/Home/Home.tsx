import { SectionList, StyleSheet, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import HomeHeader from "./HomeHeader"
import Divider from "@music/base/Divider/Divider"
import { MusicText } from "@music/base/MusicText/MusicText"
import { color } from "@music/theme/color"
import { useAppDispatch, useAppSelector } from "@music/hook/hook"
import { useEffect } from "react"
import { listen } from "@music/store/slice/listenStore"
import TopPick from "./TopPick"
import Loading from "@music/base/Loading/Loading"
import { recentlyPlayed } from "@music/store/slice/recentlyPlayedSlice"
import { ETITLE_NAME } from "@music/types/type"

export default function Home() {
  const insets = useSafeAreaInsets()
  const dispatch = useAppDispatch()
  const { listenData, isLoading } = useAppSelector((state) => state.listenStore)

  useEffect(() => {
    dispatch(listen())
    dispatch(recentlyPlayed())
  }, [])

  if (isLoading) {
    return (
      <View style={{}}>
        <Loading isVisible={isLoading} />
      </View>
    )
  }

  const showData = (section: any) => {
    if (section.title === ETITLE_NAME.TOP_PICKS) {
      return (
        <>
          <MusicText text={section.title} preset="bold" style={styles.titleStyle} />
          <TopPick data={section.data} />
        </>
      )
    }
  }

  return (
    <View style={[styles.container, { top: insets.top }]}>
      <View style={styles.headerStyle}>
        <HomeHeader />
      </View>

      <Divider />

      <SectionList
        sections={listenData}
        stickySectionHeadersEnabled={false}
        keyExtractor={(item, index) => item + index}
        renderItem={() => {
          return null
        }}
        showsHorizontalScrollIndicator={false}
        renderSectionHeader={({ section }) => <>{showData(section)}</>}
      />

      {/* <View style={styles.topPicsContainer}>
        <MusicText
          text="Top Picks"
          preset="bold"
          style={{ color: color.white, fontSize: 28, fontWeight: "700" }}
        />
        <TopPick />
      </View>

      <View style={styles.recentlyUpdatedContainer}>
        <MusicText
          text="Recently Played"
          preset="bold"
          style={{ color: color.white, fontSize: 28, fontWeight: "700" }}
        />

        <MediumCard
          imageUrl="https://picsum.photos/id/237/200/300"
          songOrAlbumName="I'm Someone New "
        />
      </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerStyle: {
    marginLeft: 16,
    marginTop: 30,
  },
  titleStyle: {
    color: color.white,
    fontSize: 28,
    fontWeight: "700",
    marginLeft: 16,
    marginTop: 20,
  },
})
