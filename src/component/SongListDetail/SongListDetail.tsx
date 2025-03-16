import Error from "@music/base/Error/Error"
import Header from "@music/base/Header/Header"
import Loading from "@music/base/Loading/Loading"
import SmallCard from "@music/base/SmallCard/SmallCard"
import { DEVICE_HEIGHT } from "@music/constant/constant"
import { useAppDispatch, useAppSelector } from "@music/hook/hook"
import { IArtistSpotifyTrack } from "@music/models/artist.interface"
import { artist } from "@music/store/slice/artistTopTrackSlice"
import { setIsMenuActive, setMenuData, setMenuPosition } from "@music/store/slice/menuSlice"
import { ESCREEN } from "@music/types/screen"
import { IMenuData } from "@music/types/type"
import { useNavigation, useRoute } from "@react-navigation/native"
import { BlurView } from "expo-blur"
import { useEffect } from "react"
import { FlatList, GestureResponderEvent, StyleSheet, View } from "react-native"
import Animated from "react-native-reanimated"

const MenuData: IMenuData[] = [
  {
    id: 0,
    icon: "alert-circle-outline",
    title: "View Credit",
    onClick: () => {
      console.log("View Credit")
    },
  },
  {
    id: 1,
    icon: "add-outline",
    title: "Add to a Playlist",
    onClick: () => {
      console.log("Add to a Playlist")
    },
  },
  {
    id: 2,
    icon: "albums-outline",
    title: "Plat next",
    onClick: () => {
      console.log("Plat next")
    },
  },
  {
    id: 3,
    icon: "share-outline",
    title: "Share",
    onClick: () => {
      console.log("Share")
    },
  },
]

const SongListDetail = () => {
  const props = useRoute()
  const dispatch = useAppDispatch()
  const { artistData, isArtistLoading, isError } = useAppSelector(
    (state) => state.artistTopTrackSlice,
  )
  const { navigate } = useNavigation()

  useEffect(() => {
    dispatch(setMenuData(MenuData as any))
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

  const showMenu = (event: GestureResponderEvent) => {
    dispatch(setIsMenuActive(true))

    if (event.nativeEvent.pageY > DEVICE_HEIGHT * 0.5) {
      if (event.nativeEvent.pageY * 0.8 <= 590) {
        dispatch(setMenuPosition(event.nativeEvent.pageY * 0.8 + 30))
      } else {
        dispatch(setMenuPosition(600))
      }
    } else {
      dispatch(setMenuPosition(event.nativeEvent.pageY - 50))
    }
  }

  if (isError) {
    return <Error isError={isError} retry={retry} />
  }

  const navigateToArtist = (id: string) => {
    if (id) navigate(ESCREEN.ARTIST_SCREEN, { artistId: id })
  }

  const renderItem = (item: IArtistSpotifyTrack) => {
    return (
      <Animated.View style={styles.cardStyle}>
        <SmallCard
          artistImg={item.album.images[0]?.url}
          artistSongName={item.name}
          artistName={item?.artists[0]?.name}
          showMenuToggle={(data: GestureResponderEvent | undefined) => data && showMenu(data)}
          onArtistClick={() => navigateToArtist(item?.artists[0]?.id)}
        />
      </Animated.View>
    )
  }

  return (
    <Animated.View style={{ flex: 1 }}>
      <View style={{ backgroundColor: "transparent", zIndex: 1 }}>
        <View style={{ backgroundColor: "transparent", zIndex: 1, backgroundColor: "transparent" }}>
          <Header title={`Browser Top Tracks`} subtitle={props.params?.artist?.name} />
        </View>
        <BlurView intensity={46} tint="dark" style={styles.blurStyle} />
      </View>

      <FlatList
        data={artistData.tracks as IArtistSpotifyTrack}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderItem(item)}
        style={styles.flatListStyle}
        showsVerticalScrollIndicator={false}
      />
    </Animated.View>
  )
}

export default SongListDetail

const styles = StyleSheet.create({
  blurStyle: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  cardStyle: {
    marginHorizontal: 16,
    marginVertical: 12,
  },
  flatListStyle: {
    paddingTop: 10,
  },
})
