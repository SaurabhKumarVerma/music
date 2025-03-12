import { Pressable, SectionList, StyleSheet, View } from "react-native"
import HomeHeader from "./HomeHeader"
import { MusicText } from "@music/base/MusicText/MusicText"
import { color } from "@music/theme/color"
import { useAppDispatch, useAppSelector } from "@music/hook/hook"
import { useEffect } from "react"
import { listen } from "@music/store/slice/listenStore"
import TopPick from "./TopPick"
import Loading from "@music/base/Loading/Loading"
import { recentlyPlayed } from "@music/store/slice/recentlyPlayedSlice"
import { ETITLE_NAME } from "@music/types/type"
import TrackPlayer from "react-native-track-player"
import RecentlyPlayed from "./RecentlyPlayed"

export default function Home() {
  const dispatch = useAppDispatch()
  const { listenData, isLoading } = useAppSelector((state) => state.listenStore)

  const start = async () => {
    // Set up the player
    await TrackPlayer.setupPlayer()

    // Add a track to the queue
    await TrackPlayer.add({
      id: "trackId",
      url: "https://api.spotify.com/v1/artists/0LyfQWJT6nXafLPZqxe9Of",
      title: "Track Title",
      artist: "Track Artist",
      artwork: "https://picsum.photos/200/300?grayscale",
    })

    // Start playing it
    await TrackPlayer.play()
  }

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
    if (section?.title === ETITLE_NAME?.RECENTLY_PLAYED) {
      return (
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
              alignContent: "flex-end",
              // backgroundColor: "green",
              marginTop: 20
            }}
          >
            <MusicText text={section.title} preset="bold" size="lg" style={styles.titleStyle} />
            <Pressable style={{ alignSelf: "flex-end" }}>
              <MusicText
                text="See all"
                preset="medium"
                style={{ color: color.selectedColor, marginLeft: 16, textAlign: "center" }}
              />
            </Pressable>
          </View>

          <RecentlyPlayed data={section?.data || []} />
        </View>
      )
    }
    if (section?.title === ETITLE_NAME?.TOP_PICKS) {
      return (
        <>
          <MusicText text={section.title} preset="bold" size="lg" style={styles.titleStyle} />
          <TopPick data={section?.data} />
        </>
      )
    }
  }

  return (
    <View style={styles.container}>
      <HomeHeader />
      <SectionList
        sections={listenData ?? []}
        stickySectionHeadersEnabled={false}
        keyExtractor={(item, index) => item + index}
        renderItem={() => {
          return null
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderSectionHeader={({ section }) => <>{showData(section)}</>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleStyle: {
    color: color.white,
    marginLeft: 16,
    marginTop: 20,
  },
})
