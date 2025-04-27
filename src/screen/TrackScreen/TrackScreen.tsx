import MusicButton from "@music/base/MusicButton/MusicButton"
import { MusicText } from "@music/base/MusicText/MusicText"
import SmallCard from "@music/base/SmallCard/SmallCard"
import { useAppDispatch, useAppSelector } from "@music/hook/hook"
import { IArtistSpotifyTrack } from "@music/models/artist.interface"
import { artist } from "@music/store/slice/artistTopTrackSlice"
import { color } from "@music/theme/color"
import { useEffect } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import Animated from "react-native-reanimated"

interface ITrackScreen {
  id: string
}

const TrackScreen = (props: ITrackScreen) => {
  const dispatch = useAppDispatch()
  const { artistData, isArtistLoading, isError } = useAppSelector(
    (state) => state.artistTopTrackSlice,
  )

  useEffect(() => {
    dispatch(artist(props.id))
  }, [])

  const renderItem = (item: IArtistSpotifyTrack) => {
    return (
      <Animated.View style={styles.cardStyle}>
        <SmallCard
          artistImg={item.album.images[0]?.url}
          artistSongName={item.name}
          artistName={item?.artists[0]?.name}
        />
      </Animated.View>
    )
  }

  return (
    <View>
      <FlatList
        data={artistData.tracks as IArtistSpotifyTrack[]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderItem(item)}
        style={styles.flatListStyle}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        contentContainerStyle={{ marginBottom: "10%" }}
      />

      <MusicButton
        buttonCta="See All"
        onPress={() => console.log("See")}
        buttonStyle={{ borderColor: color.grey, borderWidth: 1, paddingVertical: 6, alignSelf: 'center'}}
        buttonWidth={"20%"}
        borderRadius={20}
      />
    </View>
  )
}

export default TrackScreen

const styles = StyleSheet.create({
  cardStyle: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  flatListStyle: {
    paddingTop: 10,
  },
})
