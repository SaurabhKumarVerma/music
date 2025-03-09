import Error from "@music/base/Error/Error"
import Header from "@music/base/Header/Header"
import Loading from "@music/base/Loading/Loading"
import SmallCard from "@music/base/SmallCard/SmallCard"
import { useAppDispatch, useAppSelector } from "@music/hook/hook"
import { IArtistSpotifyTrack } from "@music/models/artist.interface"
import { artist } from "@music/store/slice/artistSlice"
import { useRoute } from "@react-navigation/native"
import { useEffect } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const SongListDetail = () => {
  const insets = useSafeAreaInsets()
  const props = useRoute()
  const dispatch = useAppDispatch()
  const { artistData, isArtistLoading, isError } = useAppSelector((state) => state.artist)

  useEffect(() => {
    dispatch(artist(props.params?.artist?.id))
  }, [])

  const retry = () => {
    dispatch(artist(props.params?.artist?.id))
  }

  if (isArtistLoading) {
    return (
      <View style={{}}>
        <Loading isVisible={isArtistLoading} />
      </View>
    )
  }

  if (isError) {
    return <Error isError={isError} retry={retry} />
  }

  const renderItem = (item: IArtistSpotifyTrack) => {
    return (
      <View style={styles.cardStyle}>
        <SmallCard
          artistImg={item.album.images[0]?.url}
          artistSongName={item.name}
          artistName={item?.artists[0]?.name}
        />
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Header title={`Browser Top Tracks`} subtitle={props.params?.artist?.name} />

      <FlatList
        data={artistData.tracks as IArtistSpotifyTrack}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderItem(item)}
        style={styles.flatListStyle}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default SongListDetail

const styles = StyleSheet.create({
  cardStyle: {
    marginHorizontal: 16,
    marginVertical: 12,
  },
  flatListStyle: {
    paddingTop: 10,
  },
})
